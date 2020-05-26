'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {AUTH_NAME, IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer";

class DevToService implements IService {
    account: IAccount;
    auth: IAuth;

    async accountUpdate(): Promise<IServiceResponse> {
        const browser: Browser = await launch({headless: false, args: ['--incognito']});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
        this.auth.page = page;

        console.log(`🚀: page.goto(dev.to/login)`);
        await page.goto('https://dev.to/enter');
        switch (this.auth.name) {
            case AUTH_NAME.GITHUB:
                await page.waitForXPath('//div[contains(@class, "link")]/a[contains(@href, "github")]');
                await (await page.$x('//div[contains(@class, "link")]/a[contains(@href, "github")]'))[0].click();
                break;
        }
        await this.auth.dispatch();

        console.log(`🚀: page.goto(profile setting)`);
        await page.goto('https://dev.to/settings');

        console.log(`🚀: page.goto(upload image)`);
        await page.waitFor('[type="file"]');
        const input: ElementHandle = await page.$('[type="file"]');
        await input.uploadFile(this.account.avatar);
        await page.waitFor('[type="submit"]');
        await page.click('[type="submit"]');

        await browser.close();
        return {status: 200}
    }
}

export {DevToService}