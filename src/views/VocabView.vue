<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import VocabTable from '../components/VocabTable.vue'
import { GREETINGS, YOUR_NAME, WHERE_FROM, EXPRESSIONS } from '../data/index.js'

const configs = {
  'v-greetings': {
    title: 'Begrüssungen / Greetings',
    subtitle: 'Essential phrases for saying hello and goodbye.',
    rows: GREETINGS,
  },
  'v-name': {
    title: 'Deinen Namen sagen / Saying Your Name',
    subtitle: 'Introduce yourself and ask others their name.',
    rows: YOUR_NAME,
  },
  'v-from': {
    title: "Woher kommst du? / Where You're From",
    subtitle: 'Talk about your origin and where you live.',
    rows: WHERE_FROM,
  },
  'v-expr': {
    title: 'Häufige Ausdrücke / Common Expressions',
    subtitle: 'Everyday polite phrases every German speaker needs.',
    rows: EXPRESSIONS,
  },
}

const route = useRoute()
const config = computed(() => configs[route.name])
</script>

<template>
  <template v-if="config">
    <div class="page-header">
      <h1>{{ config.title }}</h1>
      <p class="sub">{{ config.subtitle }}</p>
    </div>
    <div class="card">
      <VocabTable :rows="config.rows" />
    </div>
  </template>
</template>
