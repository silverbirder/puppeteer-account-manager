import * as contentful from 'contentful'
import {Entry, Field} from "contentful";
import * as util from "util";
import {pipeline} from 'stream';
import fetch from "node-fetch";

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
});
const streamPipeline = util.promisify(pipeline);

const profileRequest = async (id: string): Promise<any> => {
    const entry: Entry<any> = await client.getEntry(id);
    const fields: Field = entry.fields;
    return Object.entries(fields).map((field, _) => {
        const keyName = field[0];
        const value = field[1];
        let returnValue = {name: keyName, value: undefined};
        if (value.hasOwnProperty('sys') && value.sys.type === 'Asset') {
            // For Asset
            returnValue.value = `https:${value.fields.file.url}`;
        } else if (value.hasOwnProperty('nodeType') && value.nodeType === 'document') {
            // For Rich Document
            returnValue.value = value.content[0].content.map((content) => {
                if (content.hasOwnProperty('value')) {
                    return content.value;
                }
                return content.content[0].value;
            }).join('');
        } else {
            returnValue.value = value;
        }
        return returnValue;
    });
};

const downloadAvatar = async (url, path) => {
    await fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(`unexpected response ${res.statusText}`);
        }
        return streamPipeline(res.body, fs.createWriteStream(path));
    });
};

export {profileRequest, downloadAvatar};