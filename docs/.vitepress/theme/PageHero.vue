<script setup>
import Mesh from './Mesh.vue'
// `bg` is accepted but no longer painted: interior heroes now share the
// gradient mesh with the home page instead of each carrying its own dark
// photo band. The prop stays so existing frontmatter keeps working.
defineProps({ eyebrow: String, title: String, lede: String, bg: String, compact: Boolean })
</script>

<template>
  <section class="ok-phero" :class="{ 'ok-phero--compact': compact }">
    <Mesh />
    <div class="ok-phero__inner ok-enter">
      <p v-if="eyebrow" class="ok-phero__eyebrow">{{ eyebrow }}</p>
      <h1 class="ok-phero__title">{{ title }}</h1>
      <p v-if="lede" class="ok-phero__lede">{{ lede }}</p>
      <slot />
    </div>
  </section>
</template>
