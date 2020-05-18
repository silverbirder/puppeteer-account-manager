import {IService, IServiceResponse} from "#/service/iService";
import {GoogleAuth} from "#/auth/googleAuth";
import {Browser, launch} from "puppeteer";
import {HatenaService} from "#/service/hatena/hatenaService";
import {downloadAvatar, IContentProfile, profileRequest} from "#/service/contentfulApi";
import * as path from "path";
import {HatenaAccount} from "#/service/hatena/hatenaAccount";
import {QiitaService} from "#/service/qiita/qiitaService";
import {QiitaAccount} from "#/service/qiita/qiitaAccount";

(async()=> {
    const profile: IContentProfile = await profileRequest(process.env.CONTENTFUL_SPACE, process.env.CONTENTFUL_ACCESSTOKEN);
    const downloadAvatarPath = path.join(__dirname, `../dist/`, `${profile.firstName}.png`);
    await Promise.all([
        downloadAvatar(`${profile.avatar}`, downloadAvatarPath),
    ]);

    const browser: Browser = await launch({headless: false, slowMo: 50});

    const hatenaService: IService = new HatenaService();
    hatenaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    hatenaService.account = new HatenaAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});
    hatenaService.browser = browser;

    const _2: IServiceResponse = await hatenaService.accountUpdate();
    await browser.close();

    const qiitaService: IService = new QiitaService();
    qiitaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    qiitaService.account = new QiitaAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});
    qiitaService.browser = browser;

    const _1: IServiceResponse = await qiitaService.accountUpdate();
})();