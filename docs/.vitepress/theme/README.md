# Theme

A token-driven design system for the site. The short version: **never hard-code a
colour, size, or spacing value in a component.** Everything reads from
`tokens.css`. If a value you need isn't there, add it there first.

## Files

| File | Holds |
|---|---|
| `custom.css` | Entry point. Imports the four files below, in order. |
| `tokens.css` | Colour, type scale, spacing, radius, depth, motion. Light + dark. Bridges VitePress's own variables onto the tokens. |
| `base.css` | Document defaults, heading tiers, prose (`.vp-doc`), page content widths. |
| `components.css` | Mesh, nav, hero, cards, lists, tables, FAQ, footer, 404. |
| `motion.css` | Hero entrance, route transition, section reveal, reduced-motion. |

Load order matters — `motion.css` is last so its rules win where they overlap
component transitions.

## The system in one paragraph

A near-white canvas, deep-navy ink (`#0b1a2e`, never pure black), and **one**
saturated CTA voltage (`--ok-primary`, indigo `#4436e8`) used sparingly — at most
one filled button per band. Everything else is a quiet link or an outline. The
planetary hues (sherbet, rust, ice) appear only inside the gradient mesh and the
research diagrams; they are never button fills. Display type is TWK Lausanne at
weight 300 with negative tracking; everything else is Inter.

## Things that will bite you

**Prose styles leak into components.** Any component rendered from a markdown
page sits inside `.vp-doc`, so the prose rules for `img`, `p`, and `a` apply to
it. `components.css` opens with a reset for this. If you add a component that
renders images inside a markdown page, add it to that reset's selector list and
re-assert any shape it needs at a higher specificity.

**Reading measure.** `--ok-w-text` (62ch ≈ 75 characters) is the article column.
Do not widen it — the previous theme ran prose to 1400px, about 150 characters a
line. Figures, tables, and code blocks deliberately break out of the measure on
screens wider than 1000px via a negative inline margin; see `base.css`.

**Three container widths, each with a job:** `--ok-w-wide` (1200px) for marketing
bands and card grids, `--ok-w-page` (1060px) for listings and tables,
`--ok-w-text` for prose.

**VitePress out-specifies you in places.** The nav background is painted from
`var(--vp-nav-bg-color)` by a selector you will not outrank cleanly — override
the *variable* on `.VPNavBar.top` instead of the `background` property. Page
content widths need `!important` because VitePress caps them inside media
queries.

## Appearance follows the clock

Light from 07:00, dark from 19:00. Two moving parts:

1. A small inline script in `config.mjs` runs before first paint and writes
   VitePress's appearance key, so there is no flash of the wrong theme.
2. `index.js` re-syncs VitePress's internal `isDark` ref on mount. This is not
   optional: when the script *changes* the stored value during load — which is
   what happens on the first visit after the period turns over — VitePress's ref
   and the class on `<html>` disagree, the switch renders in the wrong position,
   and the first click on it appears to do nothing.

When a reader flips the switch themselves, `ok-appearance-pin` records which
period they did it in. Their choice survives until the period turns over, then
the site goes back to following the clock. Change the thresholds in **both**
`config.mjs` (`DAY_START` / `NIGHT_START`) and `index.js`, which keeps its own
copy for the pin.

## Motion budget

Spent in exactly two places: one hero entrance on load, and a cross-fade on route
change. There is deliberately **no** fade-up-on-scroll for individual cards —
staggered per-card reveals on every section are the commonest tell of a
templated page, and they delay content.

Anything hidden until revealed is gated behind `.ok-js`, which `index.js` adds to
`<html>` only once JavaScript is running. If the script fails or an observer
never fires, the content is simply visible. Keep it that way: never write a
`opacity: 0` default that isn't behind `.ok-js`.

## Adding a component

1. Mark it up with `ok-` classes; put the styles in `components.css` unless they
   are genuinely local, in which case use a `<style scoped>` block that still
   reads from the tokens.
2. Use `.ok-card` / `.ok-grid` / `.ok-section` rather than inventing new layout.
3. Check it at 390px, 768px, and 1440px in both appearances before calling it
   done — 768px is where the nav is tightest and has broken before.
