<script setup>
/*
  The laboratory side of the work: three-dimensional scaled analogue
  experiments. Content lives in data/lab.json (CMS: Pages → Lab Page).

  The gallery renders only once there are figures in the data, so the page
  reads as finished while the experiment photographs are still being chosen.
*/
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import labData from '../data/lab.json'
import PageHero from './PageHero.vue'
import CodeMedia from './CodeMedia.vue'

const { hero, intro, facts, sections, links } = labData
const gallery = computed(() => labData.gallery || [])

const narrow = ref(false)
function sync() { narrow.value = window.innerWidth < 760 }
onMounted(() => { sync(); window.addEventListener('resize', sync) })
onBeforeUnmount(() => window.removeEventListener('resize', sync))

const cols = computed(() => (narrow.value ? 1 : Math.min(gallery.value.length, 3) || 1))

/* Section headings double as anchors, so the menu can point at one. */
function slug(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
</script>

<template>
<div class="ok-lab">
  <PageHero :eyebrow="hero.eyebrow" :title="hero.title" :lede="hero.lede" />

  <div class="ok-lab__lead">
    <p class="ok-lab__intro">{{ intro }}</p>
    <dl class="ok-lab__facts">
      <div v-for="f in facts" :key="f.label" class="ok-lab__row">
        <dt class="ok-lab__k">{{ f.label }}</dt>
        <dd class="ok-lab__v">{{ f.value }}</dd>
      </div>
    </dl>
  </div>

  <section v-if="gallery.length" class="ok-lab__sec">
    <div class="ok-lab__gallery" :style="{ '--ok-gal-cols': cols }">
      <CodeMedia v-for="g in gallery" :key="g.src" :src="g.src" :type="g.type || 'image'"
                 :caption="g.caption" :w="g.w" :h="g.h" :tile="cols > 1 ? '4 / 3' : ''" />
    </div>
  </section>

  <section v-for="s in sections" :key="s.title" :id="slug(s.title)" class="ok-lab__sec">
    <h2 class="ok-lab__h2">{{ s.title }}</h2>
    <p class="ok-lab__body">{{ s.body }}</p>
    <ul v-if="s.items && s.items.length" class="ok-lab__list">
      <li v-for="(it, i) in s.items" :key="i">{{ it }}</li>
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
.ok-lab__lead {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.72fr);
  gap: var(--ok-s-7);
  align-items: start;
  margin-top: var(--ok-s-7);
}
@media (max-width: 860px) { .ok-lab__lead { grid-template-columns: minmax(0, 1fr); gap: var(--ok-s-5); } }

.ok-lab__intro { margin: 0; font-size: var(--ok-t-body); line-height: 1.78; color: var(--ok-ink-2); }

.ok-lab__facts { margin: 0; }
.ok-lab__row {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: var(--ok-s-4);
  padding: 10px 0;
  border-top: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1;
}
.ok-lab__row:last-child { border-bottom: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1; }
.ok-lab__k { font-size: var(--ok-t-caption); color: var(--ok-ink-3); margin: 0; }
.ok-lab__v { font-size: var(--ok-t-body-sm); color: var(--ok-ink); margin: 0; }

.ok-lab__gallery {
  display: grid;
  grid-template-columns: repeat(var(--ok-gal-cols, 1), minmax(0, 1fr));
  gap: var(--ok-s-5) var(--ok-s-4);
  align-items: start;
}
@media (max-width: 760px) { .ok-lab__gallery { grid-template-columns: minmax(0, 1fr); } }

.ok-lab__sec { margin-top: var(--ok-band, 96px); scroll-margin-top: 90px; }
.ok-lab__h2 {
  font-family: var(--ok-font-ui);
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 600;
  letter-spacing: -.02em;
  color: var(--ok-ink);
  margin: 0 0 var(--ok-s-4);
}
.ok-lab__body { font-size: var(--ok-t-body-sm); line-height: 1.78; color: var(--ok-ink-2); margin: 0; max-width: 72ch; }

.ok-lab__list { margin: var(--ok-s-5) 0 0; padding: 0; list-style: none; max-width: 72ch; }
.ok-lab__list li {
  position: relative;
  padding: 12px 0 12px 22px;
  border-top: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1;
  font-size: var(--ok-t-body-sm);
  line-height: 1.7;
  color: var(--ok-ink-2);
}
.ok-lab__list li:last-child { border-bottom: 1px solid var(--ok-hairline); border-image: var(--ok-rule-h) 1; }
.ok-lab__list li::before {
  content: "";
  position: absolute;
  left: 2px; top: 20px;
  width: 6px; height: 1px;
  background: var(--ok-hairline-strong);
}

.ok-lab__cta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ok-s-5); margin-top: var(--ok-band, 96px); }
</style>
