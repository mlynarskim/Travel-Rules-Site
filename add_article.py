#!/usr/bin/env python3
"""
Dodaje nowy artykuł do bloga travelrules.eu:
1. Wpisuje do posts.json
2. Generuje 3 pliki HTML (PL/EN/ES) w blog/p/
3. Dodaje wpisy do sitemap-blog.xml
"""

import json
import html as html_mod
from pathlib import Path

BASE   = Path("/Users/tadzik/Documents/GitHub/Travel-Rules-Site")
BLOG_P = BASE / "blog" / "p"
JSON_D = BASE / "blog" / "data" / "posts.json"
SITEMAP= BASE / "sitemap-blog.xml"
NEW_JS = Path("/Users/tadzik/Desktop/vanlife-solo-vs-para.json")

SITE_URL    = "https://travelrules.eu"
OG_IMAGE    = f"{SITE_URL}/og-image.jpg"
LINKEDIN    = "https://www.linkedin.com/in/mateuszmlynarski/"

LANG_HTML   = {"pl": "pl", "en": "en", "es": "es"}
LANG_LOCALE = {"pl": "pl_PL", "en": "en_US", "es": "es_ES"}

BACK_LABEL  = {"pl": "← Wróć do bloga", "en": "← Wróć do bloga", "es": "← Wróć do bloga"}

RELATED_LABEL   = {"pl": "Powiązane artykuły", "en": "Related Articles",  "es": "Artículos relacionados"}
AUTHOR_HEADING  = {"pl": "O autorze",          "en": "About the Author",  "es": "Sobre el autor"}
AUTHOR_TEXT     = {
    "pl": "Mateusz Młynarski — indie iOS developer, twórca Travel Rules",
    "en": "Mateusz Młynarski — indie iOS developer, creator of Travel Rules",
    "es": "Mateusz Młynarski — desarrollador iOS indie, creador de Travel Rules",
}
LINKEDIN_LABEL  = {"pl": "LinkedIn",        "en": "LinkedIn",            "es": "LinkedIn"}
APPSTORE_LABEL  = {"pl": "Travel Rules w App Store", "en": "Travel Rules on App Store", "es": "Travel Rules en App Store"}
APPSTORE_URL    = "https://apps.apple.com/app/travel-rules/id6451070215"

# ── Artykuły powiązane z nowym artykułem ────────────────────────────────────
# slug → {lang: title}  (pobrane z posts.json)
RELATED_SLUGS = [
    "van_life_mity_kontra_rzeczywistosc",
    "ukryte_koszty_vanlife_o_ktorych_nikt_nie_mowi",
    "nocowanie-na-dziko-vs-kempingi-europa",
]

# ── CSS wspólny dla wszystkich artykułów ────────────────────────────────────
ARTICLE_CSS = """\
    :root{
      --bg:#f6f7f8; --card:#fff; --text:#0f172a; --muted:#475569; --border:#e5e7eb;
      --accent:#29606D; --radius:16px; --shadow:0 10px 30px rgba(2,6,23,.06); --max:1100px;
    }
    body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:var(--text);background:var(--bg);line-height:1.65}
    a{color:inherit;text-decoration:none}
    .container{width:min(var(--max), calc(100% - 40px)); margin:0 auto;}
    .section{padding:30px 0}
    .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px}
    .muted{color:var(--muted)}
    .btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;border:1px solid var(--border);background:var(--card);font-weight:800}
    .btn-ghost{background:rgba(255,255,255,.6)}
    .tag{display:inline-flex;gap:6px;align-items:center;font-size:.8rem;font-weight:850;padding:4px 10px;border-radius:999px;border:1px solid var(--border);color:var(--muted);text-decoration:none}
    .tag:hover{border-color:color-mix(in oklab, var(--accent) 35%, var(--border));color:color-mix(in oklab, var(--accent) 70%, var(--muted))}
    .post-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;color:var(--muted);font-weight:700;font-size:.92rem;margin-bottom:10px}
    h1{margin:10px 0 12px;letter-spacing:-.5px;line-height:1.15;font-size:clamp(24px, 3vw, 40px)}
    .content p{margin:10px 0;color:var(--text)}
    .content h2,.content h3,.content h4{margin:18px 0 8px}
    .content ul{margin:10px 0 10px;padding-left:18px}
    .content li{margin:6px 0}
    .content table{width:100%;border-collapse:collapse;margin:14px 0}
    .content th,.content td{border:1px solid var(--border);padding:8px 12px;text-align:left;font-size:.95rem}
    .content th{background:var(--bg);font-weight:700}"""

# ── Helpers ──────────────────────────────────────────────────────────────────

def ea(t):
    return html_mod.escape(str(t), quote=True)

def ec(t):
    return html_mod.escape(str(t), quote=False)

def make_seo_title(raw, max_total=60):
    suffix = " | Travel Rules"
    max_part = max_total - len(suffix)   # 45
    if len(raw) <= max_part:
        return raw + suffix
    cut = raw[:max_part]
    last_sp = cut.rfind(" ")
    if last_sp > max_part // 3:
        cut = cut[:last_sp]
    cut = cut.rstrip(" ,.-:;")
    return cut + suffix

def truncate_desc(text, max_len=155):
    if len(text) <= max_len:
        return text
    cut = text[:max_len - 3]
    last_sp = cut.rfind(" ")
    if last_sp > max_len // 3:
        cut = cut[:last_sp]
    return cut + "..."

# ── Tagi: wyświetlana nazwa ──────────────────────────────────────────────────
TAG_DISPLAY = {
    "vanlife":    {"pl": "Vanlife",   "en": "Van life",  "es": "Van life"},
    "solo":       {"pl": "Solo",      "en": "Solo",      "es": "Solo"},
    "para":       {"pl": "Para",      "en": "Couple",    "es": "Pareja"},
    "lifestyle":  {"pl": "Lifestyle", "en": "Lifestyle", "es": "Lifestyle"},
    "porady":     {"pl": "Porady",    "en": "Tips",      "es": "Consejos"},
}

def tag_display(slug, lang):
    d = TAG_DISPLAY.get(slug)
    if d:
        return d.get(lang, slug.capitalize())
    return slug.replace("-", " ").capitalize()

# ── Budowanie <head> ─────────────────────────────────────────────────────────

def build_head(article, lang):
    base_id    = article["id"]
    title_full = article["title"][lang]
    excerpt    = article["excerpt"][lang]
    date       = article["date"]

    seo_title  = make_seo_title(title_full)
    desc       = truncate_desc(excerpt)
    locale     = LANG_LOCALE[lang]
    url        = f"{SITE_URL}/blog/p/{base_id}.{lang}.html"

    schema = json.dumps({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title_full,
        "description": desc,
        "author": {"@type": "Person", "name": "Mateusz Młynarski", "url": LINKEDIN},
        "publisher": {"@type": "Organization", "name": "Travel Rules", "url": SITE_URL},
        "datePublished": date,
        "dateModified":  date,
        "inLanguage": lang,
        "url": url,
        "mainEntityOfPage": url,
    }, ensure_ascii=False, separators=(",", ":"))

    return (
        "<head>\n"
        '  <meta charset="utf-8" />\n'
        '  <meta name="viewport" content="width=device-width,initial-scale=1" />\n'
        f"  <title>{ec(seo_title)}</title>\n"
        '  <meta name="author" content="Mateusz Młynarski" />\n'
        f'  <meta name="description" content="{ea(desc)}" />\n'
        f'  <link rel="canonical" href="{url}" />\n'
        "\n"
        f'  <link rel="alternate" hreflang="pl" href="{SITE_URL}/blog/p/{base_id}.pl.html" />\n'
        f'  <link rel="alternate" hreflang="en" href="{SITE_URL}/blog/p/{base_id}.en.html" />\n'
        f'  <link rel="alternate" hreflang="es" href="{SITE_URL}/blog/p/{base_id}.es.html" />\n'
        f'  <link rel="alternate" hreflang="x-default" href="{SITE_URL}/blog/p/{base_id}.en.html" />\n'
        "\n"
        '  <meta property="og:type" content="article" />\n'
        '  <meta property="og:site_name" content="Travel Rules" />\n'
        f'  <meta property="og:title" content="{ea(seo_title)}" />\n'
        f'  <meta property="og:description" content="{ea(desc)}" />\n'
        f'  <meta property="og:url" content="{url}" />\n'
        f'  <meta property="og:image" content="{OG_IMAGE}" />\n'
        f'  <meta property="og:locale" content="{locale}" />\n'
        "\n"
        '  <meta name="twitter:card" content="summary_large_image" />\n'
        f'  <meta name="twitter:title" content="{ea(seo_title)}" />\n'
        f'  <meta name="twitter:description" content="{ea(desc)}" />\n'
        "\n"
        f'  <script type="application/ld+json">{schema}</script>\n'
        "\n"
        "  <style>\n"
        f"{ARTICLE_CSS}\n"
        "  </style>\n"
        "</head>"
    )

# ── Budowanie <body> ─────────────────────────────────────────────────────────

def build_body(article, lang, related_titles):
    base_id  = article["id"]
    date     = article["date"]
    title_h1 = article["title"][lang]
    content  = article["contentHtml"][lang]
    tags     = article["tags"]

    # Tagi linki
    tag_links = " ".join(
        f'<a class="tag" href="/blog/t/{slug}.{lang}.html">{tag_display(slug, lang)}</a>'
        for slug in tags
    )

    # Powiązane artykuły
    rel_links = "\n            ".join(
        f'<a class="btn" href="/blog/p/{slug}.{lang}.html">{ec(title)}</a>'
        for slug, title in related_titles
    )

    back   = BACK_LABEL[lang]
    r_lbl  = RELATED_LABEL[lang]
    a_head = AUTHOR_HEADING[lang]
    a_text = AUTHOR_TEXT[lang]
    li_lbl = LINKEDIN_LABEL[lang]
    as_lbl = APPSTORE_LABEL[lang]

    return f"""\
<body>
  <section class="section">
    <div class="container">
      <a class="btn btn-ghost" href="/blog/index.html?lang={lang}">{back}</a>

      <div class="card" style="margin-top:14px">
        <div class="post-meta">
          <span>{date}</span>
          <span>•</span>{tag_links}
        </div>
        <h1>{ec(title_h1)}</h1>
        <div class="content">{content}</div>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border)">
          <h3>{r_lbl}</h3>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
            {rel_links}
          </div>
        </div>
        <div id="about-author" style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border)">
          <h3>{a_head}</h3>
          <p class="muted">{a_text}</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
            <a class="btn" href="{LINKEDIN}" rel="noopener noreferrer" target="_blank">{li_lbl}</a>
            <a class="btn" href="{APPSTORE_URL}" rel="noopener noreferrer" target="_blank">{as_lbl}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</body>"""

def build_html(article, lang, related_titles):
    head = build_head(article, lang)
    body = build_body(article, lang, related_titles)
    lang_attr = LANG_HTML[lang]
    return f"<!doctype html>\n<html lang=\"{lang_attr}\">\n{head}\n{body}\n</html>\n"

# ── MAIN ─────────────────────────────────────────────────────────────────────

# 1. Wczytaj nowy artykuł
article = json.loads(NEW_JS.read_text(encoding="utf-8"))
base_id = article["id"]
print(f"Artykuł: {base_id}")

# 2. Wczytaj istniejące posts.json
posts = json.loads(JSON_D.read_text(encoding="utf-8"))

# Sprawdź, czy już istnieje
if any(p["id"] == base_id for p in posts):
    print("UWAGA: artykuł już istnieje w posts.json — pomijam dodawanie.")
else:
    # Dodaj na początku (najnowszy artykuł)
    posts.insert(0, article)
    JSON_D.write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✓ Dodano do posts.json (teraz {len(posts)} artykułów)")

# 3. Pobierz tytuły artykułów powiązanych
posts_by_id = {p["id"]: p for p in posts}
related_by_lang = {}
for lang in ["pl", "en", "es"]:
    related_by_lang[lang] = [
        (slug, posts_by_id[slug]["title"][lang])
        for slug in RELATED_SLUGS
        if slug in posts_by_id
    ]

# 4. Generuj HTML dla każdego języka
for lang in ["pl", "en", "es"]:
    filename = f"{base_id}.{lang}.html"
    filepath = BLOG_P / filename
    html_content = build_html(article, lang, related_by_lang[lang])
    filepath.write_text(html_content, encoding="utf-8")
    print(f"✓ Wygenerowano: {filename}")

# 5. Aktualizuj sitemap-blog.xml
sitemap_content = SITEMAP.read_text(encoding="utf-8")
new_entries = "".join(
    f'  <url><loc>{SITE_URL}/blog/p/{base_id}.{lang}.html</loc></url>\n'
    for lang in ["pl", "en", "es"]
)
if f"{base_id}.pl.html" in sitemap_content:
    print("UWAGA: artykuł już w sitemap — pomijam.")
else:
    sitemap_content = sitemap_content.replace("</urlset>", new_entries + "</urlset>")
    SITEMAP.write_text(sitemap_content, encoding="utf-8")
    print("✓ Dodano 3 wpisy do sitemap-blog.xml")

print("\nGotowe!")
