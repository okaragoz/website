<script setup>
import { ref, onMounted } from 'vue'
import news from '../data/news.json'
// Content is edited via the CMS (Site Settings → News Banner)
// or directly in docs/.vitepress/data/news.json

const KEY = 'ok-news-' + (news.href || news.text).slice(-24)
const visible = ref(false)

onMounted(() => {
  if (!news.show) return
  try { visible.value = localStorage.getItem(KEY) !== '1' } catch { visible.value = true }
})

function dismiss() {
  visible.value = false
  try { localStorage.setItem(KEY, '1') } catch {}
}
</script>

<template>
  <div v-if="visible" class="ok-news">
    <div class="ok-news__body">
      <p class="ok-news__text"><strong>{{ news.tag }}</strong><span class="ok-news__sep" aria-hidden="true">·</span>{{ news.text }}</p>
      <a v-if="news.cta" class="ok-news__cta" :href="news.href" target="_blank" rel="noopener">
        {{ news.cta }} <span aria-hidden="true">→</span>
      </a>
    </div>
    <button class="ok-news__close" type="button" @click="dismiss" aria-label="Dismiss this notice">
      <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
    </button>
  </div>
</template>
