'use strict';

import {IAuth} from "#/auth/iAuth"
import {IAccount} from "#/service/iAccount"

interface IService {
    auth: IAuth
    account: IAccount

    accountUpdate(): IServiceResponse
}

interface IServiceResponse {
    status: number
}

export {IService, IServiceResponse}