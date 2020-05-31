interface ILogger {
    name: string;

    log(status: Symbol, process: Symbol): void;
    error(e: Error): void;
}

export {ILogger}