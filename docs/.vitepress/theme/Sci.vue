<script setup>
/*
  Renders exponents written as `10^18` with a real <sup>.

  The data used to carry Unicode superscript characters (10¹⁸, Ra = 10⁶).
  Those glyphs come from whatever fallback font happens to have them, so they
  landed at the wrong size and baseline next to the UI face. Writing `^18` in
  the data and marking it up here keeps the figures in the page's own font.
*/
import { computed } from 'vue'

const props = defineProps({ text: { type: String, default: '' } })

const parts = computed(() => {
  const out = []
  const re = /\^(-?\d+)/g
  let last = 0
  let m
  while ((m = re.exec(props.text)) !== null) {
    if (m.index > last) out.push({ t: props.text.slice(last, m.index) })
    out.push({ sup: m[1] })
    last = m.index + m[0].length
  }
  if (last < props.text.length) out.push({ t: props.text.slice(last) })
  return out
})
</script>

<template><span><template v-for="(p, i) in parts" :key="i"><sup v-if="p.sup" class="ok-sci__sup">{{ p.sup }}</sup><template v-else>{{ p.t }}</template></template></span></template>

<style scoped>
.ok-sci__sup {
  font-size: 0.68em;
  line-height: 0;
  vertical-align: super;
  font-variant-numeric: lining-nums tabular-nums;
}
</style>
