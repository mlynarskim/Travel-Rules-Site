import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script lives in /blog/scripts/, so project root is two levels up.
const ROOT = path.resolve(__dirname, "..", "..");

const POSTS_CANDIDATES = [
  path.join(ROOT, "blog", "data", "posts.json"),
  path.join(ROOT, "data", "posts.json")
];

function resolvePostsPath() {
  for (const p of POSTS_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(
    `posts.json not found. Looked for:\n- ${POSTS_CANDIDATES.join("\n- ")}`
  );
}

const outDir = path.join(ROOT, "blog", "p");
const tagOutDir = path.join(ROOT, "blog", "t");
const SITE = "https://travelrules.eu";
const LANGS = ["pl", "en", "es"];
const APP_URL = "https://apps.apple.com/app/travel-rules/id6451070215";

function slugify(input = "") {
  return String(input)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const TAG_LABELS = {
  europa: { pl: "Europa", en: "Europe", es: "Europa" },
  ranking: { pl: "Ranking", en: "Ranking", es: "Ranking" },
  dzieci: { pl: "Dzieci", en: "Kids", es: "Niños" },
  podroze: { pl: "Podróże", en: "Travel", es: "Viajes" },
  porady: { pl: "Porady", en: "Tips", es: "Consejos" },
  rodzina: { pl: "Rodzina", en: "Family", es: "Familia" },
  poradnik: { pl: "Poradnik", en: "Guide", es: "Guía" },
  vanlife: { pl: "Vanlife", en: "Van life", es: "Van life" },
  roadtrip: { pl: "Road trip", en: "Road trip", es: "Road trip" },
  bezpieczenstwo: { pl: "Bezpieczeństwo", en: "Safety", es: "Seguridad" },
  oszczedzanie: { pl: "Oszczędzanie", en: "Saving", es: "Ahorro" },
  koszty: { pl: "Koszty", en: "Costs", es: "Costes" },
  kuchnia: { pl: "Kuchnia", en: "Kitchen", es: "Cocina" },
  gotowanie: { pl: "Gotowanie", en: "Cooking", es: "Cocina" },
  digitalnomad: { pl: "Digital nomad", en: "Digital nomad", es: "Nómada digital" },
  workation: { pl: "Workation", en: "Workation", es: "Workation" },
  organizacja: { pl: "Organizacja", en: "Organization", es: "Organización" },
  budzet: { pl: "Budżet", en: "Budget", es: "Presupuesto" },
  planowanie: { pl: "Planowanie", en: "Planning", es: "Planificación" },
  kamper: { pl: "Kamper", en: "Motorhome", es: "Autocaravana" },
  przyczepa: { pl: "Przyczepa", en: "Trailer", es: "Remolque" },
  kempingi: { pl: "Kempingi", en: "Campsites", es: "Campings" },
  wildcamping: { pl: "Nocowanie na dziko", en: "Wild camping", es: "Acampada libre" },
  nocowanie: { pl: "Nocowanie", en: "Overnight stays", es: "Pernocta" },
  prawo: { pl: "Prawo", en: "Law", es: "Ley" },
  zabezpieczenia: { pl: "Zabezpieczenia", en: "Security", es: "Seguridad" },
  zwierzeta: { pl: "Zwierzęta", en: "Pets", es: "Mascotas" },
  lifestyle: { pl: "Lifestyle", en: "Lifestyle", es: "Estilo de vida" },
  pakowanie: { pl: "Pakowanie", en: "Packing", es: "Equipaje" },
  dokumenty: { pl: "Dokumenty", en: "Documents", es: "Documentos" },
  hiszpania: { pl: "Hiszpania", en: "Spain", es: "España" },
  internet: { pl: "Internet", en: "Internet", es: "Internet" },
  ebook: { pl: "E-book", en: "Ebook", es: "Ebook" },
  lifehacks: { pl: "Lifehacki", en: "Life hacks", es: "Trucos" },
  travelplanner: { pl: "Travel planner", en: "Travel planner", es: "Planificador" },
  produktywnosc: { pl: "Produktywność", en: "Productivity", es: "Productividad" },
  serwis: { pl: "Serwis", en: "Service", es: "Mantenimiento" },
  "pies-w-podrozy": { pl: "Pies w podróży", en: "Dog travel", es: "Viajar con perro" }
};

function tagLabel(tagSlug, lang) {
  const hit = TAG_LABELS[tagSlug];
  if (hit && hit[lang]) return hit[lang];
  const pretty = String(tagSlug).replace(/-/g, " ");
  return pretty.charAt(0).toUpperCase() + pretty.slice(1);
}

// Hand-picked related links for flagship posts (labels + hrefs verified by author).
// Everywhere else related posts are picked automatically by shared tags.
const RELATED = {
  "campervan-carbon-monoxide-gas-fire-safety": {
    pl: [
      ["Wilgoć i pleśń w kamperze", "/blog/p/wilgoc-kondensacja-plesn-w-kamperze.pl.html"],
      ["Pierwsza podróż kamperem", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.pl.html"],
      ["Lista 87 rzeczy do kampera", "/blog/p/co-zabrac-do-kampera-lista-87-rzeczy-2026.pl.html"]
    ],
    en: [
      ["Campervan condensation and mould", "/blog/p/campervan-condensation-mould-prevention.en.html"],
      ["First campervan trip", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.en.html"],
      ["87 item campervan packing list", "/blog/p/campervan-packing-list-87-essentials-2026.en.html"]
    ],
    es: [
      ["Condensación y moho en la autocaravana", "/blog/p/condensacion-humedad-moho-autocaravana.es.html"],
      ["Primer viaje en autocaravana", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.es.html"],
      ["87 cosas para la autocaravana", "/blog/p/que-llevar-autocaravana-lista-87-cosas-2026.es.html"]
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
      ["e-TOLL dla kampera i przyczepy", "/blog/p/e-toll-kamper-przyczepa-2026-zmiany.pl.html"]
    ],
    en: [
      ["Europe road trip checklist", "/blog/p/road-trip-europe-checklist.en.html"],
      ["Best apps for motorhome travel", "/blog/p/best-campervan-apps-europe-2026.en.html"],
      ["Poland e-TOLL for motorhomes", "/blog/p/poland-e-toll-motorhome-caravan-2026.en.html"]
    ],
    es: [
      ["Lista para viajar por Europa", "/blog/p/road-trip-europe-checklist.es.html"],
      ["Mejores apps para autocaravanas", "/blog/p/mejores-apps-autocaravana-europa-2026.es.html"],
      ["e-TOLL en Polonia para autocaravanas", "/blog/p/e-toll-polonia-autocaravana-caravana-2026.es.html"]
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
      ["e-TOLL dla kampera i przyczepy", "/blog/p/e-toll-kamper-przyczepa-2026-zmiany.pl.html"],
      ["Pierwsza podróż kamperem", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.pl.html"],
      ["Lista 87 rzeczy do kampera", "/blog/p/co-zabrac-do-kampera-lista-87-rzeczy-2026.pl.html"]
    ],
    en: [
      ["Poland e-TOLL for motorhomes", "/blog/p/poland-e-toll-motorhome-caravan-2026.en.html"],
      ["First motorhome trip", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.en.html"],
      ["87 item campervan packing list", "/blog/p/campervan-packing-list-87-essentials-2026.en.html"]
    ],
    es: [
      ["e-TOLL en Polonia para autocaravanas", "/blog/p/e-toll-polonia-autocaravana-caravana-2026.es.html"],
      ["Primer viaje en autocaravana", "/blog/p/pierwsza_podroz_kamperem_bledy_poczatkujacych.es.html"],
      ["87 cosas para la autocaravana", "/blog/p/que-llevar-autocaravana-lista-87-cosas-2026.es.html"]
    ]
  }
};

const UI = {
  pl: {
    home: "Strona główna", blog: "Blog", toc: "W tym wpisie",
    related: "Czytaj dalej",
    min_read: "min czytania",
    ctaTitle: "Zaplanuj podróż z Travel Rules",
    ctaText: "Checklisty, zasady podróżne i narzędzia do planowania w bezpłatnej aplikacji na iOS.",
    ctaApp: "Pobierz bezpłatnie na iOS", ctaEbook: "Zobacz ebook", ctaPlanner: "Otwórz planer",
    authorTitle: "O autorze",
    authorText: "Mateusz Młynarski — niezależny twórca aplikacji i podróżnik. Autor Travel Rules.",
    back: "Wróć do bloga", rights: "© Travel Rules. Wszelkie prawa zastrzeżone."
  },
  en: {
    home: "Home", blog: "Blog", toc: "In this post",
    related: "Keep reading",
    min_read: "min read",
    ctaTitle: "Plan your journey with Travel Rules",
    ctaText: "Checklists, travel rules and planning tools in the free iOS app.",
    ctaApp: "Download free on iOS", ctaEbook: "View the ebook", ctaPlanner: "Open the planner",
    authorTitle: "About the author",
    authorText: "Mateusz Młynarski — independent app developer and traveler. Creator of Travel Rules.",
    back: "Back to blog", rights: "© Travel Rules. All rights reserved."
  },
  es: {
    home: "Inicio", blog: "Blog", toc: "En este artículo",
    related: "Sigue leyendo",
    min_read: "min de lectura",
    ctaTitle: "Planifica tu viaje con Travel Rules",
    ctaText: "Listas, normas de viaje y herramientas de planificación en la app gratuita para iOS.",
    ctaApp: "Descargar gratis para iOS", ctaEbook: "Ver el ebook", ctaPlanner: "Abrir el planificador",
    authorTitle: "Sobre el autor",
    authorText: "Mateusz Młynarski — desarrollador independiente y viajero. Creador de Travel Rules.",
    back: "Volver al blog", rights: "© Travel Rules. Todos los derechos reservados."
  }
};

// Fallback cover pool (files that exist in /blog/images/).
// Posts with their own image use it; the rest get a deterministic pick.
// Fallback cover pool (files that exist in /blog/images/).
// Posts with their own image use it; the rest get a deterministic pick:
// tag affinity (2-3 candidates) + hash, so covers stay relevant but varied.
// Pexels photos carry credit info shown under the hero image.
const PEXELS_LICENSE = "https://www.pexels.com/license/";
const FALLBACKS = [
  { src: "/blog/images/wild-camping-van.jpg", w: 2268, h: 4032, credit: "", sourceUrl: "", licenseUrl: "" },
  { src: "/blog/images/van-life-budget-calculator.jpg", w: 1600, h: 1067, credit: "", sourceUrl: "", licenseUrl: "" },
  { src: "/blog/images/safe-overnight-motorhome-parking.jpg", w: 1600, h: 1000, credit: "", sourceUrl: "", licenseUrl: "" },
  { src: "/blog/images/vanlife-costs-1.jpg", w: 4032, h: 3024, credit: "", sourceUrl: "", licenseUrl: "" },
  { src: "/blog/images/vanlife-costs-2.jpg", w: 4032, h: 3024, credit: "", sourceUrl: "", licenseUrl: "" },
  { src: "/blog/images/digital-nomad-van.jpg", w: 4032, h: 3024, credit: "", sourceUrl: "", licenseUrl: "" },
  { src: "/blog/images/spain-camper.jpg", w: 2268, h: 4032, credit: "", sourceUrl: "", licenseUrl: "" },
  { src: "/blog/images/camper-cooking.jpg", w: 1600, h: 1000, credit: "Kampus Production", sourceUrl: "https://www.pexels.com/photo/a-woman-cooking-inside-an-rv-7476248/", licenseUrl: PEXELS_LICENSE },
  { src: "/blog/images/packing-suitcase.jpg", w: 1600, h: 1000, credit: "Pexels", sourceUrl: "https://www.pexels.com/photo/packing-suitcase-for-traveling-9186152/", licenseUrl: PEXELS_LICENSE },
  { src: "/blog/images/family-van-trip.jpg", w: 1600, h: 1000, credit: "Pexels", sourceUrl: "https://www.pexels.com/photo/family-on-a-van-14809953/", licenseUrl: PEXELS_LICENSE },
  { src: "/blog/images/dog-car-travel.jpg", w: 1600, h: 1000, credit: "Pexels", sourceUrl: "https://www.pexels.com/photo/dog-in-a-car-with-its-head-sticking-out-the-window-26821389/", licenseUrl: PEXELS_LICENSE },
  { src: "/blog/images/winter-camper.jpg", w: 1600, h: 1000, credit: "Jeremy Li", sourceUrl: "https://www.pexels.com/photo/scenic-winter-rv-camping-in-forest-landscape-30169347/", licenseUrl: PEXELS_LICENSE },
  { src: "/blog/images/mountain-road-van.jpg", w: 1600, h: 1000, credit: "Pexels", sourceUrl: "https://www.pexels.com/photo/camping-van-on-the-road-in-the-mountains-17801948/", licenseUrl: PEXELS_LICENSE },
  { src: "/blog/images/work-in-motorhome.jpg", w: 1600, h: 1000, credit: "Pexels", sourceUrl: "https://www.pexels.com/photo/a-couple-inside-a-motorhome-7476236/", licenseUrl: PEXELS_LICENSE },
  { src: "/blog/images/europe-old-town.jpg", w: 1600, h: 1000, credit: "Pexels", sourceUrl: "https://www.pexels.com/photo/bustling-european-old-town-street-at-dusk-34538705/", licenseUrl: PEXELS_LICENSE }
];
// tag slug -> candidate pool indices (hash picks one, so same tags don't all look identical)
const TAG_IMAGES = {
  budzet: [1, 3, 4], oszczedzanie: [1, 3, 4], koszty: [3, 4, 1],
  bezpieczenstwo: [2, 0], prawo: [2, 12], zabezpieczenia: [2, 0],
  digitalnomad: [5, 13], workation: [5, 13], internet: [5, 13],
  hiszpania: [6, 12], "cieple-kraje": [6, 9],
  wildcamping: [0, 12, 2], nocowanie: [0, 2], kempingi: [0, 6],
  vanlife: [12, 0, 6], kamper: [12, 11, 4], roadtrip: [12, 14, 6],
  podroze: [12, 14, 6], europa: [14, 12, 6],
  gotowanie: [7], kuchnia: [7],
  pakowanie: [8], dokumenty: [8, 13], organizacja: [8, 13, 1], planowanie: [1, 8, 13],
  rodzina: [9], dzieci: [9],
  zwierzeta: [10], "pies-w-podrozy": [10],
  zima: [11],
  lifestyle: [13, 6, 9]
};

function hashStr(s) {
  let h = 0;
  const str = String(s || "");
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

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
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.pl || obj.en || obj.es || "";
}

function postSlug(post, lang = "pl") {
  return pickLang(post?.slugs, lang) || post?.id || "post";
}

function stripHtml(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readingMinutes(contentHtml, lang) {
  const words = stripHtml(pickLang(contentHtml, lang)).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function resolveCover(post, lang) {
  if (post?.image?.src) {
    return {
      src: post.image.src,
      w: post.image.width || 1600,
      h: post.image.height || 1067,
      credit: post.image.credit || "",
      sourceUrl: post.image.sourceUrl || "",
      licenseUrl: post.image.licenseUrl || ""
    };
  }
  const inline = String(pickLang(post?.contentHtml, lang)).match(/<img[^>]+src="([^"]+)"/i);
  if (inline) return { src: inline[1], w: 0, h: 0, credit: "", sourceUrl: "", licenseUrl: "" };
  const pool = [];
  for (const t of post?.tags || []) {
    const arr = TAG_IMAGES[String(t || "").toLowerCase()];
    if (arr) for (const i of arr) if (!pool.includes(i)) pool.push(i);
  }
  const idx = pool.length ? pool[hashStr(post?.id) % pool.length] : hashStr(post?.id) % FALLBACKS.length;
  return { ...FALLBACKS[idx] };
}

function absUrl(src) {
  if (!src) return `${SITE}/blog/images/wild-camping-van.jpg`;
  if (/^https?:\/\//i.test(src)) return src;
  return SITE + (src.startsWith("/") ? src : "/" + src);
}

function formatDate(iso, lang) {
  try {
    return new Intl.DateTimeFormat(lang, { year: "numeric", month: "short", day: "2-digit" })
      .format(new Date(iso + "T00:00:00"));
  } catch {
    return iso || "";
  }
}

function makeDescription(post, lang) {
  const ex = pickLang(post.excerpt, lang);
  if (ex) return ex.slice(0, 160);
  return stripHtml(pickLang(post.contentHtml, lang)).slice(0, 160);
}

// Add ids to h2 headings and return { html, toc: [{id, text}] }
function withToc(contentHtml) {
  let i = 0;
  const toc = [];
  const html = String(contentHtml || "").replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (m, attrs, inner) => {
    i += 1;
    const idMatch = String(attrs).match(/\sid="([^"]+)"/);
    const id = idMatch ? idMatch[1] : `sekcja-${i}`;
    toc.push({ id, text: stripHtml(inner).slice(0, 120) });
    if (idMatch) return m;
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  return { html, toc };
}

function autoRelated(post, allPosts, lang) {
  const tags = (post.tags || []).map((x) => String(x).toLowerCase());
  return allPosts
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      p,
      score: (p.tags || []).filter((x) => tags.includes(String(x).toLowerCase())).length
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (b.p.date || "").localeCompare(a.p.date || ""))
    .slice(0, 3)
    .map(({ p }) => ({
      title: pickLang(p.title, lang) || p.id,
      href: `/blog/p/${encodeURIComponent(`${postSlug(p, lang)}.${lang}.html`)}`
    }));
}

const BASE_CSS = `:root{--bg:#f6f7f8;--card:#fff;--text:#0f172a;--muted:#475569;--border:#e5e7eb;--accent:#29606D;--radius:16px;--shadow:0 10px 30px rgba(2,6,23,.06);--max:1100px;--measure:760px}
html[data-theme="dark"]{--bg:#0b1220;--card:#0f172a;--text:#e5e7eb;--muted:#94a3b8;--border:#1f2937}
*{box-sizing:border-box}body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:var(--text);background:var(--bg);line-height:1.7}a{color:inherit;text-decoration:none}.container{width:min(var(--max),calc(100% - 40px));margin:0 auto}.section{padding:30px 0}
.site-header{position:sticky;top:0;z-index:50;background:color-mix(in oklab,var(--bg) 82%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid color-mix(in oklab,var(--border) 75%,transparent)}
.header-inner{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 0}
.brand{display:flex;align-items:center;gap:10px;font-weight:800}.brand-mark{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;background:var(--accent);color:#fff;font-weight:900;font-size:.85rem}
.header-controls{display:flex;align-items:center;gap:10px}.icon-btn{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:999px;cursor:pointer;border:1px solid var(--border);background:var(--card);color:var(--text);font-size:18px}
.lang-select{height:42px;border-radius:999px;padding:0 12px;font-weight:800;cursor:pointer;border:1px solid var(--border);background:var(--card);color:var(--text)}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px}.muted{color:var(--muted)}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;border-radius:999px;border:1px solid var(--border);background:var(--card);font-weight:800;font-size:.92rem;color:var(--text)}.btn-primary{background:var(--accent);border-color:var(--accent);color:#fff}
.crumbs{display:flex;gap:8px;flex-wrap:wrap;align-items:center;color:var(--muted);font-size:.9rem;font-weight:700;margin-bottom:14px}.crumbs a:hover{text-decoration:underline}
.article{max-width:var(--measure);margin:0 auto}
.post-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;color:var(--muted);font-weight:700;font-size:.9rem;margin-bottom:10px}.tag{display:inline-flex;font-size:.8rem;font-weight:850;padding:4px 10px;border-radius:999px;border:1px solid var(--border);color:var(--muted)}
h1{margin:10px 0 12px;letter-spacing:-.5px;line-height:1.15;font-size:clamp(26px,3.4vw,40px)}.lede{color:var(--muted);font-size:1.08rem;margin:0 0 6px}
.hero-figure{margin:18px 0 6px}.hero-figure img{display:block;width:100%;height:auto;border-radius:14px;aspect-ratio:16/10;object-fit:cover}.hero-figure figcaption{font-size:.85rem;margin-top:7px;color:var(--muted)}.hero-figure figcaption a{text-decoration:underline}
.toc{margin:18px 0;padding:16px 18px;border:1px solid var(--border);border-radius:12px}.toc-title{font-weight:900;font-size:.9rem;letter-spacing:.4px;text-transform:uppercase;color:var(--muted);margin:0 0 8px}.toc ul{margin:0;padding-left:18px}.toc li{margin:5px 0;font-size:.95rem}.toc a:hover,.content a{text-decoration:underline;text-underline-offset:2px}
.content{font-size:1.02rem}.content p{margin:12px 0}.content h2{margin:30px 0 10px;font-size:1.45rem;scroll-margin-top:90px}.content h3{margin:24px 0 8px;font-size:1.15rem;scroll-margin-top:90px}.content ul,.content ol{margin:12px 0;padding-left:22px}.content li{margin:7px 0}.content img{max-width:100%;height:auto;border-radius:12px}.content table{width:100%;border-collapse:collapse;margin:16px 0;display:block;overflow-x:auto}.content th,.content td{border:1px solid var(--border);padding:8px 12px;text-align:left;font-size:.92rem}.content figure{margin:18px 0}.content figcaption{font-size:.85rem;color:var(--muted);margin-top:7px}
.share-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px;padding-top:16px;border-top:1px solid var(--border)}
.author{margin-top:22px;padding-top:16px;border-top:1px solid var(--border)}.related{margin-top:26px}.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:12px}@media(max-width:760px){.related-grid{grid-template-columns:1fr}}
.rel-card{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden}.rel-card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}.rel-body{padding:12px}.rel-body h4{margin:0;font-size:.95rem;line-height:1.35}
.cta-panel{margin-top:22px;padding:26px 22px;border-radius:var(--radius);text-align:center;border:1px solid var(--border)}.cta-btns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:14px}
.mini-footer{padding:26px 0 34px;border-top:1px solid var(--border);margin-top:26px}.mini-footer-inner{display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between}.mini-footer small,.mini-footer a{color:var(--muted)}.mini-links{display:flex;gap:12px}`;

function headerHtml(lang) {
  const opts = LANGS.map((l) => `<option value="${l}"${l === lang ? " selected" : ""}>${l.toUpperCase()}</option>`).join("");
  return `<header class="site-header"><div class="container header-inner">` +
    `<a class="brand" href="/" aria-label="Travel Rules home"><span class="brand-mark">TR</span><span>Travel Rules</span></a>` +
    `<div class="header-controls"><button class="icon-btn" id="themeToggle" type="button" aria-label="Toggle theme"><span id="themeIcon" aria-hidden="true">☀️</span></button>` +
    `<select class="lang-select" id="langSelect" aria-label="Language">${opts}</select></div>` +
    `</div></header>`;
}

function themeScript(extra = "") {
  return `<script>(function(){var b=document.body;function t(){try{var s=localStorage.getItem('tr_theme');if(s==='dark'||s==='light')return s}catch(e){}return (window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}function a(th){document.documentElement.setAttribute('data-theme',th);try{localStorage.setItem('tr_theme',th)}catch(e){}var i=document.getElementById('themeIcon');if(i)i.textContent=th==='dark'?'🌙':'☀️'}a(t());var btn=document.getElementById('themeToggle');if(btn)btn.addEventListener('click',function(){a(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark')});var sel=document.getElementById('langSelect');if(sel)sel.addEventListener('change',function(e){try{localStorage.setItem('tr_lang',e.target.value)}catch(err){}${extra}});})();<\/script>`;
}

function pageTemplate({ post, lang, allPosts }) {
  const ui = UI[lang];
  const title = pickLang(post.title, lang) || post.id;
  const seoTitle = pickLang(post.seoTitle, lang) || title;
  const description = makeDescription(post, lang);
  const date = post.date || "";
  const modified = post.modified || date;
  const displayDate = formatDate(date, lang);
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const tagSlugs = tags.map((t) => slugify(t)).filter(Boolean);
  const fileName = `${postSlug(post, lang)}.${lang}.html`;
  const canonical = `${SITE}/blog/p/${encodeURIComponent(fileName)}`;
  const alternates = LANGS.map(
    (code) => `<link rel="alternate" hreflang="${code}" href="${esc(`${SITE}/blog/p/${encodeURIComponent(`${postSlug(post, code)}.${code}.html`)}`)}" />`
  ).join("\n  ");
  const locale = lang === "pl" ? "pl_PL" : lang === "es" ? "es_ES" : "en_US";
  const cover = resolveCover(post, lang);
  const imageUrl = absUrl(cover.src);
  const mins = readingMinutes(post.contentHtml, lang);
  const { html: contentHtml, toc } = withToc(pickLang(post.contentHtml, lang));
  const excerpt = pickLang(post.excerpt, lang);
  const words = stripHtml(pickLang(post.contentHtml, lang)).split(/\s+/).filter(Boolean).length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl,
    author: { "@type": "Person", name: "Mateusz Młynarski", url: "https://www.linkedin.com/in/mateuszmlynarski/" },
    publisher: { "@type": "Organization", name: "Travel Rules", url: SITE },
    datePublished: date,
    dateModified: modified,
    wordCount: words,
    timeRequired: `PT${mins}M`,
    inLanguage: lang,
    url: canonical,
    mainEntityOfPage: canonical
  };

  const credit = cover.credit
    ? `<figcaption>${cover.sourceUrl ? `<a href="${esc(cover.sourceUrl)}" rel="noopener" target="_blank">${esc(cover.credit)}</a>` : esc(cover.credit)}${cover.licenseUrl ? ` · <a href="${esc(cover.licenseUrl)}" rel="noopener" target="_blank">Pexels</a>` : ""}</figcaption>`
    : "";
  const dims = cover.w && cover.h ? ` width="${cover.w}" height="${cover.h}"` : "";

  const tocHtml = toc.length >= 2
    ? `<nav class="toc" aria-label="${esc(ui.toc)}"><p class="toc-title">${esc(ui.toc)}</p><ul>${toc.map((x) => `<li><a href="#${esc(x.id)}">${esc(x.text)}</a></li>`).join("")}</ul></nav>`
    : "";

  const shareUrl = encodeURIComponent(canonical);
  const shareTitle = encodeURIComponent(title);

  let related = (RELATED[post.id]?.[lang] || []).map(([label, href]) => ({ title: label, href }));
  if (!related.length) related = autoRelated(post, allPosts, lang);

  const langSwitch = LANGS.map((code) => `'${code}':'${postSlug(post, code)}.${code}.html'`).join(",");

  return `<!doctype html>
<html lang="${esc(lang)}" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(seoTitle)} | Travel Rules</title>
  <meta name="author" content="Mateusz Młynarski" />
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${esc(canonical)}" />
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="${esc(`${SITE}/blog/p/${encodeURIComponent(`${postSlug(post, "en")}.en.html`)}`)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Travel Rules" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${esc(imageUrl)}" />
  <meta property="og:locale" content="${locale}" />
  <meta property="article:published_time" content="${esc(date)}" />
  <meta property="article:modified_time" content="${esc(modified)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(imageUrl)}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>${BASE_CSS}</style>
</head>
<body>
${headerHtml(lang)}
<section class="section"><div class="container">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">${esc(ui.home)}</a><span>/</span><a href="/blog/index.html?lang=${esc(lang)}">${esc(ui.blog)}</a><span>/</span><span aria-current="page">${esc(title)}</span></nav>
  <article class="card article">
    <div class="post-meta"><span>${esc(displayDate)}</span><span>•</span><span>${mins} ${esc(ui.min_read)}</span>${tagSlugs.length ? `<span>•</span>${tagSlugs.map((t) => `<a class="tag" href="/blog/t/${esc(t)}.${esc(lang)}.html">${esc(tagLabel(t, lang))}</a>`).join(" ")}` : ""}</div>
    <h1>${esc(title)}</h1>
    ${excerpt ? `<p class="lede">${esc(excerpt)}</p>` : ""}
    <figure class="hero-figure"><img src="${esc(cover.src)}"${dims} alt="${esc(title)}" fetchpriority="high" />${credit}</figure>
    ${tocHtml}
    <div class="content">${contentHtml || `<p class="muted">Brak treści.</p>`}</div>
    <div class="share-row">
      <a class="btn" href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}" target="_blank" rel="noopener">X</a>
      <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noopener">Facebook</a>
      <button class="btn" type="button" onclick="navigator.clipboard&&navigator.clipboard.writeText('${esc(canonical)}')">${esc(lang === "pl" ? "Kopiuj link" : lang === "es" ? "Copiar enlace" : "Copy link")}</button>
    </div>
    <div class="author" style="margin-top:22px;padding-top:16px;border-top:1px solid var(--border)"><h3>${esc(ui.authorTitle)}</h3><p class="muted">${esc(ui.authorText)}</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="https://www.linkedin.com/in/mateuszmlynarski/" rel="noopener noreferrer" target="_blank">LinkedIn</a><a class="btn" href="${APP_URL}" rel="noopener noreferrer" target="_blank">Travel Rules</a></div></div>
    <div class="cta-panel"><h3 style="margin:0 0 8px">${esc(ui.ctaTitle)}</h3><p class="muted" style="margin:0">${esc(ui.ctaText)}</p><div class="cta-btns"><a class="btn btn-primary" href="${APP_URL}" target="_blank" rel="noopener">${esc(ui.ctaApp)}</a><a class="btn" href="/ebook/">${esc(ui.ctaEbook)}</a><a class="btn" href="/planer/">${esc(ui.ctaPlanner)}</a></div></div>
    ${related.length ? `<div class="related"><h3>${esc(ui.related)}</h3><div class="related-grid">${related.map((r) => `<article class="rel-card"><a href="${esc(r.href)}" tabindex="-1" aria-hidden="true"><img src="${esc(relatedCover(r.href, allPosts, lang))}" alt="" loading="lazy" decoding="async" /></a><div class="rel-body"><h4><a href="${esc(r.href)}">${esc(r.title)}</a></h4></div></article>`).join("")}</div></div>` : ""}
  </article>
  <div style="margin-top:14px"><a class="btn" href="/blog/index.html?lang=${esc(lang)}">← ${esc(ui.back)}</a></div>
</div></section>
<footer class="mini-footer"><div class="container mini-footer-inner"><small>${esc(ui.rights)}</small><div class="mini-links"><a href="/">Home</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div></div></footer>
${themeScript(`var m={${langSwitch}};if(m[e.target.value])location.href=m[e.target.value];`)}
</body>
</html>`;
}

// Resolve a cover for a related link (href -> post -> cover, else hash fallback)
function relatedCover(href, allPosts, lang) {
  const m = String(href).match(/\/blog\/p\/(.+)\.(pl|en|es)\.html/);
  if (m) {
    const slug = decodeURIComponent(m[1]);
    const found = allPosts.find((p) => LANGS.some((l) => postSlug(p, l) === slug));
    if (found) return resolveCover(found, lang).src;
  }
  return FALLBACKS[hashStr(href) % FALLBACKS.length].src;
}

function tagPageTemplate({ lang, tagSlug, canonical, title, description, posts }) {
  const ui = UI[lang];
  const tagName = tagLabel(tagSlug, lang);
  const alternates = LANGS.map(
    (code) => `<link rel="alternate" hreflang="${code}" href="${esc(`${SITE}/blog/t/${encodeURIComponent(tagSlug)}.${code}.html`)}" />`
  ).join("\n  ");
  const readLabel = lang === "pl" ? "Czytaj" : lang === "es" ? "Leer" : "Read";
  const minsLabel = ui.min_read;
  return `<!doctype html>
<html lang="${esc(lang)}" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)} — Travel Rules</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${esc(canonical)}" />
  ${alternates}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Travel Rules" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <style>${BASE_CSS}.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}@media(max-width:980px){.blog-grid{grid-template-columns:1fr 1fr}}@media(max-width:640px){.blog-grid{grid-template-columns:1fr}}.tcard{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden}.tcard img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}.tcard-body{padding:14px}.tcard h3{margin:6px 0;font-size:1rem;line-height:1.35}.tcard p{margin:0;color:var(--muted);font-size:.92rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}</style>
</head>
<body>
${headerHtml(lang)}
<section class="section"><div class="container">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">${esc(ui.home)}</a><span>/</span><a href="/blog/index.html?lang=${esc(lang)}">${esc(ui.blog)}</a><span>/</span><span aria-current="page">#${esc(tagName)}</span></nav>
  <div class="card">
    <div class="post-meta"><span class="tag">#${esc(tagName)}</span><span>•</span><span>${esc(posts.length)} ${esc(posts.length === 1 ? (lang === "pl" ? "wpis" : lang === "es" ? "artículo" : "post") : lang === "pl" ? "wpisów" : lang === "es" ? "artículos" : "posts")}</span></div>
    <h1>${esc(title)}</h1>
    <p class="muted">${esc(description)}</p>
    <div class="blog-grid">
      ${posts.map((p) => `<article class="tcard"><a href="${esc(p.href)}" tabindex="-1" aria-hidden="true"><img src="${esc(p.img)}" alt="" loading="lazy" decoding="async" /></a><div class="tcard-body"><div class="post-meta"><span>${esc(p.date)}</span><span>•</span><span>${p.mins} ${esc(minsLabel)}</span></div><h3><a href="${esc(p.href)}">${esc(p.title)}</a></h3><p>${esc(p.excerpt)}</p><div style="margin-top:10px"><a class="btn" href="${esc(p.href)}">${readLabel}</a></div></div></article>`).join("")}
    </div>
  </div>
  <div style="margin-top:14px"><a class="btn" href="/blog/index.html?lang=${esc(lang)}">← ${esc(ui.back)}</a></div>
</div></section>
<footer class="mini-footer"><div class="container mini-footer-inner"><small>${esc(ui.rights)}</small><div class="mini-links"><a href="/">Home</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div></div></footer>
${themeScript(`location.href='/blog/index.html?lang='+e.target.value;`)}
</body>
</html>`;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function build() {
  const postsPath = resolvePostsPath();
  console.log(`Using posts.json: ${postsPath}`);
  const raw = fs.readFileSync(postsPath, "utf-8");
  const data = JSON.parse(raw);
  const posts = Array.isArray(data) ? data : data?.posts || [];
  ensureDir(outDir);
  ensureDir(tagOutDir);

  const urls = [];
  const tagUrls = [];
  const tagIndex = { pl: {}, en: {}, es: {} };

  for (const post of posts) {
    if (!post?.id) continue;
    for (const lang of LANGS) {
      const fileName = `${postSlug(post, lang)}.${lang}.html`;
      const outPath = path.join(outDir, fileName);
      const canonical = `${SITE}/blog/p/${encodeURIComponent(fileName)}`;
      fs.writeFileSync(outPath, pageTemplate({ post, lang, allPosts: posts }), "utf-8");
      urls.push({ loc: canonical, lastmod: post.modified || post.date });

      const tagSlugs = (Array.isArray(post.tags) ? post.tags : []).map((t) => slugify(t)).filter(Boolean);
      for (const tagSlug of tagSlugs) {
        if (!tagIndex[lang][tagSlug]) tagIndex[lang][tagSlug] = [];
        tagIndex[lang][tagSlug].push({
          title: pickLang(post.title, lang) || post.id,
          excerpt: pickLang(post.excerpt, lang) || "",
          date: formatDate(post.date, lang),
          rawDate: post.date || "",
          lastmod: post.modified || post.date || "",
          mins: readingMinutes(post.contentHtml, lang),
          img: resolveCover(post, lang).src,
          href: `/blog/p/${encodeURIComponent(fileName)}`
        });
      }
    }
  }

  for (const lang of LANGS) {
    for (const [tagSlug, items] of Object.entries(tagIndex[lang] || {})) {
      const sorted = [...items].sort((a, b) => (b.rawDate || "").localeCompare(a.rawDate || ""));
      const tagName = tagLabel(tagSlug, lang);
      const title = lang === "pl" ? `Wpisy: ${tagName}` : lang === "es" ? `Artículos: ${tagName}` : `Posts: ${tagName}`;
      const description = lang === "pl"
        ? `Wszystkie wpisy oznaczone tagiem „${tagName}” na blogu Travel Rules.`
        : lang === "es"
          ? `Todos los artículos etiquetados como “${tagName}” en el blog de Travel Rules.`
          : `All posts tagged “${tagName}” on the Travel Rules blog.`;
      const fileName = `${tagSlug}.${lang}.html`;
      const canonical = `${SITE}/blog/t/${encodeURIComponent(fileName)}`;
      fs.writeFileSync(
        path.join(tagOutDir, fileName),
        tagPageTemplate({ lang, tagSlug, canonical, title, description, posts: sorted }),
        "utf-8"
      );
      const lastmod = [...sorted].sort((a, b) => (b.lastmod || "").localeCompare(a.lastmod || ""))[0]?.lastmod || "";
      tagUrls.push({ loc: canonical, lastmod });
    }
  }

  const urlEntry = (u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls, ...tagUrls].map(urlEntry).join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT, "sitemap-blog.xml"), sitemap, "utf-8");

  console.log(`OK: wygenerowano ${urls.length} stron postów + ${tagUrls.length} stron tagów + sitemap-blog.xml`);
}

build();
