'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger"
import {IPage} from "#/serviceUpdater/page/iPage"

class MediumUpdater extends BaseServiceUpdater {
    async pageProcess(page: IPage): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://medium.com');
        await page.xClick('//a[text() = "Sign in"]', 0);
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                await page.click('#susi-modal-google-button', {visible: true});
                break;
        }
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.click('button[data-action="open-userActions"]');
        await page.xClick('//a[text()="Profile"]', 0);
        await page.waitForNavigation();
        await page.xClick('//a[text()="Edit profile"]', 0);
        await page.waitForNavigation();
        await page.click('.hero-avatarPicker');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.uploadFile(this.account.avatar, 'input[type="file"]', 0);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.click('button[data-action="save-profile"]');
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {MediumUpdater}