import {ILogger} from "#/util/ILogger";

const LOGGER_STATUS = {
    PROCESS: Symbol('PROCESS'),
    AUTH: Symbol('AUTH'),
    UPLOAD: Symbol('UPLOAD'),
    DONE: Symbol('DONE'),
};

const STATUS_EMOJI = {
    PROCESS: '🤖',
    AUTH: '🔑',
    UPLOAD: '🖼',
    DONE: '🚀',
};

class Logger implements ILogger {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    log(message: string, status: Symbol): void {
        let emoji: string;
        switch (status) {
            case LOGGER_STATUS.PROCESS:
                emoji = STATUS_EMOJI.PROCESS;
                break;
            case LOGGER_STATUS.AUTH:
                emoji = STATUS_EMOJI.AUTH;
                break;
            case LOGGER_STATUS.UPLOAD:
                emoji = STATUS_EMOJI.UPLOAD;
                break;
            case LOGGER_STATUS.DONE:
                emoji = STATUS_EMOJI.DONE;
                break;
        }
        console.log(`${emoji} ${name}: ${message}`);
    }
}

export {Logger, LOGGER_STATUS}