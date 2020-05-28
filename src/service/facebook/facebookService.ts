'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer";

class FacebookService implements IService {
    account: IAccount;
    auth: IAuth;

    async accountUpdate(): Promise<IServiceResponse> {
        const browser: Browser = await launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
        this.auth.page = page;

        console.log(`🚀: page.goto(facebook/login)`);
        await page.goto('https://www.facebook.com');
        await this.auth.dispatch();

        console.log(`🚀: page.goto(profile)`);
        await page.waitFor('[data-click="profile_icon"]');
        await page.click('[data-click="profile_icon"]');

        console.log(`🚀: page.goto(edit profile)`);
        await page.waitFor('#pagelet_timeline_profile_actions > a');
        await page.click('#pagelet_timeline_profile_actions > a');

        console.log(`🚀: page.goto(edit profile image)`);
        await page.waitFor('[aria-label="プロフィール写真を変更"]', {visible: true});
        await page.click('[aria-label="プロフィール写真を変更"]');

        console.log(`🚀: page.goto(upload image)`);
        await page.waitFor('[aria-label="写真をアップロード"] > div > [type="file"]');
        const input: ElementHandle = await page.$('[aria-label="写真をアップロード"] > div > [type="file"]');
        await input.uploadFile(this.account.avatar);

        console.log(`🚀: page.goto(save image)`);
        await page.waitForXPath('//*[contains(@class,"uiOverlayFooter")]//button[text()="保存"]');
        await (await page.$x('//*[contains(@class,"uiOverlayFooter")]//button[text()="保存"]'))[0].click();

        await browser.close();
        return {status: 200}
    }
}

export {FacebookService}