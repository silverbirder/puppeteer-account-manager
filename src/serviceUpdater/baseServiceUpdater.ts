'use strict';

import {IServiceResponse, IServiceUpdater} from "#/serviceUpdater/iServiceUpdater"
import {IAccount} from "#/serviceUpdater/iAccount"
import {IAuth} from "#/auth/iAuth"
import {ILogger} from "#/util/ILogger"
import {Browser, launch, Page} from "puppeteer"
import {IPage} from "#/serviceUpdater/page/iPage"
import {PageImpl} from "#/serviceUpdater/page/pageImpl"

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

    abstract async pageProcess(page: IPage): Promise<void>

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
            const page: Page = await browser.newPage();
            const wPage: IPage = new PageImpl(page);
            await wPage.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
            this.auth.page = wPage;
            try {
                await this.pageProcess(wPage);
                break;
            } catch (e) {
                await wPage.screenshot(this.logger.name);
                this.logger.error(e);
            } finally {
                await browser.close();
            }
        }
        return {status: 200}
    }
}

export {BaseServiceUpdater}