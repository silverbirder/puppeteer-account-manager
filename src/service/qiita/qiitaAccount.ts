'use strict';

import {IAccount} from "#/service/iAccount"

class QiitaAccount implements IAccount {
    constructor(params: {avatar: string, introduction: string}) {
    }
}

export {QiitaAccount}