import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script lives in /blog/scripts/, so project root is two levels up.
// This makes the script independent from the folder you run it from.
const ROOT = path.resolve(__dirname, "..", "..");

// Posts JSON can live either in:
// - /blog/data/posts.json  (recommended for this repo)
// - /data/posts.json       (alternative)
// We auto-detect to prevent path mistakes like /blog/blog/data/posts.json.
const POSTS_CANDIDATES = [
  path.join(ROOT, "blog", "data", "posts.json"),
  path.join(ROOT, "data", "posts.json")
];

function resolvePostsPath() {
  for (const p of POSTS_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  // Keep the error message explicit so it's easy to fix repo structure.
  throw new Error(
    `posts.json not found. Looked for:\n- ${POSTS_CANDIDATES.join("\n- ")}`
  );
}

// gdzie wypluć HTML-e:
const outDir = path.join(ROOT, "blog", "p");

// gdzie wypluć strony tagów:
const tagOutDir = path.join(ROOT, "blog", "t");

// helper: slugify (for tags etc.)
function slugify(input = "") {
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Tag labels per language (SEO-friendly slugs in JSON, nice labels in UI)
// Add new tags here as you grow.
const TAG_LABELS = {
  europa: { pl: "Europa", en: "Europe", es: "Europa" },
  vanlife: { pl: "Vanlife", en: "Van life", es: "Van life" },
  rodzina: { pl: "Rodzina", en: "Family", es: "Familia" },
  poradnik: { pl: "Poradnik", en: "Guide", es: "Guía" },
  podroze: { pl: "Podróże", en: "Travel", es: "Viajes" },
  dzieci: { pl: "Dzieci", en: "Kids", es: "Niños" },
  ranking: { pl: "Ranking", en: "Ranking", es: "Ranking" },
  digitalnomad: { pl: "Digital nomad", en: "Digital nomad", es: "Nómada digital" },
  workation: { pl: "Workation", en: "Workation", es: "Workation" },
  produktywnosc: { pl: "Produktywność", en: "Productivity", es: "Productividad" },
  serwis: { pl: "Serwis", en: "Service", es: "Mantenimiento" },
  bezpieczenstwo: { pl: "Bezpieczeństwo", en: "Safety", es: "Seguridad" },
  roadtrip: { pl: "Road trip", en: "Road trip", es: "Road trip" },
  oszczedzanie: { pl: "Oszczędzanie", en: "Saving", es: "Ahorro" },
  budzet: { pl: "Budżet", en: "Budget", es: "Presupuesto" },
  lifehacks: { pl: "Lifehacki", en: "Life hacks", es: "Trucos" },
  travelplanner: { pl: "Travel planner", en: "Travel planner", es: "Planificador" },
  organizacja: { pl: "Organizacja", en: "Organization", es: "Organización" },
  zwierzeta: { pl: "Zwierzęta", en: "Pets", es: "Mascotas" },
  "pies-w-podrozy": { pl: "Pies w podróży", en: "Dog travel", es: "Viajar con perro" },
  wildcamping: { pl: "Nocowanie na dziko", en: "Wild camping", es: "Acampada libre" },
  kempingi: { pl: "Kempingi", en: "Campsites", es: "Campings" },
  prawo: { pl: "Prawo", en: "Law", es: "Legal" },
  zabezpieczenia: { pl: "Zabezpieczenia", en: "Security", es: "Seguridad" },
  planowanie: { pl: "Planowanie", en: "Planning", es: "Planificación" },
  ebook: { pl: "E-book", en: "Ebook", es: "Ebook" },
  gotowanie: { pl: "Gotowanie", en: "Cooking", es: "Cocina" },
  kuchnia: { pl: "Kuchnia", en: "Kitchen", es: "Cocina" }
};

function tagLabel(tagSlug, lang) {
  const l = lang || "pl";
  const hit = TAG_LABELS[tagSlug];
  if (hit && hit[l]) return hit[l];
  // fallback: pretty-print the slug
  const pretty = String(tagSlug).replace(/-/g, " ");
  return pretty.charAt(0).toUpperCase() + pretty.slice(1);
}

// domena do canonical/sitemap
const SITE = "https://travelrules.eu";

function esc(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pickLang(obj, lang = "pl") {
  if (!obj) return "";
  return obj[lang] || obj.pl || obj.en || obj.es || "";
}

function stripHtml(html = "") {
  // proste wyciągnięcie tekstu do meta description
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeDescription(post, lang) {
  const ex = pickLang(post.excerpt, lang);
  if (ex) return ex.slice(0, 160);
  const text = stripHtml(pickLang(post.contentHtml, lang));
  return text.slice(0, 160);
}

function articleSchema({ url, title, description, datePublished, lang }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: url,
    headline: title,
    description,
    datePublished,
    inLanguage: lang,
    publisher: {
      "@type": "Organization",
      name: "Travel Rules",
      url: SITE
    }
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function pageTemplate({ lang, title, description, canonical, contentHtml, tags, date }) {
  const schema = articleSchema({
    url: canonical,
    title,
    description,
    datePublished: date || undefined,
    lang
  });

  return `<!doctype html>
<html lang="${esc(lang)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)} — Travel Rules</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />

  ${schema}

  <style>
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
  </style>
</head>
<body>
  <section class="section">
    <div class="container">
      <a class="btn btn-ghost" href="/blog/index.html?lang=${esc(lang)}">← Wróć do bloga</a>

      <div class="card" style="margin-top:14px">
        <div class="post-meta">
          ${date ? `<span>${esc(date)}</span>` : ""}
          ${tags?.length ? `<span>•</span>${tags.map(t=>`<a class="tag" href="/blog/t/${esc(slugify(t))}.${esc(lang)}.html">${esc(tagLabel(slugify(t), lang))}</a>`).join(" ")}` : ""}
        </div>
        <h1>${esc(title)}</h1>
        <div class="content">${contentHtml || `<p class="muted">Brak treści.</p>`}</div>
      </div>
    </div>
  </section>
</body>
</html>`;
}

function tagPageTemplate({ lang, tagSlug, canonical, title, description, posts }) {
  const tagName = tagLabel(tagSlug, lang);

  return `<!doctype html>
<html lang="${esc(lang)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)} — Travel Rules</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />

  <style>
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
    .blog-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px}
    @media (max-width:980px){.blog-grid{grid-template-columns:1fr}}
    .post-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;color:var(--muted);font-weight:700;font-size:.92rem}
    .dot{opacity:.6}
    .post-title{margin:10px 0 6px;letter-spacing:-.2px;font-size:1.15rem}
    .post-excerpt{margin:0;color:var(--muted)}
    h1{margin:10px 0 12px;letter-spacing:-.5px;line-height:1.15;font-size:clamp(24px, 3vw, 40px)}
  </style>
</head>
<body>
  <section class="section">
    <div class="container">
      <a class="btn btn-ghost" href="/blog/index.html?lang=${esc(lang)}">← Wróć do bloga</a>

      <div class="card" style="margin-top:14px">
        <div class="post-meta">
          <span class="tag">#${esc(tagName)}</span>
          <span class="dot">•</span>
          <span class="muted">${esc(posts.length)} ${esc(lang === 'pl' ? 'wpisów' : (lang === 'es' ? 'artículos' : 'posts'))}</span>
        </div>
        <h1>${esc(lang === 'pl' ? 'Tag:' : (lang === 'es' ? 'Etiqueta:' : 'Tag:'))} ${esc(tagName)}</h1>
        <p class="muted">${esc(description)}</p>

        <div class="blog-grid">
          ${posts.map(p => {
            const pTitle = esc(p.title);
            const pExcerpt = esc(p.excerpt);
            const pDate = esc(p.date || '');
            return `
              <article class="card">
                <div class="post-meta"><span>${pDate}</span></div>
                <h3 class="post-title">${pTitle}</h3>
                <p class="post-excerpt">${pExcerpt}</p>
                <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;">
                  <a class="btn" href="${esc(p.href)}">${esc(lang === 'pl' ? 'Czytaj' : (lang === 'es' ? 'Leer' : 'Read'))}</a>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  </section>
</body>
</html>`;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function formatDate(iso) {
  if (!iso) return "";
  // zostawiamy ISO w meta, a w UI można mieć prosto
  return iso;
}

function build() {
  const postsPath = resolvePostsPath();
  console.log(`Using posts.json: ${postsPath}`);
  const raw = fs.readFileSync(postsPath, "utf-8");
  const data = JSON.parse(raw);
  const posts = Array.isArray(data) ? data : (data?.posts || []);
  ensureDir(outDir);
  ensureDir(tagOutDir);

  const urls = [];
  const tagUrls = [];
  // tagIndex[lang][tagSlug] = array of post card data
  const tagIndex = { pl: {}, en: {}, es: {} };

  for (const post of posts) {
    if (!post?.id) continue;

    // generujemy 3 języki jako osobne pliki (pewne SEO pod każdy)
    for (const lang of ["pl", "en", "es"]) {
      const title = pickLang(post.title, lang) || post.id;
      const contentHtml = pickLang(post.contentHtml, lang) || "";
      const description = makeDescription(post, lang);
      const date = formatDate(post.date);
      const tags = Array.isArray(post.tags) ? post.tags : [];

      // normalize tags to slugs for indexing (your posts.json should store slugs going forward)
      const tagSlugs = tags.map(t => slugify(t)).filter(Boolean);
      for (const tagSlug of tagSlugs) {
        if (!tagIndex[lang][tagSlug]) tagIndex[lang][tagSlug] = [];
        tagIndex[lang][tagSlug].push({
          title: pickLang(post.title, lang) || post.id,
          excerpt: pickLang(post.excerpt, lang) || "",
          date: formatDate(post.date),
          href: `/blog/p/${encodeURIComponent(`${post.id}.${lang}.html`)}`
        });
      }

      const fileName = `${post.id}.${lang}.html`;
      const outPath = path.join(outDir, fileName);
      const canonical = `${SITE}/blog/p/${encodeURIComponent(fileName)}`;

      const html = pageTemplate({
        lang,
        title,
        description,
        canonical,
        contentHtml,
        tags,
        date
      });

      fs.writeFileSync(outPath, html, "utf-8");
      urls.push(canonical);
    }
  }

  // Generate tag pages per language: /blog/t/<tag>.<lang>.html
  for (const lang of ["pl", "en", "es"]) {
    const tagsForLang = tagIndex[lang] || {};
    for (const [tagSlug, postsForTag] of Object.entries(tagsForLang)) {
      // newest first
      const sorted = [...postsForTag].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

      const tagName = tagLabel(tagSlug, lang);
      const title = (lang === "pl")
        ? `Wpisy: ${tagName}`
        : (lang === "es")
          ? `Artículos: ${tagName}`
          : `Posts: ${tagName}`;

      const description = (lang === "pl")
        ? `Wszystkie wpisy oznaczone tagiem „${tagName}”.`
        : (lang === "es")
          ? `Todos los artículos etiquetados como “${tagName}”.`
          : `All posts tagged “${tagName}”.`;

      const fileName = `${tagSlug}.${lang}.html`;
      const outPath = path.join(tagOutDir, fileName);
      const canonical = `${SITE}/blog/t/${encodeURIComponent(fileName)}`;

      const html = tagPageTemplate({
        lang,
        tagSlug,
        canonical,
        title,
        description,
        posts: sorted
      });

      fs.writeFileSync(outPath, html, "utf-8");
      tagUrls.push(canonical);
    }
  }

  // mini sitemap tylko dla bloga (możesz włączyć do głównego)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls, ...tagUrls].map(u => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(ROOT, "sitemap-blog.xml"), sitemap, "utf-8");

  // Patch /blog/index.html so the “Czytaj” button links to generated static pages:
  // /blog/p/<id>.<lang>.html (better SEO than query params)
  const blogIndexPath = path.join(ROOT, "blog", "index.html");
  try {
    if (fs.existsSync(blogIndexPath)) {
      let idx = fs.readFileSync(blogIndexPath, "utf-8");

      // If already patched, skip
      if (!idx.includes("/blog/p/${encodeURIComponent(p.id)}.${lang}.html")) {
        // 1) Ensure `lang` variable exists in render()
        // Insert after: `if(!listEl) return;`
        idx = idx.replace(
          /function\s+render\(posts\)\{\s*\n\s*if\(!listEl\) return;\s*/m,
          (m) => m + "\n\n        const lang = document.documentElement.lang || 'pl';\n"
        );

        // 2) Replace post link to static generated page
        // Works for both: /blog/post.html?id=${encodeURIComponent(p.id)} and simple variants.
        idx = idx.replace(
          /href=("|')\/blog\/post\.html\?id=\$\{\s*encodeURIComponent\(p\.id\)\s*\}\1/g,
          'href="$1/blog/p/${encodeURIComponent(p.id)}.${lang}.html$1'.replace(/\$1/g, '"')
        );

        // Fallback: if the above pattern didn't match (format differs), do a simpler replacement
        // on the inner URL fragment.
        idx = idx.replace(
          /\/blog\/post\.html\?id=\$\{\s*encodeURIComponent\(p\.id\)\s*\}/g,
          '/blog/p/${encodeURIComponent(p.id)}.${lang}.html'
        );

        fs.writeFileSync(blogIndexPath, idx, "utf-8");
        console.log("OK: patched blog/index.html links to /blog/p/<id>.<lang>.html");
      }
    }
  } catch (e) {
    console.warn("WARN: could not patch blog/index.html:", e?.message || e);
  }

  console.log(`OK: wygenerowano ${urls.length} stron postów + ${tagUrls.length} stron tagów + blog/sitemap-blog.xml`);
}

build();