import {IService, IServiceResponse} from "#/service/iService";
import {GoogleAuth} from "#/auth/googleAuth";
import {Browser, launch} from "puppeteer";
import {HatenaService} from "#/service/qiita/hatenaService";
import {downloadAvatar, profileRequest} from "#/service/gravatar";
import * as path from "path";
import {HatenaAccount} from "#/service/qiita/hatenaAccount";

(async()=> {
    const profile = await profileRequest(process.env.GRAVATAR_EMAIL);
    const downloadAvatarPath = path.join(__dirname, `../dist/`, `${profile.user}.png`);
    await downloadAvatar(`${profile.thumbnailUrl}?s=250`, downloadAvatarPath);

    const browser: Browser = await launch({headless: false});

    // const qiitaService: IService = new QiitaService();
    // qiitaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    // qiitaService.account = new QiitaAccount({avatar: downloadAvatarPath, introduction: profile.intro});
    // qiitaService.browser = browser;
    // const response: IServiceResponse = await qiitaService.accountUpdate();

    const hatenaService: IService = new HatenaService();
    hatenaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    hatenaService.account = new HatenaAccount({avatar: downloadAvatarPath, introduction: profile.intro});
    hatenaService.browser = browser;
    const response: IServiceResponse = await hatenaService.accountUpdate();
    await browser.close();
})();