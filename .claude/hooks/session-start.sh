#!/bin/bash
# Sessão do Claude na nuvem (claude.ai/code, app do celular): deixa o site pronto para rodar e publicar.
# No computador não faz nada (lá o npm install é feito uma vez, à mão).
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# dependências do site; --no-save não reescreve o package-lock.json (o npm da nuvem é de outra versão)
npm install --no-save --no-audit --no-fund

# Pillow: usado por scripts/nova-capa.py e scripts/prepare-images.py (capas e imagens dos projetos)
python3 -c "import PIL" 2>/dev/null || pip install --quiet pillow
