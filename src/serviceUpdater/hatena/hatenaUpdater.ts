'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger"
import {IPage} from "#/serviceUpdater/page/iPage"
import {PageImpl} from "#/serviceUpdater/page/pageImpl";

class HatenaUpdater extends BaseServiceUpdater {
    async pageProcess(page: IPage): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://www.hatena.ne.jp/login');
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                const [newPage] = await Promise.all([
                    this._browser.waitForTarget(t => t.opener() === page.target()).then(t => t.page()),
                    page.click('#google-signin2-button', {visible: true})
                ]);
                this.auth.page = new PageImpl(newPage);
                break;
        }
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.click('#profile-image-profile');
        await page.click('#edit-tab > a');
        await page.click('#privacy-alert-ok');
        await page.click('td > a');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.uploadFile(this.account.avatar, 'input[type="file"]', 0);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.click('input[type="submit"]');
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {HatenaUpdater}