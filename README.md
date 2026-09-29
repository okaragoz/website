# okaragoz.com

Personal academic site of Dr. Oguzcan Karagoz, planetary scientist at the
Institute of Earth and Environmental Sciences, University of Freiburg.

Built with [VitePress](https://vitepress.dev). Content is edited either
directly in the repository or through the web CMS at `/admin/`.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into docs/.vitepress/dist
npm run preview  # serve the production build
```

Node 20 or newer.

## How it is laid out

```
docs/
  index.md, about.md, publications.md   page entry points
  blog/, research/                      articles, one markdown file each
  .vitepress/
    config.mjs                          site config, SEO, appearance
    data/*.json                         all editable page content
    theme/                              the design system and components
  public/                               images, fonts, favicons, CNAME, admin/
```

Article pages are plain markdown with frontmatter. Everything else that reads
as "content" lives in `docs/.vitepress/data/*.json`, so it can be edited in the
CMS without touching components.

The design system is documented in `docs/.vitepress/theme/README.md`. The short
version: never hard-code a colour, size or spacing value in a component, take
it from `tokens.css`.

## Editing through the CMS

`/admin/` runs [Sveltia CMS](https://github.com/sveltia/sveltia-cms) against
this repository over the GitHub API. Sign in with a fine-grained personal
access token scoped to this repo with **Contents: Read and write**.

One thing to know: the CMS writes back only the fields declared in
`docs/public/admin/config.yml`. If you add a new key to a JSON data file, add
it to that config too, otherwise the next CMS save will silently drop it.

## Publications

`docs/.vitepress/data/publications.json` is refreshed from ORCID and Google
Scholar by `.github/workflows/update-publications.yml`, which commits any
changes on a schedule. It can also be run by hand:

```bash
npm run update:pubs
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it to GitHub Pages. The custom domain is set by
`docs/public/CNAME`.

For this to work, GitHub Pages must be set to deploy **from GitHub Actions**
(Settings → Pages → Source), not from a branch.
