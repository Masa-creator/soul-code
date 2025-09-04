SOUL CODE — 完全版（Webhook + 自動配布）

Deploy steps (Vercel recommended):
1. Create a Git repo and push this folder, or upload ZIP to Vercel.
2. In Vercel Project Settings, set environment variables from .env.sample.
3. Deploy. Create a PayPal webhook in your PayPal Dashboard:
   - Notification URL: https://<your-vercel-domain>/api/paypal-webhook
   - Events: PAYMENT.CAPTURE.COMPLETED, CHECKOUT.ORDER.APPROVED
   - Copy the Webhook ID into PAYPAL_WEBHOOK_ID.
4. (Optional) Set SENDGRID_API_KEY and delivery emails for automatic email

Security notes:
- Never commit real API keys to a public repo.
- This package contains sample serverless code—harden before production.
