'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger";

class QiitaUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://qiita.com/login');
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                await page.click('.btn-google-inverse');
                break;
        }
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.goto('https://qiita.com/settings/account/custom_image');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        const filePath: string = this.account.avatar;
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(filePath);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.waitForSelector('input[type="submit"]', {visible: true});
        await page.click('input[type="submit"]');
        await page.waitFor(1000);
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {QiitaUpdater}