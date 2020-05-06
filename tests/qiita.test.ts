import {QiitaService} from "#/service/qiita/qiitaService"
import {IService, IServiceResponse} from "#/service/iService"
import {QiitaAccount} from "#/service/qiita/qiitaAccount"
import {GoogleAuth} from "#/auth/googleAuth"
import {Browser, Page} from "puppeteer";
import * as puppeteer from "puppeteer";

describe('Class: QiitaService', () => {
    test('Assert: accountUpdate response status is 200', async () => {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();
        await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');

        const qiitaService: IService = new QiitaService();
        qiitaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
        qiitaService.account = new QiitaAccount({avatar: process.env.AVATAR, introduction: process.env.INTRO});
        qiitaService.page = page;
        const response: IServiceResponse = await qiitaService.accountUpdate();
        await browser.close();
        expect(response.status).toBe(200)
    })
});