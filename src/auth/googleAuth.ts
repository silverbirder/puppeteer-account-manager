'use strict';

import {IAuth} from "#/auth/iAuth"

class GoogleAuth implements IAuth {
    constructor(params: {id: string, password: string}) {
    }
}

export {GoogleAuth}