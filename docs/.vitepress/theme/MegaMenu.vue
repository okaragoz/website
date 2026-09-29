<!--
  Desktop navigation with a full-width flyout panel.

  Replaces VitePress's small dropdown (hidden in components.css) for widths
  at and above the hamburger breakpoint. Below that, VitePress's own mobile
  nav screen takes over and reads the plain `nav` array from menu.json.

  Interaction: pointer opens on hover with a short close delay, so a
  diagonal move from the trigger into the panel does not dismiss it.
  Keyboard opens on Enter/Space, moves with arrows, closes on Escape and
  on focus leaving the menu. The trigger is a button carrying
  aria-expanded, and each panel is labelled by the trigger that owns it.
-->
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import menu from '../data/menu.json'

const items = menu.mega || []
const active = ref(null)
const root = ref(null)
let closeTimer = null

function open(i) {
  clearTimeout(closeTimer)
  if (items[i]?.columns) active.value = i
  else active.value = null
}

function scheduleClose(delay = 180) {
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => { active.value = null }, delay)
}

function cancelClose() { clearTimeout(closeTimer) }

/* The page behind the panel blurs while the menu is open, so the panel reads
   as the focused layer. The filter has to live on the page content rather
   than on a shared ancestor: `filter` creates a containing block for
   `position: fixed`, which would trap the panel inside the blurred layer. */
watch(active, (v) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('ok-nav-open', v !== null)
})

function toggle(i) {
  active.value = active.value === i ? null : i
}

function onKeydown(e) {
  if (e.key === 'Escape' && active.value !== null) {
    const i = active.value
    active.value = null
    root.value?.querySelectorAll('.ok-mega__top')[i]?.focus()
  }
}

// Close when focus moves out of the menu entirely, so tabbing past the
// panel does not leave it hanging open.
function onFocusOut(e) {
  if (!root.value?.contains(e.relatedTarget)) active.value = null
}

function onPointerDown(e) {
  if (!root.value?.contains(e.target)) active.value = null
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onPointerDown)
})
onBeforeUnmount(() => {
  clearTimeout(closeTimer)
  document.documentElement.classList.remove('ok-nav-open')
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onPointerDown)
})
</script>

<template>
<nav class="ok-mega" ref="root" aria-label="Main" @mouseleave="scheduleClose()" @focusout="onFocusOut">
  <ul class="ok-mega__bar">
    <li v-for="(item, i) in items" :key="item.text" class="ok-mega__item">
      <a v-if="!item.columns" class="ok-mega__top" :href="item.link" @mouseenter="open(i)">{{ item.text }}</a>

      <button v-else
              class="ok-mega__top ok-mega__top--has-panel"
              type="button"
              :id="`ok-mega-trigger-${i}`"
              :aria-expanded="active === i"
              :aria-controls="`ok-mega-panel-${i}`"
              @mouseenter="open(i)"
              @click="toggle(i)">
        {{ item.text }}
        <svg class="ok-mega__chev" :class="{ 'is-open': active === i }" viewBox="0 0 24 24" width="14" height="14"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <Transition name="ok-mega">
        <div v-if="item.columns && active === i"
             class="ok-mega__panel"
             :id="`ok-mega-panel-${i}`"
             :aria-labelledby="`ok-mega-trigger-${i}`"
             @mouseenter="cancelClose">
          <div class="ok-mega__panel-inner">
            <div v-for="col in item.columns" :key="col.title" class="ok-mega__col">
              <p class="ok-mega__coltitle">{{ col.title }}</p>
              <a v-for="l in col.links" :key="l.link" class="ok-mega__link" :href="l.link" @click="active = null">
                <span class="ok-mega__linktext">{{ l.text }}</span>
                <span v-if="l.desc" class="ok-mega__linkdesc">{{ l.desc }}</span>
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </li>
  </ul>
</nav>
</template>
