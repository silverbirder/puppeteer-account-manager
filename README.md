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
・リファクタリング
　　・クローリング処理内容ログ出力
　　・エラーハンドリング
　　・テストコーディング
　　・処理共通化・責任分離
・対象サービスの追加
    ・amazon
    ・twitter
    ・facebook
    ・linkedin
    ・note
    ・dev.to
    ・google
    ・github
　　※ 自身が登録しているAuth以外はどうしたものか。
　　　ex. HatenaはGoogle Authを使ってログインしているが、通常ログインのコードが必要か...?
・画像更新以外も更新対象としたい
　　・gravatarを情報源としたい
　　　　・自己紹介文
　　　　・住所
　　　　・関連リンク (portfolioなど)
　　　　-> avatarの画質が固定されていて(サイズ可変できるが)、サービスによっては使えなかった。
　　　　　-> もっと柔軟に対応できるよう、Contentful APIを使ってみたい。
・シークレットウィンドウで開いて、全サービス並列で動かしたい
・DockerコンテナをDeploy
　　・ローカルマシンで動かし、ゆくゆくはDeployしたい
```

# Env
```bash
$ export CONTENTFUL_ACCESSTOKEN=
$ export CONTENTFUL_SPACE=
$ export GOOGLE_ID=
$ export GOOGLE_PASSWORD=
$ export TWITTER_ID=
$ export TWITTER_PASSWORD=
```

# Develop
```bash
$ npm install
// For dev
$ npm run dev
// For prod
$ npm  run build
$ npm run start
```