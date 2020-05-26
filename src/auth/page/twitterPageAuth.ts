'use strict';

import {IAuth, AUTH_NAME} from "#/auth/iAuth"
import {Page} from "puppeteer";

class TwitterPageAuth implements IAuth {
    name: Symbol = AUTH_NAME.PAGE;
    id: string;
    password: string;
    page: Page;

    constructor(params: { id: string, password: string }) {
        this.id = params.id;
        this.password = params.password;
    }

    async dispatch(): Promise<void> {
        console.log(`🤖: twitter page auth start`);
        const mailInput: string = 'input[name="session[username_or_email]"][type="text"]';
        await this.page.waitFor(mailInput);
        await this.page.type(mailInput, this.id);
        const passwordInput: string = 'input[name="session[password]"][type="password"]';
        await this.page.waitFor(passwordInput);
        await this.page.type(passwordInput, this.password);
        await (await this.page.$$('[data-testid="LoginForm_Login_Button"]'))[0].click();
        await this.page.waitForNavigation();
        console.log(`🤖: twitter page auth end`);
        return;
    }
}

export {TwitterPageAuth}