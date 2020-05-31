'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger";

class DevToUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://dev.to/enter');
        switch (this.auth.name) {
            case AUTH_NAME.GITHUB:
                await page.waitForXPath('//div[contains(@class, "link")]/a[contains(@href, "github")]');
                await (await page.$x('//div[contains(@class, "link")]/a[contains(@href, "github")]'))[0].click();
                break;
        }
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.goto('https://dev.to/settings');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.waitFor('[type="file"]');
        const input: ElementHandle = await page.$('[type="file"]');
        await input.uploadFile(this.account.avatar);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.waitFor('[type="submit"]');
        await page.click('[type="submit"]');
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {DevToUpdater}