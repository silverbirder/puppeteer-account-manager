import * as crypto from "crypto";
import fetch from 'node-fetch';

const md5hex = str => crypto.createHash('md5').update(str).digest('hex');

const profileRequest = async email => {
    const hash = md5hex(email);
    const gUrl = `https://www.gravatar.com/${hash}`;
    const pUrl = await fetch(gUrl).then((r) => r.url);
    const profile = await fetch(`${pUrl}.json`);
    return profile.json();
};

export {profileRequest}