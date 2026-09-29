<script setup>
import { ref, computed } from 'vue'
import pubs from '../data/publications.json'
// Edited via the CMS (Publications List) or docs/.vitepress/data/publications.json
const peerReviewed = pubs.peerReviewed
const abstracts = pubs.abstracts

const tab = ref('peer')        // 'peer' | 'abstracts'
const query = ref('')
const year = ref('')

const source = computed(() => (tab.value === 'peer' ? peerReviewed : abstracts))
const venueLabel = computed(() => (tab.value === 'peer' ? 'Journal' : 'Conference'))
const years = computed(() => [...new Set(source.value.map(p => p.year))].sort((a, b) => b - a))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return source.value.filter(p => {
    const matchesYear = !year.value || p.year === year.value
    const matchesQuery = !q ||
      p.title.toLowerCase().includes(q) ||
      p.venue.toLowerCase().includes(q)
    return matchesYear && matchesQuery
  })
})

function setTab(t) {
  tab.value = t
  query.value = ''
  year.value = ''
}
</script>

<template>
<section class="ok-pubs">
  <div class="ok-pubs__tabs">
    <button class="ok-pubs__tab" :class="{ 'is-active': tab === 'peer' }" @click="setTab('peer')">
      Peer-reviewed Articles
    </button>
    <button class="ok-pubs__tab" :class="{ 'is-active': tab === 'abstracts' }" @click="setTab('abstracts')">
      Abstracts
    </button>
  </div>

  <div class="ok-pubs__controls">
    <input class="ok-pubs__search" v-model="query" placeholder="Search by title or journal" />
    <select class="ok-pubs__filter" v-model="year">
      <option value="">All years</option>
      <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
    </select>
  </div>

  <p class="ok-pubs__count ok-tnum">{{ filtered.length }} of {{ source.length }} entries</p>

  <table class="ok-pubs__table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Year</th>
        <th>{{ venueLabel }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(p, i) in filtered" :key="p.url + i">
        <td class="ok-pubs__title"><a :href="p.url" target="_blank" rel="noopener">{{ p.title }}</a></td>
        <td class="ok-pubs__year">{{ p.year }}</td>
        <td class="ok-pubs__venue">{{ p.venue }}</td>
      </tr>
      <tr v-if="filtered.length === 0">
        <td colspan="3" class="ok-pubs__empty">No entries match that search. Try a different term or clear the year filter.</td>
      </tr>
    </tbody>
  </table>
</section>
</template>
