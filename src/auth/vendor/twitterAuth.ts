'use strict';

import {IAuth, AUTH_NAME} from "#/auth/iAuth"
import {Page} from "puppeteer";

class TwitterAuth implements IAuth {
    name: Symbol = AUTH_NAME.TWITTER;
    id: string;
    password: string;
    page: Page;

    constructor(params: { id: string, password: string }) {
        this.id = params.id;
        this.password = params.password;
    }

    async dispatch(): Promise<void> {
        console.log(`🤖: twitter auth start`);
        const mailInput: string = '#username_or_email';
        await this.page.waitFor(mailInput);
        await this.page.type(mailInput, this.id);
        const passwordInput: string = '#password';
        await this.page.waitFor(passwordInput);
        await this.page.type(passwordInput, this.password);
        await this.page.click('#allow');
        await this.page.waitForNavigation();
        console.log(`🤖: twitter auth end`);
        return;
    }
}

export {TwitterAuth}