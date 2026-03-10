#!/bin/bash

# --- CONFIGURATION ---
VPS_USER="root"
VPS_IP="72.62.251.182"
# Adjust the destination path below as needed
VPS_DEST="/var/www/html/quiz-prime"

echo "🚀 Starting deployment to $VPS_USER@$VPS_IP:$VPS_DEST..."

# Create the directory if it doesn't exist
ssh $VPS_USER@$VPS_IP "mkdir -p $VPS_DEST"

# Sync files (excluding git and OS junk)
# Includes: .htaccess, embed.html, index.html, quiz-widget.js, and the api/ folder
rsync -avz --progress \
  --exclude '.git/' \
  --exclude '.DS_Store' \
  --exclude '*.backup' \
  --exclude 'netlify.toml' \
  --exclude '_redirects' \
  --exclude 'HOSTINGER-DEPLOY.md' \
  --exclude 'deploy.sh' \
  . $VPS_USER@$VPS_IP:$VPS_DEST

echo "✅ Deployment complete!"
echo "Global URL should be: http://$VPS_IP/quiz-prime/"
