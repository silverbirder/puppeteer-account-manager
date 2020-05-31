'use strict';

import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger"
import {IPage} from "#/serviceUpdater/page/iPage"

class LinkedInUpdater extends BaseServiceUpdater {
    async pageProcess(page: IPage): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://www.linkedin.com/login');
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.click('[data-control-name="identity_profile_photo"]');
        await page.click('[data-control-name="edit_profile_photo"]');
        await page.click('[data-control-name="change_upload_photo"]');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.uploadFile(this.account.avatar, 'input[type="file"]', 0);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.click('[data-control-name="profile_photo_crop_save"]');
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {LinkedInUpdater}