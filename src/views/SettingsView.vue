<script setup>
import { ref, computed } from 'vue'
import { RotateCcw, Trash2 } from '@lucide/vue'
import { useTheme } from '../composables/useTheme.js'
import { useUsername } from '../composables/useUsername.js'

const { dark, toggleTheme } = useTheme()
const { username } = useUsername()

const KEY_LABELS = {
  'theme':      'Theme',
  'sidebar-w':  'Sidebar width',
  'username':   'Your name',
  'notes-data': 'Notes',
}

const v = ref(0)
const entries = computed(() => {
  v.value
  return Object.keys(localStorage).sort().map(key => ({ key, value: localStorage.getItem(key) }))
})
const refresh = () => v.value++

function deleteEntry(key) {
  localStorage.removeItem(key)
  refresh()
}

const resetPending = ref(false)
function confirmReset() {
  localStorage.clear()
  location.reload()
}

function formatValue(val) {
  if (val === null || val === undefined) return '—'
  if (val.length > 70) return val.slice(0, 67) + '…'
  return val
}
</script>

<template>
  <div class="page-header">
    <h1>Settings</h1>
    <p class="sub">All settings are saved locally in your browser — nothing is sent to a server.</p>
  </div>

  <!-- Appearance -->
  <div class="card">
    <div class="card-title">Appearance</div>
    <div class="setting-row">
      <div class="setting-label">
        <div class="setting-name">Dark mode</div>
        <div class="setting-desc">Easier on the eyes at night</div>
      </div>
      <label class="setting-toggle">
        <input type="checkbox" :checked="dark" @change="toggleTheme" />
        <span class="setting-toggle-track"></span>
      </label>
    </div>
  </div>

  <!-- Personalisation -->
  <div class="card">
    <div class="card-title">Personalisation</div>
    <div class="setting-row">
      <div class="setting-label">
        <div class="setting-name">Your name</div>
        <div class="setting-desc">Shown as a greeting in the sidebar</div>
      </div>
      <input v-model="username" placeholder="Enter your name" class="setting-input setting-input-inline" />
    </div>
  </div>

  <!-- Stored Data -->
  <div class="card">
    <div class="card-title">Stored Data</div>
    <p class="card-sub">Everything this app has saved to your browser's local storage.</p>

    <div class="storage-list">
      <div v-if="entries.length === 0" class="storage-empty">Nothing stored yet.</div>
      <div v-for="e in entries" :key="e.key" class="storage-row">
        <div class="storage-key">{{ KEY_LABELS[e.key] ?? e.key }}</div>
        <div class="storage-value">{{ formatValue(e.value) }}</div>
        <button class="storage-delete" @click="deleteEntry(e.key)" :title="`Delete ${e.key}`">
          <Trash2 :size="13" />
        </button>
      </div>
    </div>

    <div class="reset-zone">
      <template v-if="!resetPending">
        <button class="reset-all-btn" @click="resetPending = true">
          <RotateCcw :size="13" /> Reset everything
        </button>
      </template>
      <template v-else>
        <span class="reset-confirm-text">Clear all stored data and reload?</span>
        <button class="reset-all-btn danger" @click="confirmReset">Yes, reset</button>
        <button class="link-btn" @click="resetPending = false">Cancel</button>
      </template>
    </div>
  </div>
</template>
