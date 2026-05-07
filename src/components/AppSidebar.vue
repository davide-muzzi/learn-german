<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Languages, Lock, Layers } from '@lucide/vue'
import { CHAPTERS, CHAPTER_SECTIONS } from '../data/index.js'
import { flashcardResetSignal } from '../composables/flashcardBus.js'

defineProps({ open: Boolean })
defineEmits(['close'])

const route = useRoute()

const currentChapterN = computed(() =>
  (route.name === 'chapter' || route.name === 'section') ? parseInt(route.params.n) : null
)
const currentSection = computed(() =>
  route.name === 'section' ? route.params.section : null
)
</script>

<template>
  <nav class="sidebar" :class="{ 'is-open': open }">
    <div class="sidebar-logo">
      <RouterLink to="/" class="sidebar-logo-link">
        <h1><Languages :size="17" /> Deutsch A1</h1>
        <p>Interactive Lesson Book</p>
      </RouterLink>
      <button class="sidebar-close" @click="$emit('close')" aria-label="Close menu">✕</button>
    </div>
    <div class="sidebar-body">

      <div class="nav-section">
        <RouterLink to="/a1" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item top" :class="{ active: isExactActive }" @click="navigate" role="link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            A1 Overview
          </div>
        </RouterLink>
        <RouterLink to="/flashcards" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item top" :class="{ active: isExactActive }" @click="isExactActive ? flashcardResetSignal++ : navigate()" role="link">
            <Layers :size="14" />
            Flashcards
          </div>
        </RouterLink>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Level A1</div>

        <div v-for="ch in CHAPTERS" :key="ch.n">
          <RouterLink :to="`/a1/ch/${ch.n}`" custom v-slot="{ navigate }">
            <div
              class="nav-item sub ch-nav-item"
              :class="{ active: currentChapterN === ch.n, locked: !ch.active }"
              @click="navigate"
              role="link"
            >
              <span class="ch-nav-n">{{ ch.n }}</span>
              <span class="ch-nav-title">{{ ch.title }}</span>
              <Lock v-if="!ch.active" :size="11" class="ch-nav-lock" />
            </div>
          </RouterLink>

          <!-- Section sub-items: only for the active chapter -->
          <template v-if="currentChapterN === ch.n && ch.active && CHAPTER_SECTIONS[ch.n]">
            <RouterLink
              v-for="sec in CHAPTER_SECTIONS[ch.n]"
              :key="sec.key"
              :to="`/a1/ch/${ch.n}/${sec.key}`"
              custom
              v-slot="{ navigate }"
            >
              <div
                class="nav-item section-sub"
                :class="{ active: currentSection === sec.key }"
                @click="navigate"
                role="link"
              >
                <span class="nav-dot"></span> {{ sec.label }}
              </div>
            </RouterLink>
          </template>
        </div>

      </div>

    </div>
  </nav>
</template>
