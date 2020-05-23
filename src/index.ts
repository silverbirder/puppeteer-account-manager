import {IService} from "#/service/iService";
import {GoogleAuth} from "#/auth/googleAuth";
import {HatenaService} from "#/service/hatena/hatenaService";
import {downloadAvatar, IContentProfile, profileRequest} from "#/service/contentfulApi";
import * as path from "path";
import {HatenaAccount} from "#/service/hatena/hatenaAccount";
import {QiitaService} from "#/service/qiita/qiitaService";
import {QiitaAccount} from "#/service/qiita/qiitaAccount";
import {MediumService} from "#/service/medium/mediumService";
import {MediumAccount} from "#/service/medium/mediumAccount";
import {TwitterService} from "#/service/twitter/twitterService";
import {TwitterAccount} from "#/service/twitter/twitterAccount";
import {TwitterPageAuth} from "#/auth/page/twitterPageAuth";
import {GithubService} from "#/service/github/githubService";
import {GithubPageAuth} from "#/auth/page/githubPageAuth";
import {GithubAccount} from "#/service/github/githubAccount";

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

    const twitterService: IService = new TwitterService();
    twitterService.auth = new TwitterPageAuth({id: process.env.TWITTER_ID, password: process.env.TWITTER_PASSWORD});
    twitterService.account = new TwitterAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const githubService: IService = new GithubService();
    githubService.auth = new GithubPageAuth({id: process.env.GITHUB_ID, password: process.env.GITHUB_PASSWORD});
    githubService.account = new GithubAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const [...res] = await Promise.all([
        twitterService.accountUpdate(),
        hatenaService.accountUpdate(),
        qiitaService.accountUpdate(),
        mediumService.accountUpdate(),
        githubService.accountUpdate(),
    ]);
})();