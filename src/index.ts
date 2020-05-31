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
import {Logger} from "#/util/logger";

(async()=> {
    const profile: IContentProfile = await profileRequest(process.env.CONTENTFUL_SPACE, process.env.CONTENTFUL_ACCESSTOKEN);
    const downloadAvatarPath: string = path.join(__dirname, `../dist/`, `${path.basename(profile.avatar)}`);
    await Promise.all([
        downloadAvatar(`${profile.avatar}`, downloadAvatarPath),
    ]);

    const googleAuth = new GoogleAuth({id: process.env.GOOGLE_ID, password: process.env.GOOGLE_PASSWORD});
    const githubAuth = new GithubAuth({id: process.env.GITHUB_ID, password: process.env.GITHUB_PASSWORD});
    const twitterAuth = new TwitterAuth({id: process.env.TWITTER_ID, password: process.env.TWITTER_PASSWORD});
    const twitterPageAuth = new TwitterPageAuth({id: process.env.TWITTER_ID, password: process.env.TWITTER_PASSWORD});
    const facebookPageAuth = new FacebookPageAuth({id: process.env.FACEBOOK_ID, password: process.env.FACEBOOK_PASSWORD});
    const linkedInPageAuth = new LinkedInPageAuth({id: process.env.LINKEDIN_ID, password: process.env.LINKEDIN_PASSWORD});

    const hatenaUpdater: IServiceUpdater = new HatenaUpdater(
        new HatenaAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        googleAuth,
        new Logger('hatena')
    );
    const qiitaUpdater: IServiceUpdater = new QiitaUpdater(
        new QiitaAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        googleAuth,
        new Logger('qiita')
    );
    const mediumUpdater: IServiceUpdater = new MediumUpdater(
        new MediumAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        googleAuth,
        new Logger('medium')
    );
    const twitterUpdater: IServiceUpdater = new TwitterUpdater(
        new TwitterAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        twitterPageAuth,
        new Logger('twitter')
    );
    const githubUpdater: IServiceUpdater = new GithubUpdater(
        new GithubAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        githubAuth,
        new Logger('github')
    );
    const googleUpdater: IServiceUpdater = new GoogleUpdater(
        new GoogleAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        googleAuth,
        new Logger('google')
    );
    const facebookUpdater: IServiceUpdater = new FacebookUpdater(
        new FacebookAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        facebookPageAuth,
        new Logger('facebook')
    );
    const noteUpdater: IServiceUpdater = new NoteUpdater(
        new NoteAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        twitterAuth,
        new Logger('note')
    );
    const devToUpdater: IServiceUpdater = new DevToUpdater(
        new DevToAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        githubAuth,
        new Logger('devTo')
    );
    const linkedInUpdater: IServiceUpdater = new LinkedInUpdater(
        new LinkedInAccount({avatar: downloadAvatarPath, introduction: profile.aboutMe}),
        linkedInPageAuth,
        new Logger('linkedIn')
    );

    const [...res] = await Promise.all([
        twitterUpdater.run(),
        hatenaUpdater.run(),
        // qiitaUpdater.run(),
        // mediumUpdater.run(),
        // githubUpdater.run(),
        // googleUpdater.run(),
        // facebookUpdater.run(),
        // noteUpdater.run(),
        // devToUpdater.run(),
        // linkedInUpdater.run(),
    ]);
})();
