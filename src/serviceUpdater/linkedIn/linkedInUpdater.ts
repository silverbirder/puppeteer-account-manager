'use strict';

import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"

class LinkedInUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        console.log(`🚀: page.goto(linkedIn/login)`);
        await page.goto('https://www.linkedin.com/login');
        await this.auth.dispatch();

        console.log(`🚀: page.goto(profile)`);
        await page.waitFor('[data-control-name="identity_profile_photo"]');
        await page.click('[data-control-name="identity_profile_photo"]');

        console.log(`🚀: page.goto(edit profile image)`);
        await page.waitFor('[data-control-name="edit_profile_photo"]');
        await page.click('[data-control-name="edit_profile_photo"]');
        await page.waitFor('[data-control-name="change_upload_photo"]');
        await page.click('[data-control-name="change_upload_photo"]');

        const filePath: string = this.account.avatar;
        console.log(`🚀: update image ${filePath}`);
        await page.waitFor('input[type="file"]');
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(filePath);

        console.log(`🚀: page.goto(save profile image)`);
        await page.waitFor('[data-control-name="profile_photo_crop_save"]');
        await page.click('[data-control-name="profile_photo_crop_save"]');
        await page.waitForNavigation();
    }
}

export {LinkedInUpdater}