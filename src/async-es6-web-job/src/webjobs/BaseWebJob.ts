"use strict";

export abstract class BaseWebJob {

    processError(error: any) {
        console.log(error);
    }
    processMessage(message: any) {
        console.log(message);
    }
}