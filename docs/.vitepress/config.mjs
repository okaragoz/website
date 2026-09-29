import { defineConfig } from 'vitepress'
import menu from './data/menu.json' with { type: 'json' }

// ── Site identity (update SITE if the domain changes) ──
const SITE = 'https://okaragoz.com'
const AUTHOR = 'Oguzcan Karagoz'
const DEFAULT_DESC = 'Oguzcan Karagoz, planetary scientist studying the structural geology, tectonics and geodynamics of Mars, Venus and the icy moons.'
const DEFAULT_OG_IMAGE = `${SITE}/images/hero/oguzcan-portrait.png`

// JSON-LD describing the researcher (helps Google / academic knowledge graph)
const PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: AUTHOR,
  givenName: 'Oguzcan',
  familyName: 'Karagoz',
  jobTitle: 'Planetary Scientist',
  email: 'mailto:oguzcan.karagoz@geologie.uni-freiburg.de',
  url: SITE,
  image: DEFAULT_OG_IMAGE,
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Freiburg',
    department: 'General Geology & Structural Geology, Institute of Earth and Environmental Sciences',
  },
  knowsAbout: [
    'Planetary tectonics', 'Geodynamics', 'Structural geology',
    'Mars', 'Venus', 'Ganymede', 'Wrinkle ridges', 'Coronae', 'Numerical modelling',
  ],
  sameAs: [
    'https://orcid.org/0000-0002-0656-7396',
    'https://scholar.google.com/citations?user=Byq8LX4AAAAJ',
    'https://www.webofscience.com/wos/author/record/57354059800',
    'https://freidok.uni-freiburg.de/pers/276115',
  ],
}

// ── Time-of-day appearance ──
// Light during the day, dark at night. Runs before VitePress's own `check-dark-mode`
// script, so it only has to write the key that script already reads.
// A manual toggle wins until the period flips (override tonight → light again tomorrow).
const DAY_START = 7    // 07:00 → light
const NIGHT_START = 19 // 19:00 → dark
const TIME_THEME_SCRIPT = `(()=>{try{
  var K='vitepress-theme-appearance',P='ok-appearance-pin';
  var h=new Date().getHours(),period=(h>=${NIGHT_START}||h<${DAY_START})?'dark':'light';
  var pin=localStorage.getItem(P);
  if(pin===period){return}            // manual choice still inside the period it was made in
  localStorage.removeItem(P);          // period flipped → resume following the clock
  localStorage.setItem(K,period);
}catch(e){}})();`

export default defineConfig({
  title: AUTHOR,
  titleTemplate: `:title | ${AUTHOR}`,
  description: DEFAULT_DESC,
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,
  sitemap: { hostname: SITE },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&family=JetBrains+Mono:wght@400;500&display=swap'
    }],
    ['link', { rel: 'icon', href: '/favicon.ico?v=3', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32.png?v=3' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=3' }],
    ['meta', { name: 'author', content: AUTHOR }],
    ['meta', { name: 'theme-color', content: '#0e1014' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:site_name', content: AUTHOR }],
    ['meta', { property: 'og:image', content: DEFAULT_OG_IMAGE }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'me', href: 'https://orcid.org/0000-0002-0656-7396' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(PERSON_LD)],
    ['script', { id: 'ok-time-theme' }, TIME_THEME_SCRIPT],
  ],

  // ── Per-page SEO: description, Open Graph, Twitter, canonical, article tags ──
  transformPageData(pageData) {
    const fm = pageData.frontmatter || {}
    const clean = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
    const url = `${SITE}/${clean}`
    const desc = fm.excerpt || fm.description || DEFAULT_DESC
    const isHome = pageData.relativePath === 'index.md'
    const title = isHome
      ? `${AUTHOR}, Planetary Scientist`
      : (pageData.title ? `${pageData.title} | ${AUTHOR}` : AUTHOR)
    const isPost = !!(fm.date && fm.category)
    const img = fm.image
      ? (fm.image.startsWith('http') ? fm.image : `${SITE}${fm.image}`)
      : DEFAULT_OG_IMAGE

    const head = (pageData.frontmatter.head ??= [])
    head.push(
      ['meta', { name: 'description', content: desc }],
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: isPost ? 'article' : 'website' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: desc }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: img }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: desc }],
      ['meta', { name: 'twitter:image', content: img }],
    )

    if (isPost) {
      head.push(
        ['meta', { property: 'article:published_time', content: new Date(fm.date).toISOString() }],
        ['meta', { property: 'article:author', content: AUTHOR }],
        ['meta', { property: 'article:section', content: fm.category === 'research' ? 'Research' : 'Essays' }],
        ['script', { type: 'application/ld+json' }, JSON.stringify({
          '@context': 'https://schema.org',
          '@type': fm.category === 'research' ? 'ScholarlyArticle' : 'BlogPosting',
          headline: pageData.title,
          description: desc,
          image: img,
          datePublished: new Date(fm.date).toISOString(),
          author: { '@type': 'Person', name: AUTHOR, url: SITE },
          publisher: { '@type': 'Person', name: AUTHOR },
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          keywords: Array.isArray(fm.tags) ? fm.tags.join(', ') : undefined,
        })],
      )
    }
  },

  // ── Markdown: LaTeX math + Dracula code highlighting ──
  markdown: {
    math: true,
    theme: { light: 'dracula', dark: 'dracula' },
  },

  themeConfig: {
    // Navbar wordmark only (page <title> and SEO keep the plain author name)
    siteTitle: 'Dr. Oguzcan Karagoz',
    nav: menu.nav,

    // No left sidebar anywhere: pages use the full-width doc layout and keep
    // only the right-hand "On this page" outline. (Removes the left pane and
    // the footer-overlap it caused.)
    sidebar: false,

    outline: { level: [2, 3], label: 'Blog Content' },
    docFooter: { prev: 'Previous', next: 'Next' },
    lastUpdatedText: 'Updated',
    search: { provider: 'local' },
  },
})
