<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ConjugTable from '../components/ConjugTable.vue'
import { SEIN, HABEN } from '../data/index.js'

const configs = {
  'g-sein': {
    verb: 'sein',
    translation: 'to be',
    note: 'One of the most important verbs in German. Irregular — memorize it!',
    rows: SEIN,
  },
  'g-haben': {
    verb: 'haben',
    translation: 'to have',
    note: 'The second essential verb. Used for possession and as an auxiliary verb.',
    rows: HABEN,
  },
}

const route = useRoute()
const config = computed(() => configs[route.name])
</script>

<template>
  <template v-if="config">
    <div class="page-header">
      <h1>
        {{ config.verb }}
        <span style="color:var(--muted);font-weight:400;font-size:18px;">/ {{ config.translation }}</span>
      </h1>
      <p class="sub">{{ config.note }}</p>
    </div>
    <div class="card">
      <ConjugTable :rows="config.rows" :verb="config.verb" />
    </div>
  </template>
</template>
