'use strict';

import {IServiceUpdater, IServiceResponse} from "#/serviceUpdater/iServiceUpdater"
import {IAccount} from "#/serviceUpdater/iAccount"
import {IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer"

class GithubUpdater implements IServiceUpdater {
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

                console.log(`🚀: page.goto(github/login)`);
                await page.goto('https://github.com/login');
                await this.auth.dispatch();

                await page.goto('https://github.com/settings/profile');
                const input: ElementHandle = await page.$('input[type="file"]');
                await input.uploadFile(this.account.avatar);
                await page.waitFor('button[type="submit"][value="save"]:not([disabled])', {visible: true});
                await page.click('button[type="submit"][value="save"]:not([disabled])');
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

export {GithubUpdater}