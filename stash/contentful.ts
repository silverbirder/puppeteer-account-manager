import * as contentful from 'contentful'

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
});