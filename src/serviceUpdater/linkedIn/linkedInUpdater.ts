'use strict';

import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger";

class LinkedInUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://www.linkedin.com/login');
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.waitFor('[data-control-name="identity_profile_photo"]');
        await page.click('[data-control-name="identity_profile_photo"]');
        await page.waitFor('[data-control-name="edit_profile_photo"]');
        await page.click('[data-control-name="edit_profile_photo"]');
        await page.waitFor('[data-control-name="change_upload_photo"]');
        await page.click('[data-control-name="change_upload_photo"]');
        const filePath: string = this.account.avatar;
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.waitFor('input[type="file"]');
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(filePath);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.waitFor('[data-control-name="profile_photo_crop_save"]');
        await page.click('[data-control-name="profile_photo_crop_save"]');
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {LinkedInUpdater}