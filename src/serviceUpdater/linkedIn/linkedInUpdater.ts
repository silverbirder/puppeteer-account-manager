'use strict';

import {IServiceUpdater, IServiceResponse} from "#/serviceUpdater/iServiceUpdater"
import {IAccount} from "#/serviceUpdater/iAccount"
import {IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer"

class LinkedInUpdater implements IServiceUpdater {
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

                console.log(`🚀: page.goto(linkedIn/login)`);
                await page.goto('https://www.linkedin.com/login');
                await this.auth.dispatch();

                console.log(`🚀: page.goto(profile)`);
                await page.waitFor('[data-control-name="identity_profile_photo"]');
                await page.click('[data-control-name="identity_profile_photo"]');

                console.log(`🚀: page.goto(edit profile image)`);
                await page.waitFor('[data-control-name="edit_profile_photo"]');
                await page.click('[data-control-name="edit_profile_photo"]');
                await page.waitFor('[data-control-name="change_upload_photo"]');
                await page.click('[data-control-name="change_upload_photo"]');

                const filePath: string = this.account.avatar;
                console.log(`🚀: update image ${filePath}`);
                await page.waitFor('input[type="file"]');
                const input: ElementHandle = await page.$('input[type="file"]');
                await input.uploadFile(filePath);

                console.log(`🚀: page.goto(save profile image)`);
                await page.waitFor('[data-control-name="profile_photo_crop_save"]');
                await page.click('[data-control-name="profile_photo_crop_save"]');
                await page.waitForNavigation();
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

export {LinkedInUpdater}