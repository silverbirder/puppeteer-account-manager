import {download, profileRequest} from "./gravatar";

(async () => {
    const res = await profileRequest(process.env.GRAVATAR_EMAIL);
    await download(res.thumbnailUrl, `./${res.user}.png`);
})();