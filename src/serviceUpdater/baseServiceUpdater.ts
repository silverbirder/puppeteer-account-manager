'use strict';

import {IServiceResponse, IServiceUpdater} from "#/serviceUpdater/iServiceUpdater";
import {IAccount} from "#/serviceUpdater/iAccount";
import {IAuth} from "#/auth/iAuth";
import {ILogger} from "#/util/ILogger";
import {Browser, launch, Page} from "puppeteer";

abstract class BaseServiceUpdater implements IServiceUpdater {
    account: IAccount;
    auth: IAuth;
    logger: ILogger;
    _browser: Browser;

    constructor(account: IAccount, auth: IAuth, logger: ILogger) {
        this.account = account;
        this.auth = auth;
        this.logger = logger;
    }

    abstract async pageProcess(page: Page): Promise<void>

    async run(): Promise<IServiceResponse> {
        while (true) {
            const browser: Browser = await launch({
                timeout: 0,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            });
            this._browser = browser;
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
            this.auth.page = page;
            try {
                await this.pageProcess(page);
            } catch (e) {
                console.log(e);
            } finally {
                await browser.close();
            }
        }
        return {status: 200}
    }
}

export {BaseServiceUpdater}