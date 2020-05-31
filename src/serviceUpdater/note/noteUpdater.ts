'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger";

class NoteUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://note.com/login');
        switch (this.auth.name) {
            case AUTH_NAME.TWITTER:
                await page.waitFor('.btn-twitter');
                await page.click('.btn-twitter');
                break;
        }
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.waitFor('.o-usermenuPopover');
        await page.click('.o-usermenuPopover');
        await page.waitFor('.o-usermenuPopover__summary', {visible: true});
        await page.click('.o-usermenuPopover__summary');
        await page.waitForNavigation();
        await page.waitFor('.o-creatorProfile__actionItemButton');
        await page.click('.o-creatorProfile__actionItemButton');
        const filePath: string = this.account.avatar;
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.waitFor('.o-creatorProfile__contentInner [type="file"]');
        const input: ElementHandle = await page.$('.o-creatorProfile__contentInner [type="file"]');
        await input.uploadFile(filePath);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.waitForXPath('//*[contains(@class,"m-modalFooterButtonGroup")]/button/*[contains(text(), "保存")]', {visible: true});
        await (await page.$x('//*[contains(@class,"m-modalFooterButtonGroup")]/button/*[contains(text(), "保存")]'))[0].click();
        await page.waitForFunction(() => !document.querySelector('.m-modalFooterButtonGroup'));
        await page.waitForXPath('//*[contains(@class,"o-creatorProfile__editButton")]/button/*[contains(text(), "保存")]');
        await (await page.$x('//*[contains(@class,"o-creatorProfile__editButton")]/button/*[contains(text(), "保存")]'))[0].click();
        await page.waitForNavigation();
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {NoteUpdater}