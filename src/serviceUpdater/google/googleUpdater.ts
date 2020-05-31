'use strict';

import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger"
import {IPage} from "#/serviceUpdater/page/iPage"

class GoogleUpdater extends BaseServiceUpdater {
    async pageProcess(page: IPage): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://myaccount.google.com/intro/personal-info');
        await page.click('a[aria-label="Sign in"]');
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.click('[aria-label="プロフィール画像を変更する"]');
        const frames: IPage[] = await page.frames();
        const frame: IPage = frames[frames.length - 1];
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await frame.uploadFile(this.account.avatar, 'input[type="file"]', 0);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await frame.waitForFunction(() => {
            document.querySelector('[aria-label="フォルダ「写真をアップロード」に切り替える"]');
        });
        await page.xClick('//div[text()="プロフィール写真に設定"]', 1);
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {GoogleUpdater}