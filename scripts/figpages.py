import sys, re, os, glob, json, collections
txtdir, out = sys.argv[1], sys.argv[2]
res = {}
for doc in ('report', 'appendices'):
    pages = {}
    for f in glob.glob(os.path.join(txtdir, f'{doc}-*.txt')):
        p = int(re.search(r'-(\d+)\.txt$', f).group(1)); pages[p] = open(f, errors='replace').read()
    caps = collections.defaultdict(list)
    for p, t in sorted(pages.items()):
        found = re.findall(r"^\s*Figure (\d+)\s+(?:[A-Z]|\d)", t, re.M)
        if len(found) > 6: continue   # list of figures page
        for n in found: caps[int(n)].append(p)
    res[doc] = {n: ps for n, ps in sorted(caps.items())}
json.dump(res, open(out, 'w'), indent=0)
for doc, m in res.items(): print(doc, {k: v for k, v in m.items()})
