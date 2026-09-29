<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, default: 'Listen to this article' },
})

const audio = ref(null)
const playing = ref(false)
const cur = ref(0)
const dur = ref(0)
const rate = ref(1)
const rates = [1, 1.25, 1.5, 2]

function fmt(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}
function toggle() {
  const a = audio.value
  if (!a) return
  a.paused ? a.play() : a.pause()
}
function onTime() { cur.value = audio.value.currentTime }
function onMeta() { dur.value = audio.value.duration }
function seek(e) {
  const a = audio.value
  if (!a || !dur.value) return
  const r = e.currentTarget.getBoundingClientRect()
  a.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * dur.value
}
function cycleRate() {
  const i = rates.indexOf(rate.value)
  rate.value = rates[(i + 1) % rates.length]
  audio.value.playbackRate = rate.value
}
onMounted(() => {
  const a = audio.value
  a.addEventListener('play', () => (playing.value = true))
  a.addEventListener('pause', () => (playing.value = false))
  a.addEventListener('ended', () => (playing.value = false))
})
</script>

<template>
  <div class="ok-audio">
    <audio ref="audio" :src="src" preload="metadata" @timeupdate="onTime" @loadedmetadata="onMeta" />
    <button class="ok-audio__play" type="button" @click="toggle" :aria-label="playing ? 'Pause' : 'Play'">
      <svg v-if="!playing" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z" /></svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
    </button>
    <div class="ok-audio__body">
      <div class="ok-audio__head">
        <span class="ok-audio__title">{{ title }}</span>
        <button class="ok-audio__rate" type="button" @click="cycleRate">{{ rate }}×</button>
      </div>
      <div class="ok-audio__bar" @click="seek">
        <div class="ok-audio__fill" :style="{ width: (dur ? (cur / dur) * 100 : 0) + '%' }" />
      </div>
      <div class="ok-audio__time">{{ fmt(cur) }} <span>/ {{ fmt(dur) }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.ok-audio {
  display: flex; align-items: center; gap: 1rem;
  background: var(--ok-surface); border: 1px solid var(--ok-hairline-strong);
  border-radius: 14px; padding: 1rem 1.2rem; margin: 1.5rem 0 2rem;
  box-shadow: var(--ok-shadow-1);
}
.ok-audio__play {
  flex: none; width: 48px; height: 48px; border-radius: 999px; border: none; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--ok-primary); color: var(--ok-on-primary);
  box-shadow: 0 6px 18px -8px rgba(105,145,199,0.6);
  transition: transform .18s;
}
.ok-audio__play:hover { transform: scale(1.06); }
.ok-audio__play svg { margin-left: 1px; }
.ok-audio__body { flex: 1; min-width: 0; }
.ok-audio__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.5rem; }
.ok-audio__title {
  font-family: var(--ok-font-ui); font-weight: 600; font-size: 0.98rem;
  color: var(--ok-ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.ok-audio__rate {
  flex: none; background: var(--vp-c-bg-soft); border: 1px solid var(--ok-hairline-strong);
  color: var(--ok-ink-2); font-size: 0.8rem; font-weight: 600;
  padding: 2px 9px; border-radius: 999px; cursor: pointer; font-family: inherit;
}
.ok-audio__rate:hover { color: var(--ok-ink); border-color: var(--ok-ink-3); }
.ok-audio__bar {
  height: 6px; border-radius: 999px; background: var(--vp-c-bg-soft);
  cursor: pointer; overflow: hidden;
}
.ok-audio__fill { height: 100%; border-radius: 999px; background: var(--ok-primary); transition: width .1s linear; }
.ok-audio__time { margin-top: 0.45rem; font-size: 0.82rem; color: var(--ok-ink-3); font-variant-numeric: tabular-nums; }
.ok-audio__time span { opacity: 0.8; }
</style>
