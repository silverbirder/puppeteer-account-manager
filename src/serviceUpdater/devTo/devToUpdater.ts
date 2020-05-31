'use strict';

import {IServiceUpdater, IServiceResponse} from "#/serviceUpdater/iServiceUpdater"
import {IAccount} from "#/serviceUpdater/iAccount"
import {AUTH_NAME, IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer"

class DevToUpdater implements IServiceUpdater {
    account: IAccount;
    auth: IAuth;

    async run(): Promise<IServiceResponse> {
        while (true) {
            const browser: Browser = await launch({
                timeout: 0,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            });
            try {
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
                await page.waitForNavigation();
                await page.goto('https://dev.to/settings');

                console.log(`🚀: page.goto(upload image)`);
                await page.waitFor('[type="file"]');
                const input: ElementHandle = await page.$('[type="file"]');
                await input.uploadFile(this.account.avatar);
                await page.waitFor('[type="submit"]');
                await page.click('[type="submit"]');
                break;
            } catch (e) {
                console.log(e);
            } finally {
                await browser.close();
            }
        }
        return {status: 200}
    }
}

export {DevToUpdater}