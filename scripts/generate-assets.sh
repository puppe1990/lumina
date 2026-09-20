#!/usr/bin/env sh
# Gera os assets estáticos (OG image e ícones da PWA) com o Chromium do Playwright.
# Requer: npx playwright install chromium
set -e

DIR="$(cd "$(dirname "$0")/.." && pwd)"
PW="npx --yes playwright screenshot --wait-for-timeout=1200"

mkdir -p "$DIR/public/icons"

$PW --viewport-size="192,192" "file://$DIR/scripts/icon.html" "$DIR/public/icons/icon-192.png"
$PW --viewport-size="512,512" "file://$DIR/scripts/icon.html" "$DIR/public/icons/icon-512.png"
$PW --viewport-size="512,512" "file://$DIR/scripts/icon.html#maskable" "$DIR/public/icons/icon-maskable-512.png"
$PW --viewport-size="180,180" "file://$DIR/scripts/icon.html" "$DIR/public/apple-touch-icon.png"

npx --yes playwright screenshot --wait-for-timeout=3500 \
  --viewport-size="1200,630" "file://$DIR/scripts/og.html" "$DIR/public/og.png"

echo "Assets gerados em public/."
