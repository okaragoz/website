<script setup>
import { ref, computed, onMounted } from 'vue'
import researchData from '../data/research.json'
import PageHero from './PageHero.vue'

const root = ref(null)

/* ── Research content (edited via CMS / docs/.vitepress/data/research.json) ── */
const hero = researchData.hero
const planets = researchData.planets
const missions = researchData.missions
const disciplines = researchData.disciplines
const steps = researchData.steps
const methods = researchData.methods
const codeBand = researchData.codeBand

/* The disciplines grid can be filtered by world. `null` shows everything;
   picking a world dims the fields that are not applied to it rather than
   removing them, so the size of the whole toolkit stays visible. */
const worldFilter = ref(null)
const worlds = computed(() => {
  const seen = []
  for (const d of disciplines.items) for (const w of d.worlds) if (!seen.includes(w)) seen.push(w)
  return seen
})
function appliesTo(d) { return !worldFilter.value || d.worlds.includes(worldFilter.value) }
function pickWorld(w) { worldFilter.value = worldFilter.value === w ? null : w }

onMounted(() => {
  const el = root.value
  if (!el) return

  // scroll reveal
  const reveal = el.querySelectorAll('.ok-planet,.ok-subtopic,.ok-method-card,.ok-methods-section,.ok-code-section,.ok-reveal')
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      const d = parseInt(e.target.getAttribute('data-ok-delay') || '0')
      setTimeout(() => e.target.classList.add('ok-in'), d)
      obs.unobserve(e.target)
    })
  }, { threshold: 0.06 })
  reveal.forEach((node) => {
    const r = node.getBoundingClientRect()
    if (r.top < window.innerHeight * 1.05) {
      const d = parseInt(node.getAttribute('data-ok-delay') || '0')
      setTimeout(() => node.classList.add('ok-in'), d + 60)
    } else obs.observe(node)
  })
})

// Smooth-scroll the planet quick-nav to each planet section (offset for the fixed navbar)
function scrollToPlanet(name) {
  const elp = document.getElementById('ok-' + name.toLowerCase())
  if (!elp) return
  const y = elp.getBoundingClientRect().top + window.scrollY - 100
  window.scrollTo({ top: y, behavior: 'smooth' })
}

</script>

<template>
<PageHero :eyebrow="hero.eyebrow" :title="hero.title" :lede="hero.lede" :bg="hero.bg" />
<section class="ok-research" ref="root">

  <!-- The method, as three ordered stages. Genuinely a sequence, which is
       why it is numbered. -->
  <section class="ok-steps ok-reveal" id="ok-workflow">
    <h2 class="ok-steps__title">{{ steps.title }}</h2>
    <ol class="ok-steps__list">
      <li v-for="(st, i) in steps.items" :key="st.n" class="ok-step">
        <span class="ok-step__n">{{ st.n }}</span>
        <h3 class="ok-step__name">{{ st.name }}</h3>
        <p v-if="st.method" class="ok-step__method">{{ st.method }}</p>
        <p class="ok-step__body">{{ st.body }}</p>
      </li>
    </ol>
  </section>

  <!-- Worlds covered, as navigation into the sections below. -->
  <nav class="ok-worlds ok-reveal" aria-label="Jump to a world">
    <a v-for="p in planets" :key="p.name" :href="'#ok-' + p.name.toLowerCase()"
       class="ok-world" @click.prevent="scrollToPlanet(p.name)">
      <span class="ok-world__sym" :style="{ color: p.accent }">{{ p.symbol }}</span>
      <span class="ok-world__name">{{ p.name }}</span>
    </a>
  </nav>

  <!-- DISCIPLINES: the multidisciplinary frame the rest of the page sits inside -->
  <section class="ok-disc ok-reveal" id="ok-disciplines">
    <p v-if="disciplines.eyebrow" class="ok-disc__eyebrow">{{ disciplines.eyebrow }}</p>
    <h2 class="ok-disc__title">{{ disciplines.title }}</h2>
    <p class="ok-disc__lede">{{ disciplines.lede }}</p>

    <div class="ok-disc__filter" role="group" aria-label="Filter disciplines by world">
      <button class="ok-disc__chip" :class="{ 'is-on': worldFilter === null }"
              type="button" :aria-pressed="worldFilter === null" @click="worldFilter = null">
        All fields
      </button>
      <button v-for="w in worlds" :key="w" class="ok-disc__chip"
              :class="{ 'is-on': worldFilter === w }"
              type="button" :aria-pressed="worldFilter === w" @click="pickWorld(w)">
        {{ w }}
      </button>
    </div>

    <ul class="ok-disc__grid">
      <li v-for="d in disciplines.items" :key="d.name"
          class="ok-disc__card" :class="{ 'is-dim': !appliesTo(d) }">
        <p class="ok-disc__role">{{ d.role }}</p>
        <h3 class="ok-disc__name">{{ d.name }}</h3>
        <p class="ok-disc__body">{{ d.body }}</p>
        <p class="ok-disc__worlds">
          <span v-for="w in d.worlds" :key="w" class="ok-disc__world"
                :class="{ 'is-match': worldFilter === w }">{{ w }}</span>
        </p>
      </li>
    </ul>
  </section>

  <!-- PLANETS (Venus / Mars / Ganymede), content from data/research.json -->
  <div v-for="p in planets" :key="p.name" class="ok-planet" :id="'ok-' + p.name.toLowerCase()">
    <div class="ok-planet__accent" :style="{ background: p.accent }"></div>
    <div class="ok-planet__top">
      <figure class="ok-world-fig">
        <img class="ok-world-fig__img" :src="p.image" :alt="p.imageAlt" loading="lazy" decoding="async" />
        <figcaption class="ok-world-fig__credit">{{ p.imageCredit }}</figcaption>
      </figure>
      <div class="ok-planet__meta">
        <span class="ok-planet-tag" :style="{ color: p.accent }">{{ p.symbol }} &nbsp;{{ p.name }}</span>
        <h3 class="ok-planet__title">{{ p.title }}</h3>
        <p class="ok-planet__desc">{{ p.desc }}</p>
      </div>
    </div>
    <div class="ok-subtopics">
      <div v-for="(st, si) in p.subtopics" :key="st.num" class="ok-subtopic" :data-ok-delay="si * 120">
        <div class="ok-subtopic__num">{{ st.num }}</div>
        <div class="ok-subtopic__title">{{ st.title }}</div>
        <p class="ok-subtopic__body">{{ st.body }}</p>
      </div>
    </div>
  </div>

  <!-- Long-form write-ups live on their own page rather than being
       duplicated here. -->
  <div class="ok-more ok-reveal">
    <h2 class="ok-h2">Read the work in depth</h2>
    <p class="ok-lead">Long-form explainers on the studies behind each of these threads, written for a wider audience.</p>
    <a class="ok-btn ok-btn--primary ok-btn--lg" href="/research/articles">Browse research articles</a>
  </div>

  <!-- METHODS — content from data/research.json (CMS: Research Page Content) -->
  <div class="ok-methods-section" id="ok-methods">
    <div class="ok-eyebrow">{{ methods.eyebrow }}</div>
    <h2 class="ok-h2"><b>{{ methods.title }}</b></h2>
    <p v-if="methods.lede" class="ok-lead">{{ methods.lede }}</p>
    <div class="ok-methods-grid">
      <component v-for="(m, i) in methods.items" :key="m.name"
                 :is="m.href ? 'a' : 'div'" :href="m.href || null"
                 class="ok-method-card" :class="{ 'is-own': m.own, 'is-link': !!m.href }"
                 :data-ok-delay="i * 80">
        <div class="ok-method-card__top">
          <div class="ok-method-card__label">{{ m.label }}</div>
          <span v-if="m.own" class="ok-method-card__badge">My code</span>
        </div>
        <div class="ok-method-card__name">{{ m.name }}</div>
        <p class="ok-method-card__desc">{{ m.desc }}</p>
        <span v-if="m.href" class="ok-method-card__more">Read more <span aria-hidden="true">→</span></span>
      </component>
    </div>
  </div>

  <!-- The code itself has its own section; this points there rather than
       repeating the project cards. -->
  <div class="ok-code-section">
    <div class="ok-eyebrow">{{ codeBand.eyebrow }}</div>
    <h2 class="ok-h2"><b>{{ codeBand.title }}</b></h2>
    <p class="ok-lead">{{ codeBand.lede }}</p>
    <a class="ok-btn ok-btn--primary ok-btn--lg" :href="codeBand.ctaHref">{{ codeBand.ctaLabel }}</a>
  </div>

  <!-- MISSIONS -->
  <div class="ok-missions-section ok-reveal" id="ok-missions">
    <div class="ok-eyebrow">Missions &amp; Instruments</div>
    <h2 class="ok-h2"><b>Planetary Missions</b></h2>
    <div class="ok-missions">
      <div v-for="m in missions" :key="m.name" class="ok-mission ok-reveal" data-ok-delay="0">
        <div class="ok-mission__name">{{ m.name }}</div>
        <div class="ok-mission__org">{{ m.org }}</div>
        <p class="ok-mission__desc">{{ m.desc }}</p>
      </div>
    </div>
  </div>

</section>
</template>

<style scoped>
.ok-research {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6px 0 12px;
  font-size: var(--ok-t-body);
  line-height: 1.6;
}

.ok-eyebrow {
  font-size: var(--ok-t-caption); font-weight: 500; letter-spacing: .01em;
  color: var(--ok-ink-3); margin-bottom: 14px;
}

.ok-h1 {
  font-family: var(--ok-font-display);
  font-size: clamp(34px, 3.8vw, 56px);
  font-weight: 300; letter-spacing: var(--ok-track-xl); line-height: 1.08;
  color: var(--ok-ink); margin: 0 0 20px; border: none; padding: 0;
}
.ok-h1 b { font-weight: inherit; }

.ok-h2 {
  font-family: var(--ok-font-display);
  font-size: var(--ok-t-display-lg);
  font-weight: 300; letter-spacing: var(--ok-track-lg); line-height: 1.12;
  color: var(--ok-ink); margin: 0 0 16px; border: none; padding: 0;
}
.ok-h2 b { font-weight: inherit; color: inherit; }

.ok-lead {
  font-size: var(--ok-t-body-lg); color: var(--ok-ink-2);
  max-width: 66ch; line-height: 1.7; margin-bottom: var(--ok-band); font-weight: 400;
}

.ok-topics { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: var(--ok-band); }
/* Match the Publications page ID buttons */
.ok-topic-pill {
  display: inline-flex; align-items: center;
  font-size: 0.95rem; font-weight: 500; letter-spacing: .01em;
  color: var(--ok-ink); border: 1px solid var(--ok-hairline-strong);
  padding: 0.55rem 1.15rem; border-radius: 999px; background: var(--ok-surface);
  transition: border-color .2s, color .2s, background .2s, transform .2s;
}
.ok-topic-pill:hover {
  border-color: var(--ok-primary); color: var(--ok-primary-ink);
  background: var(--ok-canvas-soft); transform: translateY(-1px);
}
:global(.dark) .ok-topic-pill:hover { color: var(--ok-primary-ink); }
.ok-topic-pill--nav { text-decoration: none !important; cursor: pointer; }
.ok-topic-pill__sym { font-size: 1.05em; line-height: 1; margin-right: 1px; }

/* ── Method steps ──
   Numbered because this really is a sequence: each stage consumes what the
   one before it produced. */
.ok-steps {
  padding-bottom: var(--ok-band);
  margin-bottom: var(--ok-band);
}
.ok-steps__title {
  font-family: var(--ok-font-display);
  font-weight: 300;
  font-size: var(--ok-t-display-lg);
  letter-spacing: var(--ok-track-lg);
  line-height: 1.12;
  color: var(--ok-ink);
  margin: 0 0 var(--ok-s-6);
  text-align: center;
}
.ok-steps__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--ok-s-6);
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: none;
}
@media (max-width: 820px) { .ok-steps__list { grid-template-columns: minmax(0, 1fr); gap: var(--ok-s-5); } }
.ok-step { position: relative; padding-top: var(--ok-s-5); border-top: 2px solid var(--ok-primary); }
.ok-step__n {
  display: block;
  font-size: var(--ok-t-caption);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--ok-primary-ink);
  margin-bottom: var(--ok-s-2);
}
.ok-step__name {
  font-family: var(--ok-font-ui);
  font-size: var(--ok-t-heading);
  font-weight: 600;
  letter-spacing: var(--ok-track-sm);
  color: var(--ok-ink);
  margin: 0 0 var(--ok-s-2);
}
/* What the stage actually consists of, under the stage's name. */
.ok-step__method {
  font-size: var(--ok-t-body-sm);
  font-weight: 500;
  color: var(--ok-ink-2);
  margin: 0 0 var(--ok-s-3);
}
.ok-step__body { font-size: var(--ok-t-body-sm); line-height: 1.65; color: var(--ok-ink-3); margin: 0; }

/* ── Worlds nav ── */
.ok-worlds {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--ok-s-3);
  margin-bottom: var(--ok-band);
}
.ok-world {
  display: inline-flex;
  align-items: center;
  gap: var(--ok-s-2);
  padding: var(--ok-s-3) var(--ok-s-5);
  border: 1px solid var(--ok-hairline-strong);
  border-radius: var(--ok-r-pill);
  background: var(--ok-surface);
  color: var(--ok-ink) !important;
  font-size: var(--ok-t-body-sm);
  font-weight: 500;
  text-decoration: none !important;
  cursor: pointer;
  transition: border-color var(--ok-dur-fast) ease, background var(--ok-dur-fast) ease;
}
.ok-world:hover { border-color: var(--ok-primary); background: var(--ok-primary-wash); }
.ok-world__sym { font-size: 1.05em; line-height: 1; }

/* ── Disciplines ──
   The umbrella section. Cards dim rather than disappear when a world is
   selected, so the breadth of the toolkit stays legible while the filter
   answers "which of these apply here". */
.ok-disc {
  padding-top: var(--ok-band);
  margin-bottom: var(--ok-band);
  border-top: 1px solid var(--ok-hairline);
  text-align: center;
}
.ok-disc__eyebrow { font-size: var(--ok-t-body-sm); font-weight: 500; color: var(--ok-ink-3); margin: 0 0 var(--ok-s-4); }
.ok-disc__title {
  font-family: var(--ok-font-display);
  font-weight: 300;
  font-size: var(--ok-t-display-lg);
  line-height: 1.12;
  letter-spacing: var(--ok-track-lg);
  color: var(--ok-ink);
  margin: 0 auto var(--ok-s-4);
  max-width: 22ch;
  text-wrap: balance;
}
.ok-disc__lede {
  font-size: var(--ok-t-body);
  line-height: 1.65;
  color: var(--ok-ink-3);
  max-width: 62ch;
  margin: 0 auto var(--ok-s-6);
  text-wrap: pretty;
}

.ok-disc__filter { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ok-s-2); margin-bottom: var(--ok-s-6); }
.ok-disc__chip {
  font-family: var(--ok-font-ui);
  font-size: var(--ok-t-body-sm);
  font-weight: 500;
  padding: var(--ok-s-3) var(--ok-s-5);
  border-radius: var(--ok-r-pill);
  border: 1px solid var(--ok-hairline-strong);
  background: var(--ok-surface);
  color: var(--ok-ink-2);
  cursor: pointer;
  transition: border-color var(--ok-dur-fast) ease, background var(--ok-dur-fast) ease, color var(--ok-dur-fast) ease;
}
.ok-disc__chip:hover { border-color: var(--ok-ink-3); color: var(--ok-ink); }
.ok-disc__chip.is-on {
  background: var(--ok-primary);
  border-color: var(--ok-primary);
  color: var(--ok-on-primary);
}

.ok-disc__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--ok-s-4);
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
@media (max-width: 1100px) { .ok-disc__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 820px)  { .ok-disc__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px)  { .ok-disc__grid { grid-template-columns: minmax(0, 1fr); } }

.ok-disc__card {
  display: flex;
  flex-direction: column;
  padding: var(--ok-s-5);
  background: var(--ok-surface);
  border: 1px solid var(--ok-hairline);
  border-radius: var(--ok-r-lg);
  transition: opacity var(--ok-dur) ease, border-color var(--ok-dur) ease,
              box-shadow var(--ok-dur) ease, transform var(--ok-dur) var(--ok-ease);
}
.ok-disc__card:hover { border-color: var(--ok-hairline-strong); box-shadow: var(--ok-shadow-2); transform: translateY(-2px); }
.ok-disc__card.is-dim { opacity: .38; }
.ok-disc__card.is-dim:hover { opacity: .68; box-shadow: none; transform: none; }

.ok-disc__role { font-size: var(--ok-t-micro); font-weight: 500; color: var(--ok-primary-ink); margin: 0 0 var(--ok-s-2); }
.ok-disc__name {
  font-family: var(--ok-font-ui);
  font-size: var(--ok-t-heading-sm);
  font-weight: 600;
  letter-spacing: var(--ok-track-sm);
  color: var(--ok-ink);
  margin: 0 0 var(--ok-s-3);
  line-height: 1.3;
}
.ok-disc__body { font-size: var(--ok-t-caption); line-height: 1.6; color: var(--ok-ink-3); margin: 0 0 var(--ok-s-4); }
.ok-disc__worlds { display: flex; flex-wrap: wrap; gap: var(--ok-s-2); margin: auto 0 0; }
.ok-disc__world {
  font-size: var(--ok-t-micro);
  font-weight: 500;
  padding: 3px var(--ok-s-3);
  border-radius: var(--ok-r-pill);
  background: var(--ok-canvas-sunk);
  color: var(--ok-ink-2);
  transition: background var(--ok-dur-fast) ease, color var(--ok-dur-fast) ease;
}
:global(.dark) .ok-disc__world { background: rgba(255, 255, 255, .07); }
.ok-disc__world.is-match { background: var(--ok-primary-wash); color: var(--ok-primary-ink); }

.ok-planet {
  padding-top: var(--ok-band); margin-bottom: var(--ok-band);
  border-top: 1px solid var(--ok-hairline);
  opacity: 0; transform: translateY(20px);
}
.ok-planet.ok-in { opacity: 1; transform: none; transition: opacity .7s ease, transform .7s ease; }

.ok-planet__accent { width: 32px; height: 3px; margin-bottom: 28px; }

.ok-planet__top {
  display: grid; grid-template-columns: minmax(0, 420px) minmax(0, 1fr); gap: 56px;
  align-items: start; margin-bottom: 0;
}
@media (max-width: 900px) { .ok-planet__top { grid-template-columns: minmax(0, 1fr); gap: 28px; } }

.ok-world-fig { margin: 0; }
.ok-world-fig__img {
  width: 100%;
  height: auto;
  display: block;
  /* The globes are square cut-outs with their own alpha, so the figure is
     square too — it fills the column at every width instead of letterboxing
     the planet into the middle 60%. No plate, no box: the sphere sits
     directly on the page and reads the same in light and dark. */
  aspect-ratio: 1 / 1;
  object-fit: contain;
  background: none;
  border-radius: 0;
  filter: drop-shadow(0 12px 28px rgba(8, 14, 28, .22));
}
.ok-world-fig__credit {
  margin-top: 10px;
  font-size: var(--ok-t-caption);
  line-height: 1.5;
  color: var(--ok-ink-3);
}

.ok-planet-tag {
  font-size: var(--ok-t-body-sm); font-weight: 500; letter-spacing: .01em;
  margin-bottom: 10px; display: block;
}
.ok-planet__title {
  font-family: var(--ok-font-ui);
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 600; letter-spacing: -.022em; line-height: 1.18;
  color: var(--ok-ink); margin: 0 0 16px;
}
.ok-planet__desc {
  font-size: var(--ok-t-body); color: var(--ok-ink-2);
  line-height: 1.78; margin-bottom: 32px; font-weight: 400;
  /* Ragged right: justified text at this measure opened rivers between words. */
  text-align: left;
}

.ok-tabs { display: flex; gap: 0; border-bottom: 1px solid var(--ok-hairline); margin-bottom: 28px; }
.ok-tab {
  font-size: var(--ok-t-body-sm); font-weight: 500; letter-spacing: .01em;
  color: var(--ok-ink-3); padding: 8px 20px 8px 0; cursor: pointer;
  border: none; border-bottom: 2px solid transparent; margin-bottom: -1px;
  transition: color .2s, border-color .2s; background: none; font-family: inherit;
}
.ok-tab:hover { color: var(--ok-ink-2); }
.ok-tab.ok-active { color: var(--ok-ink); border-bottom-color: currentColor; }

.ok-subtopics {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--ok-s-4);
  margin-top: var(--ok-s-6);
}
@media (max-width: 700px) { .ok-subtopics { grid-template-columns: 1fr; } }
.ok-subtopic {
  background: var(--ok-canvas-soft); border: 1px solid var(--ok-hairline);
  border-radius: var(--ok-r-2xl); padding: var(--ok-s-5);
  opacity: 0; transform: translateY(10px);
}
.ok-subtopic.ok-in { opacity: 1; transform: none; transition: opacity .55s ease, transform .55s ease; }
.ok-subtopic__num { font-size: var(--ok-t-caption); font-weight: 500; color: var(--ok-ink-3); margin-bottom: 12px; }
.ok-subtopic__title {
  font-family: var(--ok-font-ui);
  font-size: var(--ok-t-body-sm); font-weight: 600; letter-spacing: -.012em;
  color: var(--ok-ink); margin-bottom: 10px; line-height: 1.3;
}
.ok-subtopic__body { font-size: var(--ok-t-body); color: var(--ok-ink-2); line-height: 1.72; }

.ok-methods-section {
  margin-top: var(--ok-band); padding-top: var(--ok-band); border-top: 1px solid var(--ok-hairline);
  opacity: 0; transform: translateY(16px);
}
.ok-methods-section.ok-in { opacity: 1; transform: none; transition: opacity .6s ease, transform .6s ease; }
.ok-methods-grid {
  /* Six cards: three and three. A four-column track left a hole in the
     second row and broke the symmetry of the pair that leads it. */
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--ok-s-4);
  margin-top: var(--ok-s-6);
}
@media (max-width: 900px) { .ok-methods-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 620px) { .ok-methods-grid { grid-template-columns: 1fr; } }
.ok-method-card {
  background: var(--ok-canvas-soft); border: 1px solid var(--ok-hairline);
  border-radius: var(--ok-r-2xl); padding: var(--ok-s-5);
  opacity: 0; transform: translateY(10px);
}
.ok-method-card.ok-in { opacity: 1; transform: none; transition: opacity .5s ease, transform .5s ease; }
.ok-method-card__top { display: flex; align-items: center; justify-content: space-between; gap: var(--ok-s-3); margin-bottom: 10px; }
.ok-method-card__label { font-size: var(--ok-t-caption); font-weight: 400; color: var(--ok-ink-3); }
/* The two codes that are mine lead the grid, so they carry the accent and a
   label; the community codes stay quiet. */
.ok-method-card__badge {
  flex: none;
  font-size: 0.7rem; font-weight: 500; letter-spacing: .02em;
  color: var(--ok-primary-ink);
  border: 1px solid currentColor; border-radius: var(--ok-r-pill);
  padding: 1px 8px;
}
.ok-method-card.is-own { border-color: var(--ok-hairline-strong); background: var(--ok-surface); }
.ok-method-card.is-link { display: block; text-decoration: none; transition: border-color var(--ok-dur-fast) ease, box-shadow var(--ok-dur) ease, transform var(--ok-dur-fast) ease; }
.ok-method-card.is-link:hover { border-color: var(--ok-primary-ink); box-shadow: var(--ok-shadow-2); transform: translateY(-2px); }
.ok-method-card__more { display: inline-block; margin-top: var(--ok-s-4); font-size: var(--ok-t-caption); font-weight: 500; color: var(--ok-primary-ink); }
.ok-method-card__name {
  font-family: var(--ok-font-ui);
  font-size: 18px; font-weight: 600; letter-spacing: -.015em;
  color: var(--ok-ink); margin-bottom: 12px;
}
.ok-method-card__desc { font-size: var(--ok-t-body-sm); color: var(--ok-ink-2); line-height: 1.7; font-weight: 300; }

/* Code section stays intentionally dark in both themes */
.ok-code-section {
  margin-top: 80px; background: #0a0e17; padding: 72px 60px 80px;
  position: relative; overflow: hidden; border-radius: var(--ok-r-xl);
  opacity: 0; transform: translateY(16px);
}
.ok-code-section.ok-in { opacity: 1; transform: none; transition: opacity .65s ease, transform .65s ease; }
.ok-code-section::before {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg,transparent,transparent 44px,rgba(255,255,255,.015) 44px,rgba(255,255,255,.015) 45px);
  pointer-events: none;
}
.ok-code-section .ok-eyebrow { color: #6e6e73; }
.ok-code-section .ok-h2 { color: #f0f0f0; margin-bottom: 16px; }
.ok-code-section .ok-h2 b { color: #f0f0f0; }
.ok-code-section .ok-lead { color: #9aa3b2; margin-bottom: var(--ok-s-7); max-width: 66ch; margin-inline: auto; }
.ok-code-section { text-align: center; }
@media (max-width: 700px) { .ok-code-section { padding: 56px 28px 64px; } }


.ok-reveal { opacity: 0; transform: translateY(16px); }
.ok-reveal.ok-in { opacity: 1; transform: none; transition: opacity .6s ease, transform .6s ease; }

/* Centred page / section headings */
.ok-h1, .ok-h2, .ok-eyebrow { text-align: center; }
.ok-h1 + .ok-lead, .ok-h2 + .ok-lead { text-align: center; margin-left: auto; margin-right: auto; }
.ok-topics { justify-content: center; }

/* ── Through to the long-form articles ── */
.ok-more {
  margin-top: var(--ok-band); padding-top: var(--ok-band);
  border-top: 1px solid var(--ok-hairline); text-align: center;
}
.ok-more .ok-lead { margin-bottom: var(--ok-s-5); }

/* ── Missions ── */
.ok-missions-section { margin-top: var(--ok-band); padding-top: var(--ok-band); border-top: 1px solid var(--ok-hairline); }
.ok-missions { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--ok-s-4); margin-top: var(--ok-s-6); }
@media (max-width: 800px) { .ok-missions { grid-template-columns: 1fr; } }
.ok-mission { background: var(--ok-canvas-soft); border: 1px solid var(--ok-hairline); border-radius: var(--ok-r-2xl); padding: var(--ok-s-5); }
.ok-mission__name { font-family: var(--ok-font-ui); font-size: var(--ok-t-body); font-weight: 600; color: var(--ok-ink); margin-bottom: 4px; }
.ok-mission__org { font-size: var(--ok-t-caption); text-transform: uppercase; letter-spacing: .08em; color: var(--ok-ink-3); margin-bottom: 14px; }
.ok-mission__desc { font-size: var(--ok-t-body-sm); line-height: 1.7; color: var(--ok-ink-2); font-weight: 300; }
</style>
