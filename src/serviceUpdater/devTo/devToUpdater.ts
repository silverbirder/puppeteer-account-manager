'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"

class DevToUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
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
    }
}

export {DevToUpdater}