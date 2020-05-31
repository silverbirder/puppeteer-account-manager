'use strict';

import {IAuth} from "#/auth/iAuth"
import {IAccount} from "#/serviceUpdater/iAccount"
import {ILogger} from "#/util/iLogger"
import {Page} from "puppeteer";

interface IServiceUpdater {
    auth: IAuth
    account: IAccount
    logger: ILogger

    run(): Promise<IServiceResponse>
    pageProcess(page: Page): void;
}

interface IServiceResponse {
    status: number
}

export {IServiceUpdater, IServiceResponse}