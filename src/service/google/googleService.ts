'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer";

class GoogleService implements IService {
    account: IAccount;
    auth: IAuth;

    async accountUpdate(): Promise<IServiceResponse> {
        const browser: Browser = await launch({headless: false, args: ['--incognito']});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
        this.auth.page = page;

        console.log(`🚀: page.goto(google/mypage)`);
        await page.goto('https://myaccount.google.com/intro/personal-info');

        console.log(`🚀: page.goto(login)`);
        await page.waitFor('a[aria-label="Sign in"]');
        await page.click('a[aria-label="Sign in"]');

        await this.auth.dispatch();
        await browser.close();
        return {status: 200}
    }
}

export {GoogleService}