import * as contentful from 'contentful'
import {Entry, Field} from "contentful";

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
});

(async () => {
    const entry: Entry<any> = await client.getEntry('49eICvbFZwALhRg3W78OxG');
    const fields: Field = entry.fields;
    for (let fieldsKey in fields) {
        const fieldsValue = fields[fieldsKey];
        switch (fieldsKey) {
            case 'avatar':
                console.log(`https:${fieldsValue.fields.file.url}`);
                break;
            case 'aboutMe':
                const content = fieldsValue.content[0].content.map((data) => {
                    if (data.hasOwnProperty('value')) {
                        return data.value;
                    } else {
                        return data.content[0].value;
                    }
                });
                console.log(content.join(''));
                break;
            default:
                console.log(fieldsValue);
                break;
        }
    }
})();