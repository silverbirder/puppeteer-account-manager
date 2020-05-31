'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger"

class HatenaUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://www.hatena.ne.jp/login');
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                await page.waitFor('#google-signin2-button', {visible: true});
                const [newPage] = await Promise.all([
                    this._browser.waitForTarget(t => t.opener() === page.target()).then(t => t.page()),
                    page.click('#google-signin2-button')
                ]);
                this.auth.page = newPage;
                break;
        }
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.waitFor('#profile-image-profile');
        await page.click('#profile-image-profile');
        await page.waitFor('#edit-tab > a');
        await page.click('#edit-tab > a');
        await page.waitFor('#privacy-alert-ok');
        await page.click('#privacy-alert-ok');
        await page.waitFor('td > a');
        await page.click('td > a');
        const filePath: string = this.account.avatar;
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.waitFor('input[type="file"]');
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(filePath);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.click('input[type="submit"]');
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {HatenaUpdater}