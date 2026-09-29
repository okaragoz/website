// Single source of truth for profile links + their platform colours.
// Previously duplicated across Home.vue, Contact.vue and Footer.vue.
// The colour is only applied on hover — see `.ok-soc` in components.css.
export const socials = [
  { kind: 'bsky',     label: 'Bluesky',        href: 'https://bsky.app/profile/did:plc:ekrrgqi5nlb46m34ogwcytcu', color: '#1185fe' },
  { kind: 'linkedin', label: 'LinkedIn',       href: 'https://linkedin.com/in/o-karagoz',                          color: '#0a66c2' },
  { kind: 'rg',       label: 'ResearchGate',   href: 'https://www.researchgate.net/profile/Oguzcan-Karagoz',       color: '#00ccbb' },
  { kind: 'scholar',  label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=Byq8LX4AAAAJ&hl',  color: '#4285f4' },
  { kind: 'orcid',    label: 'ORCID',          href: 'https://orcid.org/0000-0002-0656-7396',                      color: '#a6ce39' },
]
