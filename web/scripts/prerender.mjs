// Runs after `vite build`. GitHub Pages only serves real files, so this writes an
// index.html for every route (deep links and refreshes then work), each with its own
// title, description and social preview tags. It also writes 404.html, sitemap.xml and robots.txt.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { services, recentWorks } from '../src/data.ts'

const SITE = 'https://leadlineproduction.com'
const BRAND = 'LeadLine Production'
const SHARE_IMAGE = `${SITE}/favicon-512.png`
const DEFAULT_DESC =
  'LeadLine Production: live event management for corporate events, weddings, political conferences, concerts, trade shows and social galas. Your Ask Is Our Task.'

const dist = new URL('../dist/', import.meta.url)
const template = readFileSync(new URL('index.html', dist), 'utf8')

const routes = [
  { path: '/', title: `${BRAND} | Your Ask Is Our Task`, description: DEFAULT_DESC },
  { path: '/about', title: `${BRAND} | About`, description: "Meet the LeadLine Production crew, led by Founder & CEO Subhodip Ganguly: crew credits from Sunburn Festival, India's Got Talent and more, and our honour from the Nari Shakti Foundation." },
  { path: '/services', title: `${BRAND} | Services`, description: 'Corporate events, weddings, political events, concerts, trade shows and social galas, planned and produced by one crew.' },
  ...services.map((s) => ({ path: `/services/${s.slug}`, title: `${BRAND} | ${s.name}`, description: s.summary, image: s.image })),
  { path: '/work', title: `${BRAND} | Our Work`, description: 'Weddings, concerts, conferences, galas and celebrations produced by LeadLine Production.' },
  ...recentWorks.map((w) => ({ path: `/work/${w.slug}`, title: `${BRAND} | ${w.title}`, description: w.summary, image: w.cover })),
  { path: '/careers', title: `${BRAND} | Careers`, description: 'Join the LeadLine Production crew: event planning, hospitality, creative design, logistics and production roles.' },
  { path: '/contact', title: `${BRAND} | Contact`, description: 'Tell us your ask. Contact LeadLine Production in Durgapur, West Bengal by WhatsApp, phone or email.' },
  { path: '/privacy', title: `${BRAND} | Privacy policy`, description: 'How LeadLine Production collects, uses and protects your personal data.' },
  { path: '/terms', title: `${BRAND} | Terms of service`, description: 'The terms for using the LeadLine Production website.' },
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function page({ path, title, description, image }, { noindex = false } = {}) {
  const url = `${SITE}${path === '/' ? '/' : `${path}/`}`
  const img = image ? `${SITE}${image}` : SHARE_IMAGE
  const head = [
    noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ')
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`)
    .replace('</head>', `    ${head}\n  </head>`)
  if (!html.includes(`<title>${esc(title)}</title>`)) throw new Error(`Title not applied for ${path}`)
  return html
}

for (const route of routes) {
  const dir = new URL(route.path === '/' ? './' : `.${route.path}/`, dist)
  mkdirSync(dir, { recursive: true })
  writeFileSync(new URL('index.html', dir), page(route))
}

writeFileSync(new URL('404.html', dist), page({ path: '/404', title: `${BRAND} | Page not found`, description: DEFAULT_DESC }, { noindex: true }))

const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${SITE}${r.path === '/' ? '/' : `${r.path}/`}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
)
writeFileSync(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)

console.log(`Prerendered ${routes.length} routes, plus 404.html, sitemap.xml and robots.txt`)
