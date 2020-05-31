'use strict';

import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger";

class FacebookUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://www.facebook.com');
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.waitForNavigation();
        await page.goto('https://www.facebook.com/me');
        await page.waitFor('[aria-label="プロフィール写真を変更"]', {visible: true});
        await page.click('[aria-label="プロフィール写真を変更"]');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.waitFor('[aria-label="プロフィール写真を変更"] [type="file"]');
        const input: ElementHandle = await page.$('[aria-label="プロフィール写真を変更"] [type="file"]');
        await input.uploadFile(this.account.avatar);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.waitFor('[aria-label="保存"]');
        await page.click('[aria-label="保存"]');
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {FacebookUpdater}