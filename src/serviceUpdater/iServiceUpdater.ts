'use strict';

import {IAuth} from "#/auth/iAuth"
import {IAccount} from "#/serviceUpdater/iAccount"
import {ILogger} from "#/util/iLogger"

interface IServiceUpdater {
    auth: IAuth
    account: IAccount
    logger: ILogger

    run(): Promise<IServiceResponse>
}

interface IServiceResponse {
    status: number
}

export {IServiceUpdater, IServiceResponse}