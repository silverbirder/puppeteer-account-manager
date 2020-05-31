'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger"
import {IPage} from "#/serviceUpdater/page/iPage"

class NoteUpdater extends BaseServiceUpdater {
    async pageProcess(page: IPage): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://note.com/login');
        switch (this.auth.name) {
            case AUTH_NAME.TWITTER:
                await page.click('.btn-twitter');
                break;
        }
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.click('.o-usermenuPopover');
        await page.click('.o-usermenuPopover__summary', {visible: true});
        await page.waitForNavigation();
        await page.click('.o-creatorProfile__actionItemButton');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.uploadFile(this.account.avatar, '.o-creatorProfile__contentInner [type="file"]', 0);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.xClick('//*[contains(@class,"m-modalFooterButtonGroup")]/button/*[contains(text(), "保存")]', 0, {visible: true});
        await page.waitForFunction(() => {
            return !document.querySelector('.m-modalFooterButtonGroup');
        });
        await page.xClick('//*[contains(@class,"o-creatorProfile__editButton")]/button/*[contains(text(), "保存")]', 0);
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {NoteUpdater}