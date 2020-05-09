import {download, profileRequest} from "./gravatar";

(async () => {
    const res = await profileRequest(process.env.GRAVATAR_EMAIL);
    const imageUrl = `${res.entry[0].thumbnailUrl}.png`;
    const name = res.entry[0].preferredUsername;
    await download(imageUrl, `./${name}.png`);
})();