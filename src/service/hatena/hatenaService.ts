'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {AUTH_NAME, IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle} from "puppeteer";

class HatenaService implements IService {
    account: IAccount;
    auth: IAuth;
    browser: Browser;

    async accountUpdate(): Promise<IServiceResponse> {
        const page = await this.browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');

        console.log(`🚀: page.goto(hatena/login)`);
        await page.goto('https://www.hatena.ne.jp/login');
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                await page.waitFor('#google-signin2-button', {visible: true});
                const [newPage] = await Promise.all([
                    this.browser.waitForTarget(t => t.opener() === page.target()).then(t => t.page()),
                    page.click('#google-signin2-button')
                ]);
                this.auth.page = newPage;
                break;
        }

        // Wait is login ?
        [...Array(6)].map(async () => {
            await this.auth.page.waitFor(500);
            if (this.auth.page.isClosed()) {
                console.log(`🚀: already login.`);
                delete this.auth.page;
                return;
            }
        });

        if (this.auth.page) {
            await this.auth.dispatch();
        }

        console.log(`🚀: page.goto(profile)`);
        await page.waitFor('#profile-image-profile', {visible: true});
        await page.click('#profile-image-profile');

        console.log(`🚀: page.goto(edit tab)`);
        await page.waitFor('#edit-tab > a', {visible: true});
        await page.click('#edit-tab > a');

        console.log(`🚀: page.click(notice dialog)`);
        await page.waitFor('#privacy-alert-ok', {visible: true});
        await page.click('#privacy-alert-ok');

        console.log(`🚀: page.click(change image link)`);
        await page.waitFor('td > a', {visible: true});
        await page.click('td > a');

        const filePath: string = this.account.avatar;
        console.log(`🚀: update image ${filePath}`);
        await page.waitFor('input[type="file"]', {visible: true});
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(filePath);

        if (await page.$('#delete-profile-image') !== null) {
            console.log(`🚀: page.click(delete image)`);
            await page.click('#delete-profile-image');
        }

        console.log(`🚀: page.click submit`);
        await page.waitForSelector('input[type="submit"]', {visible: true});
        await page.click('input[type="submit"]');
        await page.waitFor(1000);

        return {status: 200}
    }
}

export {HatenaService}