<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { CHAPTERS } from '../data/index.js'

const route = useRoute()
const currentChapterN = computed(() =>
  route.name === 'chapter' ? parseInt(route.params.n) : null
)
</script>

<template>
  <nav class="sidebar">
    <div class="sidebar-logo">
      <h1>🇩🇪 Deutsch A1</h1>
      <p>Interactive Lesson Book</p>
    </div>
    <div class="sidebar-body">

      <div class="nav-section">
        <RouterLink to="/a1" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item top" :class="{ active: isExactActive }" @click="navigate" role="link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            A1 Overview
          </div>
        </RouterLink>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Level A1</div>
        <RouterLink
          v-for="ch in CHAPTERS"
          :key="ch.n"
          :to="`/a1/ch/${ch.n}`"
          custom
          v-slot="{ navigate }"
        >
          <div
            class="nav-item sub ch-nav-item"
            :class="{ active: currentChapterN === ch.n, locked: !ch.active }"
            @click="navigate"
            role="link"
          >
            <span class="ch-nav-n">{{ ch.n }}</span>
            <span class="ch-nav-title">{{ ch.title }}</span>
            <span v-if="!ch.active" class="ch-nav-lock">🔒</span>
          </div>
        </RouterLink>
      </div>

    </div>
  </nav>
</template>
