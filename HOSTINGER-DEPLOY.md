# Deploying Quiz to Hostinger

## Files to Upload

Upload the following to your Hostinger `public_html` folder (or a subdirectory like `public_html/quiz/`):

```
├── .htaccess                    ← URL routing & CORS
├── embed.html                   ← Entry point for GHL iframe
├── index.html                   ← Standalone quiz page
├── quiz-widget.js               ← Main quiz logic
└── api/
    ├── webhook/
    │   └── index.php            ← Proxies completion data → n8n
    └── signup-webhook/
        └── index.php            ← Proxies sign-up data → n8n
```

> **Do NOT upload**: `netlify.toml`, `_redirects`, test files, `.backup` files

## Steps

1. **Log into Hostinger** → Go to **File Manager** (or use FTP)
2. **Navigate to** `public_html` (or create a subdomain folder)
3. **Upload all files** listed above, preserving the folder structure
4. **Verify PHP is enabled** — Hostinger has PHP enabled by default
5. **Test the webhooks** (see below)

## Test Webhooks

After uploading, test that the PHP proxies work:

```bash
# Test completion webhook
curl -X POST https://YOUR-DOMAIN/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true, "source": "hostinger-test"}'

# Test sign-up webhook  
curl -X POST https://YOUR-DOMAIN/api/signup-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true, "source": "hostinger-signup-test"}'
```

Both should return a response (usually `{"success": true}` from n8n). Check your n8n workflow to confirm the data arrived.

## GHL Integration

1. In your GHL Funnel, add a **"Custom JS/HTML"** element
2. Paste the contents of `ghl-embed-snippet.html`
3. Replace `YOUR_HOSTED_URL` with your Hostinger domain (e.g. `https://quiz.traveltotransform.com`)
4. Save and preview — the quiz should load in the iframe

## If Using a Subdirectory

If you upload to `public_html/quiz/` instead of the root, your GHL snippet URL becomes:
```
https://yourdomain.com/quiz/embed.html
```

## Troubleshooting

| Issue | Fix |
|---|---|
| Webhook returns 500 | Check that `curl` PHP extension is enabled (Hostinger → PHP Configuration) |
| CORS errors in console | Verify `.htaccess` was uploaded and `mod_rewrite` is on |
| Quiz doesn't load in GHL | Check iframe `src` URL is correct and HTTPS |
| n8n not receiving data | Test with `curl` first; check n8n webhook node is active |
