'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger"
import {IPage} from "#/serviceUpdater/page/iPage"

class DevToUpdater extends BaseServiceUpdater {
    async pageProcess(page: IPage): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://dev.to/enter');
        switch (this.auth.name) {
            case AUTH_NAME.GITHUB:
                await page.xClick('//div[contains(@class, "link")]/a[contains(@href, "github")]', 0);
                break;
        }
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.goto('https://dev.to/settings');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.uploadFile(this.account.avatar, 'input[type="file"]', 0);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.click('[type="submit"]');
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {DevToUpdater}