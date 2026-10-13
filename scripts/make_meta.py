#!/usr/bin/env python3
"""Write src/data/meta.json (one entry per figure, in workbook order) and convert the
pictures of diagram-only figures to WebP under src/img/.

Usage: python3 -I scripts/make_meta.py <data-register.xlsx> <raw-dir> <src-dir>
"""
import io
import json
import os
import re
import sys
import zipfile

from PIL import Image

SECTION_SHORT = {
    'ES': 'Executive summary', 'Ch 1': 'Chapter 1', 'Ch 2': 'Chapter 2', 'Ch 3': 'Chapter 3', 'Ch 4': 'Chapter 4',
    'Ch 5': 'Chapter 5', 'Ch 6': 'Chapter 6', 'Ch 7': 'Chapter 7',
    'A1': 'Appendix A1', 'A2': 'Appendix A2', 'A3': 'Appendix A3', 'A4': 'Appendix A4',
}
MAX_W = 1400


def clean_notes(notes):
    out = []
    for n in notes:
        n = re.sub(r'[ \t]+', ' ', n.replace('\r', '')).strip()
        if n and n.lower().rstrip(':') not in ('note', 'notes'):
            out.append(n)
    return out


def main():
    xlsx, raw_dir, src = sys.argv[1:4]
    z = zipfile.ZipFile(xlsx)
    index = json.load(open(os.path.join(raw_dir, 'index.json')))
    img_dir = os.path.join(src, 'img')
    os.makedirs(img_dir, exist_ok=True)
    meta = []
    for f in index:
        raw = json.load(open(os.path.join(raw_dir, f['id'] + '.json')))
        kind = {'native': 'chart', 'picture-data': 'chart', 'diagram': 'image'}[f['kind']]
        m = {
            'id': f['id'],
            'sheet': f['sheet'],
            'kind': kind,
            'origin': f['kind'],  # native | picture-data | diagram
            'number': f['number'],
            'label': f"Figure {f['number']}" if f['number'] else f['sheet'],
            'title': f['title'],
            'section': f['section'],
            'sectionName': f['sectionName'],
            'sectionShort': SECTION_SHORT.get(f['section'], f['section']),
            'doc': f['doc'],
            'notes': clean_notes(f['notes']),
            'pdfPage': (f.get('pdf') or {}).get('pages', [None])[0],
        }
        if kind == 'image':
            imgs = []
            pics = sorted(raw['pictures'], key=lambda p: (p['from'][1], p['from'][0]))
            for i, p in enumerate(pics, start=1):
                im = Image.open(io.BytesIO(z.read('xl/media/' + p['file']))).convert('RGBA')
                bg = Image.new('RGBA', im.size, (255, 255, 255, 255))
                bg.alpha_composite(im)
                im = bg.convert('RGB')
                if im.width > MAX_W:
                    im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
                name = f"{f['id']}-{i}.webp"
                im.save(os.path.join(img_dir, name), 'WEBP', quality=84, method=6)
                imgs.append({'src': 'img/' + name, 'w': im.width, 'h': im.height})
            m['images'] = imgs
        meta.append(m)
    with open(os.path.join(src, 'data', 'meta.json'), 'w') as fh:
        json.dump(meta, fh, indent=1, ensure_ascii=False)
    kinds = {}
    for m in meta:
        kinds[m['origin']] = kinds.get(m['origin'], 0) + 1
    print(len(meta), 'figures', kinds)


if __name__ == '__main__':
    main()
