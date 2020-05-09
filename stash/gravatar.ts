import * as crypto from "crypto";
import fetch from 'node-fetch';
import * as fs from "fs";
import * as util from "util";
import {pipeline} from 'stream';


const streamPipeline = util.promisify(pipeline);

const md5hex = str => crypto.createHash('md5').update(str).digest('hex');

const profileRequest = async email => {
    const pUrl = await fetch(`https://www.gravatar.com/${md5hex(email)}`).then((r) => r.url);
    return (await fetch(`${pUrl}.json`)).json();
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