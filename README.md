# puppeteer-account-manager
## Overview
![overview](./overview.svg)

## Motivation

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
$ npm  run build
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