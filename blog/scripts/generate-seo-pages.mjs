import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const POSTS_PATH = path.join(ROOT, "blog", "data", "posts.json");
const OUT_DIR = path.join(ROOT, "blog", "p");
const SITE = "https://travelrules.eu";
const LANGS = ["pl", "en", "es"];
const requestedIds = process.argv.slice(2);

if (!requestedIds.length) {
  throw new Error("Pass at least one post id to generate.");
}

const UI = {
  pl: {
    back: "Wróć do bloga",
    related: "Powiązane artykuły",
    ctaTitle: "Zaplanuj podróż z Travel Rules",
    ctaText: "Checklisty, zasady podróżne i narzędzia do planowania w bezpłatnej aplikacji na iOS.",
    ctaButton: "Pobierz bezpłatnie na iOS",
    authorTitle: "O autorze",
    authorText: "Mateusz Młynarski, niezależny twórca aplikacji i podróżnik. Twórca Travel Rules."
  },
  en: {
    back: "Back to blog",
    related: "Related articles",
    ctaTitle: "Plan your journey with Travel Rules",
    ctaText: "Checklists, travel rules and planning tools in the free iOS app.",
    ctaButton: "Download free on iOS",
    authorTitle: "About the author",
    authorText: "Mateusz Mlynarski, independent app developer and traveler. Creator of Travel Rules."
  },
  es: {
    back: "Volver al blog",
    related: "Artículos relacionados",
    ctaTitle: "Planifica tu viaje con Travel Rules",
    ctaText: "Listas, normas de viaje y herramientas de planificación en la aplicación gratuita para iOS.",
    ctaButton: "Descargar gratis para iOS",
    authorTitle: "Sobre el autor",
    authorText: "Mateusz Mlynarski, desarrollador independiente y viajero. Creador de Travel Rules."
  }
};

const TAG_LABELS = {
  vanlife: { pl: "Vanlife", en: "Van life", es: "Van life" },
  poradnik: { pl: "Poradnik", en: "Guide", es: "Guía" },
  organizacja: { pl: "Organizacja", en: "Organization", es: "Organización" },
  budzet: { pl: "Budżet", en: "Budget", es: "Presupuesto" },
  bezpieczenstwo: { pl: "Bezpieczeństwo", en: "Safety", es: "Seguridad" },
  planowanie: { pl: "Planowanie", en: "Planning", es: "Planificación" },
  europa: { pl: "Europa", en: "Europe", es: "Europa" },
  prawo: { pl: "Prawo", en: "Law", es: "Normativa" },
  kamper: { pl: "Kamper", en: "Motorhome", es: "Autocaravana" }
};

const RELATED = {
  "campervan-fresh-water-tank-safety": {
    pl: [
      ["Prysznic i toaleta w vanie", "/blog/p/prysznic-toaleta-w-vanie-poradnik.pl.html"],
      ["Lista 87 rzeczy do kampera", "/blog/p/co-zabrac-do-kampera-lista-87-rzeczy-2026.pl.html"],
      ["Pierwsza podróż kamperem", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.pl.html"]
    ],
    en: [
      ["Campervan shower and toilet", "/blog/p/van-life-shower-toilet-guide.en.html"],
      ["87 item campervan packing list", "/blog/p/campervan-packing-list-87-essentials-2026.en.html"],
      ["First campervan trip", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.en.html"]
    ],
    es: [
      ["Ducha y baño en furgoneta", "/blog/p/ducha-bano-furgoneta-guia.es.html"],
      ["87 cosas para la autocaravana", "/blog/p/que-llevar-autocaravana-lista-87-cosas-2026.es.html"],
      ["Primer viaje en autocaravana", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.es.html"]
    ]
  },
  "campervan-condensation-mould-prevention": {
    pl: [
      ["Zima w kamperze", "/blog/p/kamperem_w_zimie_ogrzewanie_porady.pl.html"],
      ["Prysznic i toaleta w vanie", "/blog/p/prysznic-toaleta-w-vanie-poradnik.pl.html"],
      ["Jak mieszkać w vanie na pełen etat", "/blog/p/how-to-live-in-a-van-full-time-2026.pl.html"]
    ],
    en: [
      ["Winter in a camper", "/blog/p/kamperem_w_zimie_ogrzewanie_porady.en.html"],
      ["Campervan shower and toilet", "/blog/p/van-life-shower-toilet-guide.en.html"],
      ["How to live in a van full time", "/blog/p/how-to-live-in-a-van-full-time-2026.en.html"]
    ],
    es: [
      ["Invierno en autocaravana", "/blog/p/kamperem_w_zimie_ogrzewanie_porady.es.html"],
      ["Ducha y baño en furgoneta", "/blog/p/ducha-bano-furgoneta-guia.es.html"],
      ["Cómo vivir en furgoneta a tiempo completo", "/blog/p/how-to-live-in-a-van-full-time-2026.es.html"]
    ]
  },
  "van-life-budget-calculator-first-year": {
    pl: [
      ["Prawdziwy koszt vanlife w Europie", "/blog/p/ile-kosztuje-vanlife-europa-2026.pl.html"],
      ["Ukryte koszty vanlife", "/blog/p/ukryte_koszty_vanlife_o_ktorych_nikt_nie_mowi.pl.html"],
      ["Jak mieszkać w vanie na pełen etat", "/blog/p/how-to-live-in-a-van-full-time-2026.pl.html"]
    ],
    en: [
      ["The real cost of van life in Europe", "/blog/p/van-life-cost-europe-2026.en.html"],
      ["Hidden costs of van life", "/blog/p/ukryte_koszty_vanlife_o_ktorych_nikt_nie_mowi.en.html"],
      ["How to live in a van full time", "/blog/p/how-to-live-in-a-van-full-time-2026.en.html"]
    ],
    es: [
      ["El coste real del vanlife en Europa", "/blog/p/coste-vanlife-europa-2026.es.html"],
      ["Costes ocultos del vanlife", "/blog/p/ukryte_koszty_vanlife_o_ktorych_nikt_nie_mowi.es.html"],
      ["Cómo vivir en furgoneta a tiempo completo", "/blog/p/how-to-live-in-a-van-full-time-2026.es.html"]
    ]
  },
  "safe-overnight-motorhome-parking-guide": {
    pl: [
      ["Darmowe noclegi w Europie", "/blog/p/gdzie_nocowac_vanem_za_darmo_europa.pl.html"],
      ["Bezpieczeństwo w vanie", "/blog/p/bezpieczenstwo-w-vanie-zabezpieczenia-antykradziezowe.pl.html"],
      ["Najlepsze aplikacje dla kamperów", "/blog/p/najlepsze-aplikacje-dla-kamperow-europa-2026.pl.html"]
    ],
    en: [
      ["Free overnight parking in Europe", "/blog/p/where-to-sleep-in-your-van-for-free-europe.en.html"],
      ["Campervan security", "/blog/p/bezpieczenstwo-w-vanie-zabezpieczenia-antykradziezowe.en.html"],
      ["Best motorhome apps", "/blog/p/best-campervan-apps-europe-2026.en.html"]
    ],
    es: [
      ["Dormir gratis por Europa", "/blog/p/donde-dormir-gratis-furgoneta-europa.es.html"],
      ["Seguridad en la furgoneta", "/blog/p/bezpieczenstwo-w-vanie-zabezpieczenia-antykradziezowe.es.html"],
      ["Mejores apps para autocaravanas", "/blog/p/mejores-apps-autocaravana-europa-2026.es.html"]
    ]
  },
  "low-emission-zones-europe-motorhome-2026": {
    pl: [
      ["Checklista road tripu po Europie", "/blog/p/road-trip-europe-checklist.pl.html"],
      ["Najlepsze aplikacje dla kamperów", "/blog/p/najlepsze-aplikacje-dla-kamperow-europa-2026.pl.html"],
      ["e TOLL dla kampera i przyczepy", "/blog/p/e-toll-kamper-przyczepa-2026-zmiany.pl.html"]
    ],
    en: [
      ["Europe road trip checklist", "/blog/p/road-trip-europe-checklist.en.html"],
      ["Best apps for motorhome travel", "/blog/p/best-campervan-apps-europe-2026.en.html"],
      ["Poland e TOLL for motorhomes", "/blog/p/poland-e-toll-motorhome-caravan-2026.en.html"]
    ],
    es: [
      ["Lista para viajar por Europa", "/blog/p/road-trip-europe-checklist.es.html"],
      ["Mejores apps para autocaravanas", "/blog/p/mejores-apps-autocaravana-europa-2026.es.html"],
      ["e TOLL en Polonia para autocaravanas", "/blog/p/e-toll-polonia-autocaravana-caravana-2026.es.html"]
    ]
  },
  "campervan-packing-list-87-essentials-2026": {
    pl: [
      ["Pierwsza podróż kamperem", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.pl.html"],
      ["Gotowanie bez lodówki", "/blog/p/van-cooking-without-a-fridge-2026.pl.html"],
      ["Prysznic i toaleta w vanie", "/blog/p/prysznic-toaleta-w-vanie-poradnik.pl.html"]
    ],
    en: [
      ["First campervan trip", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.en.html"],
      ["Cooking without a fridge", "/blog/p/van-cooking-without-a-fridge-2026.en.html"],
      ["Campervan shower and toilet", "/blog/p/van-life-shower-toilet-guide.en.html"]
    ],
    es: [
      ["Primer viaje en autocaravana", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.es.html"],
      ["Cocinar sin nevera", "/blog/p/van-cooking-without-a-fridge-2026.es.html"],
      ["Ducha y baño en furgoneta", "/blog/p/ducha-bano-furgoneta-guia.es.html"]
    ]
  },
  "best-campervan-apps-europe-2026": {
    pl: [
      ["Darmowe noclegi w Europie", "/blog/p/gdzie_nocowac_vanem_za_darmo_europa.pl.html"],
      ["Checklista road tripu", "/blog/p/road-trip-europe-checklist.pl.html"],
      ["Bezpieczeństwo w vanie", "/blog/p/bezpieczenstwo-w-vanie-zabezpieczenia-antykradziezowe.pl.html"]
    ],
    en: [
      ["Free overnight parking in Europe", "/blog/p/where-to-sleep-in-your-van-for-free-europe.en.html"],
      ["Europe road trip checklist", "/blog/p/road-trip-europe-checklist.en.html"],
      ["Campervan security", "/blog/p/bezpieczenstwo-w-vanie-zabezpieczenia-antykradziezowe.en.html"]
    ],
    es: [
      ["Dormir gratis por Europa", "/blog/p/donde-dormir-gratis-furgoneta-europa.es.html"],
      ["Lista para un road trip", "/blog/p/road-trip-europe-checklist.es.html"],
      ["Seguridad en la furgoneta", "/blog/p/bezpieczenstwo-w-vanie-zabezpieczenia-antykradziezowe.es.html"]
    ]
  },
  "poland-etoll-motorhomes-caravans-2026": {
    pl: [
      ["Kamper 4,25 t na prawo jazdy B", "/blog/p/kamper-4250-kg-prawo-jazdy-b-2026.pl.html"],
      ["Checklista road tripu po Europie", "/blog/p/road-trip-europe-checklist.pl.html"],
      ["Najlepsze aplikacje dla kamperów", "/blog/p/najlepsze-aplikacje-dla-kamperow-europa-2026.pl.html"]
    ],
    en: [
      ["4.25 tonne motorhome licence rules", "/blog/p/4250kg-motorhome-category-b-licence-2026.en.html"],
      ["Europe road trip checklist", "/blog/p/road-trip-europe-checklist.en.html"],
      ["Best apps for motorhome travel", "/blog/p/best-campervan-apps-europe-2026.en.html"]
    ],
    es: [
      ["Autocaravana de 4.250 kg con permiso B", "/blog/p/autocaravana-4250-kg-permiso-b-2026.es.html"],
      ["Lista para viajar por Europa", "/blog/p/road-trip-europe-checklist.es.html"],
      ["Mejores apps para autocaravanas", "/blog/p/mejores-apps-autocaravana-europa-2026.es.html"]
    ]
  },
  "motorhome-4250kg-category-b-licence-2026": {
    pl: [
      ["e TOLL dla kampera i przyczepy", "/blog/p/e-toll-kamper-przyczepa-2026-zmiany.pl.html"],
      ["Pierwsza podróż kamperem", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.pl.html"],
      ["Lista 87 rzeczy do kampera", "/blog/p/co-zabrac-do-kampera-lista-87-rzeczy-2026.pl.html"]
    ],
    en: [
      ["Poland e TOLL for motorhomes", "/blog/p/poland-e-toll-motorhome-caravan-2026.en.html"],
      ["First motorhome trip", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.en.html"],
      ["87 item campervan packing list", "/blog/p/campervan-packing-list-87-essentials-2026.en.html"]
    ],
    es: [
      ["e TOLL en Polonia para autocaravanas", "/blog/p/e-toll-polonia-autocaravana-caravana-2026.es.html"],
      ["Primer viaje en autocaravana", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.es.html"],
      ["87 cosas para la autocaravana", "/blog/p/que-llevar-autocaravana-lista-87-cosas-2026.es.html"]
    ]
  }
};

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pick(object, lang) {
  return object?.[lang] || object?.en || object?.pl || object?.es || "";
}

function urlFor(post, lang) {
  return `${SITE}/blog/p/${post.slugs[lang]}.${lang}.html`;
}

function page(post, lang) {
  const ui = UI[lang];
  const title = pick(post.title, lang);
  const seoTitle = pick(post.seoTitle, lang) || title;
  const description = pick(post.excerpt, lang).slice(0, 160);
  const canonical = urlFor(post, lang);
  const alternates = LANGS.map(code =>
    `<link rel="alternate" hreflang="${code}" href="${esc(urlFor(post, code))}" />`
  ).join("\n  ");
  const tags = (post.tags || []).map(tag =>
    `<a class="tag" href="/blog/t/${esc(tag)}.${lang}.html">${esc(TAG_LABELS[tag]?.[lang] || tag)}</a>`
  ).join(" ");
  const related = (RELATED[post.id]?.[lang] || []).map(([label, href]) =>
    `<a class="btn" href="${esc(href)}">${esc(label)}</a>`
  ).join("\n            ");
  const locale = lang === "pl" ? "pl_PL" : lang === "es" ? "es_ES" : "en_US";
  const imageUrl = post.image?.src ? `${SITE}${post.image.src}` : `${SITE}/og-image.jpg`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: "Mateusz Młynarski",
      url: "https://www.linkedin.com/in/mateuszmlynarski/"
    },
    publisher: {
      "@type": "Organization",
      name: "Travel Rules",
      url: SITE
    },
    datePublished: post.date,
    dateModified: post.date,
    image: imageUrl,
    inLanguage: lang,
    url: canonical,
    mainEntityOfPage: canonical
  };

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(seoTitle)} | Travel Rules</title>
  <meta name="author" content="Mateusz Młynarski" />
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="${esc(urlFor(post, "en"))}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Travel Rules" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${esc(imageUrl)}" />
  <meta property="og:locale" content="${locale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(imageUrl)}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>
    :root{--bg:#f6f7f8;--card:#fff;--text:#0f172a;--muted:#475569;--border:#e5e7eb;--accent:#29606D;--radius:16px;--shadow:0 10px 30px rgba(2,6,23,.06);--max:1100px}
    body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:var(--text);background:var(--bg);line-height:1.65}a{color:inherit;text-decoration:none}.container{width:min(var(--max),calc(100% - 40px));margin:0 auto}.section{padding:30px 0}.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px}.muted{color:var(--muted)}.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;border:1px solid var(--border);background:var(--card);font-weight:800}.btn-ghost{background:rgba(255,255,255,.6)}.tag{display:inline-flex;gap:6px;align-items:center;font-size:.8rem;font-weight:850;padding:4px 10px;border-radius:999px;border:1px solid var(--border);color:var(--muted)}.post-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;color:var(--muted);font-weight:700;font-size:.92rem;margin-bottom:10px}h1{margin:10px 0 12px;letter-spacing:-.5px;line-height:1.15;font-size:clamp(24px,3vw,40px)}.content p{margin:10px 0}.content h2,.content h3{margin:22px 0 8px}.content ul,.content ol{margin:10px 0;padding-left:22px}.content li{margin:6px 0}.content table{width:100%;border-collapse:collapse;margin:16px 0;display:block;overflow-x:auto}.content th,.content td{border:1px solid var(--border);padding:8px 12px;text-align:left;font-size:.92rem}.content th{background:var(--bg)}.content a{text-decoration:underline;text-underline-offset:2px}
  </style>
</head>
<body><section class="section"><div class="container">
  <a class="btn btn-ghost" href="/blog/index.html?lang=${lang}">← ${esc(ui.back)}</a>
  <article class="card" style="margin-top:14px">
    <div class="post-meta"><span>${esc(post.date)}</span><span>•</span>${tags}</div>
    <h1>${esc(title)}</h1><div class="content">${pick(post.contentHtml, lang)}</div>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border)"><h3>${esc(ui.related)}</h3><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">${related}</div></div>
    <div style="margin-top:24px;padding:24px 20px;background:var(--bg);border-radius:var(--radius);text-align:center;border:1px solid var(--border)"><h3 style="margin:0 0 8px">${esc(ui.ctaTitle)}</h3><p class="muted" style="margin:0 0 16px">${esc(ui.ctaText)}</p><a class="btn" href="https://apps.apple.com/app/travel-rules/id6451070215" target="_blank" rel="noopener" style="background:#0f172a;color:#fff">${esc(ui.ctaButton)}</a></div>
    <div id="about-author" style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border)"><h3>${esc(ui.authorTitle)}</h3><p class="muted">${esc(ui.authorText)}</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="https://www.linkedin.com/in/mateuszmlynarski/" rel="noopener noreferrer" target="_blank">LinkedIn</a><a class="btn" href="https://apps.apple.com/app/travel-rules/id6451070215" rel="noopener noreferrer" target="_blank">Travel Rules</a></div></div>
  </article>
</div></section></body></html>`;
}

function updateTagPages(post, lang) {
  const href = `/blog/p/${post.slugs[lang]}.${lang}.html`;
  const readLabel = lang === "pl" ? "Czytaj" : lang === "es" ? "Leer" : "Read";
  const card = `
          <article class="card">
            <div class="post-meta"><span>${esc(post.date)}</span></div>
            <h3 class="post-title">${esc(pick(post.title, lang))}</h3>
            <p class="post-excerpt">${esc(pick(post.excerpt, lang))}</p>
            <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;">
              <a class="btn" href="${esc(href)}">${readLabel}</a>
            </div>
          </article>`;

  for (const tag of post.tags || []) {
    const tagPath = path.join(ROOT, "blog", "t", `${tag}.${lang}.html`);
    if (!fs.existsSync(tagPath)) {
      console.warn(`Missing tag page ${tag}.${lang}.html`);
      continue;
    }

    let html = fs.readFileSync(tagPath, "utf8");
    if (html.includes(`href="${href}"`)) continue;

    html = html.replace('<div class="blog-grid">', `<div class="blog-grid">${card}`);
    html = html.replace(
      /<span class="muted">(\d+) (wpis|wpisy|wpisów|post|posts|artículo|artículos)<\/span>/,
      (_, count) => {
        const total = Number(count) + 1;
        if (lang === "en") return `<span class="muted">${total} ${total === 1 ? "post" : "posts"}</span>`;
        if (lang === "es") return `<span class="muted">${total} ${total === 1 ? "artículo" : "artículos"}</span>`;
        const lastTwo = total % 100;
        const last = total % 10;
        const noun = total === 1 ? "wpis" : last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14) ? "wpisy" : "wpisów";
        return `<span class="muted">${total} ${noun}</span>`;
      }
    );
    fs.writeFileSync(tagPath, html, "utf8");
    console.log(`Updated tag ${tag}.${lang}.html`);
  }
}

const data = JSON.parse(fs.readFileSync(POSTS_PATH, "utf8"));
const posts = data.filter(post => requestedIds.includes(post.id));
const missing = requestedIds.filter(id => !posts.some(post => post.id === id));

if (missing.length) {
  throw new Error(`Unknown post ids: ${missing.join(", ")}`);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const post of posts) {
  for (const lang of LANGS) {
    const fileName = `${post.slugs[lang]}.${lang}.html`;
    fs.writeFileSync(path.join(OUT_DIR, fileName), page(post, lang), "utf8");
    console.log(`Generated ${fileName}`);
    updateTagPages(post, lang);
  }
}
