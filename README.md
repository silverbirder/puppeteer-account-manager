# puppeteer-account-manager

## TODO
```
・認証情報管理の利用
　　・envに認証情報を書く面倒さをなくしたい
    　・ 1Password, Lastpass, Keepass でなんとかしたい
    　  ・ 1Password -> 有料 ☓
    　  ・ Lastpass -> クラウドサーバに保存される 怖い ☓
    　  ・ Keepass -> ローカル環境に保存 ○
    　  　・　KeepassファイルはDropboxへファイルアップロードできるので、
　　　　　　　 直接データを入れるか、Dropboxへダウンロードさせにいくか。
　　・テストコーディング
```

# Env
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

# Develop
```bash
$ npm install
// For dev
$ npm run dev
// For prod
$ npm  run build
$ npm run start

$ docker run --rm --env-file .env p:latest
```