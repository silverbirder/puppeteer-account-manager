import {IService, IServiceResponse} from "#/service/iService";
import {GoogleAuth} from "#/auth/googleAuth";
import {Browser, launch} from "puppeteer";
import {HatenaService} from "#/service/qiita/hatenaService";
import {downloadAvatar, profileRequest} from "#/service/gravatar";
import * as path from "path";
import {HatenaAccount} from "#/service/qiita/hatenaAccount";
import {QiitaService} from "#/service/qiita/qiitaService";
import {QiitaAccount} from "#/service/qiita/qiitaAccount";

(async()=> {
    const profile = await profileRequest(process.env.GRAVATAR_EMAIL);
    const downloadAvatarPath = path.join(__dirname, `../dist/`, `${profile.user}.png`);
    const downloadAvatarSize500Path = path.join(__dirname, `../dist/`, `${profile.user}_500.png`);
    await Promise.all([
        downloadAvatar(`${profile.thumbnailUrl}`, downloadAvatarPath),
        downloadAvatar(`${profile.thumbnailUrl}?s=500`, downloadAvatarSize500Path),
    ]);

    const browser: Browser = await launch({headless: false, slowMo: 50});

    const qiitaService: IService = new QiitaService();
    qiitaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    qiitaService.account = new QiitaAccount({avatar: downloadAvatarPath, introduction: profile.intro});
    qiitaService.browser = browser;

    const _1: IServiceResponse = await qiitaService.accountUpdate();

    const hatenaService: IService = new HatenaService();
    hatenaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    hatenaService.account = new HatenaAccount({avatar: downloadAvatarSize500Path, introduction: profile.intro});
    hatenaService.browser = browser;

    const _2: IServiceResponse = await hatenaService.accountUpdate();
    await browser.close();
})();