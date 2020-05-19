import {IService, IServiceResponse} from "#/service/iService";
import {GoogleAuth} from "#/auth/googleAuth";
import {HatenaService} from "#/service/hatena/hatenaService";
import {downloadAvatar, IContentProfile, profileRequest} from "#/service/contentfulApi";
import * as path from "path";
import {HatenaAccount} from "#/service/hatena/hatenaAccount";
import {QiitaService} from "#/service/qiita/qiitaService";
import {QiitaAccount} from "#/service/qiita/qiitaAccount";
import {MediumService} from "#/service/medium/mediumService";
import {MediumAccount} from "#/service/medium/mediumAccount";

(async()=> {
    const profile: IContentProfile = await profileRequest(process.env.CONTENTFUL_SPACE, process.env.CONTENTFUL_ACCESSTOKEN);
    const downloadAvatarPath = path.join(__dirname, `../dist/`, `${path.basename(profile.avatar)}`);
    await Promise.all([
        downloadAvatar(`${profile.avatar}`, downloadAvatarPath),
    ]);

    const hatenaService: IService = new HatenaService();
    hatenaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    hatenaService.account = new HatenaAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const qiitaService: IService = new QiitaService();
    qiitaService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    qiitaService.account = new QiitaAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const mediumService: IService = new MediumService();
    mediumService.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    mediumService.account = new MediumAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const [res1, res2, res3] = await Promise.all([
        hatenaService.accountUpdate(),
        qiitaService.accountUpdate(),
        mediumService.accountUpdate()
    ]);
})();