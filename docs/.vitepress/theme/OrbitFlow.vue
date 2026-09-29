<!--
  Accretion vortex, used as the transition out of the hero.

  The disk's centre sits just below the canvas, so what you see is the near
  arc of a protoplanetary disk viewed at a shallow angle. Particles orbit with
  differential rotation (inner orbits sweep faster) while drifting inward, and
  each one trails the path it actually took, so the tails curve inward rather
  than tracing closed ellipses. That is what reads as a vortex: the arms are
  the spiral the motion leaves behind, not decoration drawn on top.

  It doubles as the scroll cue, since everything converges downward and out of
  the hero toward the content below.

  Cost control: the whole thing is skipped on small screens, pauses when
  scrolled out of view, and renders one static frame for readers who prefer
  reduced motion. Decorative, so it is hidden from assistive technology.
-->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const host = ref(null)
const canvas = ref(null)
const enabled = ref(true)

let raf = 0
let observer = null
let resizeObserver = null
let running = false
let particles = []
let W = 0, H = 0, dpr = 1
let palette = []
let alpha = 0.7, trailAlpha = 0.22
let themeWatcher = null

const HEIGHT = 128          // css px
const COUNT = 100
const INNER = 0.06          // inner edge, as a fraction of the outer semi-axis
const MIN_WIDTH = 768       // below this the canvas is not rendered at all

/* One revolution of the outermost orbit, in frames. Everything else scales
   off this, so "slower" is a single number. */
const OUTER_PERIOD = 40 * 60
const BASE_OMEGA = (Math.PI * 2) / OUTER_PERIOD

/* Differential rotation. A true Keplerian exponent of 1.5 makes the inner
   orbits about seven times faster than the outer ones, which read as frantic
   at this scale; 0.9 is closer to a galaxy's flat rotation curve and still
   gives the shear that winds the arms. */
const SHEAR = 0.7

/* Inward drift per frame, as a fraction of the current radius. Sets how
   tightly the arms wind; a particle crosses the disk in about thirty-three
   seconds. */
const DRIFT = 0.0014

const TAIL_STEPS = 40       // samples along each particle's own past path
const TAIL_SPAN = 8         // frames each sample looks back

/* Geometry is parametrised by the horizontal semi-axis `a`; the vertical one
   is `a * tilt`.

   The core sits inside the canvas, near the bottom centre, and the tilt is
   solved so the outermost orbit crests exactly on the top edge. Keeping the
   convergence point visible is what makes this read as a vortex rather than a
   set of parallel arcs, and it puts the point everything falls into at the
   bottom of the hero, pointing at the content below. */
function geometry() {
  const aMax = Math.max(W * 0.58, 300)
  const aMin = aMax * INNER
  const cy = H * 0.88
  return { aMax, aMin, tilt: cy / aMax, cx: W / 2, cy }
}

function omega(a, aMax) {
  return BASE_OMEGA * Math.pow(aMax / a, SHEAR)
}

function readPalette() {
  const cs = getComputedStyle(document.documentElement)
  const rgb = (name) => {
    const n = cs.getPropertyValue(name).trim().split(',').map((x) => parseFloat(x))
    return n.length === 3 && n.every((x) => !isNaN(x)) ? n : [120, 120, 200]
  }
  palette = ['--ok-orbit-a', '--ok-orbit-b', '--ok-orbit-c', '--ok-orbit-d', '--ok-orbit-e'].map(rgb)
  alpha = parseFloat(cs.getPropertyValue('--ok-orbit-alpha')) || 0.7
  trailAlpha = parseFloat(cs.getPropertyValue('--ok-orbit-trail')) || 0.22
}

function spawn(atOuterEdge) {
  const { aMax, aMin } = geometry()
  const t = atOuterEdge ? 0.92 + Math.random() * 0.08 : Math.pow(Math.random(), 0.6)
  return {
    a: aMin + (aMax - aMin) * t,
    theta: Math.random() * Math.PI * 2,
    colour: palette[(Math.random() * palette.length) | 0],
    size: 0.7 + Math.random() * 1.4,
  }
}

function project(a, theta, g) {
  return {
    x: g.cx + a * Math.cos(theta),
    y: g.cy - a * g.tilt * Math.sin(theta),
  }
}

function resize() {
  const el = host.value
  const cv = canvas.value
  if (!el || !cv) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  W = el.clientWidth
  H = HEIGHT
  cv.width = Math.round(W * dpr)
  cv.height = Math.round(H * dpr)
  cv.style.width = W + 'px'
  cv.style.height = H + 'px'
  cv.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
  // Setting cv.width clears the canvas; while the loop is paused nothing else
  // would repaint it, and layout often settles after mount.
  if (!running && particles.length) draw()
}

function step() {
  const { aMax, aMin } = geometry()
  for (const p of particles) {
    p.theta += omega(p.a, aMax)
    if (p.theta > Math.PI * 2) p.theta -= Math.PI * 2
    p.a -= p.a * DRIFT
    // Reaching the centre returns the particle to the outer disk. Its angle
    // carries over, so nothing appears out of nowhere.
    if (p.a <= aMin) {
      const theta = p.theta
      Object.assign(p, spawn(true))
      p.theta = theta
    }
  }
}

function draw() {
  const cv = canvas.value
  if (!cv) return
  const ctx = cv.getContext('2d')
  const g = geometry()
  ctx.clearRect(0, 0, W, H)
  ctx.lineCap = 'round'

  for (const p of particles) {
    const [r, gr, b] = p.colour
    const head = project(p.a, p.theta, g)
    const depth = 0.32 + 0.68 * Math.max(0, Math.sin(p.theta))

    // Retrace where this particle has been: radius was larger, angle smaller.
    // Drawing the real path is what winds the arms into a vortex.
    ctx.beginPath()
    ctx.moveTo(head.x, head.y)
    let a = p.a
    let theta = p.theta
    for (let i = 1; i <= TAIL_STEPS; i++) {
      a = a / (1 - DRIFT * TAIL_SPAN)
      if (a > g.aMax * 1.08) break
      theta -= omega(a, g.aMax) * TAIL_SPAN
      const pt = project(a, theta, g)
      ctx.lineTo(pt.x, pt.y)
    }
    ctx.strokeStyle = `rgba(${r}, ${gr}, ${b}, ${trailAlpha * depth})`
    ctx.lineWidth = p.size * 0.7
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(head.x, head.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r}, ${gr}, ${b}, ${alpha * depth})`
    ctx.fill()
  }
}

function frame() {
  if (!running) return
  step()
  draw()
  raf = requestAnimationFrame(frame)
}

function start() {
  if (running) return
  running = true
  raf = requestAnimationFrame(frame)
}

function stop() {
  running = false
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

onMounted(() => {
  // Phones skip the simulation entirely: it is decoration, and not worth the
  // paint cost or the battery on a small screen.
  if (window.innerWidth < MIN_WIDTH) {
    enabled.value = false
    return
  }

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  readPalette()
  resize()
  particles = Array.from({ length: COUNT }, () => spawn(false))
  draw()

  if (reduce) return   // the settled frame above is all these readers get

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => { entries.some((e) => e.isIntersecting) ? start() : stop() },
      { threshold: 0 },
    )
    observer.observe(host.value)
  } else {
    start()
  }

  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(host.value)
  } else {
    window.addEventListener('resize', resize)
  }

  themeWatcher = new MutationObserver(readPalette)
  themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  resizeObserver?.disconnect()
  themeWatcher?.disconnect()
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div v-if="enabled" class="ok-orbit" ref="host" aria-hidden="true">
    <canvas class="ok-orbit__cv" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.ok-orbit {
  position: relative;
  width: 100%;
  height: 128px;
  margin-top: var(--ok-s-5);
  pointer-events: none;
  /* Dissolve into the canvas at both ends so the disk has no hard edge. */
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 18%, #000 90%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0%, #000 18%, #000 90%, transparent 100%);
}
.ok-orbit__cv { display: block; width: 100%; height: 100%; }

/* Belt and braces: even if it did mount, it takes no space on phones. */
@media (max-width: 767px) { .ok-orbit { display: none; } }
</style>
