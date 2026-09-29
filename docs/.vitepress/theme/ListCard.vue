<script setup>
const props = defineProps({
  title: String, url: String, date: String, image: String,
  excerpt: String, tag: String, readingTime: Number,
})

function fmt(d) {
  if (!d) return ''
  const t = new Date(d)
  return isNaN(t) ? d : t.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Reads the title and excerpt aloud via the browser's own speech synthesis.
// Nested inside a link, so it has to stop the click from navigating.
function listen(e) {
  e.preventDefault()
  e.stopPropagation()
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(`${props.title}. ${props.excerpt || ''}`)
  u.rate = 1
  u.lang = 'en-US'
  synth.speak(u)
}
</script>

<template>
  <a :href="url" class="ok-post">
    <div class="ok-post__media">
      <img v-if="image" :src="image" :alt="title" loading="lazy" />
      <div v-else class="ok-post__ph" aria-hidden="true">◐</div>
    </div>
    <div class="ok-post__body">
      <div class="ok-post__meta">
        <span v-if="tag" class="ok-chip">{{ tag }}</span>
        <span v-if="date" class="ok-post__date">{{ fmt(date) }}</span>
      </div>
      <h3 class="ok-post__title">{{ title }}</h3>
      <p v-if="excerpt" class="ok-post__excerpt">{{ excerpt }}</p>
      <div class="ok-post__foot">
        <div class="ok-post__by">
          <img class="ok-post__avatar" src="/images/hero/oguzcan-hero.jpg" alt="" />
          <div class="ok-post__author">
            <span class="ok-post__authorname">Oguzcan Karagoz</span>
            <span class="ok-post__authorrole">Planetary Scientist</span>
          </div>
        </div>
        <span class="ok-post__statval">{{ readingTime || 5 }} min read</span>
        <button class="ok-post__listen" type="button" @click="listen" aria-label="Read this preview aloud">
          <span class="ok-post__statval">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4h4l5 5V5L7 10H3zM16.5 8.5a5 5 0 0 1 0 7M19.5 5.5a9 9 0 0 1 0 13"/></svg>
            Listen
          </span>
        </button>
      </div>
    </div>
  </a>
</template>
