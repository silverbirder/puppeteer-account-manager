'use strict';

import {IAuth} from "#/auth/iAuth"
import {IAccount} from "#/serviceUpdater/iAccount"

interface IServiceUpdater {
    auth: IAuth
    account: IAccount

    run(): Promise<IServiceResponse>
}

interface IServiceResponse {
    status: number
}

export {IServiceUpdater, IServiceResponse}