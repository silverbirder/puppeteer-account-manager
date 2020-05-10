'use strict';

import {IService, IServiceResponse} from "#/service/iService"
import {IAccount} from "#/service/iAccount"
import {AUTH_NAME, IAuth} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer";

class QiitaService implements IService {
    account: IAccount;
    auth: IAuth;
    page: Page;

    async accountUpdate(): Promise<IServiceResponse> {
        console.log(`🚀: page.goto(qiita/login)`);
        await this.page.goto('https://qiita.com/login');
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                await this.page.$eval('.btn-google-inverse', form => form.submit());
                break;
        }
        this.auth.page = this.page;
        await this.auth.dispatch();
        console.log(`🚀: page.goto(qiita/account)`);
        await this.page.goto('https://qiita.com/settings/account/custom_image');
        const filePath: string = this.account.avatar;
        const input: ElementHandle = await this.page.$('input[type=file]');
        console.log(`🚀: update image ${filePath}`);
        await input.uploadFile(filePath);
        await this.page.waitForSelector('input[type="submit"]', {visible: true});
        console.log(`🚀: page.click submit`);
        await this.page.click('input[type="submit"]');
        await this.page.waitFor(1000);
        return {status: 200}
    }
}

export {QiitaService}