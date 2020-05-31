'use strict';

import {IAuth, AUTH_NAME} from "#/auth/iAuth"
import {IPage} from "#/serviceUpdater/page/iPage"

class TwitterAuth implements IAuth {
    name: Symbol = AUTH_NAME.TWITTER;
    id: string;
    password: string;
    page: IPage;

    constructor(params: { id: string, password: string }) {
        this.id = params.id;
        this.password = params.password;
    }

    async dispatch(): Promise<void> {
        await this.page.type('#username_or_email', this.id);
        await this.page.type('#password', this.password);
        await this.page.click('#allow');
        await this.page.waitForNavigation();
    }
}

export {TwitterAuth}