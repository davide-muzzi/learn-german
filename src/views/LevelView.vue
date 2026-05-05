<script setup>
import { useRouter } from 'vue-router'
import { CHAPTERS } from '../data/index.js'

const router = useRouter()

function goToChapter(n) {
  router.push(`/a1/ch/${n}`)
}
</script>

<template>
  <div class="page-header">
    <div class="level-eyebrow">Beginner</div>
    <h1>A1 — Course Overview</h1>
    <p class="sub">8 chapters from absolute beginner to Goethe A1 exam readiness. Click any chapter to open it.</p>
  </div>
  <div class="card">
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
  </div>
</template>
