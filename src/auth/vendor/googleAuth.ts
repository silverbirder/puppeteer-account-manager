'use strict';

import {IAuth, AUTH_NAME} from "#/auth/iAuth"
import {IPage} from "#/serviceUpdater/page/iPage"

class GoogleAuth implements IAuth {
    name: Symbol = AUTH_NAME.GOOGLE;
    id: string;
    password: string;
    page: IPage;

    constructor(params: { id: string, password: string }) {
        this.id = params.id;
        this.password = params.password;
    }

    async dispatch(): Promise<void> {
        await this.page.type('input[type="email"]', this.id, {visible: true});
        await this.page.enter();
        await this.page.type('input[type="password"]', this.password, {visible: true});
        await this.page.enter();
        await this.page.waitForNavigation();
    }
}

export {GoogleAuth}