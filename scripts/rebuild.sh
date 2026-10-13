#!/usr/bin/env bash
# Rebuild everything from the data register: extraction -> per-figure data -> combined page.
#   scripts/rebuild.sh            # dist/wem-esoo-2026-figures.html
#   scripts/rebuild.sh --qa       # also screenshot every figure and fail on problems
set -euo pipefail
cd "$(dirname "$0")/.."
XLSX=data/source/2026-wem-esoo-data-register.xlsx

python3 -I scripts/extract.py "$XLSX" work/raw --pages data/figpages.json
python3 -I scripts/make_meta.py "$XLSX" work/raw src
for f in scripts/prep/*.py; do
  [ "$(basename "$f")" = prep_common.py ] && continue
  python3 -I "$f" >/dev/null
done
python3 -I scripts/build.py --strict
if [ "${1:-}" = "--qa" ]; then
  node scripts/qa.mjs dist/wem-esoo-2026-figures.html work/qa/light
  node scripts/qa.mjs dist/wem-esoo-2026-figures.html work/qa/dark --theme dark
  node scripts/qa.mjs dist/wem-esoo-2026-figures.html work/qa/phone --width 390
fi
