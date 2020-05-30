'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {AUTH_NAME, IAuth} from "#/auth/iAuth"
import {Browser, ElementHandle, launch} from "puppeteer";

class QiitaService implements IService {
    account: IAccount;
    auth: IAuth;

    async accountUpdate(): Promise<IServiceResponse> {
        while (true) {
            const browser: Browser = await launch({
                timeout: 0,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            });
            try {
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
                this.auth.page = page;

                console.log(`🚀: page.goto(qiita/login)`);
                await page.goto('https://qiita.com/login');
                switch (this.auth.name) {
                    case AUTH_NAME.GOOGLE:
                        await page.click('.btn-google-inverse');
                        break;
                }
                await this.auth.dispatch();

                console.log(`🚀: page.goto(qiita/account)`);
                await page.goto('https://qiita.com/settings/account/custom_image');
                const filePath: string = this.account.avatar;
                const input: ElementHandle = await page.$('input[type="file"]');

                console.log(`🚀: update image ${filePath}`);
                await input.uploadFile(filePath);
                await page.waitForSelector('input[type="submit"]', {visible: true});

                console.log(`🚀: page.click submit`);
                await page.click('input[type="submit"]');
                await page.waitFor(1000);

                break;
            } catch (e) {
                console.log(e);
            } finally {
                await browser.close();
            }
        }
        return {status: 200}
    }
}

export {QiitaService}