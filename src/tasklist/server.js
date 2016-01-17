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

// Module dependencies.
var fs = require('fs');
var path = require('path');

var azure;
try {
    fs.statSync('./../../lib/azure.js');
    azure = require('./../../lib/azure');
} catch (error) {
    azure = require('azure');
}

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var multer = require('multer');
var uuid = require('node-uuid');
var Home = require('./home');
var nconf = require('nconf');
var ServiceClient = azure.ServiceClient;
nconf.env()
    .file({ file: './config.json', search: true })
    .defaults({
        "Azure": {
            "Storage": {
                "Table": "tasks"
            }
        },
        "ViewEngine": "Jade"
    });

var app = module.exports = express();
var storageAccount = nconf.get('Azure:Storage:AccountName');
var storageAccessKey = nconf.get('Azure:Storage:AccessKey');

// var client = azure.createTableService('UseDevelopmentStorage=true');
var client = azure.createTableService(storageAccount, storageAccessKey);
var table = nconf.get("Azure:Storage:Table");
// table creation
client.createTableIfNotExists(table, function (res, created) {
    if (created) {
        var item = {
            name: 'Add readonly todo list',
            category: 'Site work',
            date: '12/01/2011',
            RowKey: uuid(),
            PartitionKey: 'partition1',
            completed: false
        };

        client.insertEntity(table, item, null, function () {
            setupApplication();
        });
    } else {
        setupApplication();
    }
});

function setupApplication() {
    // Configuration
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    // NOTE: Change configuration to use ejs instead of jade
    app.set('view engine', nconf.get('ViewEngine'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());

    app.use(express.static(path.join(__dirname, '/public')));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
    if ('production' === app.get('env')) {
        app.use(express.errorHandler());
    }

    var home = new Home(client);

    // Routes

    app.get('/', home.showItems.bind(home));
    app.get('/home', home.showItems.bind(home));
    app.post('/home/newitem', home.newItem.bind(home));
    app.post('/home/completed', home.markCompleted.bind(home));

    app.listen(app.get('port'), function () {
        console.log("Express server listening on port %d in %s mode",
            app.get('port'),
            app.get('env'));
    });

}