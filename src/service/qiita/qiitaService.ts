'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {IAuth} from "#/auth/iAuth"

class QiitaService implements IService {
    account: IAccount;
    auth: IAuth;

    accountUpdate(): IServiceResponse {
        return {status: 200}
    }
}

export {QiitaService}