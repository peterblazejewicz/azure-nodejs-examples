# NodeJS examples for Azure

Various examples for MS Azure using NodeJS. A companion project to [Azure ASP.NET5 Examples](https://github.com/peterblazejewicz/azure-aspnet5-examples)

## Description

### [Azure CLI integration with Gulp](/src/azure-cli-gulp)

Develop and deploy NodeJS web jobs to Azure with Gulp.

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

Other:
```
gulp webjob:history
```

Features:
- VSCode integration
- Gulp based tasks
- azure-cli integration


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

### [Async/Await ES6 pattern in Azure web job](/src/async-es6-web-job)

This example uses ES6 Async/Await features with TypeScript 1.7.
To run this example on Azure - which supports Node 4.2.*, Babel is used to transpile TypeScript ES6 to ES5.

You can read about TypeScript 1.7 features in [release announcement](http://blogs.msdn.com/b/typescript/archive/2015/11/30/announcing-typescript-1-7.aspx)

> This example comes as full VSCode TypeScript project - but development tooling is fully based on Gulp, so VSCode is not required.

```ts
"use strict";
import "babel-polyfill";
import { QueueWebJob } from "./webjobs/QueueWebJob";

let tokens: string[] = [
    "Hello",
    "beautiful",
    "asynchronous",
    "world!"
];
let job: QueueWebJob = new QueueWebJob(tokens);
try {
    job.execute()
        .then(() => {
            job.processMessage("Task finished");
        });
} catch (error) {
    job.processError(error);
}
```

When uploaded to Azure and run it will output to Azure log:
```
[01/02/2016 19:43:54 > f152c5: SYS INFO] Status changed to Initializing
[01/02/2016 19:43:55 > f152c5: SYS INFO] Run script 'index.js' with script host - 'NodeScriptHost'
[01/02/2016 19:43:55 > f152c5: SYS INFO] Status changed to Running
[01/02/2016 19:43:58 > f152c5: INFO] Hello
[01/02/2016 19:43:59 > f152c5: INFO] beautiful
[01/02/2016 19:43:59 > f152c5: INFO] asynchronous
[01/02/2016 19:43:59 > f152c5: INFO] world!
[01/02/2016 19:43:59 > f152c5: INFO] Task finished
[01/02/2016 19:43:59 > f152c5: SYS INFO] Status changed to Success
```

See also: [What's new in TypeScript](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#typescript-17)

Features:
- TypeScript 1.7
- Babel 6
- VSCode integration
- Gulp based tasks

## Author
@peterblazejewicz
