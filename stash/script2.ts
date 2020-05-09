import {profileRequest} from "./gravatar";

(async () => {
    const res = await profileRequest(process.env.GRAVATAR_EMAIL);
    console.log(res.entry[0]);
})();