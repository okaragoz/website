<script setup>
import data from '../data/footer.json'
import SocialIcon from './SocialIcon.vue'
import { socials } from './socials.js'

// The footer's social row stores link targets only; labels come from the
// shared profile list so the two never drift apart.
const labels = Object.fromEntries(socials.map(s => [s.kind, s.label]))

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="ok-footer">
    <div class="ok-footer__wash" aria-hidden="true"></div>

    <div class="ok-footer__inner">
      <div class="ok-footer__brand">
        <div class="ok-footer__wordmark">Oguzcan Karagoz</div>
        <p class="ok-footer__tagline">{{ data.tagline }}</p>
        <p v-if="data.affiliation" class="ok-footer__affil">{{ data.affiliation }}</p>
        <div class="ok-footer__social">
          <a v-for="s in data.social" :key="s.type" :href="s.link"
             :aria-label="labels[s.type] || s.type" :title="labels[s.type] || s.type"
             target="_blank" rel="noopener" class="ok-soc">
            <SocialIcon :kind="s.type" />
          </a>
        </div>
      </div>

      <nav class="ok-footer__cols" aria-label="Footer">
        <div v-for="col in data.columns" :key="col.title" class="ok-footer__col">
          <div class="ok-footer__coltitle">{{ col.title }}</div>
          <a v-for="l in col.links" :key="l.text" :href="l.link" class="ok-footer__link">{{ l.text }}</a>
        </div>
      </nav>
    </div>

    <div class="ok-footer__bottom">
      <span>{{ data.copyright }}</span>
      <button class="ok-footer__top" type="button" @click="toTop">
        Back to top
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  </footer>
</template>
