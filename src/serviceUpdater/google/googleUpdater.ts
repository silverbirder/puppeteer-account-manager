'use strict';

import {ElementHandle, Frame, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"

class GoogleUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        console.log(`🚀: page.goto(google/mypage)`);
        await page.goto('https://myaccount.google.com/intro/personal-info');

        console.log(`🚀: page.goto(login)`);
        await page.waitFor('a[aria-label="Sign in"]');
        await page.click('a[aria-label="Sign in"]');

        await this.auth.dispatch();

        console.log(`🚀: page.goto(edit profile)`);
        await page.waitFor('[aria-label="プロフィール画像を変更する"]');
        await page.click('[aria-label="プロフィール画像を変更する"]');
        const frames: Frame[] = await page.frames();
        const frame: Frame = frames[frames.length - 1];

        const filePath: string = this.account.avatar;
        console.log(`🚀: update image ${filePath}`);
        await frame.waitFor('input[type="file"]');
        const input: ElementHandle = await frame.$('input[type="file"]');
        await input.uploadFile(filePath);
        await frame.waitFor('[aria-label="フォルダ「写真をアップロード」に切り替える"]');
        await (await frame.$x('//div[text()="プロフィール写真に設定"]'))[1].click();
        await page.waitForNavigation();
    }
}

export {GoogleUpdater}