'use strict';

import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger";

class GithubUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://github.com/login');
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.goto('https://github.com/settings/profile');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(this.account.avatar);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.waitFor('button[type="submit"][value="save"]:not([disabled])', {visible: true});
        await page.click('button[type="submit"][value="save"]:not([disabled])');
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {GithubUpdater}