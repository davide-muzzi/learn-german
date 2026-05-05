<script setup>
import { ROADMAP } from '../data/index.js'
</script>

<template>
  <div class="page-header">
    <h1>A1 Roadmap</h1>
    <p class="sub">8 chapters from absolute beginner to Goethe A1 exam readiness.</p>
  </div>
  <div class="card">
    <div class="roadmap-grid">
      <div
        v-for="ch in ROADMAP"
        :key="ch.n"
        class="ch-card"
        :class="{ 'ch-active': ch.active }"
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
