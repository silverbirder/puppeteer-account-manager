'use strict';

import {IAuth, AUTH_NAME} from "#/auth/iAuth"
import {IPage} from "#/serviceUpdater/page/iPage"

class TwitterPageAuth implements IAuth {
    name: Symbol = AUTH_NAME.PAGE;
    id: string;
    password: string;
    page: IPage;

    constructor(params: { id: string, password: string }) {
        this.id = params.id;
        this.password = params.password;
    }

    async dispatch(): Promise<void> {
        await this.page.type('input[name="session[username_or_email]"][type="text"]', this.id);
        await this.page.type('input[name="session[password]"][type="password"]', this.password);
        await this.page.click('[data-testid="LoginForm_Login_Button"]');
        await this.page.waitForNavigation();
    }
}

export {TwitterPageAuth}