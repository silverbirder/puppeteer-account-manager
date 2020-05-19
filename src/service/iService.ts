'use strict';

import {IAuth} from "#/auth/iAuth"
import {IAccount} from "#/service/iAccount"

interface IService {
    auth: IAuth
    account: IAccount

    accountUpdate(): Promise<IServiceResponse>
}

interface IServiceResponse {
    status: number
}

export {IService, IServiceResponse}