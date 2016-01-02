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