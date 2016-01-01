# NodeJS examples for Azure

Various examples for MS Azure using NodeJS. A companion project to [Azure ASP.NET5 Examples](https://github.com/peterblazejewicz/azure-aspnet5-examples)

## Description

### [Azure NodeJS simple web job](/src/azure-web-job)

This example is based on single `index.js` file without external dependencies from NPM modules. It uses only built-in Node features and modules.

Features:
- TypeScript
- VSCode integration
- Gulp based tasks

### [Azure NodeJS configuration](/src/web-job-options)

This example uses `nconf` module to layer access to configuration option available for NodeJS based web job.
When you deploy this web job, you would see all configuration options available for web job in task output.
For example here is a section related to WebJob:
```
"WEBJOBS_COMMAND_ARGUMENTS": "",
[01/01/2016 22:28:48 > f152c5: INFO] 	"WEBJOBS_DATA_PATH": "D:\\home\\data\\jobs\\triggered\\OptionsTasks",
[01/01/2016 22:28:48 > f152c5: INFO] 	"WEBJOBS_NAME": "OptionsTasks",
[01/01/2016 22:28:48 > f152c5: INFO] 	"WEBJOBS_PATH": "D:\\home\\site\\wwwroot\\App_Data\\jobs\\triggered\\OptionsTasks",
[01/01/2016 22:28:48 > f152c5: INFO] 	"WEBJOBS_RUN_ID": "201601012228463099",
[01/01/2016 22:28:48 > f152c5: INFO] 	"WEBJOBS_TYPE": "triggered",
```

Features:
- TypeScript
- VSCode integration
- Gulp based tasks
- `nconf` for access to configuration options

## Author
@peterblazejewicz
