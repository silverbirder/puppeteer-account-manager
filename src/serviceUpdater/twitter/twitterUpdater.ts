'use strict';

import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger"

class TwitterUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://twitter.com/login');
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.waitFor('a[aria-label="プロフィール"]');
        await page.click('a[aria-label="プロフィール"]');
        await page.waitFor('a[href="/settings/profile"]');
        await page.click('a[href="/settings/profile"]');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.waitFor('input[type="file"]');
        const input: ElementHandle = (await page.$$('input[type="file"]'))[1];
        await input.uploadFile(this.account.avatar);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.waitForXPath('//span[text()="適用"]');
        await (await page.$x('//span[text()="適用"]'))[0].click();
        await page.waitFor('[data-testid="Profile_Save_Button"]');
        await page.click('[data-testid="Profile_Save_Button"]');
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {TwitterUpdater}