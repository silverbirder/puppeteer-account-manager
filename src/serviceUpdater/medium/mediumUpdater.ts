'use strict';

import {IServiceUpdater, IServiceResponse} from "#/serviceUpdater/iServiceUpdater"
import {IAccount} from "#/serviceUpdater/iAccount"
import {AUTH_NAME, IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer"

class MediumUpdater implements IServiceUpdater {
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

                console.log(`🚀: page.goto(meidum/top)`);
                await page.goto('https://medium.com');

                await (await page.$x('//a[text() = "Sign in"]'))[0].click();
                switch (this.auth.name) {
                    case AUTH_NAME.GOOGLE:
                        await page.waitFor('#susi-modal-google-button', {visible:true});
                        await page.click('#susi-modal-google-button');
                        break;
                }
                this.auth.page = page;
                await this.auth.dispatch();

                console.log(`🚀: page.goto(Profile)`);
                await page.waitFor('button[data-action="open-userActions"]');
                await page.click('button[data-action="open-userActions"]');
                await page.waitForXPath('//a[text()="Profile"]');
                await (await page.$x('//a[text()="Profile"]'))[0].click();

                console.log(`🚀: page.goto(EditProfile)`);
                await page.waitForNavigation();
                await page.waitForXPath('//a[text()="Edit profile"]');
                await (await page.$x('//a[text()="Edit profile"]'))[0].click();

                console.log(`🚀: page.goto(Upload image)`);
                await page.waitForNavigation();
                await page.waitFor('.hero-avatarPicker');
                await page.click('.hero-avatarPicker');
                await page.waitFor('input[type="file"]');
                const input: ElementHandle = await page.$('input[type="file"]');
                await input.uploadFile(this.account.avatar);

                await page.click('button[data-action="save-profile"]');
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

export {MediumUpdater}