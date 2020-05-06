'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {IAuth} from "#/auth/iAuth"
import * as puppeteer from "puppeteer"
import {Browser, ElementHandle, Page} from "puppeteer";

class QiitaService implements IService {
    account: IAccount;
    auth: IAuth;

    accountUpdate(): IServiceResponse {
        (async () => {
            const browser: Browser = await puppeteer.launch();
            const page: Page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
            await page.goto('https://qiita.com/login');
            await page.$eval('.btn-google-inverse', form => form.submit());
            const mailInput: string = 'input[type="email"]';
            await page.waitForSelector(mailInput, {visible: true});
            await page.type(mailInput, process.env.GOOGLE_MAIL);
            await page.click('#identifierNext');
            const passwordInput: string = 'input[type="password"]';
            await page.waitForSelector(passwordInput, {visible: true});
            await page.type(passwordInput, process.env.GOOGLE_PASS);
            await page.click('#passwordNext');
            await page.waitForNavigation();
            await page.goto('https://qiita.com/settings/account/custom_image');
            const filePath: string = "avater.JPG";
            const input: ElementHandle = await page.$('input[type=file]');
            await input.uploadFile(filePath);
            await page.waitForSelector('input[type="submit"]', {visible: true});
            await page.click('input[type="submit"]');
            await page.waitFor(1000);
            await browser.close();
        })();
        return {status: 200}
    }
}

export {QiitaService}