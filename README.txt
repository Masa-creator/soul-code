SOUL CODE — ルナ・セラフィナ完全演出版（ハイブリッド）

■ これは何？
GitHub → Vercel で即デプロイできる静的サイト一式。
無料でも“有料級”の深さ（マスター/カルマ対応、羅針盤、行動リスト）。
WIXは不要です。

■ ファイル
- index.html … 無料診断トップ（中央揃え / ルナ口調 / シェア画像DL）
- plans.html … 有料プラン（PayPalリンク固定）
- paid.html  … 有料ページ雛形（?plan= / フル解放スイッチ）
- style.css  … 天の川風の星空背景 / レスポンシブ / 中央揃え
- main.js    … 数秘（マスター/カルマ対応）+ 深い無料プレビュー + Xシェア
- paid.js    … プラン別表示 + フル解放判定
- README.txt … この説明

■ デプロイ最短手順
1) これらのファイルをGitHub新規リポジトリへ配置
2) VercelでNew Project → リポジトリ選択 → Deploy
3) 公開URLで動作確認（無料診断→プラン→PayPal→有料ページ）

■ フル解放（制作者/紹介者だけ無料で全開）
- URLに `?full=1&key=LUNA-ACCESS-2025` を付けるか、`?full=1&ref=masatoshi` のように ref を使います。
- 共有キー/紹介者IDは main.js / paid.js の先頭で編集可能。
※ クライアント側の簡易実装なので「隠し扉」レベルです。厳密運用はサーバ側で検証してください。

■ セキュリティ注意
- 本テンプレは“すぐ動く”優先。実運用では PayPal Webhook/IPN + サーバレス関数（Vercel/Netlify）で決済検証し、一時URLを発行してください。

■ X（Twitter）シェア
- intentによる投稿画面リンク。画像はブラウザ内で生成→DL→手動添付（仕様上の最適解）。

■ カスタムのヒント
- ACCESS_KEYS と REF_WHITELIST を変更して、フル解放の範囲を管理。
- 背景の天の川の強度は .milkyway の radial-gradient を調整。
- “行動リスト”やロジックは main.js の monthlyCompass を編集。

© SOUL CODE
