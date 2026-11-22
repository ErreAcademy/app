#!/bin/bash
# Compila src/ -> index.html en la raíz del repo, copia pwa/ y publica.
# Uso: ./src/pub.sh "mensaje del commit"
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(dirname "$HERE")"
cd "$HERE" && python3 build.py >/dev/null
cp -r "$HERE"/pwa/* "$REPO"/
cd "$REPO" && git add -A && git commit -q -m "$1"
git -c push.negotiate=true push -q origin HEAD && git log --oneline | head -1
