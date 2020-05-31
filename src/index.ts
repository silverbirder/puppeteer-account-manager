'use strict';

import {IServiceUpdater} from "#/serviceUpdater/iServiceUpdater";
import {GoogleAuth} from "#/auth/vendor/googleAuth";
import {HatenaUpdater} from "#/serviceUpdater/hatena/hatenaUpdater";
import {downloadAvatar, IContentProfile, profileRequest} from "#/avatarManager/contentfulManager";
import * as path from "path";
import {HatenaAccount} from "#/serviceUpdater/hatena/hatenaAccount";
import {QiitaUpdater} from "#/serviceUpdater/qiita/qiitaUpdater";
import {QiitaAccount} from "#/serviceUpdater/qiita/qiitaAccount";
import {MediumUpdater} from "#/serviceUpdater/medium/mediumUpdater";
import {MediumAccount} from "#/serviceUpdater/medium/mediumAccount";
import {TwitterUpdater} from "#/serviceUpdater/twitter/twitterUpdater";
import {TwitterAccount} from "#/serviceUpdater/twitter/twitterAccount";
import {TwitterPageAuth} from "#/auth/page/twitterPageAuth";
import {GithubUpdater} from "#/serviceUpdater/github/githubUpdater";
import {GithubAuth} from "#/auth/vendor/githubAuth";
import {GithubAccount} from "#/serviceUpdater/github/githubAccount";
import {GoogleUpdater} from "#/serviceUpdater/google/googleUpdater";
import {GoogleAccount} from "#/serviceUpdater/google/googleAccount";
import {FacebookUpdater} from "#/serviceUpdater/facebook/facebookUpdater";
import {FacebookPageAuth} from "#/auth/page/facebookPageAuth";
import {FacebookAccount} from "#/serviceUpdater/facebook/facebookAccount";
import {NoteUpdater} from "#/serviceUpdater/note/noteUpdater";
import {TwitterAuth} from "#/auth/vendor/twitterAuth";
import {NoteAccount} from "#/serviceUpdater/note/noteAccount";
import {DevToUpdater} from "#/serviceUpdater/devTo/devToUpdater";
import {DevToAccount} from "#/serviceUpdater/devTo/devToAccount";
import {LinkedInUpdater} from "#/serviceUpdater/linkedIn/linkedInUpdater";
import {LinkedInPageAuth} from "#/auth/page/linkedInPageAuth";
import {LinkedInAccount} from "#/serviceUpdater/linkedIn/linkedInAccount";

(async()=> {
    const profile: IContentProfile = await profileRequest(process.env.CONTENTFUL_SPACE, process.env.CONTENTFUL_ACCESSTOKEN);
    const downloadAvatarPath = path.join(__dirname, `../dist/`, `${path.basename(profile.avatar)}`);
    await Promise.all([
        downloadAvatar(`${profile.avatar}`, downloadAvatarPath),
    ]);

    const hatenaUpdater: IServiceUpdater = new HatenaUpdater();
    hatenaUpdater.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    hatenaUpdater.account = new HatenaAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const qiitaUpdater: IServiceUpdater = new QiitaUpdater();
    qiitaUpdater.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    qiitaUpdater.account = new QiitaAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const mediumUpdater: IServiceUpdater = new MediumUpdater();
    mediumUpdater.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    mediumUpdater.account = new MediumAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const twitterUpdater: IServiceUpdater = new TwitterUpdater();
    twitterUpdater.auth = new TwitterPageAuth({id: process.env.TWITTER_ID, password: process.env.TWITTER_PASSWORD});
    twitterUpdater.account = new TwitterAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const githubUpdater: IServiceUpdater = new GithubUpdater();
    githubUpdater.auth = new GithubAuth({id: process.env.GITHUB_ID, password: process.env.GITHUB_PASSWORD});
    githubUpdater.account = new GithubAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const googleUpdater: IServiceUpdater = new GoogleUpdater();
    googleUpdater.auth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    googleUpdater.account = new GoogleAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const facebookUpdater: IServiceUpdater = new FacebookUpdater();
    facebookUpdater.auth = new FacebookPageAuth({id: process.env.FACEBOOK_ID, password: process.env.FACEBOOK_PASSWORD});
    facebookUpdater.account = new FacebookAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const noteUpdater: IServiceUpdater = new NoteUpdater();
    noteUpdater.auth = new TwitterAuth({id: process.env.TWITTER_ID, password: process.env.TWITTER_PASSWORD});
    noteUpdater.account = new NoteAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const devToUpdater: IServiceUpdater = new DevToUpdater();
    devToUpdater.auth = new GithubAuth({id: process.env.GITHUB_ID, password: process.env.GITHUB_PASSWORD});
    devToUpdater.account = new DevToAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const linkedInUpdater: IServiceUpdater = new LinkedInUpdater();
    linkedInUpdater.auth = new LinkedInPageAuth({id: process.env.LINKEDIN_ID, password: process.env.LINKEDIN_PASSWORD});
    linkedInUpdater.account = new LinkedInAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe});

    const [...res] = await Promise.all([
        twitterUpdater.run(),
        hatenaUpdater.run(),
        qiitaUpdater.run(),
        mediumUpdater.run(),
        githubUpdater.run(),
        googleUpdater.run(),
        // facebookUpdater.run(),
        noteUpdater.run(),
        devToUpdater.run(),
        linkedInUpdater.run(),
    ]);
})();
