SOUL CODE — 完全商用版（Next.js）
---
使い方（短縮）
1. ZIP を展開して GitHub に push、または Vercel に直接 Import。
2. Vercel の Project Settings > Environment Variables に以下を追加：
   - OPENAI_API_KEY
   - PAYPAL_ENVIRONMENT (sandbox | live)
   - PAYPAL_CLIENT_ID
   - PAYPAL_CLIENT_SECRET
   - NEXT_PUBLIC_PAYPAL_CLIENT_ID (同じ as PAYPAL_CLIENT_ID)
3. デプロイして動作確認。

注意:
- OpenAIキーとPayPalクレデンシャルは絶対に公開しないでください。
- 本ZIPは動作のための最小実装を含みます。必要に応じてUI改善やWebhookの追加を推奨します.
