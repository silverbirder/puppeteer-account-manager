'use strict';

import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"

class GithubUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        console.log(`🚀: page.goto(github/login)`);
        await page.goto('https://github.com/login');
        await this.auth.dispatch();

        await page.goto('https://github.com/settings/profile');
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(this.account.avatar);
        await page.waitFor('button[type="submit"][value="save"]:not([disabled])', {visible: true});
        await page.click('button[type="submit"][value="save"]:not([disabled])');
    }
}

export {GithubUpdater}