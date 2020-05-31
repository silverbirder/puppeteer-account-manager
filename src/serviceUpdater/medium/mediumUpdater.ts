'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"

class MediumUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        console.log(`🚀: page.goto(meidum/top)`);
        await page.goto('https://medium.com');

        await (await page.$x('//a[text() = "Sign in"]'))[0].click();
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                await page.waitFor('#susi-modal-google-button', {visible:true});
                await page.click('#susi-modal-google-button');
                break;
        }
        await this.auth.dispatch();

        console.log(`🚀: page.goto(Profile)`);
        await page.waitFor('button[data-action="open-userActions"]');
        await page.click('button[data-action="open-userActions"]');
        await page.waitForXPath('//a[text()="Profile"]');
        await (await page.$x('//a[text()="Profile"]'))[0].click();

        console.log(`🚀: page.goto(EditProfile)`);
        await page.waitForNavigation();
        await page.waitForXPath('//a[text()="Edit profile"]');
        await (await page.$x('//a[text()="Edit profile"]'))[0].click();

        console.log(`🚀: page.goto(Upload image)`);
        await page.waitForNavigation();
        await page.waitFor('.hero-avatarPicker');
        await page.click('.hero-avatarPicker');
        await page.waitFor('input[type="file"]');
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(this.account.avatar);

        await page.click('button[data-action="save-profile"]');
    }
}

export {MediumUpdater}