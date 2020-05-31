'use strict';

import {IAccount} from "#/serviceUpdater/iAccount"

class GoogleAccount implements IAccount {
    avatar: string;
    introduction: string;

    constructor(params: { avatar: string, introduction: string }) {
        this.avatar = params.avatar;
        this.introduction = params.introduction;
    }
}

export {GoogleAccount}