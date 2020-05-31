'use strict';

import {ElementHandle, Frame, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger";

class GoogleUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://myaccount.google.com/intro/personal-info');
        await page.waitFor('a[aria-label="Sign in"]');
        await page.click('a[aria-label="Sign in"]');
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.waitFor('[aria-label="プロフィール画像を変更する"]');
        await page.click('[aria-label="プロフィール画像を変更する"]');
        const frames: Frame[] = await page.frames();
        const frame: Frame = frames[frames.length - 1];
        const filePath: string = this.account.avatar;
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await frame.waitFor('input[type="file"]');
        const input: ElementHandle = await frame.$('input[type="file"]');
        await input.uploadFile(filePath);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await frame.waitFor('[aria-label="フォルダ「写真をアップロード」に切り替える"]');
        await (await frame.$x('//div[text()="プロフィール写真に設定"]'))[1].click();
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {GoogleUpdater}