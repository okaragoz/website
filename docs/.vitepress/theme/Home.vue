<script setup>
import CardSlider from './CardSlider.vue'
import Mesh from './Mesh.vue'
import OrbitFlow from './OrbitFlow.vue'
import SocialIcon from './SocialIcon.vue'
import { socials } from './socials.js'
import home from '../data/home.json'
// Hero text + section titles are edited via the CMS (Home Page)
// or directly in docs/.vitepress/data/home.json
</script>

<template>
<div>
  <!--
    Centred hero. The headline owns the fold on its own; the identity card
    sits beneath it as one horizontal band rather than competing for
    attention as a second column.
  -->
  <section class="ok-hero">
    <Mesh drift />
    <div class="ok-hero__inner">

      <div class="ok-hero__text ok-enter">
        <p v-if="home.eyebrow" class="ok-hero__eyebrow">{{ home.eyebrow }}</p>
        <h1 class="ok-hero__title">{{ home.titlePrefix }} {{ home.titleAccent }}{{ home.titleSuffix }}</h1>
        <p v-if="home.ledeBody" class="ok-hero__lede">{{ home.ledeBody }}</p>
        <div class="ok-hero__cta">
          <a class="ok-btn ok-btn--primary ok-btn--lg" :href="home.ctaPrimaryHref">{{ home.ctaPrimaryLabel.replace(/\s*[→>]+\s*$/, '') }}</a>
          <a class="ok-btn ok-btn--quiet" :href="home.ctaGhostHref">
            {{ home.ctaGhostLabel }}
            <span class="ok-btn__chev" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <aside class="ok-idcard ok-enter-card">
        <img class="ok-idcard__portrait" src="/images/hero/oguzcan-hero.jpg" alt="" />
        <div class="ok-idcard__body">
          <p class="ok-idcard__name">Oguzcan Karagoz</p>
          <p class="ok-idcard__role">Planetary Scientist</p>
          <p class="ok-idcard__affil">
            General Geology &amp; Structural Geology<br />
            Institute of Earth and Environmental Sciences<br />
            University of Freiburg
          </p>
        </div>
        <div class="ok-idcard__contact">
          <a class="ok-idcard__email" href="mailto:oguzcan.karagoz@geologie.uni-freiburg.de">oguzcan.karagoz@geologie.uni-freiburg.de</a>
          <p class="ok-idcard__addr">Albertstrasse 23-B (room 01.007), 79104 Freiburg, Germany</p>
          <div class="ok-idcard__socials">
            <a v-for="s in socials" :key="s.kind" :href="s.href" :aria-label="s.label" :title="s.label"
               target="_blank" rel="noopener" class="ok-soc" :style="{ '--c': s.color }">
              <SocialIcon :kind="s.kind" />
            </a>
          </div>
        </div>
      </aside>

      <!--
        Carries the eye from the hero into the sections below: an accretion
        disk whose centre sits under the fold, so the orbits converge toward
        the content that follows.
      -->
      <OrbitFlow />

    </div>
  </section>

  <NewsBanner />

  <section class="ok-section">
    <CardSlider category="research">
      <template #title><h2 class="ok-section__title">{{ home.researchSectionTitle }}</h2></template>
    </CardSlider>
  </section>

  <section class="ok-section ok-section--tight">
    <CardSlider category="blog">
      <template #title><h2 class="ok-section__title">{{ home.blogSectionTitle }}</h2></template>
    </CardSlider>
  </section>
</div>
</template>
