# puppeteer-account-manager
## Overview
![overview](./overview.svg)  
puppeteer-account-manager is a tool that get the profiles (image, aboutMe, etc) from [Contentful](https://www.contentful.com) and updates the profile of each service.

## Motivation
I use various services (Github, Facebook, Twitter, etc).  
For each service, I need to register a profile (Avatar Photo, AboutMe, etc).     
Once I have my favorite profile photo😙, I want to update to all services 😔.  
It's very inconvenient. So I made this tool and automated it 😊.

## Contentful Model
```json
{
  "name": "Profile",
  "fields": [
    {
      "id": "type",
      "name": "Type",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "firstName",
      "name": "First Name",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "lastName",
      "name": "Last Name",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "avatar",
      "name": "Avatar",
      "type": "Link",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "linkType": "Asset"
    },
    {
      "id": "aboutMe",
      "name": "About Me",
      "type": "RichText",
      "localized": false,
      "required": false,
      "validations": [
        {
          "nodes": {}
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "address",
      "name": "Address",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "url",
      "name": "URL",
      "type": "Object",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    }
  ]
}
```
The following is required  
`profile.fields.type = 'BASE'` 

```

## Env
```bash
$ export CONTENTFUL_ACCESSTOKEN=
$ export CONTENTFUL_SPACE=
$ export GOOGLE_ID=
$ export GOOGLE_PASSWORD=
$ export TWITTER_ID=
$ export TWITTER_PASSWORD=
$ export GITHUB_ID=
$ export GITHUB_PASSWORD=
$ export FACEBOOK_ID=
$ export FACEBOOK_PASSWORD=
$ export LINKEDIN_ID=
$ export LINKEDIN_PASSWORD=
```

## Develop
```bash
$ npm install
$ npm run dev
$ npm run build
$ npm run start
```

## Run on Docker
```bash
$ docker build -t p:latest .
$ cat <<EOF > .env
CONTENTFUL_ACCESSTOKEN=
CONTENTFUL_SPACE=
LINKEDIN_ID=
LINKEDIN_PASSWORD=
GOOGLE_ID=
GOOGLE_PASSWORD=
TWITTER_ID=
TWITTER_PASSWORD=
GITHUB_ID=
GITHUB_PASSWORD=
FACEBOOK_ID=
FACEBOOK_PASSWORD=
EOF
$ docker run --rm --env-file .env p:latest
```

# TODO
* アカウントパスワードのKeepass管理 (Dropbox Sync)
* Contentful init script (create workspace, model)
* テストコード (Unit, E2E)
* Contentful -> Webfook -> Cloud Run (docker)