<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Languages, Lock, Layers, Moon, Sun, Settings, StickyNote } from '@lucide/vue'
import { LEVELS, CHAPTERS, CHAPTER_SECTIONS } from '../data/index.js'
import { flashcardResetSignal } from '../composables/flashcardBus.js'
import { useTheme } from '../composables/useTheme.js'
import { useUsername } from '../composables/useUsername.js'
import { toggleNotes } from '../composables/useNotesOpen.js'

defineProps({ open: Boolean })
defineEmits(['close'])

const { dark, toggleTheme } = useTheme()
const { username } = useUsername()

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

// ── Sidebar resize ──────────────────────────────────────────────
const RESIZE_KEY = 'sidebar-w'
const MIN_W = 190
const MAX_W = 420

function applyWidth(w) {
  document.documentElement.style.setProperty('--sidebar-w', w + 'px')
}

let dragging = false
let startX = 0
let startW = 0

function onResizerMouseDown(e) {
  dragging = true
  startX = e.clientX
  startW = parseInt(localStorage.getItem(RESIZE_KEY)) || 252
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  e.preventDefault()
}

function onMouseMove(e) {
  if (!dragging) return
  const w = Math.min(MAX_W, Math.max(MIN_W, startW + e.clientX - startX))
  applyWidth(w)
}

function onMouseUp() {
  if (!dragging) return
  dragging = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  const w = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-w'))
  localStorage.setItem(RESIZE_KEY, w)
}

onMounted(() => {
  const saved = parseInt(localStorage.getItem(RESIZE_KEY))
  if (saved >= MIN_W && saved <= MAX_W) applyWidth(saved)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})
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
      <div v-if="username.trim()" class="sidebar-greeting">Hi, {{ username.trim() }}!</div>

      <div class="nav-section">
        <RouterLink to="/flashcards" custom v-slot="{ navigate, isExactActive }">
          <div class="nav-item top" :class="{ active: isExactActive }" @click="isExactActive ? flashcardResetSignal++ : navigate()" role="link">
            <Layers :size="14" />
            Flashcards
          </div>
        </RouterLink>
        <div class="nav-item top" @click="toggleNotes" role="button">
          <StickyNote :size="14" />
          Notes
        </div>
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

    <div class="sidebar-footer">
      <RouterLink to="/settings" custom v-slot="{ navigate, isExactActive }">
        <button class="theme-toggle" :class="{ 'toggle-active': isExactActive }" @click="navigate">
          <Settings :size="14" />
          Settings
        </button>
      </RouterLink>
      <button class="theme-toggle" @click="toggleTheme">
        <component :is="dark ? Sun : Moon" :size="14" />
        {{ dark ? 'Light mode' : 'Dark mode' }}
      </button>
    </div>

    <!-- Drag handle (desktop only via CSS) -->
    <div class="sidebar-resizer" @mousedown="onResizerMouseDown" />
  </nav>
</template>
