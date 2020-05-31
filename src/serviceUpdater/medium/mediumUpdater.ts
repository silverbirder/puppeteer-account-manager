'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"
import {LOGGER_STATUS, PROCESS_STATUS} from "#/util/logger";

class MediumUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.START);
        await page.goto('https://medium.com');
        await (await page.$x('//a[text() = "Sign in"]'))[0].click();
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                await page.waitFor('#susi-modal-google-button', {visible:true});
                await page.click('#susi-modal-google-button');
                break;
        }
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.START);
        await this.auth.dispatch();
        this.logger.log(LOGGER_STATUS.AUTH, PROCESS_STATUS.END);
        await page.waitFor('button[data-action="open-userActions"]');
        await page.click('button[data-action="open-userActions"]');
        await page.waitForXPath('//a[text()="Profile"]');
        await (await page.$x('//a[text()="Profile"]'))[0].click();
        await page.waitForNavigation();
        await page.waitForXPath('//a[text()="Edit profile"]');
        await (await page.$x('//a[text()="Edit profile"]'))[0].click();
        await page.waitForNavigation();
        await page.waitFor('.hero-avatarPicker');
        await page.click('.hero-avatarPicker');
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.START);
        await page.waitFor('input[type="file"]');
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(this.account.avatar);
        this.logger.log(LOGGER_STATUS.UPLOAD, PROCESS_STATUS.END);
        await page.click('button[data-action="save-profile"]');
        this.logger.log(LOGGER_STATUS.PROCESS, PROCESS_STATUS.END);
    }
}

export {MediumUpdater}