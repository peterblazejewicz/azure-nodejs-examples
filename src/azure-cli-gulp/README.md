# Azure CLI integration with Gulp

Example NodeJS web job workflow for Azure:
- start your work and test locally
- when ready commit changes and update NPM version
```
npm version patch
```
- create distribution for Azure wep app job:
```
gulp dist
```
- upload created distribution to Azure:
```
gulp webjob:deploy
```
- optionally start new web job:
```
gulp webjob:start
```


## Usage

The Gulp based workflow uses `config.json` file for storing options. Create one from template:
```
mv config.default.json config.json
```
and fill it with your web app information. The Gulp task contains also default configuration which you can modify directly. It will be used if you don't want to use configuration file.

The task is executed by Azure by running `index.js`:
```
node index.js
```
You could also run:
```
npm start
```

To create distribution for Azure:
```
gulp dist
```

To deploy create file to Azure:
```
gulp webjob:deploy
```
For example:
```
gulp webjob:deploy
[23:00:17] Using gulpfile ~/git/azure-nodejs-examples/src/azure-cli-gulp/gulpfile.js
[23:00:17] Starting 'webjob:deploy'...
info:    Executing command site job upload

info:    Getting site information

info:    Uploading new WebJob

info:    Getting WebJob

info:    WebJob UploadWebJobExample has been uploaded

info:    site job upload command OK

[23:00:29] Finished 'webjob:deploy' after 12 s
```

To start a web job on Azure:
```
gulp webjob:start
```
For example:
```
gulp webjob:start
[23:08:44] Using gulpfile ~/git/azure-nodejs-examples/src/azure-cli-gulp/gulpfile.js
[23:08:44] Starting 'webjob:start'...
info:    Executing command site job start

info:    Getting site information

info:    Starting WebJob

info:    WebJob UploadWebJobExample has been started

info:    site job start command OK

[23:08:51] Finished 'webjob:start' after 7.37 s
```

To see web job run history:
```
gulp webjob:history
```
For example:
```
gulp webjob:history
[23:18:36] Using gulpfile ~/git/azure-nodejs-examples/src/azure-cli-gulp/gulpfile.js
[23:18:36] Starting 'webjob:history'...
info:    Executing command site job history list

info:    Getting site information

info:    Getting WebJob runs

data:    Id                  Status   Duration   Start Time                    End Time

data:    ------------------  -------  ---------  ----------------------------  ----------------------------

data:    201601042208502288  Success  0:0:0.NaN  2016-01-04T22:08:50.2288013Z  2016-01-04T22:08:50.7756779Z

info:    site job history list command OK

[23:18:41] Finished 'webjob:history' after 5.47 s
```

## Author

@peterblazejewicz