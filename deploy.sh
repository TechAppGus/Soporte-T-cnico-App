#!/usr/bin/env bash
set -e

# Detecta la rama actual (main, master, etc.)
branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)"

# Trae cambios remotos (si hay) antes de publicar
git pull --rebase origin "$branch" || true

# Agrega todo y crea el commit con mensaje o timestamp por defecto
git add -A
msg="${*:-chore: sync $(date -Iseconds)}"
git commit -m "$msg" || echo "Nada que commitear (working tree clean)"

# Empuja al remoto
git push -u origin "$branch"
echo "✅ Deploy listo en rama: $branch"
chmod +x deploy.sh
./deploy.sh "style: nueva paleta y hero"
# o sin mensaje personalizado:
./deploy.sh