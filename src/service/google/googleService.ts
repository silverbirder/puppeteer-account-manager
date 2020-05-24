'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, Frame, launch} from "puppeteer";

class GoogleService implements IService {
    account: IAccount;
    auth: IAuth;

    async accountUpdate(): Promise<IServiceResponse> {
        const browser: Browser = await launch({headless: false, args: ['--incognito']});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
        this.auth.page = page;

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
        await browser.close();
        return {status: 200}
    }
}

export {GoogleService}