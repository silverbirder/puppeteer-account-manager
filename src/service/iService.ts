'use strict';

import {IAuth} from "#/auth/iAuth"
import {IAccount} from "#/service/iAccount"
import {Browser} from "puppeteer";

interface IService {
    auth: IAuth
    account: IAccount
    browser: Browser

    accountUpdate(): Promise<IServiceResponse>
}

interface IServiceResponse {
    status: number
}

export {IService, IServiceResponse}