interface ILogger {
    name: string;

    log(status: Symbol, process: Symbol): void;
}

export {ILogger}