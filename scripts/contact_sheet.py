#!/usr/bin/env python3
"""Tile figure screenshots into contact sheets for review.

Usage: python3 -I scripts/contact_sheet.py <png-dir> <out-prefix> [ids...]
Writes <out-prefix>-1.png, -2.png, ... (6 figures per sheet, 3 columns).
"""
import glob
import os
import sys

from PIL import Image, ImageDraw

src, prefix = sys.argv[1], sys.argv[2]
ids = sys.argv[3:]
files = [os.path.join(src, i + '.png') for i in ids] if ids else sorted(glob.glob(os.path.join(src, '*.png')))
files = [f for f in files if os.path.exists(f)]
W, COLS, PER = 640, 3, 6
for n in range(0, len(files), PER):
    batch = files[n:n + PER]
    thumbs = []
    for f in batch:
        im = Image.open(f).convert('RGB')
        im = im.resize((W, round(im.height * W / im.width)))
        thumbs.append((os.path.basename(f)[:-4], im))
    rows = [thumbs[i:i + COLS] for i in range(0, len(thumbs), COLS)]
    heights = [max(t[1].height for t in r) + 22 for r in rows]
    sheet = Image.new('RGB', (COLS * (W + 8), sum(heights)), 'white')
    d = ImageDraw.Draw(sheet)
    y = 0
    for r, h in zip(rows, heights):
        for k, (name, im) in enumerate(r):
            x = k * (W + 8)
            d.text((x + 4, y + 4), name, fill='red')
            sheet.paste(im, (x, y + 20))
        y += h
    out = f'{prefix}-{n // PER + 1}.png'
    sheet.save(out)
    print(out)
