import {IService, IServiceResponse} from "#/service/iService";
import {QiitaAccount} from "#/service/qiita/qiitaAccount";
import {GoogleAuth} from "#/auth/googleAuth";
import {QiitaService} from "#/service/qiita/qiitaService";
import {Browser, Page} from "puppeteer";
import {launch} from "puppeteer";
import * as path from "path";
import {downloadAvatar, profileRequest} from "#/service/gravatar";

(async()=> {
    const profile = await profileRequest(process.env.GRAVATAR_EMAIL);
    const downloadAvatarPath = path.join(__dirname, `../dist/`, `${profile.user}.png`);
    await downloadAvatar(`${profile.thumbnailUrl}?s=250`, downloadAvatarPath);

    const browser: Browser = await launch();
    const page: Page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
    const qiitaService: IService = new QiitaService();
    qiitaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    qiitaService.account = new QiitaAccount({avatar: downloadAvatarPath, introduction: profile.intro});
    qiitaService.page = page;
    const response: IServiceResponse = await qiitaService.accountUpdate();
    await browser.close();
})();