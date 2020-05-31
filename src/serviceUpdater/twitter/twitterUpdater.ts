'use strict';

import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger"
import {IPage} from "#/serviceUpdater/page/iPage"

class TwitterUpdater extends BaseServiceUpdater {
    async pageProcess(page: IPage): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://twitter.com/login');
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.goto('https://twitter.com/settings/profile');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.uploadFile(this.account.avatar, 'input[type="file"]', 1);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.xClick('//span[text()="適用"]', 0);
        await page.click('[data-testid="Profile_Save_Button"]');
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {TwitterUpdater}