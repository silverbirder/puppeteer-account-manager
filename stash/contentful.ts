import * as contentful from 'contentful'
import {Entry, Field} from "contentful";

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
});

(async () => {
    const entry: Entry<any> = await client.getEntry('49eICvbFZwALhRg3W78OxG');
    const fields: Field = entry.fields;
    const profile = Object.entries(fields).map((field, _) => {
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
})();