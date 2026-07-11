#!/usr/bin/env bash
# Production build for floatboise.com:
#   1. Compile purged, minified Tailwind CSS -> styles.css
#   2. Regenerate sitemap.xml with auto <lastmod> (see scripts/gen-sitemap.js)
# Run this before committing after any content or class change.
set -euo pipefail
cd "$(dirname "$0")"

echo "› building CSS…"
npx -y tailwindcss@3.4.17 -c tailwind.config.js -i src/input.css -o styles.css --minify

echo "› generating sitemap…"
node scripts/gen-sitemap.js

echo "✓ build complete"
