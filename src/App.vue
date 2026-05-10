<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Languages, PanelLeftOpen, StickyNote } from '@lucide/vue'
import AppSidebar from './components/AppSidebar.vue'
import AppFooter from './components/AppFooter.vue'
import AppNotesPanel from './components/AppNotesPanel.vue'
import { useSidebarCollapsed } from './composables/useSidebarCollapsed.js'
import { notesOpen, toggleNotes } from './composables/useNotesOpen.js'

const sidebarOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { sidebarOpen.value = false })

const { collapsed: sidebarCollapsed } = useSidebarCollapsed()
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <header class="mobile-header" :class="{ 'home-header': isHome }">
    <button v-if="!isHome" class="hamburger" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle navigation">
      <span /><span /><span />
    </button>
    <RouterLink to="/" class="mobile-title"><Languages :size="16" /> Learn German (CH)</RouterLink>
  </header>

  <Transition name="overlay-fade">
    <div v-if="sidebarOpen && !isHome" class="sidebar-overlay" @click="sidebarOpen = false" />
  </Transition>

  <AppSidebar v-if="!isHome" :open="sidebarOpen" :class="{ collapsed: sidebarCollapsed }" @close="sidebarOpen = false" />

  <Transition name="reopen-fade">
    <button v-if="!isHome && sidebarCollapsed" class="sidebar-reopen" title="Open sidebar" @click="sidebarCollapsed = false">
      <PanelLeftOpen :size="18" />
    </button>
  </Transition>

  <main class="main" :class="{ 'sidebar-collapsed': sidebarCollapsed, 'no-sidebar': isHome }">
    <div class="main-content">
      <RouterView />
    </div>
    <AppFooter />
  </main>

  <Transition name="reopen-fade">
    <button v-if="!isHome && !notesOpen" class="notes-open-btn" title="Open notes" @click="toggleNotes">
      <StickyNote :size="18" />
    </button>
  </Transition>

  <button v-if="!isHome" class="notes-fab" aria-label="Open notes" @click="toggleNotes">
    <StickyNote :size="22" />
  </button>

  <AppNotesPanel />
</template>
