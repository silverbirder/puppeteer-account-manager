'use strict';

import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"

class TwitterUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        console.log(`🚀: page.goto(twitter/login)`);
        await page.goto('https://twitter.com/login');
        await this.auth.dispatch();

        console.log(`🚀: page.goto(profile page)`);
        await page.waitFor('a[aria-label="プロフィール"]');
        await page.click('a[aria-label="プロフィール"]');

        console.log(`🚀: page.goto(edit profile)`);
        await page.waitFor('a[href="/settings/profile"]');
        await page.click('a[href="/settings/profile"]');

        console.log(`🚀: page.goto(upload image)`);
        await page.waitFor('input[type="file"]');
        const input: ElementHandle = (await page.$$('input[type="file"]'))[1];
        await input.uploadFile(this.account.avatar);

        console.log(`🚀: page.goto(save image)`);
        await page.waitForXPath('//span[text()="適用"]');
        await (await page.$x('//span[text()="適用"]'))[0].click();
        await page.waitFor('[data-testid="Profile_Save_Button"]');
        await page.click('[data-testid="Profile_Save_Button"]');
        await page.waitForNavigation();
    }
}

export {TwitterUpdater}