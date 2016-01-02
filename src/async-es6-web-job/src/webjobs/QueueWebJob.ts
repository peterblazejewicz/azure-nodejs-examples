"use strict";
import {BaseWebJob} from "./BaseWebJob";
import "./IWebJobAsync";

export class QueueWebJob extends BaseWebJob
    implements IWebJobAsync {

    constructor(private tokens: string[] = []) {
        super();
        this.tokens = tokens;
    }

    async execute() {
        return this.printDelayed(this.tokens);
    }

    async printDelayed(elements: string[]) {
        for (const element of elements) {
            await this.delay(200);
            this.processMessage(element);
        }
    }

    private async delay(milliseconds: number): Promise<void> {
        return new Promise<void>(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

}