<script setup>
import { ref } from 'vue'

const faqs = [
  {
    q: 'Can I get a copy of your papers?',
    a: "Absolutely. If a paper sits behind a paywall, email me and I'll happily send you a private copy. Just mention which one you're after.",
  },
  {
    q: 'Are you open to collaborations?',
    a: 'Yes. I enjoy working across remote sensing, analogue modelling, and numerical geodynamics. If our interests overlap on Mars, Venus, or the icy moons, get in touch and we can find a shared question.',
  },
  {
    q: 'Do you give talks or supervise students?',
    a: "I'm glad to discuss student projects, guest lectures, and outreach talks on planetary tectonics and geodynamics. Reach out with what you have in mind and we'll see if it fits.",
  },
  {
    q: 'Which tools and codes do you use?',
    a: 'Mostly ASPECT, LaMEM, and iSALE for modelling, alongside scaled analogue experiments and GIS-based geological mapping. I also help develop and benchmark open-source geodynamics codes.',
  },
  {
    q: 'Where can I find your data and code?',
    a: 'Datasets and scripts behind my papers are shared on request and, where possible, in public repositories. Ask me about a specific study and I will point you to the right place.',
  },
  {
    q: "What's the best way to reach you?",
    a: 'Email is best: oguzcan.karagoz@geologie.uni-freiburg.de. I am based at the Institute of Earth and Environmental Sciences, University of Freiburg.',
  },
]

const open = ref(0)
function toggle(i) { open.value = open.value === i ? -1 : i }
</script>

<template>
<section class="ok-faq">
  <div class="ok-faq__intro">
    <h2 class="ok-faq__title">Answers to common questions</h2>
    <p class="ok-section__lede">On my research, collaborating, and getting hold of papers.</p>
    <a class="ok-btn ok-btn--secondary" style="margin-top:var(--ok-s-5)" href="mailto:oguzcan.karagoz@geologie.uni-freiburg.de">Email me</a>
  </div>

  <div class="ok-faq__list">
    <div v-for="(f, i) in faqs" :key="i" class="ok-faq__item" :class="{ 'is-open': open === i }">
      <button class="ok-faq__q" type="button" :aria-expanded="open === i" @click="toggle(i)">
        <span>{{ f.q }}</span>
        <svg class="ok-faq__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      </button>
      <div class="ok-faq__a">
        <div class="ok-faq__a-inner"><p>{{ f.a }}</p></div>
      </div>
    </div>
  </div>
</section>
</template>
