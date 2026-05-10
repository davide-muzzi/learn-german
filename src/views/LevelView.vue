<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Lock } from '@lucide/vue'
import { LEVELS, CHAPTERS } from '../data/index.js'

const route = useRoute()
const router = useRouter()

const levelParam = computed(() => route.params.level || 'a1')
const level = computed(() => LEVELS.find(l => l.code === levelParam.value.toUpperCase()))

function goToChapter(n) {
  router.push(`/${levelParam.value}/ch/${n}`)
}
</script>

<template>
  <!-- Active level: show chapter grid -->
  <template v-if="level?.active">
    <div class="page-header">
      <div class="level-eyebrow">{{ level.name }}</div>
      <h1>{{ level.code }} — Course Overview</h1>
      <p class="sub">{{ CHAPTERS.length }} chapters from absolute beginner to Goethe {{ level.code }} exam readiness. Click any chapter to open it.</p>
    </div>
    <div class="roadmap-grid">
      <div
        v-for="ch in CHAPTERS"
        :key="ch.n"
        class="ch-card"
        :class="{ 'ch-active': ch.active }"
        @click="goToChapter(ch.n)"
        role="link"
      >
        <div class="ch-num">Chapter {{ ch.n }}</div>
        <span class="ch-status" :class="ch.active ? 'st-active' : 'st-soon'">
          {{ ch.active ? '● In Progress' : 'Coming Soon' }}
        </span>
        <h3>{{ ch.title }}</h3>
        <ul>
          <li v-for="topic in ch.topics" :key="topic">{{ topic }}</li>
        </ul>
      </div>
    </div>
  </template>

  <!-- Inactive level: coming soon -->
  <template v-else>
    <div class="page-header">
      <div class="level-eyebrow">{{ level?.name ?? levelParam.toUpperCase() }}</div>
      <h1>{{ level?.code ?? levelParam.toUpperCase() }} — Coming Soon</h1>
      <p class="sub">This level is being prepared. Check back later!</p>
    </div>
    <div class="card coming-soon-card">
      <div class="coming-soon-icon"><Lock :size="36" /></div>
      <h2>Not yet available</h2>
      <p>Level <strong>{{ level?.code ?? levelParam.toUpperCase() }}</strong> content is being worked on.</p>
    </div>
  </template>
</template>
