# NBot
## Overview
西日本工業大学 NIT-esportsのDiscordサーバにて稼働しているBot<br>
同サーバに所属しているメンバーによるコマンド操作や、名簿データの自動更新などを行います。
## Usage
物理サーバまたは[glitch](https://glitch.com/)などのクラウドサーバ上にTypeScriptの実行環境を構築し、`.env.sample`を参考に`.env`ファイルを作成後、`npm start`を実行してください。<br>
`.env`に設定するパラメータについては[Environments](#enviroments)を参照してください。
## Enviroments 
トークンやAPIへのリンクなど、機密性が高いものについては、`.env`に記述します。<br>
Botとして最低限稼働させるだけであれば、`DISCORD_BOT_TOKEN`のみの入力で稼働しますが、基本的には全ての項目を埋めるようにしてください。
```Dotenv:.env
DISCORD_BOT_TOKEN = ""
INTRODUCTION_CHANNEL_ID = ""
ACTIVE_MEMBER_ROLE_ID  = ""
OAUTH_API = ""
MAIN_API = ""
```
## Buld with
* [NITeAPI](https://github.com/NIT-esports/NITeAPI)

## Commands
### help
各種コマンドや引数の詳細を表示します。<br>
このコマンドの実行結果はコマンド実行者以外閲覧できません。<br>
```
/help [command_name]
```
### pick text
指定した要素からランダムに要素を選択し、表示します。<br>
```
/pick text [pick_count] [elements]
```
### pick user
メンションによって指定したメンバーからランダムに要素を選択し、表示します。<br>
```
/pick user [pick_count] [element_members]
```
### pick voice
コマンド実行者と同じVCに参加しているメンバーからランダムに要素を選択し、表示します。<br>
```
/pick voice [pick_count] [exclusive_members]
```
### poll open
リアクションベースの簡易的な投票フォームを作成します。<br>
```
/poll open [title] [choices]
```
### poll close
指定した投票フォームを閉じます。<br>
```
/poll close [id]
```
### teaming voice
コマンド実行者と同じボイスチャンネルにいるユーザーでチーム分けを行います。<br>
```
/teaming voice [team_size] [exclusive_members]
```
### room
[NITeAPI](https://github.com/NIT-esports/NITeAPI)から入退出情報を取得し、表示します。<br>
```
/room
```
### who
[NITeAPI](https://github.com/NIT-esports/NITeAPI)からユーザー情報を取得し、表示します。
```
/who [viwe_user_mention]
```
## Reference
[誰でも作れる！Discord Bot（基礎編）](https://note.com/exteoi/n/nf1c37cb26c41)
