interface ILogger {
    name: string;

    log(message: string, status: Symbol): void;
}

export {ILogger}