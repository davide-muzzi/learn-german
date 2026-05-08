<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { X, Eye, Edit2 } from '@lucide/vue'
import { useNotes } from '../composables/useNotes.js'
import { notesOpen } from '../composables/useNotesOpen.js'
import { render } from "../utils/render.js";

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

// ── Resize ───────────────────────────────────────────────────────
const RESIZE_KEY = 'notes-w'
const MIN_W = 280
const MAX_W = 600

function applyWidth(w) {
  document.documentElement.style.setProperty('--notes-w', w + 'px')
}

let dragging = false
let startX = 0
let startW = 0

function onResizerMouseDown(e) {
  dragging = true
  startX = e.clientX
  startW = parseInt(localStorage.getItem(RESIZE_KEY)) || 360
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  e.preventDefault()
}

function onMouseMove(e) {
  if (!dragging) return
  const w = Math.min(MAX_W, Math.max(MIN_W, startW - (e.clientX - startX)))
  applyWidth(w)
}

function onMouseUp() {
  if (!dragging) return
  dragging = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  const w = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--notes-w'))
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

const vSyncMarkdown = {
  updated(el, binding) {
    if (document.activeElement !== el) {
      el.innerHTML = binding.value
    }
  }
}

function onNotesInput(e) {
  currentNotes.value = e.target.innerText
}

function onNotesKeydown(e) {
  if (e.key === 'Enter') {
    setTimeout(() => {
      const el = e.target
      el.innerHTML = render(el.innerText)
      const sel = window.getSelection()
      const newRange = document.createRange()
      newRange.selectNodeContents(el)
      newRange.collapse(false)
      sel.removeAllRanges()
      sel.addRange(newRange)
    }, 0)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="notes-slide">
      <div v-if="notesOpen" class="notes-overlay" @click.self="notesOpen = false">
        <div class="notes-panel">
          <div class="notes-resizer" @mousedown="onResizerMouseDown" />

          <div class="notes-header">
            <div class="notes-tabs">
              <button class="notes-tab" :class="{ active: tab === 'page' }" @click="switchTab('page')">This page</button>
              <button class="notes-tab" :class="{ active: tab === 'global' }" @click="switchTab('global')">Global</button>
              <button class="notes-tab" :class="{ active: tab === 'all' }" @click="switchTab('all')">All</button>
            </div>
           <div class="notes-actions">
              <button class="notes-icon-btn" title="Close" @click="notesOpen = false">
                <X :size="14" />
              </button>
            </div>
          </div>

          <div v-if="tab === 'all'" class="notes-all">
            <template v-if="globalNotes.trim() || allNotes.length">
              <div v-if="globalNotes.trim()" class="notes-all-block">
                <div class="notes-all-label">Global</div>
               <div class="notes-rendered" v-html="render(globalNotes)" />
              </div>
              <div v-for="{ key, content } in allNotes" :key="key" class="notes-all-block">
                <div class="notes-all-label">{{ key }}</div>
               <div class="notes-rendered" v-html="render(content)" />
              </div>
            </template>
            <div v-else class="notes-empty">No notes yet.</div>
          </div>

        <div class="notes-textarea" contenteditable="true" v-sync-markdown="render(currentNotes)"
            @input="onNotesInput" @keydown="onNotesKeydown" @blur="$event.target.innerHTML = render(currentNotes)"
            placeholder="Write notes in Markdown…" />

          <div class="notes-footer">
            <button class="notes-save-btn" @click="notesOpen = false">Save & close</button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>
