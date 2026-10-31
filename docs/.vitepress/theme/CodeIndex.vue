<script setup>
/*
  The Code landing page.

  Two of his own codes carry the page, so they get the full width and their
  own figure; the community codes he contributes to follow as a quieter grid.
  Content comes from data/code.json (CMS: Code → Code Page).
*/
import codeData from '../data/code.json'
import PageHero from './PageHero.vue'
import CodeMedia from './CodeMedia.vue'

const { hero, intro, projects, contributions, contributionsTitle, contributionsLede } = codeData
</script>

<template>
<div class="ok-codepage">
  <PageHero :eyebrow="hero.eyebrow" :title="hero.title" :lede="hero.lede" />

  <p class="ok-codepage__intro">{{ intro }}</p>

  <!-- The two codes he writes -->
  <section class="ok-proj" v-for="p in projects" :key="p.slug" :id="p.slug">
    <div class="ok-proj__rule" :style="{ background: p.accent }"></div>

    <div class="ok-proj__grid">
      <div class="ok-proj__body">
        <div class="ok-proj__head">
          <img v-if="p.logo" class="ok-proj__logo" :src="p.logo" :alt="p.name + ' logo'" width="40" height="40" />
          <h2 class="ok-proj__name">{{ p.name }}</h2>
          <span class="ok-proj__badge">{{ p.role }}</span>
        </div>
        <p class="ok-proj__expansion">{{ p.expansion }}</p>
        <p class="ok-proj__tagline" :style="{ color: p.accent }">{{ p.tagline }}</p>
        <p class="ok-proj__summary">{{ p.summary }}</p>

        <dl class="ok-facts">
          <div v-for="f in p.facts" :key="f.label" class="ok-facts__row">
            <dt class="ok-facts__k">{{ f.label }}</dt>
            <dd class="ok-facts__v">{{ f.value }}</dd>
          </div>
        </dl>

        <div class="ok-proj__cta">
          <a class="ok-btn ok-btn--primary" :href="'/code/' + p.slug">Read more</a>
          <a v-for="l in p.links" :key="l.href" class="ok-btn ok-btn--quiet"
             :href="l.href" target="_blank" rel="noopener">
            {{ l.label }}
            <span class="ok-btn__chev" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div class="ok-proj__fig">
        <CodeMedia :src="p.media.src" :type="p.media.type" :caption="p.media.caption"
                   :w="p.media.w" :h="p.media.h" />
      </div>
    </div>
  </section>

  <!-- Community codes -->
  <section class="ok-contrib" id="contributions">
    <h2 class="ok-h2">{{ contributionsTitle }}</h2>
    <p class="ok-lead">{{ contributionsLede }}</p>
    <div class="ok-contrib__grid">
      <article v-for="c in contributions" :key="c.name" class="ok-contrib__card">
        <h3 class="ok-contrib__name">{{ c.name }}</h3>
        <p class="ok-contrib__lang" :style="{ color: c.accent }">{{ c.lang }}</p>
        <p class="ok-contrib__desc">{{ c.desc }}</p>
        <ul class="ok-contrib__tags">
          <li v-for="t in c.tags" :key="t">{{ t }}</li>
        </ul>
      </article>
    </div>
  </section>
</div>
</template>

<style scoped>
.ok-codepage__intro {
  max-width: 62ch;
  margin: var(--ok-s-7) auto 0;
  font-size: var(--ok-t-body-lg, var(--ok-t-body));
  line-height: 1.75;
  color: var(--ok-ink-2);
}

/* ── A code ── */
.ok-proj { margin-top: var(--ok-band, 96px); scroll-margin-top: 90px; }
.ok-proj__rule { width: 32px; height: 3px; margin-bottom: 28px; }

.ok-proj__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
  gap: var(--ok-s-7);
  align-items: start;
}
@media (max-width: 900px) {
  /* The figure goes first on a phone: it is the thing worth seeing, and a
     column of specs above it would push it off the screen. */
  .ok-proj__grid { grid-template-columns: minmax(0, 1fr); gap: var(--ok-s-6); }
  .ok-proj__fig { order: -1; }
}

.ok-proj__head { display: flex; align-items: center; gap: var(--ok-s-3); flex-wrap: wrap; }
.ok-proj__logo { width: 40px; height: 40px; border-radius: 8px; display: block; }
.ok-proj__name {
  font-family: var(--ok-font-display);
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 300;
  letter-spacing: var(--ok-track-md, -.02em);
  color: var(--ok-ink);
  margin: 0;
}
.ok-proj__badge {
  font-size: var(--ok-t-caption);
  color: var(--ok-ink-3);
  border: 1px solid var(--ok-hairline-strong);
  border-radius: var(--ok-r-pill);
  padding: 1px 10px;
}
.ok-proj__expansion {
  margin: var(--ok-s-2) 0 0;
  font-size: var(--ok-t-body-sm);
  color: var(--ok-ink-3);
  letter-spacing: .01em;
}
.ok-proj__tagline {
  margin: var(--ok-s-4) 0 0;
  font-size: var(--ok-t-body);
  font-weight: 500;
}
.ok-proj__summary {
  margin: var(--ok-s-4) 0 0;
  font-size: var(--ok-t-body);
  line-height: 1.75;
  color: var(--ok-ink-2);
}

/* Spec table — the facts a reader scans for before reading a word of prose. */
.ok-facts { margin: var(--ok-s-6) 0 0; }
.ok-facts__row {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: var(--ok-s-4);
  padding: 10px 0;
  border-top: 1px solid var(--ok-hairline);
}
.ok-facts__row:last-child { border-bottom: 1px solid var(--ok-hairline); }
.ok-facts__k { font-size: var(--ok-t-caption); color: var(--ok-ink-3); margin: 0; }
.ok-facts__v { font-size: var(--ok-t-body-sm); color: var(--ok-ink); margin: 0; }

.ok-proj__cta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ok-s-5); margin-top: var(--ok-s-6); }

/* ── Community codes ── */
.ok-contrib { margin-top: var(--ok-band, 96px); scroll-margin-top: 90px; }
.ok-contrib__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--ok-s-5);
  margin-top: var(--ok-s-6);
}
.ok-contrib__card {
  border: 1px solid var(--ok-hairline);
  border-radius: var(--ok-r-lg);
  padding: var(--ok-s-5);
  background: var(--ok-surface);
}
.ok-contrib__name { font-size: var(--ok-t-body-lg, 18px); font-weight: 600; margin: 0; color: var(--ok-ink); }
.ok-contrib__lang { font-size: var(--ok-t-caption); margin: 6px 0 var(--ok-s-3); }
.ok-contrib__desc { font-size: var(--ok-t-body-sm); line-height: 1.7; color: var(--ok-ink-2); margin: 0; }
.ok-contrib__tags { display: flex; flex-wrap: wrap; gap: 6px; margin: var(--ok-s-4) 0 0; padding: 0; list-style: none; }
.ok-contrib__tags li {
  font-size: 0.72rem;
  color: var(--ok-ink-3);
  border: 1px solid var(--ok-hairline-strong);
  border-radius: var(--ok-r-pill);
  padding: 1px 8px;
}
</style>
