import * as crypto from "crypto";
import fetch from 'node-fetch';
import * as fs from "fs";
import * as util from "util";
import {pipeline} from 'stream';

interface IProfile {
    name: {
        firstName: string,
        familyName: string,
    },
    intro: string,
    location: string,
    user: string,
    thumbnailUrl: string,
    urls: [{value: string, title: string}],
    photos: {
        value: string,
        type: string,
    },
}

const streamPipeline = util.promisify(pipeline);

const md5hex = str => crypto.createHash('md5').update(str).digest('hex');

const profileRequest = async (email: string): Promise<IProfile> => {
    const pUrl: string = await fetch(`https://www.gravatar.com/${md5hex(email)}`).then((r) => r.url);
    const profile: any = await (await fetch(`${pUrl}.json`)).json();
    const entry: any = profile.entry[0];
    return {
        name: {
            firstName: entry.name.givenName,
            familyName: entry.name.familyName,
        },
        intro: entry.aboutMe,
        location: entry.currentLocation,
        photos: entry.photos,
        thumbnailUrl: entry.thumbnailUrl,
        urls: entry.urls,
        user: entry.preferredUsername,
    }
};

const download = async (url, path) => {
    await fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(`unexpected response ${res.statusText}`);
        }
        return streamPipeline(res.body, fs.createWriteStream(path));
    });
};

export {profileRequest, download}