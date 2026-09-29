<!--
  Gradient mesh backdrop.

  The atmospheric wash that sits behind the top of every page. Purely
  decorative, so it is hidden from assistive technology and ignores
  pointer events. `drift` opts into the slow ambient animation — used
  on the home hero only, so the effect stays a signature rather than
  a habit.
-->
<script setup>
defineProps({
  drift: { type: Boolean, default: false },
})
</script>

<template>
  <div class="ok-mesh" :class="{ 'ok-mesh--drift': drift }" aria-hidden="true">
    <div class="ok-mesh__layer" />
  </div>
</template>
