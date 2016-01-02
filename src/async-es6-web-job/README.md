# Example NodeJS WebJob task for Azure with Async/Await taks

This example uses ES6 Async/Await features with TypeScript 1.7.
To run this example on Azure - which supports Node 4.2.*, Babel is used to transpile TypeScript ES6 to ES5.

You can read about TypeScript 1.7 features in [release announcement](http://blogs.msdn.com/b/typescript/archive/2015/11/30/announcing-typescript-1-7.aspx)

> This example comes as full VSCode TypeScript project - but development tooling is fully based on Gulp, so VSCode is not required.

## Documentation

To install project dependencies run:
```
npm install
```

To transpile TypeScript into ES6 and then into ES5 via Babel:
```
gulp watch
```
This will create `lib/` directory with transpiled JavaScript sources.

To just compile output into `lib/` directory:
```
gulp babel
```

To prepare Azure distribution archive (`webjob.zip`):
```
gulp dist
```
This task will create `dist/` directory with ready to use archive file. Just upload this file to Azure as Web Job.


To clean `dist/` and `lib/` directories:
```
gulp clean
```

> The Gulp tasks are also exposed as tasks in VSCode.

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

## Requirements

- Node 4.*
- TypeScript 1.7
- Babel 6

## Author

@peterblazejewicz