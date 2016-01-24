//
// Copyright (c) Microsoft and contributors.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

var fs = require('fs');
var path = require('path');
var azure;

try {
  fs.statSync('./../../lib/azure.js');
  azure = require('./../../lib/azure');
} catch(error) {
  azure = require('azure');
}

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var formidable = require('formidable');
var helpers = require('./helpers.js');

var app = module.exports = express();
// Global request options, set the retryPolicy
// var blobClient = azure.createBlobService('UseDevelopmentStorage=true')
var blobClient = azure.createBlobService(process.env.CONNECTION_STRING)
  .withFilter(new azure.ExponentialRetryPolicyFilter());
var containerName = 'webpi';

//Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

if(app.get('env') === 'development') {
  app.use(errorHandler());
};

if(app.get('env') === 'production') {
  app.use(errorHandler());
};

app.param(':id', function (req, res, next) {
  next();
});

//Routes
app.get('/', function (req, res) {
  res.render('index.ejs', { locals: {
    title: 'Welcome'
  }
  });
});

app.get('/Upload', function (req, res) {
  res.render('upload.ejs', { locals: {
    title: 'Upload File'
  }
  });
});

app.get('/Display', function (req, res) {
  blobClient.listBlobs(containerName, function (error, blobs) {
    res.render('display.ejs', { locals: {
      title: 'List of Blobs',
      serverBlobs: blobs
    }
    });
  });
});

app.get('/Download/:id', function (req, res) {
  blobClient.getBlobProperties(containerName, req.params.id, function (err, blobInfo) {
    if (err === null) {
      res.header('content-type', blobInfo.contentType);
      res.header('content-disposition', 'attachment; filename=' + blobInfo.metadata.filename);
      blobClient.getBlobToStream(containerName, req.params.id, res, function () { });
    } else {
      helpers.renderError(res);
    }
  });
});

app.post('/uploadhandler', function (req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    var formValid = true;
    if (fields.itemName === '') {
      helpers.renderError(res);
      formValid = false;
    }

    if (formValid) {
      var extension = files.uploadedFile.name.split('.').pop();
      var newName = fields.itemName + '.' + extension;

      var options = {
        contentType: files.uploadedFile.type,
        metadata: { fileName: newName }
      };

      blobClient.createBlockBlobFromFile(containerName, fields.itemName, files.uploadedFile.path, options, function (error) {
        if (error != null) {
          helpers.renderError(res);
        } else {
          setSAS(containerName, fields.itemName);
          res.redirect('/Display');
        }
      });
    } else {
      helpers.renderError(res);
    }
  });
});

app.post('/Delete/:id', function (req, res) {
  blobClient.deleteBlob(containerName, req.params.id, function (error) {
    if (error != null) {
      helpers.renderError(res);
    } else {
      res.redirect('/Display');
    }
  });
});

blobClient.createContainerIfNotExists(containerName, function (error) {
  if (error) {
    console.log(error);
  } else {
    setPermissions();
  }
});


function setSAS(containerName, blobName) {
    var sharedAccessPolicy = {
        AccessPolicy: {
            Expiry: azure.date.minutesFromNow(3)
        }
    };

    var blobUrl = blobClient.getBlobUrl(containerName, blobName, sharedAccessPolicy);
    console.log("access the blob at ", blobUrl);
}

function setPermissions() {
  blobClient.setContainerAcl(containerName, azure.Constants.BlobConstants.BlobContainerPublicAccessType.BLOB, function (error) {
    if (error) {
      console.log(error);
    } else {
      app.listen(process.env.port || 1337);
      console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
    }
  });
}
