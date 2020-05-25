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

        console.log(`🚀: page.goto(profile)`);
        await page.waitFor('#navigation-butt');
        await page.click('#navigation-butt');
        await page.waitFor('#user-profile-link-placeholder', {visible: true});
        await page.click('#user-profile-link-placeholder');

        console.log(`🚀: page.goto(edit profile)`);
        await page.waitFor('#user-follow-butt', {visible: true});
        await page.click('#user-follow-butt');

        console.log(`🚀: page.goto(upload image)`);
        await page.waitFor('[type="file"]');
        const input: ElementHandle = await page.$('[type="file"]');
        await input.uploadFile(this.account.avatar);
        await page.keyboard.press('Enter');
        await page.waitForNavigation();

        await browser.close();
        return {status: 200}
    }
}

export {DevToService}