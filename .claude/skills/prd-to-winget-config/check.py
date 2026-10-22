"""Checks .config/configuration.winget against PRD.md. Run from the repo root:

  python3 -I .claude/skills/prd-to-winget-config/check.py               check the config
  python3 -I .claude/skills/prd-to-winget-config/check.py --find NAME...  list WinGet IDs for app names

Reads the requirement IDs from PRD.md (the lines that start with one) and the package IDs
from the config. Prints the problems, or "checks: OK"; exits 1 when there are problems.
"""
import io, json, re, sqlite3, sys, tempfile, urllib.error, urllib.request, zipfile
from pathlib import Path

import jsonschema, yaml

ID = r"[A-Z][A-Z0-9]*-\d+"


def winget_index():
    msix = urllib.request.urlopen("https://cdn.winget.microsoft.com/cache/source2.msix").read()
    path = Path(tempfile.mkdtemp()) / "index.db"
    path.write_bytes(zipfile.ZipFile(io.BytesIO(msix)).read("Public/index.db"))
    return sqlite3.connect(f"file:{path}?mode=ro", uri=True)


def candidates(db, term):
    hits = db.execute("SELECT id, name FROM packages WHERE id LIKE ?1 OR name LIKE ?1 OR moniker LIKE ?1 "
                      "ORDER BY moniker = ?2 COLLATE NOCASE DESC, length(id) LIMIT 8",
                      (f"%{term}%", term)).fetchall()
    return "; ".join(f"{i} ({n})" for i, n in hits) or "none"


def lookup(db, package_id, source):
    """Returns (name, problem) for one package."""
    if source == "msstore":
        url = f"https://storeedgefd.dsx.mp.microsoft.com/v9.0/packageManifests/{package_id}"
        try:
            data = json.load(urllib.request.urlopen(url))["Data"]
            found, name = data["PackageIdentifier"], data["Versions"][0]["DefaultLocale"]["PackageName"]
        except urllib.error.HTTPError as err:
            return None, f"no Store app with this ID (HTTP {err.code})"
        except (KeyError, IndexError, TypeError, ValueError):
            return None, "the Store lists no app for this ID"
    else:
        row = db.execute("SELECT id, name FROM packages WHERE id = ? COLLATE NOCASE", (package_id,)).fetchone()
        if not row:
            return None, f"no WinGet package with this ID. Candidates: {candidates(db, package_id)}"
        found, name = row
    return name, None if found == package_id else f"spelled {found} in {source or 'winget'}"


def main(args):
    if args[:1] == ["--find"]:
        db = winget_index()
        for term in args[1:]:
            print(f"{term}: {candidates(db, term)}")
        return 0
    prd_ids = [m.group(1) for line in Path("PRD.md").read_text(encoding="utf-8").splitlines()
               if (m := re.match(rf"\s*(?:[-*+]\s+|\d+[.)]\s+)?[*_]*({ID})\b", line))]
    doc = yaml.safe_load(Path(".config/configuration.winget").read_text(encoding="utf-8"))
    schema = json.load(urllib.request.urlopen("https://aka.ms/configuration-dsc-schema/0.2"))
    problems = [f"schema: {'/'.join(map(str, e.path)) or '(root)'}: {e.message}"
                for e in jsonschema.Draft202012Validator(schema).iter_errors(doc)]
    props = (doc.get("properties") or {}) if isinstance(doc, dict) else {}
    units = [u for key in ("assertions", "resources")
             for u in (props.get(key) if isinstance(props.get(key), list) else []) if isinstance(u, dict)]
    unit_ids = {u["id"] for u in units if u.get("id")}
    cited, found = set(), []
    db = None
    for n, unit in enumerate(units, 1):
        label = f"unit {n} ({unit.get('resource')})"
        description = (unit.get("directives") or {}).get("description") or ""
        match = re.match(rf"\[({ID}(?:, {ID})*)\] ", description)
        if not match:
            problems.append(f"{label}: description doesn't start with [ID]")
        for rid in match.group(1).split(", ") if match else []:
            if rid in prd_ids:
                cited.add(rid)
            else:
                problems.append(f"{label}: cites {rid}, which isn't in the PRD")
        for dep in unit.get("dependsOn") or []:
            if dep not in unit_ids:
                problems.append(f"{label}: dependsOn '{dep}', which no unit's id defines")
        if str(unit.get("resource")).endswith("/WinGetPackage"):
            settings = unit.get("settings") or {}
            db = db or winget_index()
            name, problem = lookup(db, str(settings.get("id")), settings.get("source"))
            if problem:
                problems.append(f"{label}: {settings.get('id')}: {problem}")
            if name:
                found.append(f"{settings.get('id')} ({name})")
    print("\n".join(problems) or "checks: OK")
    print(f"PRD IDs: {len(prd_ids)}. Not in the config:", ", ".join(i for i in prd_ids if i not in cited) or "none")
    print(f"Packages found ({len(found)}):", "; ".join(found) or "none")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
