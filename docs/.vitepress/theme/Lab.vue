<script setup>
/*
  The laboratory: three-dimensional scaled analogue experiments.

  Built on the same template as the code pages: a lead row carrying the
  summary and the specification beside one figure, and then every entry on the
  same two-column grid, prose on the left and its figures on the right. The
  machine a run is made on spans the full width beneath both. No figure is
  ever drawn larger than the file actually is.

  Content lives in data/lab.json (CMS: Pages → Lab Page).
*/
import { computed } from 'vue'
import labData from '../data/lab.json'
import PageHero from './PageHero.vue'
import CodeMedia from './CodeMedia.vue'

const { hero, intro, facts, sections, links } = labData
const experiments = computed(() => labData.experiments || [])
const crew = computed(() => labData.crew || [])

/* Every entry is one row: the prose in the left column, its figures stacked
   in the right. The two columns are divided at φ, so the reading measure
   leads and the figures answer it.

   The stack is capped by how many figures are in it, because an uncapped
   portrait figure is 1.3 times as tall as it is wide and two of them would
   run a long way past the bottom of the prose beside them. */
const figsOf = (figs) => figs || []
const capFor = (figs) => [0, 520, 380, 280][Math.min(figsOf(figs).length, 3)] || 280

function slug(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
</script>

<template>
<div class="ok-lab">
  <PageHero :eyebrow="hero.eyebrow" :title="hero.title" :lede="hero.lede" />

  <div class="ok-lab__lead">
    <div class="ok-lab__leadtext">
      <p class="ok-lab__intro">{{ intro }}</p>
      <dl class="ok-lab__facts">
        <div v-for="f in facts" :key="f.label" class="ok-lab__row">
          <dt class="ok-lab__k">{{ f.label }}</dt>
          <dd class="ok-lab__v">{{ f.value }}</dd>
        </div>
      </dl>
    </div>
    <div v-if="labData.leadFigure" class="ok-lab__leadfig">
      <CodeMedia :src="labData.leadFigure.src" :type="labData.leadFigure.type || 'image'"
                 :caption="labData.leadFigure.caption"
                 :w="labData.leadFigure.w" :h="labData.leadFigure.h" />
    </div>
  </div>

  <!-- ── What the lab runs ── -->
  <section v-if="experiments.length" class="ok-lab__part" id="experiments">
    <h2 class="ok-lab__parth">{{ labData.experimentsTitle }}</h2>
    <p class="ok-lab__partlede">{{ labData.experimentsLede }}</p>

    <article v-for="e in experiments" :key="e.id" :id="e.id"
             class="ok-lab__entry" :class="{ 'ok-lab__entry--split': figsOf(e.figures).length }">
      <div class="ok-lab__text">
        <span class="ok-lab__tag">{{ e.tag }}</span>
        <h3 class="ok-lab__title">{{ e.title }}</h3>
        <p class="ok-lab__body">{{ e.body }}</p>
        <ul v-if="e.items && e.items.length" class="ok-lab__list">
          <li v-for="(it, i) in e.items" :key="i">{{ it }}</li>
        </ul>
      </div>
      <div v-if="figsOf(e.figures).length" class="ok-lab__figs">
        <CodeMedia v-for="g in figsOf(e.figures)" :key="g.src"
                   :src="g.src" :type="g.type || 'image'" :caption="g.caption"
                   :w="g.w" :h="g.h" :cap="capFor(e.figures)" />
      </div>
      <aside v-if="e.rig" class="ok-lab__rig">
        <span class="ok-lab__rigeyebrow">Run on</span>
        <h4 class="ok-lab__rigname">{{ e.rig.name }}</h4>
        <div class="ok-lab__rigbody">
          <dl class="ok-lab__facts">
            <div v-for="r in e.rig.specs" :key="r.label" class="ok-lab__row">
              <dt class="ok-lab__k">{{ r.label }}</dt>
              <dd class="ok-lab__v">{{ r.value }}</dd>
            </div>
          </dl>
          <CodeMedia v-if="e.rig.figure" :src="e.rig.figure.src"
                     :type="e.rig.figure.type || 'image'" :caption="e.rig.figure.caption"
                     :w="e.rig.figure.w" :h="e.rig.figure.h" />
        </div>
      </aside>
    </article>
  </section>

  <!-- ── How it is done ── -->
  <section class="ok-lab__part" id="method">
    <h2 class="ok-lab__parth">{{ labData.methodTitle }}</h2>
    <p class="ok-lab__partlede">{{ labData.methodLede }}</p>

    <section v-for="s in sections" :key="s.title" :id="slug(s.title)"
             class="ok-lab__entry" :class="{ 'ok-lab__entry--split': figsOf(s.figures).length }">
      <div class="ok-lab__text">
        <h3 class="ok-lab__title">{{ s.title }}</h3>
        <p class="ok-lab__body">{{ s.body }}</p>
        <ul v-if="s.items && s.items.length" class="ok-lab__list">
          <li v-for="(it, i) in s.items" :key="i">{{ it }}</li>
        </ul>
      </div>
      <div v-if="figsOf(s.figures).length" class="ok-lab__figs">
        <CodeMedia v-for="g in figsOf(s.figures)" :key="g.src"
                   :src="g.src" :type="g.type || 'image'" :caption="g.caption"
                   :w="g.w" :h="g.h" :cap="capFor(s.figures)" />
      </div>
      <aside v-if="s.rig" class="ok-lab__rig">
        <span class="ok-lab__rigeyebrow">Measured with</span>
        <h4 class="ok-lab__rigname">{{ s.rig.name }}</h4>
        <div class="ok-lab__rigbody">
          <dl class="ok-lab__facts">
            <div v-for="r in s.rig.specs" :key="r.label" class="ok-lab__row">
              <dt class="ok-lab__k">{{ r.label }}</dt>
              <dd class="ok-lab__v">{{ r.value }}</dd>
            </div>
          </dl>
          <CodeMedia v-if="s.rig.figure" :src="s.rig.figure.src"
                     :type="s.rig.figure.type || 'image'" :caption="s.rig.figure.caption"
                     :w="s.rig.figure.w" :h="s.rig.figure.h" />
        </div>
      </aside>
    </section>
  </section>

  <!-- ── Who runs it ── -->
  <section v-if="crew.length" class="ok-lab__part" id="crew">
    <h2 class="ok-lab__parth">{{ labData.crewTitle }}</h2>
    <p class="ok-lab__partlede">{{ labData.crewLede }}</p>
    <p v-if="labData.crewGroupLabel" class="ok-lab__crewlabel">{{ labData.crewGroupLabel }}</p>
    <ul class="ok-lab__crew">
      <li v-for="c in crew" :key="c.name" class="ok-lab__member">
        <span class="ok-lab__membername">{{ c.name }}</span>
        <span class="ok-lab__memberrole">{{ c.role }}</span>
      </li>
    </ul>
  </section>

  <div v-if="links && links.length" class="ok-lab__cta">
    <a v-for="l in links" :key="l.href"
       class="ok-btn" :class="l.kind === 'primary' ? 'ok-btn--primary ok-btn--lg' : 'ok-btn--quiet'"
       :href="l.href">
      {{ l.label }}
      <span class="ok-btn__chev" aria-hidden="true">→</span>
    </a>
  </div>
</div>
</template>

<style scoped>
/* ── The template ──
   A lead row carrying the summary and the specification beside one figure,
   then full-width prose with its figures in a row beneath. Vertical rhythm
   steps between neighbours in the site's Fibonacci scale (13, 21, 34, 55, 89). */
.ok-lab__lead {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr);
  gap: var(--ok-s-7);
  align-items: start;
  margin-top: var(--ok-s-7);
}
.ok-lab__leadtext, .ok-lab__leadfig { min-width: 0; }
@media (max-width: 860px) {
  /* Figure first on a phone: a screenful of prose above it would push it out
     of view before anyone saw it. */
  .ok-lab__lead { grid-template-columns: minmax(0, 1fr); gap: var(--ok-s-6); }
  .ok-lab__leadfig { order: -1; }
}
.ok-lab__text { min-width: 0; max-width: 72ch; }

.ok-lab__intro { margin: 0 0 var(--ok-s-7); font-size: var(--ok-t-body); line-height: 1.78; color: var(--ok-ink-2); }

/* ── Spec tables ── */
.ok-lab__facts { margin: 0; }
.ok-lab__row {
  display: grid;
  grid-template-columns: 124px minmax(0, 1fr);
  gap: var(--ok-s-4);
  padding: 10px 0;
  border-top: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1;
}
.ok-lab__row:last-child { border-bottom: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1; }
.ok-lab__k { font-size: var(--ok-t-caption); color: var(--ok-ink-3); margin: 0; line-height: 1.5; }
.ok-lab__v { font-size: var(--ok-t-body-sm); color: var(--ok-ink); margin: 0; line-height: 1.5; }
@media (max-width: 520px) { .ok-lab__row { grid-template-columns: minmax(0, 1fr); gap: 2px; } }

/* ── The three parts ── */
.ok-lab__part { margin-top: var(--ok-band, 96px); scroll-margin-top: 90px; }
.ok-lab__parth {
  font-family: var(--ok-font-display);
  font-size: clamp(26px, 3.2vw, 36px);
  font-weight: 300;
  letter-spacing: var(--ok-track-md, -.02em);
  color: var(--ok-ink);
  margin: 0;
}
.ok-lab__partlede {
  margin: var(--ok-s-4) 0 0;
  max-width: 62ch;
  font-size: var(--ok-t-body-sm);
  line-height: 1.75;
  color: var(--ok-ink-3);
}

/* ── One entry ──
   Prose left, figures right, divided at φ so the reading measure leads and
   the figures answer it. Both columns start at the top: an entry whose text
   outruns its figures, or the other way round, simply ends ragged rather than
   stretching anything to match. The rig spans the full width beneath. */
.ok-lab__entry {
  margin-top: var(--ok-s-8, 89px);
  padding-top: var(--ok-s-7);
  border-top: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1;
  scroll-margin-top: 90px;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  column-gap: var(--ok-s-7);
  row-gap: var(--ok-s-7);
  align-items: start;
}
/* An entry with no figures is all measure, so it keeps the whole width rather
   than leaving a column of nothing beside it. */
.ok-lab__entry--split { grid-template-columns: minmax(0, 1.618fr) minmax(0, 1fr); }
.ok-lab__rig { grid-column: 1 / -1; }
@media (max-width: 860px) {
  .ok-lab__entry--split { grid-template-columns: minmax(0, 1fr); }
  .ok-lab__entry { row-gap: var(--ok-s-6); }
}
/* The tag sits above the title, so the title starts at the gutter like every
   other block rather than being indented by the badge beside it. */
.ok-lab__tag {
  display: inline-block;
  font-size: 0.75rem; font-weight: 500; letter-spacing: .02em;
  color: var(--ok-primary-ink);
  border: 1px solid currentColor; border-radius: var(--ok-r-pill);
  padding: 1px 10px;
  margin-bottom: var(--ok-s-3);
}
.ok-lab__title {
  font-family: var(--ok-font-ui);
  font-size: clamp(19px, 2.1vw, 24px);
  font-weight: 600; letter-spacing: -.02em;
  color: var(--ok-ink); margin: 0;
}
.ok-lab__body {
  margin: var(--ok-s-4) 0 0;
  font-size: var(--ok-t-body-sm);
  line-height: 1.78;
  color: var(--ok-ink-2);
}

/* The marker hangs in the gutter, so list text lines up with the paragraph
   above it on both edges instead of running wider on the right. */
.ok-lab__list { margin: var(--ok-s-6) 0 0; padding: 0; list-style: none; }
.ok-lab__list li {
  position: relative;
  padding: 12px 0;
  border-top: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1;
  font-size: var(--ok-t-body-sm);
  line-height: 1.7;
  color: var(--ok-ink-2);
}
.ok-lab__list li:last-child { border-bottom: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1; }
.ok-lab__list li::before {
  content: "";
  position: absolute;
  left: -16px; top: 20px;
  width: 6px; height: 1px;
  background: var(--ok-hairline-strong);
}
@media (max-width: 560px) {
  .ok-lab__list li { padding-left: 16px; }
  .ok-lab__list li::before { left: 0; }
}

/* ── The machine a run is made on, stated beside the run ── */
.ok-lab__rig {
  padding: var(--ok-s-5);
  border: 1px solid var(--ok-hairline);
  border-radius: var(--ok-r-lg);
  background: var(--ok-canvas-soft);
}
.ok-lab__rigeyebrow { font-size: var(--ok-t-caption); color: var(--ok-ink-3); }
.ok-lab__rigname {
  font-family: var(--ok-font-ui);
  font-size: var(--ok-t-body-sm); font-weight: 600; letter-spacing: -.01em;
  color: var(--ok-ink); margin: 4px 0 var(--ok-s-4);
}
.ok-lab__rig .ok-lab__row { padding: 7px 0; }
/* Numbers and the machine they belong to, divided at φ. */
.ok-lab__rigbody {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.618fr);
  gap: var(--ok-s-6);
  align-items: start;
}
@media (max-width: 760px) { .ok-lab__rigbody { grid-template-columns: minmax(0, 1fr); gap: var(--ok-s-5); } }

/* ── Figures: the right-hand column ── */
.ok-lab__figs {
  display: grid;
  gap: var(--ok-s-6);
  align-items: start;
  min-width: 0;
}

/* ── Crew ── */
.ok-lab__crewlabel {
  margin: var(--ok-s-6) 0 0;
  font-size: var(--ok-t-caption);
  font-weight: 500;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--ok-ink-3);
}
/* One row across the measure; it folds only when the names would not fit. */
.ok-lab__crew {
  margin: var(--ok-s-4) 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0 var(--ok-s-5);
  border-top: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1;
}
@media (max-width: 1000px) { .ok-lab__crew { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 640px) { .ok-lab__crew { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 420px) { .ok-lab__crew { grid-template-columns: minmax(0, 1fr); } }
.ok-lab__member {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: var(--ok-s-4) 0;
}
.ok-lab__membername { font-size: var(--ok-t-body-sm); color: var(--ok-ink); }
.ok-lab__memberrole { font-size: var(--ok-t-caption); color: var(--ok-ink-3); }

.ok-lab__cta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ok-s-5); margin-top: var(--ok-band, 96px); }
</style>
