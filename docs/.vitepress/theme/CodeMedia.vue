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
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import Sci from './Sci.vue'

const props = defineProps({
  src: { type: String, required: true },
  type: { type: String, default: 'video' },  // 'video' | 'gif' | 'image'
  caption: { type: String, default: '' },
  w: { type: Number, default: 0 },
  h: { type: Number, default: 0 },
  cap: { type: Number, default: 0 },         // max rendered height, px
  tile: { type: String, default: '' },       // fixed aspect, e.g. '4 / 3'
  fill: { type: Boolean, default: false },   // take height from the row instead
  invert: { type: Boolean, default: false }, // wireframe: flip the ink for dark
  cutout: { type: Boolean, default: false }, // figure carries its own alpha
})

const reduce = ref(false)
/* A strip of four or five panels side by side is 1800px of figure. Fitted to a
   320px column it lands at 0.13 of its size, where the panel labels and the
   colour-bar ticks are smaller than a pixel and the figure says nothing at all.
   Below this width such a strip is given a fixed legible size inside a
   horizontally pannable frame instead, which keeps it readable without letting
   it push the page sideways. */
const PAN_AT = 560
const PAN_TO = 620
const panning = ref(false)
const wide = computed(() => props.w && props.h && props.w / props.h >= 3)

function syncPan() {
  panning.value = wide.value && window.innerWidth <= PAN_AT
}
onMounted(() => {
  reduce.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  syncPan()
  window.addEventListener('resize', syncPan)
})
onBeforeUnmount(() => window.removeEventListener('resize', syncPan))

// Widest this may draw: its own pixel width, or the width at which it would
// hit the height cap — whichever is smaller.
const style = computed(() => {
  // Filling: the row decides the height and the figure fits inside it. Used
  // where a column of figures has to end level with a column of text, so the
  // figures give way rather than running past the bottom of the card.
  if (props.fill) {
    return {
      height: '100%',
      width: 'auto',
      maxWidth: props.w ? `min(100%, ${props.w}px)` : '100%',
      objectFit: 'contain',
    }
  }
  // In a tiled row every figure gets the same box and is fitted inside it, so
  // clips of different aspect still line up. Scaling each to its own ratio
  // would leave a ragged row of mismatched heights. The tile still may not
  // draw the file larger than it is.
  if (props.tile) {
    return {
      aspectRatio: props.tile,
      objectFit: 'contain',
      ...(props.w ? { maxWidth: props.w + 'px' } : {}),
    }
  }
  // Panning: the strip is drawn at a readable size and the frame scrolls.
  if (panning.value) {
    return { width: PAN_TO + 'px', maxWidth: 'none', aspectRatio: `${props.w} / ${props.h}` }
  }
  if (!props.w || !props.h) return null
  const byCap = props.cap ? (props.cap * props.w) / props.h : Infinity
  return { maxWidth: Math.round(Math.min(props.w, byCap)) + 'px', aspectRatio: `${props.w} / ${props.h}` }
})
</script>

<template>
  <figure class="ok-codefig"
          :class="{ 'ok-codefig--fill': fill, 'ok-codefig--invert': invert,
                    'ok-codefig--cutout': cutout, 'ok-codefig--pan': panning }">
   <div class="ok-codefig__frame">
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
   </div>
    <figcaption v-if="caption" class="ok-codefig__cap"><Sci :text="caption" /></figcaption>
  </figure>
</template>

<style scoped>
.ok-codefig { margin: 0; }
/* A grid or flex item defaults to `min-width: auto`, which means its track
   refuses to shrink below its content. A panned strip is deliberately wider
   than its column, so without these the strip would widen the column instead
   of scrolling inside it, and take the whole page sideways with it. */
.ok-codefig, .ok-codefig__frame { min-width: 0; max-width: 100%; }
/* The box is sized from the file's own ratio, so `contain` changes nothing in
   the ordinary case. It is here so that a half-pixel of rounding on that box
   can never squeeze the picture inside it. */
.ok-codefig__media {
  display: block;
  width: 100%;
  height: auto;
  margin-inline: auto;      /* centred once it stops short of the column */
  object-fit: contain;
  background: var(--ok-canvas-soft);
  border: 1px solid var(--ok-hairline);
  border-radius: var(--ok-r-lg);
}

/* Panned: the frame scrolls, the caption stays at the measure. */
.ok-codefig--pan .ok-codefig__frame {
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}
.ok-codefig--pan .ok-codefig__media { margin-inline: 0; }
/* The figures that used to be drawn on white paper now carry that paper as
   transparency, so the page shows through them and there is nothing to filter.
   A wireframe is the exception: it is only ink, and ink has to change hands
   with the theme. Inverting touches the colour channels and not the alpha, so
   dark lines become light ones and the background stays as absent as it was. */
.dark .ok-codefig--invert .ok-codefig__media { filter: invert(1) hue-rotate(180deg); }

/* A figure with a transparent ground has no edge of its own, so a frame drawn
   round it is a box drawn round nothing: it reads as a panel the figure is
   floating inside rather than as part of the page. */
.ok-codefig--cutout .ok-codefig__media { background: none; border: none; border-radius: 0; }

/* Filling a row, the frame would be drawn around the letterbox rather than
   around the picture, so the figure stands on its own instead. */
.ok-codefig--fill .ok-codefig__media { background: none; border: none; }
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
