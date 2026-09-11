#!/usr/bin/env python3
"""
Dodaje nowy artykuł do bloga travelrules.eu:
1. Wpisuje/aktualizuje wpis w blog/data/posts.json
2. Regeneruje WSZYSTKIE strony nowym szablonem (node blog/scripts/generate-blog.mjs)
   — to jedyne źródło prawdy dla HTML-i, sitemap i stron tagów.

Użycie:
    python3 add_article.py /ścieżka/do/nowy-artykul.json

Format JSON artykułu (te same pola co wpisy w posts.json):
    {
      "id": "moj-nowy-wpis",
      "slugs": {"pl": "...", "en": "...", "es": "..."},
      "date": "2026-09-10",
      "tags": ["vanlife", "poradnik"],
      "sourceLang": "pl",
      "seoTitle": {"pl": "...", "en": "...", "es": "..."},
      "title": {"pl": "...", "en": "...", "es": "..."},
      "excerpt": {"pl": "...", "en": "...", "es": "..."},
      "contentHtml": {"pl": "<p>...</p>", "en": "...", "es": "..."}
    }
"""

import json
import subprocess
import sys
from pathlib import Path

# Katalog repo = katalog, w którym leży ten skrypt (bez hardcodowanych ścieżek).
BASE = Path(__file__).resolve().parent
BLOG_P = BASE / "blog" / "p"
JSON_D = BASE / "blog" / "data" / "posts.json"
GENERATOR = BASE / "blog" / "scripts" / "generate-blog.mjs"

REQUIRED_KEYS = ["id", "slugs", "date", "tags", "title", "excerpt", "contentHtml"]


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    new_path = Path(sys.argv[1])
    if not new_path.is_file():
        print(f"BŁĄD: nie znaleziono pliku {new_path}")
        return 1
    if not JSON_D.is_file():
        print(f"BŁĄD: nie znaleziono {JSON_D}")
        return 1
    if not GENERATOR.is_file():
        print(f"BŁĄD: nie znaleziono generatora {GENERATOR}")
        return 1

    article = json.loads(new_path.read_text(encoding="utf-8"))
    missing = [k for k in REQUIRED_KEYS if k not in article]
    if missing:
        print(f"BŁĄD: artykuł nie ma wymaganych pól: {', '.join(missing)}")
        return 1

    posts = json.loads(JSON_D.read_text(encoding="utf-8"))
    if not isinstance(posts, list):
        print("BŁĄD: posts.json nie jest listą.")
        return 1

    idx = next((i for i, p in enumerate(posts) if p.get("id") == article["id"]), None)
    if idx is None:
        posts.insert(0, article)  # najnowsze na początek
        print(f"✓ Dodano '{article['id']}' do posts.json (teraz {len(posts)} artykułów)")
    else:
        posts[idx] = article
        print(f"✓ Zaktualizowano '{article['id']}' w posts.json ({len(posts)} artykułów)")

    JSON_D.write_text(json.dumps(posts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # Regeneruj wszystko nowym szablonem (strony wpisów + tagi + sitemap).
    print("→ Regeneruję strony (generate-blog.mjs)…")
    proc = subprocess.run(["node", str(GENERATOR)], cwd=str(BASE))
    if proc.returncode != 0:
        print("BŁĄD: generator nie powiódł się.")
        return 1

    # Zweryfikuj, że 3 wersje językowe nowego wpisu istnieją.
    slugs = article.get("slugs", {}) or {}
    ok = True
    for lang in ["pl", "en", "es"]:
        slug = slugs.get(lang) or slugs.get("en") or slugs.get("pl") or article["id"]
        f = BLOG_P / f"{slug}.{lang}.html"
        if f.is_file():
            print(f"✓ {f.relative_to(BASE)}")
        else:
            print(f"BŁĄD: brak wygenerowanego pliku {f}")
            ok = False
    print("\nGotowe!" if ok else "\nGotowe z błędami.")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
