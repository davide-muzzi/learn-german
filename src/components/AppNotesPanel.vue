<script setup>
import { ref, computed } from 'vue'
import { X, Eye, Edit2 } from '@lucide/vue'
import { marked } from 'marked'
import { useNotes } from '../composables/useNotes.js'
import { notesOpen } from '../composables/useNotesOpen.js'

const { globalNotes, pageNotes, allNotes } = useNotes()

const tab = ref('page')
const preview = ref(false)

const currentNotes = computed({
  get: () => tab.value === 'global' ? globalNotes.value : pageNotes.value,
  set: val => {
    if (tab.value === 'global') globalNotes.value = val
    else pageNotes.value = val
  },
})

function switchTab(t) {
  tab.value = t
  preview.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="notes-slide">
      <div v-if="notesOpen" class="notes-overlay" @click.self="notesOpen = false">
        <div class="notes-panel">

          <div class="notes-header">
            <div class="notes-tabs">
              <button class="notes-tab" :class="{ active: tab === 'page' }" @click="switchTab('page')">This page</button>
              <button class="notes-tab" :class="{ active: tab === 'global' }" @click="switchTab('global')">Global</button>
              <button class="notes-tab" :class="{ active: tab === 'all' }" @click="switchTab('all')">All</button>
            </div>
            <div class="notes-actions">
              <button v-if="tab !== 'all'" class="notes-icon-btn" :title="preview ? 'Edit' : 'Preview'" @click="preview = !preview">
                <component :is="preview ? Edit2 : Eye" :size="14" />
              </button>
              <button class="notes-icon-btn" title="Close" @click="notesOpen = false">
                <X :size="14" />
              </button>
            </div>
          </div>

          <div v-if="tab === 'all'" class="notes-all">
            <template v-if="globalNotes.trim() || allNotes.length">
              <div v-if="globalNotes.trim()" class="notes-all-block">
                <div class="notes-all-label">Global</div>
                <div class="notes-rendered" v-html="marked(globalNotes)" />
              </div>
              <div v-for="{ key, content } in allNotes" :key="key" class="notes-all-block">
                <div class="notes-all-label">{{ key }}</div>
                <div class="notes-rendered" v-html="marked(content)" />
              </div>
            </template>
            <div v-else class="notes-empty">No notes yet.</div>
          </div>

          <template v-else>
            <div v-if="preview" class="notes-rendered notes-rendered-main" v-html="marked(currentNotes)" />
            <textarea v-else class="notes-textarea" v-model="currentNotes" placeholder="Write notes in Markdown…" />
          </template>

          <div class="notes-footer">
            <button class="notes-save-btn" @click="notesOpen = false">Save & close</button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>
