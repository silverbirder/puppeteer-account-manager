'use strict';

import {IAuth, AUTH_NAME} from "#/auth/iAuth"
import {Page} from "puppeteer";

class GoogleAuth implements IAuth {
    name: Symbol = AUTH_NAME.GOOGLE;
    id: string;
    password: string;
    page: Page;

    constructor(params: { id: string, password: string }) {
        this.id = params.id;
        this.password = params.password;
    }

    async dispatch(): Promise<void> {
        console.log(`🤖: google auth start`);
        const mailInput: string = 'input[type="email"]';
        await this.page.waitForSelector(mailInput, {visible: true});
        await this.page.type(mailInput, this.id);
        await this.page.keyboard.press('Enter');
        const passwordInput: string = 'input[type="password"]';
        await this.page.waitForSelector(passwordInput, {visible: true});
        await this.page.type(passwordInput, this.password);
        await this.page.keyboard.press('Enter');
        await this.page.waitForNavigation();
        console.log(`🤖: google auth end`);
        return;
    }
}

export {GoogleAuth}