import DefaultTheme from 'vitepress/theme'
import { h, onMounted } from 'vue'
import { useData } from 'vitepress'
import Home from './Home.vue'
import ListCard from './ListCard.vue'
import PostHeader from './PostHeader.vue'
import Footer from './Footer.vue'
import Research from './Research.vue'
import Publications from './Publications.vue'
import CardSlider from './CardSlider.vue'
import BlogList from './BlogList.vue'
import Contact from './Contact.vue'
import PageHero from './PageHero.vue'
import Faq from './Faq.vue'
import AudioPlayer from './AudioPlayer.vue'
import NewsBanner from './NewsBanner.vue'
import NotFound from './NotFound.vue'
import Mesh from './Mesh.vue'
import MegaMenu from './MegaMenu.vue'
import OrbitFlow from './OrbitFlow.vue'
import SocialIcon from './SocialIcon.vue'
import './custom.css'

/* ------------------------------------------------------------------
   Reveal-on-scroll for section bands.

   Elements are only hidden once `.ok-js` is on <html>, so if this script
   never runs the content is simply visible — see motion.css.
------------------------------------------------------------------ */
function initReveal() {
  const nodes = document.querySelectorAll('.ok-reveal:not(.is-in)')
  if (!nodes.length) return

  const show = (n) => n.classList.add('is-in')

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(show)
    return
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      show(e.target)
      obs.unobserve(e.target)
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' })

  nodes.forEach((n) => {
    // Anything already on screen at mount shows immediately rather than
    // waiting for a scroll that may never come.
    if (n.getBoundingClientRect().top < window.innerHeight) show(n)
    else obs.observe(n)
  })
}

/* ------------------------------------------------------------------
   Click-to-zoom for article images. Delegated, so it survives route
   changes without rebinding.
------------------------------------------------------------------ */
function initZoom() {
  document.addEventListener('click', (e) => {
    const img = e.target
    if (!(img instanceof HTMLImageElement)) return
    if (!img.closest('.vp-doc')) return
    const container = img.closest('.content-container')
    if (!container || !container.querySelector('.ok-posthead')) return

    const overlay = document.createElement('div')
    overlay.className = 'ok-zoom-overlay'
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-modal', 'true')
    overlay.setAttribute('aria-label', img.alt || 'Enlarged image')

    const big = document.createElement('img')
    big.src = img.currentSrc || img.src
    big.alt = img.alt || ''
    overlay.appendChild(big)
    document.body.appendChild(overlay)
    requestAnimationFrame(() => overlay.classList.add('is-open'))

    const close = () => {
      overlay.classList.remove('is-open')
      setTimeout(() => overlay.remove(), 220)
      document.removeEventListener('keydown', onKey)
    }
    const onKey = (ev) => { if (ev.key === 'Escape') close() }
    overlay.addEventListener('click', close)
    document.addEventListener('keydown', onKey)
  })
}

/* ------------------------------------------------------------------
   Appearance pin.

   config.mjs sets light/dark from the clock before first paint. Once the
   reader flips the switch themselves, record which period they did it in
   so the clock stops overriding them — until the period turns over, at
   which point the site goes back to following the time of day.
------------------------------------------------------------------ */
const DAY_START = 7
const NIGHT_START = 19

function currentPeriod() {
  const h = new Date().getHours()
  return (h >= NIGHT_START || h < DAY_START) ? 'dark' : 'light'
}

function initAppearancePin() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.VPSwitchAppearance')) return
    // Read after VitePress has written its own value.
    setTimeout(() => {
      try { localStorage.setItem('ok-appearance-pin', currentPeriod()) } catch {}
    }, 0)
  })
}

/*
   Resync VitePress's appearance state with what the clock script decided.

   The head script writes the appearance key before first paint so there is no
   flash of the wrong theme. VitePress builds its own `isDark` ref from that
   same key through VueUse, but when the script *changes* the value during load
   — which is exactly what happens on the first visit after the period turns
   over — the ref ends up disagreeing with the class on <html>. The switch then
   renders in the wrong position and the first click on it appears to do
   nothing, because it is "changing" to the state already on screen.

   Writing through the ref (rather than the class) puts both back in agreement
   and lets VueUse persist whatever value it considers canonical.
*/
function syncAppearance(isDark) {
  let stored = null
  try { stored = localStorage.getItem('vitepress-theme-appearance') } catch {}
  if (stored !== 'dark' && stored !== 'light') return
  const wantDark = stored === 'dark'
  if (isDark.value !== wantDark) isDark.value = wantDark
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-before': () => h(MegaMenu),
      'doc-before': () => h(PostHeader),
      'layout-bottom': () => h(Footer),
      'not-found': () => h(NotFound),
    })
  },
  enhanceApp({ app }) {
    app.component('Home', Home)
    app.component('ListCard', ListCard)
    app.component('PostHeader', PostHeader)
    app.component('Footer', Footer)
    app.component('Research', Research)
    app.component('Publications', Publications)
    app.component('CardSlider', CardSlider)
    app.component('BlogList', BlogList)
    app.component('Contact', Contact)
    app.component('PageHero', PageHero)
    app.component('Faq', Faq)
    app.component('NewsBanner', NewsBanner)
    app.component('AudioPlayer', AudioPlayer)
    app.component('Mesh', Mesh)
    app.component('MegaMenu', MegaMenu)
    app.component('OrbitFlow', OrbitFlow)
    app.component('SocialIcon', SocialIcon)
  },
  setup() {
    if (import.meta.env.SSR) return
    const { isDark } = useData()

    onMounted(() => {
      const root = document.documentElement

      syncAppearance(isDark)

      // Gate every hidden-until-revealed state on JS actually running.
      root.classList.add('ok-js')

      // The hero sequence owns the first paint; the route transition takes
      // over from the next navigation onward.
      root.classList.add('ok-first-paint')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => root.classList.remove('ok-first-paint'))
      })

      initZoom()
      initAppearancePin()
      initReveal()

      // Re-arm the reveal observer after each client-side navigation.
      // The router replaces page content without remounting the theme.
      const rerun = () => requestAnimationFrame(initReveal)
      window.addEventListener('popstate', rerun)
      const mo = new MutationObserver(rerun)
      const content = document.getElementById('VPContent')
      if (content) mo.observe(content, { childList: true, subtree: false })
    })
  },
}
