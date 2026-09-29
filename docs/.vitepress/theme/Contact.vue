<script setup>
import SocialIcon from './SocialIcon.vue'
import { socials } from './socials.js'
</script>

<template>
<div class="ok-ct">
  <div>
    <a class="ok-ct__email" href="mailto:oguzcan.karagoz@geologie.uni-freiburg.de">oguzcan.karagoz@geologie.uni-freiburg.de</a>
    <p class="ok-ct__addr">
      General Geology &amp; Structural Geology<br />
      Institute of Earth and Environmental Sciences<br />
      University of Freiburg<br />
      Albertstrasse 23-B (room 01.007), 79104 Freiburg, Germany
    </p>
  </div>
  <div class="ok-ct__socials">
    <a v-for="s in socials" :key="s.kind" :href="s.href" :aria-label="s.label" :title="s.label"
       target="_blank" rel="noopener" class="ok-soc" :style="{ '--c': s.color }">
      <SocialIcon :kind="s.kind" />
    </a>
  </div>
</div>
</template>
