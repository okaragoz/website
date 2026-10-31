<script setup>
/*
  One figure, whatever the source format.

  Simulation output arrives as either an MP4 or an animated GIF, and the two
  need opposite handling: a video has to be told to behave like a figure
  (muted, inline, looping, no controls), while a GIF has to be stopped from
  animating when the reader has asked for less motion.

  Every file's real pixel size is carried in the data, which does two things.
  The slot is reserved before the file loads, so a lazy image no longer
  collapses to a couple of pixels and shove the page down when it arrives.
  And the figure never renders larger than the file actually is — these are
  render frames, not photographs, so a 480px plume blown up to fill a 930px
  column is just blurry.

  `cap` is the height these are allowed to occupy. Left off, a figure takes
  its natural size; in a gallery it is set, so clips of wildly different
  aspect (0.98 to 1.76 here) still line up on one band height.
*/
import { computed, ref, onMounted } from 'vue'
import Sci from './Sci.vue'

const props = defineProps({
  src: { type: String, required: true },
  type: { type: String, default: 'video' },  // 'video' | 'gif' | 'image'
  caption: { type: String, default: '' },
  w: { type: Number, default: 0 },
  h: { type: Number, default: 0 },
  cap: { type: Number, default: 0 },         // max rendered height, px
  tile: { type: String, default: '' },       // fixed aspect, e.g. '4 / 3'
})

const reduce = ref(false)
onMounted(() => {
  reduce.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
})

// Widest this may draw: its own pixel width, or the width at which it would
// hit the height cap — whichever is smaller.
const style = computed(() => {
  // In a tiled row every figure gets the same box and is fitted inside it, so
  // clips of different aspect still line up. Scaling each to its own ratio
  // would leave a ragged row of mismatched heights.
  if (props.tile) return { aspectRatio: props.tile, objectFit: 'contain' }
  if (!props.w || !props.h) return null
  const byCap = props.cap ? (props.cap * props.w) / props.h : Infinity
  return { maxWidth: Math.round(Math.min(props.w, byCap)) + 'px', aspectRatio: `${props.w} / ${props.h}` }
})
</script>

<template>
  <figure class="ok-codefig">
    <video
      v-if="type === 'video'"
      class="ok-codefig__media"
      :src="src"
      :width="w || null"
      :height="h || null"
      :style="style"
      :autoplay="!reduce"
      muted
      loop
      playsinline
      preload="metadata"
      disablepictureinpicture
    />
    <img
      v-else
      class="ok-codefig__media"
      :src="src"
      :alt="caption"
      :width="w || null"
      :height="h || null"
      :style="style"
      loading="lazy"
      decoding="async"
    />
    <figcaption v-if="caption" class="ok-codefig__cap"><Sci :text="caption" /></figcaption>
  </figure>
</template>

<style scoped>
.ok-codefig { margin: 0; }
.ok-codefig__media {
  display: block;
  width: 100%;
  height: auto;
  margin-inline: auto;      /* centred once it stops short of the column */
  background: var(--ok-canvas-soft);
  border: 1px solid var(--ok-hairline);
  border-radius: var(--ok-r-lg);
}
.ok-codefig__cap {
  margin-top: var(--ok-s-3);
  font-size: var(--ok-t-caption);
  line-height: 1.55;
  color: var(--ok-ink-3);
  text-align: center;
  max-width: 68ch;
  margin-inline: auto;
}
</style>
