<script setup>
import { useRouter } from 'vue-router'
import { LEVELS } from '../data/index.js'

const router = useRouter()

function goToLevel(lvl) {
  if (lvl.active) router.push(lvl.path)
}
</script>

<template>
  <div class="page-header">
    <h1>Deutsch A1 - C2</h1>
    <p class="sub">An interactive lesson book following the CEFR framework. Choose a level to begin.</p>
  </div>
  <div class="card">
    <div class="lvl-grid">
      <div
        v-for="lvl in LEVELS"
        :key="lvl.code"
        class="lvl-card"
        :class="{ 'lvl-active': lvl.active }"
        @click="goToLevel(lvl)"
        :role="lvl.active ? 'link' : undefined"
      >
        <div class="lvl-code">{{ lvl.code }}</div>
        <span class="ch-status" :class="lvl.active ? 'st-active' : 'st-soon'">
          {{ lvl.active ? '● In Progress' : 'Coming Soon' }}
        </span>
        <h3>{{ lvl.name }}</h3>
        <p class="lvl-desc">{{ lvl.desc }}</p>
      </div>
    </div>
  </div>
</template>
