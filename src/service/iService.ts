'use strict';

import {IAuth} from "#/auth/iAuth"
import {IAccount} from "#/service/iAccount"
import {Page} from "puppeteer";

interface IService {
    auth: IAuth
    account: IAccount
    page: Page

    accountUpdate(): Promise<IServiceResponse>
}

interface IServiceResponse {
    status: number
}

export {IService, IServiceResponse}