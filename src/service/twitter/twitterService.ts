'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer";

class TwitterService implements IService {
    account: IAccount;
    auth: IAuth;

    async accountUpdate(): Promise<IServiceResponse> {
        const browser: Browser = await launch({headless: false, args: ['--incognito']});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
        this.auth.page = page;

        console.log(`🚀: page.goto(twitter/login)`);
        await page.goto('https://twitter.com/login');
        await this.auth.dispatch();
        await page.waitFor('a[aria-label="プロフィール"]');
        await page.click('a[aria-label="プロフィール"]');
        await page.waitFor('a[href="/settings/profile"]');
        await page.click('a[href="/settings/profile"]');
        await page.waitFor('input[type="file"]');
        const input: ElementHandle = (await page.$$('input[type="file"]'))[1];
        await input.uploadFile(this.account.avatar);
        await page.waitForXPath('//span[text()="適用"]');
        await (await page.$x('//span[text()="適用"]'))[0].click();
        await page.waitFor('[data-testid="Profile_Save_Button"]');
        await page.click('[data-testid="Profile_Save_Button"]');
        await page.waitForNavigation();
        await browser.close();
        return {status: 200}
    }
}

export {TwitterService}