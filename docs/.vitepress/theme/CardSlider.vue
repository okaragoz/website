<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import posts from '../data/posts.json'

const props = defineProps({
  category: { type: String, default: 'research' },
  limit: { type: Number, default: 0 },
})

const items = computed(() => {
  const list = posts[props.category] || []
  return props.limit > 0 ? list.slice(0, props.limit) : list
})

const track = ref(null)
const atStart = ref(true)
const atEnd = ref(false)

// The arrows page by a full viewport so only whole cards are ever shown,
// and they disable at the ends rather than looping — a loop with no visible
// affordance just feels like the control is broken.
function updateEdges() {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft >= max - 4
}

function page(dir) {
  const el = track.value
  if (!el) return
  el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
}

onMounted(() => {
  const el = track.value
  if (!el) return
  updateEdges()
  el.addEventListener('scroll', updateEdges, { passive: true })
  window.addEventListener('resize', updateEdges)
})
onBeforeUnmount(() => {
  const el = track.value
  if (el) el.removeEventListener('scroll', updateEdges)
  window.removeEventListener('resize', updateEdges)
})

function fmt(d) {
  if (!d) return ''
  const t = new Date(d)
  return isNaN(t) ? d : t.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
<div class="ok-slider">
  <div class="ok-section__head">
    <div class="ok-slider__title"><slot name="title" /></div>
    <div class="ok-slider__nav">
      <button class="ok-slider__arrow" :disabled="atStart" @click="page(-1)" aria-label="Scroll to previous">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="ok-slider__arrow" :disabled="atEnd" @click="page(1)" aria-label="Scroll to next">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  </div>

  <div class="ok-slider__track" ref="track">
    <a v-for="p in items" :key="p.slug" :href="p.url" class="ok-card ok-slider__item">
      <div class="ok-card__media">
        <img v-if="p.image" :src="p.image" :alt="p.title" loading="lazy" />
        <div v-else class="ok-card__ph" aria-hidden="true">◐</div>
      </div>
      <div class="ok-card__body">
        <div class="ok-card__meta">
          <span class="ok-chip">{{ category === 'blog' ? 'Essay' : 'Research' }}</span>
          <span v-if="p.date" class="ok-card__date">{{ fmt(p.date) }}</span>
        </div>
        <h3 class="ok-card__title">{{ p.title }}</h3>
        <span class="ok-card__read">{{ p.readingTime || 5 }} min read</span>
      </div>
    </a>
  </div>
</div>
</template>

<style scoped>
.ok-slider__title { flex: 1; min-width: 0; }
.ok-slider__nav { display: flex; gap: var(--ok-s-2); flex-shrink: 0; }
.ok-slider__arrow {
  width: 38px; height: 38px;
  border-radius: var(--ok-r-pill);
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--ok-surface);
  color: var(--ok-ink-2);
  border: 1px solid var(--ok-hairline-strong);
  cursor: pointer;
  transition: background var(--ok-dur-fast) ease, border-color var(--ok-dur-fast) ease,
              color var(--ok-dur-fast) ease, opacity var(--ok-dur-fast) ease;
}
.ok-slider__arrow:hover:not(:disabled) { border-color: var(--ok-ink-3); color: var(--ok-ink); }
.ok-slider__arrow:disabled { opacity: .35; cursor: default; }

/* Scroll-snapped rail. Vertical padding gives the hover shadow room,
   since overflow-x also clips the y axis. */
.ok-slider__track {
  display: flex;
  gap: var(--ok-s-5);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  align-items: stretch;
  scrollbar-width: none;
  padding: var(--ok-s-1) 0 var(--ok-s-4);
  margin: 0 calc(-1 * var(--ok-s-1));
  padding-inline: var(--ok-s-1);
}
.ok-slider__track::-webkit-scrollbar { display: none; }

.ok-slider__item {
  flex: 0 0 calc((100% - 2 * var(--ok-s-5)) / 3);
  max-width: calc((100% - 2 * var(--ok-s-5)) / 3);
  scroll-snap-align: start;
}
@media (max-width: 1024px) {
  .ok-slider__item { flex-basis: calc((100% - var(--ok-s-5)) / 2); max-width: calc((100% - var(--ok-s-5)) / 2); }
}
@media (max-width: 640px) {
  .ok-slider__item { flex-basis: 84vw; max-width: 84vw; }
}
</style>
