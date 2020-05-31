'use strict';

import * as contentful from 'contentful'
import {Entry, EntryCollection} from 'contentful';
import * as fs from 'fs';
import * as util from 'util';
import {pipeline} from 'stream';
import fetch from 'node-fetch';

interface IContentProfile {
    type: string,
    firstName: string,
    lastName: string,
    avatar: string,
    aboutMe: string,
    address: string,
    url: Array<{ title: string, value: string }>
}

const newIContentProfile = (): IContentProfile => {
    return {
        aboutMe: '',
        address: '',
        avatar: '',
        firstName: '',
        lastName: '',
        type: '',
        url: []
    };
};

const streamPipeline = util.promisify(pipeline);

const profileRequest = async (space: string, accessToken: string): Promise<IContentProfile> => {
    const client = contentful.createClient({
        space: space,
        accessToken: accessToken,
    });
    const entryCollection: EntryCollection<IContentProfile> = await client.getEntries({
        content_type: 'profile',
        'fields.type': 'BASE',
    });
    if (entryCollection.total !== 1) {
        throw Error('Please prepare the only 1 data. ' +
            'content_type: profile\n' +
            'fields.type: BASE')
    }
    const entry: Entry<any> = entryCollection.items[0];
    let resultValue: IContentProfile = newIContentProfile();
    Object.entries(entry.fields).map((field, _) => {
        const key: string = field[0];
        const value: any = field[1];
        switch (key) {
            case 'avatar':
                resultValue.avatar = `https:${value.fields.file.url}`;
                break;
            case 'aboutMe':
                resultValue.aboutMe = value.content[0].content.map((content) => {
                    if (content.hasOwnProperty('value')) {
                        return content.value;
                    }
                    return content.content[0].value;
                }).join('');
                break;
            default:
                resultValue[key] = value;
        }
    });
    return resultValue;
};

const downloadAvatar = async (url, path) => {
    await fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(`unexpected response ${res.statusText}`);
        }
        return streamPipeline(res.body, fs.createWriteStream(path));
    });
};

export {profileRequest, downloadAvatar, IContentProfile};