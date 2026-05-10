<script setup>
import { useRouter } from 'vue-router'
import { LEVELS } from '../data/index.js'

const router = useRouter()

function goToLevel(lvl) {
  if (lvl.active) router.push(lvl.path)
}
</script>

<template>
  <div class="home-hero">
    <h1 class="home-title">Learn German (CH)</h1>
    <p class="home-sub">Free, structured German lessons from A1 to C2 — with a Swiss focus.</p>
    <div class="home-badges">
      <span>No account needed</span>
      <span>Open source</span>
      <span>Swiss German context</span>
    </div>
  </div>

  <div class="home-levels">
    <div
      v-for="lvl in LEVELS"
      :key="lvl.code"
      class="home-lvl-card"
      :class="{ 'home-lvl-active': lvl.active }"
      @click="goToLevel(lvl)"
      :role="lvl.active ? 'link' : undefined"
    >
      <div class="home-lvl-header">
        <span class="home-lvl-code">{{ lvl.code }}</span>
        <span class="home-lvl-status" :class="lvl.active ? 'st-active' : 'st-soon'">
          {{ lvl.active ? 'In Progress' : 'Coming Soon' }}
        </span>
      </div>
      <h3 class="home-lvl-name">{{ lvl.name }}</h3>
      <p class="home-lvl-desc">{{ lvl.desc }}</p>
    </div>
  </div>
</template>
