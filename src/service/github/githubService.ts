'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer";

class GithubService implements IService {
    account: IAccount;
    auth: IAuth;

    async accountUpdate(): Promise<IServiceResponse> {
        const browser: Browser = await launch({headless: false, args: ['--incognito']});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
        this.auth.page = page;

        console.log(`🚀: page.goto(github/login)`);
        await page.goto('https://github.com/login');
        await this.auth.dispatch();

        await page.goto('https://github.com/settings/profile');
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(this.account.avatar);
        await page.click('input[type="submit"]');
        await page.waitForNavigation();

        await browser.close();
        return {status: 200}
    }
}

export {GithubService}