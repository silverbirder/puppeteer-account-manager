'use strict';

import {IAuth, AUTH_NAME} from "#/auth/iAuth"
import {Page} from "puppeteer";

class FacebookPageAuth implements IAuth {
    name: Symbol = AUTH_NAME.GOOGLE;
    id: string;
    password: string;
    page: Page;

    constructor(params: { id: string, password: string }) {
        this.id = params.id;
        this.password = params.password;
    }

    async dispatch(): Promise<void> {
        console.log(`🤖: facebook page auth start`);
        const mailInput: string = '#email';
        await this.page.waitFor(mailInput);
        await this.page.type(mailInput, this.id);
        const passwordInput: string = '#pass';
        await this.page.waitFor(passwordInput);
        await this.page.type(passwordInput, this.password);
        await this.page.click('input[type="submit"]');
        console.log(`🤖: facebook page auth end`);
        return;
    }
}

export {FacebookPageAuth}