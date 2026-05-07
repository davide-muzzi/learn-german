<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Languages, Lock, Layers } from '@lucide/vue'
import { LEVELS, CHAPTERS, CHAPTER_SECTIONS } from '../data/index.js'
import { flashcardResetSignal } from '../composables/flashcardBus.js'

defineProps({ open: Boolean })
defineEmits(['close'])

const route = useRoute()

const currentLevel = computed(() =>
  (route.name === 'level' || route.name === 'chapter' || route.name === 'section')
    ? (route.params.level || '').toUpperCase()
    : null
)
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
        <RouterLink to="/flashcards" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item top" :class="{ active: isExactActive }" @click="isExactActive ? flashcardResetSignal++ : navigate()" role="link">
            <Layers :size="14" />
            Flashcards
          </div>
        </RouterLink>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Levels</div>

        <div v-for="lvl in LEVELS" :key="lvl.code">
          <RouterLink :to="lvl.path" custom v-slot="{ navigate }">
            <div
              class="nav-item sub ch-nav-item"
              :class="{ active: currentLevel === lvl.code, locked: !lvl.active }"
              @click="navigate"
              role="link"
            >
              <span class="ch-nav-n">{{ lvl.code }}</span>
              <span class="ch-nav-title">{{ lvl.name }}</span>
              <Lock v-if="!lvl.active" :size="11" class="ch-nav-lock" />
            </div>
          </RouterLink>

          <!-- Chapters: only expand for the current active level -->
          <template v-if="currentLevel === lvl.code && lvl.active">
            <div v-for="ch in CHAPTERS" :key="ch.n">
              <RouterLink :to="`${lvl.path}/ch/${ch.n}`" custom v-slot="{ navigate }">
                <div
                  class="nav-item section-sub ch-nav-item"
                  :class="{ active: currentChapterN === ch.n, locked: !ch.active }"
                  @click="navigate"
                  role="link"
                >
                  <span class="ch-nav-n">{{ ch.n }}</span>
                  <span class="ch-nav-title">{{ ch.title }}</span>
                  <Lock v-if="!ch.active" :size="11" class="ch-nav-lock" />
                </div>
              </RouterLink>

              <!-- Section sub-items -->
              <template v-if="currentChapterN === ch.n && ch.active && CHAPTER_SECTIONS[ch.n]">
                <RouterLink
                  v-for="sec in CHAPTER_SECTIONS[ch.n]"
                  :key="sec.key"
                  :to="`${lvl.path}/ch/${ch.n}/${sec.key}`"
                  custom
                  v-slot="{ navigate }"
                >
                  <div
                    class="nav-item section-sub"
                    style="padding-left: 58px;"
                    :class="{ active: currentSection === sec.key }"
                    @click="navigate"
                    role="link"
                  >
                    <span class="nav-dot"></span> {{ sec.label }}
                  </div>
                </RouterLink>
              </template>
            </div>
          </template>
        </div>

      </div>

    </div>
  </nav>
</template>
