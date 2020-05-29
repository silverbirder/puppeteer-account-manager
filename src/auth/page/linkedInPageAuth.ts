'use strict';

import {IAuth, AUTH_NAME} from "#/auth/iAuth"
import {Page} from "puppeteer";

class LinkedInPageAuth implements IAuth {
    name: Symbol = AUTH_NAME.PAGE;
    id: string;
    password: string;
    page: Page;

    constructor(params: { id: string, password: string }) {
        this.id = params.id;
        this.password = params.password;
    }

    async dispatch(): Promise<void> {
        console.log(`🤖: linkedIn page auth start`);
        const mailInput: string = '#username';
        await this.page.waitFor(mailInput);
        await this.page.type(mailInput, this.id);
        const passwordInput: string = '#password';
        await this.page.waitFor(passwordInput);
        await this.page.type(passwordInput, this.password);
        await this.page.click('button[type="submit"]');
        console.log(`🤖: linkedIn page auth end`);
        return;
    }
}

export {LinkedInPageAuth}