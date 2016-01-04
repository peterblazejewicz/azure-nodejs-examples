# Basic NodeJS Azure web job upload example

Outputs current semver value into console. When you update a semver:
```
npm version patch
```
just redeploy task to your Azure web site


## Usage

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

## Author

@peterblazejewicz