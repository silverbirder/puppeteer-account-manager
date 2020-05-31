'use strict';

import {ILogger} from "#/util/ILogger"

const LOGGER_STATUS = {
    PROCESS: Symbol('PROCESS'),
    AUTH: Symbol('AUTH'),
    UPLOAD: Symbol('UPLOAD'),
};

const LOGGER_STATUS_EMOJI = {
    PROCESS: '🤖',
    AUTH: '🔑',
    UPLOAD: '🖼',
};

const PROCESS_STATUS = {
    START: Symbol('START'),
    END: Symbol('END'),
};

class Logger implements ILogger {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    log(status: Symbol, process: Symbol): void {
        let emoji: string;
        switch (status) {
            case LOGGER_STATUS.PROCESS:
                emoji = LOGGER_STATUS_EMOJI.PROCESS;
                break;
            case LOGGER_STATUS.AUTH:
                emoji = LOGGER_STATUS_EMOJI.AUTH;
                break;
            case LOGGER_STATUS.UPLOAD:
                emoji = LOGGER_STATUS_EMOJI.UPLOAD;
                break;
        }
        let message: string;
        switch (process) {
            case PROCESS_STATUS.START:
                message = 'starting...';
                break;
            case PROCESS_STATUS.END:
                message = 'end';
                break;
        }
        console.log(`${emoji} ${this.name}: ${message}`);
    }

    error(e: Error): void {
        console.log(`${this.name}: ERROR!`);
        console.error(e);
    }
}

export {Logger, LOGGER_STATUS, PROCESS_STATUS}