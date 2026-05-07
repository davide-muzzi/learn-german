<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Languages } from '@lucide/vue'
import AppSidebar from './components/AppSidebar.vue'

const sidebarOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { sidebarOpen.value = false })
</script>

<template>
  <header class="mobile-header">
    <button class="hamburger" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle navigation">
      <span /><span /><span />
    </button>
    <span class="mobile-title"><Languages :size="16" /> Deutsch A1</span>
  </header>

  <Transition name="overlay-fade">
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false" />
  </Transition>

  <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

  <main class="main">
    <RouterView />
  </main>
</template>
