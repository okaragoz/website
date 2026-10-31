<script setup>
/*
  A single code's own page: MILEVA or MILET, picked by `slug` from the same
  data/code.json the index reads, so the two never drift apart.
*/
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import codeData from '../data/code.json'
import PageHero from './PageHero.vue'
import CodeMedia from './CodeMedia.vue'
import Sci from './Sci.vue'

const props = defineProps({ slug: { type: String, required: true } })
const p = computed(() => codeData.projects.find((x) => x.slug === props.slug))

/* Height the gallery figures share. Smaller on a phone, where 440px of
   render would push the caption and everything after it off the screen. */
const galleryCap = ref(440)
const narrow = ref(false)
function syncCap() {
  narrow.value = window.innerWidth < 760
  galleryCap.value = window.innerWidth < 700 ? 300 : 440
}
onMounted(() => {
  syncCap()
  window.addEventListener('resize', syncCap)
})
onBeforeUnmount(() => window.removeEventListener('resize', syncCap))

/* Wide time-strips stay one per row; squarer clips go three-up. A narrow
   screen collapses either to a single column. */
const cols = computed(() => (narrow.value ? 1 : (p.value?.galleryColumns || 1)))

/* The lead figure is the first of the pair shown on the index. */
const hero = computed(() => p.value?.media?.[0] || {})
</script>

<template>
<div v-if="p" class="ok-codeproj">
  <PageHero :eyebrow="p.expansion" :title="p.name" :lede="p.tagline" />

  <div class="ok-codeproj__lead">
    <div class="ok-codeproj__intro">
      <div class="ok-codeproj__mark">
        <img v-if="p.logo" class="ok-codeproj__logo" :src="p.logo" :alt="p.name + ' logo'" width="48" height="48" />
        <div class="ok-codeproj__rule" :style="{ background: p.accent }"></div>
      </div>
      <p class="ok-codeproj__summary">{{ p.summary }}</p>
      <dl class="ok-facts">
        <div v-for="f in p.facts" :key="f.label" class="ok-facts__row">
          <dt class="ok-facts__k">{{ f.label }}</dt>
          <dd class="ok-facts__v">{{ f.value }}</dd>
        </div>
      </dl>
    </div>

    <div class="ok-codeproj__fig">
      <CodeMedia :src="hero.src" :type="hero.type" :caption="hero.caption" :w="hero.w" :h="hero.h" />
    </div>
  </div>

  <section v-if="p.run" class="ok-codeproj__sec">
    <h2 class="ok-codeproj__h2">How it is built and run</h2>
    <p class="ok-codeproj__para">{{ p.architecture }}</p>
    <pre class="ok-codeproj__pre"><code>{{ p.run }}</code></pre>
    <p class="ok-codeproj__para ok-codeproj__para--muted">{{ p.runNote }}</p>
  </section>

  <section v-for="s in p.sections" :key="s.title" class="ok-codeproj__sec">
    <h2 class="ok-codeproj__h2">{{ s.title }}</h2>
    <ul class="ok-codeproj__list">
      <li v-for="(it, i) in s.items" :key="i"><Sci :text="it" /></li>
    </ul>
  </section>

  <section v-if="p.gallery && p.gallery.length" class="ok-codeproj__sec">
    <h2 class="ok-codeproj__h2">From the example gallery</h2>
    <div class="ok-codeproj__gallery" :style="{ '--ok-gal-cols': cols }">
      <CodeMedia v-for="g in p.gallery" :key="g.src" :src="g.src" :type="g.type" :caption="g.caption"
                 :w="g.w" :h="g.h" :plate="!!g.plate" :invert="!!g.invert" :cap="cols > 1 ? 0 : galleryCap" :tile="cols > 1 ? '4 / 3' : ''" />
    </div>
  </section>

  <section class="ok-codeproj__sec">
    <h2 class="ok-codeproj__h2">Worked examples</h2>
    <p class="ok-codeproj__note">Each ships as a runnable case in the documentation.</p>
    <ul class="ok-codeproj__chips">
      <li v-for="e in p.examples" :key="e">{{ e }}</li>
    </ul>
  </section>

  <section v-if="p.citation" class="ok-codeproj__sec">
    <h2 class="ok-codeproj__h2">Citation</h2>
    <p class="ok-codeproj__cite">{{ p.citation }}</p>
  </section>

  <div class="ok-codeproj__cta">
    <a v-for="l in p.links" :key="l.href"
       class="ok-btn" :class="l.kind === 'primary' ? 'ok-btn--primary ok-btn--lg' : 'ok-btn--quiet'"
       :href="l.href" target="_blank" rel="noopener">
      {{ l.label }}
      <span class="ok-btn__chev" aria-hidden="true">↗</span>
    </a>
    <a class="ok-btn ok-btn--quiet" href="/code/">All code<span class="ok-btn__chev" aria-hidden="true">→</span></a>
  </div>

</div>
</template>

<style scoped>
.ok-codeproj__mark { display: flex; align-items: center; gap: var(--ok-s-4); margin: 0 0 var(--ok-s-5); }
.ok-codeproj__logo { width: 48px; height: 48px; border-radius: var(--ok-r-md, 10px); display: block; }
.ok-codeproj__rule { width: 32px; height: 3px; }

.ok-codeproj__para { font-size: var(--ok-t-body-sm); line-height: 1.75; color: var(--ok-ink-2); margin: 0 0 var(--ok-s-4); max-width: 72ch; }
.ok-codeproj__para--muted { color: var(--ok-ink-3); margin-bottom: 0; }
.ok-codeproj__pre {
  margin: 0 0 var(--ok-s-4);
  padding: 14px 16px;
  overflow-x: auto;
  background: var(--ok-canvas-soft);
  border: 1px solid var(--ok-hairline);
  border-radius: var(--ok-r-md, 10px);
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--ok-ink);
}
.ok-codeproj__pre code { font-family: var(--ok-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace); }

/* One column on a phone: these are wide time strips and 3-D renders, and
   halving their width would make them unreadable. */
.ok-codeproj__gallery {
  display: grid;
  grid-template-columns: repeat(var(--ok-gal-cols, 1), minmax(0, 1fr));
  gap: var(--ok-s-6);
  align-items: start;
}
@media (min-width: 900px) { .ok-codeproj__gallery { gap: var(--ok-s-5) var(--ok-s-4); } }
@media (max-width: 760px) { .ok-codeproj__gallery { grid-template-columns: minmax(0, 1fr); } }

.ok-codeproj__lead {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr);
  gap: var(--ok-s-7);
  align-items: start;
  margin-top: var(--ok-s-7);
}
@media (max-width: 860px) {
  /* Figure first on a phone — it is the thing worth seeing, and a spec table
     above it would push it off the screen. */
  .ok-codeproj__lead { grid-template-columns: minmax(0, 1fr); gap: var(--ok-s-6); }
  .ok-codeproj__fig { order: -1; }
}
.ok-codeproj__summary {
  margin: 0;
  font-size: var(--ok-t-body);
  line-height: 1.78;
  color: var(--ok-ink-2);
}

.ok-facts { margin: var(--ok-s-7) 0 0; }
.ok-facts__row {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: var(--ok-s-4);
  padding: 10px 0;
  border-top: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1;
}
.ok-facts__row:last-child { border-bottom: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1; }
.ok-facts__k { font-size: var(--ok-t-caption); color: var(--ok-ink-3); margin: 0; }
.ok-facts__v { font-size: var(--ok-t-body-sm); color: var(--ok-ink); margin: 0; }

.ok-codeproj__fig { position: sticky; top: 96px; }
@media (max-width: 860px) { .ok-codeproj__fig { position: static; } }

.ok-codeproj__sec { margin-top: var(--ok-band, 96px); }
.ok-codeproj__h2 {
  font-family: var(--ok-font-ui);
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 600;
  letter-spacing: -.02em;
  color: var(--ok-ink);
  margin: 0 0 var(--ok-s-5);
}
.ok-codeproj__note { font-size: var(--ok-t-body-sm); color: var(--ok-ink-3); margin: calc(-1 * var(--ok-s-3)) 0 var(--ok-s-5); }

.ok-codeproj__list { margin: 0; padding: 0; list-style: none; max-width: 72ch; }
.ok-codeproj__list li {
  position: relative;
  padding: 12px 0 12px 22px;
  border-top: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1;
  font-size: var(--ok-t-body-sm);
  line-height: 1.7;
  color: var(--ok-ink-2);
}
.ok-codeproj__list li:last-child { border-bottom: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1; }
.ok-codeproj__list li::before {
  content: "";
  position: absolute;
  left: 2px; top: 20px;
  width: 6px; height: 1px;
  background: var(--ok-hairline-strong);
}

.ok-codeproj__chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
.ok-codeproj__chips li {
  font-size: var(--ok-t-caption);
  color: var(--ok-ink-2);
  background: var(--ok-canvas-soft);
  border: 1px solid var(--ok-hairline);
  border-radius: var(--ok-r-pill);
  padding: 5px 12px;
}

.ok-codeproj__cite { font-size: var(--ok-t-body-sm); line-height: 1.7; color: var(--ok-ink-2); margin: 0; max-width: 72ch; }

.ok-codeproj__cta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ok-s-5); margin-top: var(--ok-band, 96px); }
</style>
