'use strict';

import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"

class FacebookUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        console.log(`🚀: page.goto(facebook/login)`);
        await page.goto('https://www.facebook.com');
        await this.auth.dispatch();

        console.log(`🚀: page.goto(profile)`);
        await page.waitForNavigation();
        await page.goto('https://www.facebook.com/me');

        console.log(`🚀: page.goto(edit profile image)`);
        await page.waitFor('[aria-label="プロフィール写真を変更"]', {visible: true});
        await page.click('[aria-label="プロフィール写真を変更"]');

        console.log(`🚀: page.goto(upload image)`);
        await page.waitFor('[aria-label="プロフィール写真を変更"] [type="file"]');
        const input: ElementHandle = await page.$('[aria-label="プロフィール写真を変更"] [type="file"]');
        await input.uploadFile(this.account.avatar);

        console.log(`🚀: page.goto(save image)`);
        await page.waitFor('[aria-label="保存"]');
        await page.click('[aria-label="保存"]');
    }
}

export {FacebookUpdater}