#!/usr/bin/env node
/**
 * Auto-update docs/.vitepress/data/publications.json from ORCID (primary,
 * reliable) merged with Google Scholar (best-effort; Scholar blocks bots, so
 * it may yield nothing in CI — that is fine, ORCID carries the list).
 *
 * Dedupe is by DOI and by normalized title, so the two sources never duplicate.
 *
 * Usage:  node scripts/update-publications.mjs [--out <path>]
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const ORCID_ID = '0000-0002-0656-7396'
const SCHOLAR_ID = 'Byq8LX4AAAAJ'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outArgIdx = process.argv.indexOf('--out')
const OUT = outArgIdx !== -1
  ? resolve(process.cwd(), process.argv[outArgIdx + 1])
  : resolve(__dirname, '../docs/.vitepress/data/publications.json')

const decodeEntities = (s) =>
  (s || '')
    .replace(/&amp;/g, '&').replace(/&#0*39;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).trim()

// Some sources (e.g. Scholar) hand back SHOUTING ALL-CAPS titles. Detect those
// and convert to Title Case (minor words lowercased) so they don't yell on the page.
const SMALL_WORDS = new Set(['a','an','and','as','at','but','by','for','from','in','of','on','or','the','to','vs','via','with'])
const fixCaps = (title) => {
  const t = decodeEntities(title)
  const letters = t.replace(/[^A-Za-z]/g, '')
  if (!letters) return t
  const upperRatio = (t.match(/[A-Z]/g) || []).length / letters.length
  if (upperRatio < 0.7) return t // already mixed/normal case — leave it
  let first = true
  return t.toLowerCase().split(/(\s+)/).map((w) => {
    if (!w.trim()) return w
    const word = !first && SMALL_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)
    first = false
    return word
  }).join('')
}

const norm = (s) => decodeEntities(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
// short key catches near-duplicates across sources (corrigenda, year drift, casing)
const keyOf = (s) => norm(s).slice(0, 48)
// ORCID files every Copernicus deposit under type `preprint`, but nearly all
// of them are conference abstracts that merely share the 10.5194 prefix:
// egusphere-eguNN-… (EGU General Assembly), epscYYYY-… and epsc-dpsYYYY-…
// (EPSC / EPSC-DPS). A deposit without a meeting stamp — egusphere-YYYY-N, or
// anything on arXiv/ESSOAr — is a genuine preprint of an article, and belongs
// with the articles rather than in the abstracts tab.
const MEETING_DOI = /egusphere-egu\d|epsc(-dps)?\d{4}-|\/egu\d|lpsc|agu-?fall/i
const isArticlePreprint = (p) =>
  p.type === 'preprint' && !MEETING_DOI.test(`${p.doi} ${p.url}`)
const isConference = (venue, url) =>
  /egu|epsc|envision|copernicus|workshop|abstract|conference|assembly|lpsc|agu fall/i.test(`${venue} ${url}`)
const isThesisOrCorr = (p) =>
  p.type === 'dissertation-thesis' ||
  /^corrigendum|^erratum/i.test(p.title) ||
  /universit(y|ät|e)|dissertation|\bthesis\b|hochschul/i.test(p.venue)

// ── ORCID ───────────────────────────────────────────────────────────────────
async function fromOrcid() {
  const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`ORCID ${res.status}`)
  const data = await res.json()
  const out = []
  for (const group of data.group || []) {
    const w = group['work-summary']?.[0]
    if (!w) continue
    const title = w.title?.title?.value?.trim()
    if (!title) continue
    const year = w['publication-date']?.year?.value || ''
    const venue = w['journal-title']?.value?.trim() || ''
    const type = w.type || ''
    let url = ''
    let doi = ''
    for (const id of w['external-ids']?.['external-id'] || []) {
      const t = (id['external-id-type'] || '').toLowerCase()
      const v = id['external-id-value'] || ''
      if (t === 'doi') { doi = v.toLowerCase(); url = `https://doi.org/${v}` }
      else if (t === 'uri' && !url) url = v
    }
    let v = venue
    if (!v) {
      if (/egusphere-egu|\/egu\d/i.test(url)) v = 'EGU General Assembly'
      else if (/egusphere-\d{4}-/i.test(url)) v = 'EGUsphere'
      else if (/epsc/i.test(url)) v = 'EPSC'
      else if (/envision/i.test(url)) v = 'EnVision Workshop'
    }
    out.push({ title, year: String(year), venue: v, url, doi, type })
  }
  return out
}

// ── Google Scholar (best-effort, no official API) ────────────────────────────
async function fromScholar() {
  try {
    const url = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&cstart=0&pagesize=100`
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    })
    if (!res.ok) { console.warn(`Scholar: HTTP ${res.status}, skipping`); return [] }
    const html = await res.text()
    const rows = html.split('gsc_a_tr').slice(1)
    const out = []
    for (const row of rows) {
      const title = (row.match(/class="gsc_a_at"[^>]*>([^<]+)</) || [])[1]
      const grays = [...row.matchAll(/class="gs_gray">([^<]*)</g)].map((m) => m[1])
      const year = (row.match(/class="gsc_a_h[^"]*">(\d{4})</) || [])[1] || ''
      if (!title) continue
      const venue = grays[1] || ''
      out.push({
        title: decodeEntities(title),
        year, venue: decodeEntities(venue), url: '', doi: '', type: 'scholar',
      })
    }
    return out
  } catch (e) {
    console.warn('Scholar fetch failed, using ORCID only:', e.message)
    return []
  }
}

function classify(p) {
  // Articles = published journal articles / chapters, plus preprints of
  // articles (flagged separately); conference abstracts go to the other tab.
  if (p.type === 'journal-article' || p.type === 'book-chapter' || p.type === 'book') {
    return 'peer'
  }
  if (isArticlePreprint(p)) return 'peer'
  if (p.type === 'scholar' && !isConference(p.venue, p.url)) return 'peer'
  return 'abstracts'
}

async function main() {
  const orcid = await fromOrcid()
  const scholar = await fromScholar()
  console.log(`ORCID: ${orcid.length} works · Scholar: ${scholar.length} works`)

  const seenKey = new Set()
  const seenDoi = new Set()
  const peer = []
  const abstracts = []

  // ORCID first (authoritative), then Scholar extras only if not already present
  for (const p of [...orcid, ...scholar]) {
    const k = keyOf(p.title)
    if (!k) continue
    if (isThesisOrCorr(p)) continue          // drop theses, dissertations, corrigenda
    // Scholar without a venue is almost always a reworded duplicate of an ORCID
    // work (or junk); ORCID already covers it, so only take Scholar items that
    // carry a real venue (genuine Scholar-only conference entries).
    if (p.type === 'scholar' && !norm(p.venue)) continue
    if (seenKey.has(k)) continue             // near-duplicate across sources
    if (p.doi && seenDoi.has(p.doi)) continue
    seenKey.add(k)
    if (p.doi) seenDoi.add(p.doi)
    const entry = { title: fixCaps(p.title), year: p.year, venue: decodeEntities(p.venue), url: p.url }
    if (isArticlePreprint(p)) entry.preprint = true
    ;(classify(p) === 'peer' ? peer : abstracts).push(entry)
  }

  const byYear = (a, b) => (b.year || '').localeCompare(a.year || '')
  peer.sort(byYear)
  abstracts.sort(byYear)

  const json = JSON.stringify({ peerReviewed: peer, abstracts }, null, 2) + '\n'
  writeFileSync(OUT, json)
  console.log(`Wrote ${peer.length} peer-reviewed + ${abstracts.length} abstracts → ${OUT}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
