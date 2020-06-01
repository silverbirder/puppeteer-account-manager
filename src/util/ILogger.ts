interface ILogger {
    name: string;

    log(status: Symbol, process: Symbol, message?: string): void;

    error(e: Error): void;
}

export {ILogger}