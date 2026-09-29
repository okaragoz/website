<script setup>
import { ref, computed } from 'vue'
import ListCard from './ListCard.vue'
import posts from '../data/posts.json'

const props = defineProps({
  category: { type: String, default: 'blog' },
  perPage: { type: Number, default: 4 },
})
const tagLabel = { blog: 'Essay', research: 'Research' }

const all = computed(() => posts[props.category] || [])
const totalPages = computed(() => Math.max(1, Math.ceil(all.value.length / props.perPage)))
const page = ref(1)

const items = computed(() => {
  const start = (page.value - 1) * props.perPage
  return all.value.slice(start, start + props.perPage)
})

// windowed page list with ellipses: 1 … (c-1) c (c+1) … last
const pageList = computed(() => {
  const t = totalPages.value, c = page.value
  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1)
  const out = [1]
  const lo = Math.max(2, c - 1)
  const hi = Math.min(t - 1, c + 1)
  if (lo > 2) out.push('…')
  for (let i = lo; i <= hi; i++) out.push(i)
  if (hi < t - 1) out.push('…')
  out.push(t)
  return out
})

function go(p) {
  if (p === '…') return
  page.value = Math.min(totalPages.value, Math.max(1, p))
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
<div class="ok-bloglist">
  <div class="ok-list">
    <ListCard v-for="p in items" :key="p.slug"
      :title="p.title" :url="p.url" :date="p.date" :image="p.image"
      :excerpt="p.excerpt" :tag="tagLabel[category]" :reading-time="p.readingTime" />
  </div>

  <nav v-if="totalPages > 1" class="ok-pager" aria-label="Pagination">
    <button class="ok-pager__btn ok-pager__arrow" :disabled="page === 1"
            @click="go(page - 1)" aria-label="Previous page">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    </button>

    <template v-for="(p, i) in pageList" :key="i">
      <span v-if="p === '…'" class="ok-pager__gap">…</span>
      <button v-else class="ok-pager__btn ok-pager__num" :class="{ 'is-active': p === page }"
              @click="go(p)">{{ p }}</button>
    </template>

    <button class="ok-pager__btn ok-pager__arrow" :disabled="page === totalPages"
            @click="go(page + 1)" aria-label="Next page">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  </nav>
</div>
</template>
