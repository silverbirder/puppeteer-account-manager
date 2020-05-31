'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"

class QiitaUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        console.log(`🚀: page.goto(qiita/login)`);
        await page.goto('https://qiita.com/login');
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                await page.click('.btn-google-inverse');
                break;
        }
        await this.auth.dispatch();

        console.log(`🚀: page.goto(qiita/account)`);
        await page.goto('https://qiita.com/settings/account/custom_image');
        const filePath: string = this.account.avatar;
        const input: ElementHandle = await page.$('input[type="file"]');

        console.log(`🚀: update image ${filePath}`);
        await input.uploadFile(filePath);
        await page.waitForSelector('input[type="submit"]', {visible: true});

        console.log(`🚀: page.click submit`);
        await page.click('input[type="submit"]');
        await page.waitFor(1000);
    }
}

export {QiitaUpdater}