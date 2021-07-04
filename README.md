# virag
https://virag-d7f0f.firebaseapp.com/

![image](https://user-images.githubusercontent.com/38471145/124309479-b94f4980-dba5-11eb-9774-31374d23a71b.png)

## 概要
 - アプリ
   - 刺繍のモチーフを使って配置デザインできるWebアプリ
   - モバイルファーストの予定なのでタッチ操作に全面的に対応    
   - LocalStrageに保存して呼び出し編集できる   
   - ログイン機能は現時点では認証のみの試作段階。ログインなしで使える 
 - 技術
   - fabric.js →Konva.js
     - Canvas利用をKonva vueに全面依拠してる    
   - Vue-CLIによるWebpack ＋ Vue-router + Vuex
     - Vue-routerはログインページをSPAの一部として作るのに使っている
     - Vuexはログイン情報を複数ページで共有して利用するのに利用している 
   - firebase Auth + firebase Hosting
     - Auth ひとまずメール認証のみを利用。ログインなしのゲストアカウントの扱いをどうすべきか
     - Hosting npmで設定しておけば１行で本番deployできるのでものすごく便利   
## Q＆A形式の言い訳
 - 刺繍って自分で縫ったもの？
   - 友人のハンガリー刺繍作家の作品です。アプリ自体も彼女のアイデアです。合作といえば聞こえはいいが要するに受託開発。 
   - (https://twitter.com/tana____chi)
 - なんでDB連携もしてない状態でレビュー会に出そうと思ったの？
   - モチーフに付随する削除や反転ボタンのUIを作り替えることにしたけど、結構苦労した部分だったせいでもったいないおばけが出てきたから。
 - １週間でできるわけないよね？
   - 無職状態で半月分を費やしています。 
## 今後
 - 第一段階
     - Canvaを参考にUIを変更する
     - エディタ追加機能（モチーフ色違い入れ替え、ダウンロード、縦横変換、ガイド線）
     - ローカルの保存数制限
     - FirrebaseStoreへの保存や呼び出し（ログイン時のみのオプション） 
 - 第二段階
     - モチーフ候補の追加や管理のできる管理画面
     - 各ユーザーの登録したものが全て閲覧できる画面
     - 写真を縫い取り用の線画に変換する機能
     - 写真から台形と縮尺、明るさ等の補正や扶養部分の削除をしてパーツを登録する機能   
 - 第三段階
     - ユーザーが自分のモチーフや持っている糸の色を追加できる
     - 全く別の創作者が自分のパーツ群を登録してアプリを公開できるより上位のアプリケーション     


## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
firebase deploy
```
### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
