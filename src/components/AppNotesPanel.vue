<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import {
  X, Eye, Edit2,
  Bold, Italic, Heading1, Heading2, List, ListOrdered, Code,
  Columns2, Rows,
} from '@lucide/vue'
import { marked } from 'marked'
import { useNotes } from '../composables/useNotes.js'
import { notesOpen } from '../composables/useNotesOpen.js'

const { globalNotes, pageNotes, allNotes } = useNotes()

const tab = ref('page')
// 'editor' | 'preview' | 'split-v' | 'split-h'
const layout = ref('editor')

const isEditorVisible = computed(() => layout.value !== 'preview')

const currentNotes = computed({
  get: () => tab.value === 'global' ? globalNotes.value : pageNotes.value,
  set: val => {
    if (tab.value === 'global') globalNotes.value = val
    else pageNotes.value = val
  },
})

function switchTab(t) { tab.value = t }

// ── Toolbar ───────────────────────────────────────────────────────
const textarea = ref(null)

function applyFormat(type) {
  const el = textarea.value
  if (!el) return
  const start = el.selectionStart
  const end   = el.selectionEnd
  const val   = currentNotes.value
  const sel   = val.slice(start, end)

  let newVal   = val
  let newStart = start
  let newEnd   = end

  switch (type) {
    case 'bold': {
      const inner = sel || 'bold text'
      newVal = val.slice(0, start) + `**${inner}**` + val.slice(end)
      newStart = start + 2; newEnd = newStart + inner.length
      break
    }
    case 'italic': {
      const inner = sel || 'italic text'
      newVal = val.slice(0, start) + `*${inner}*` + val.slice(end)
      newStart = start + 1; newEnd = newStart + inner.length
      break
    }
    case 'code': {
      const inner = sel || 'code'
      newVal = val.slice(0, start) + '`' + inner + '`' + val.slice(end)
      newStart = start + 1; newEnd = newStart + inner.length
      break
    }
    case 'h1':
    case 'h2': {
      const prefix    = type === 'h1' ? '# ' : '## '
      const lineStart = val.lastIndexOf('\n', start - 1) + 1
      const lineEndI  = val.indexOf('\n', start)
      const line      = val.slice(lineStart, lineEndI === -1 ? val.length : lineEndI)
      const stripped  = line.replace(/^#{1,6}\s*/, '')
      const newLine   = prefix + stripped
      newVal   = val.slice(0, lineStart) + newLine + (lineEndI === -1 ? '' : val.slice(lineEndI))
      newStart = lineStart + newLine.length; newEnd = newStart
      break
    }
    case 'ul': {
      const lineStart = val.lastIndexOf('\n', start - 1) + 1
      const lineEndI  = val.indexOf('\n', end > start ? end - 1 : start)
      const block     = val.slice(lineStart, lineEndI === -1 ? val.length : lineEndI)
      const newBlock  = block.split('\n').map(l => `- ${l.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '')}`).join('\n')
      newVal   = val.slice(0, lineStart) + newBlock + (lineEndI === -1 ? '' : val.slice(lineEndI))
      newStart = lineStart; newEnd = lineStart + newBlock.length
      break
    }
    case 'ol': {
      const lineStart = val.lastIndexOf('\n', start - 1) + 1
      const lineEndI  = val.indexOf('\n', end > start ? end - 1 : start)
      const block     = val.slice(lineStart, lineEndI === -1 ? val.length : lineEndI)
      let i = 1
      const newBlock  = block.split('\n').map(l => `${i++}. ${l.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '')}`).join('\n')
      newVal   = val.slice(0, lineStart) + newBlock + (lineEndI === -1 ? '' : val.slice(lineEndI))
      newStart = lineStart; newEnd = lineStart + newBlock.length
      break
    }
  }

  currentNotes.value = newVal
  nextTick(() => {
    if (!textarea.value) return
    textarea.value.focus()
    textarea.value.setSelectionRange(newStart, newEnd)
  })
}

// ── Resize ───────────────────────────────────────────────────────
const RESIZE_KEY = 'notes-w'
const MIN_W = 280
const maxW = () => Math.floor(window.innerWidth / 3)

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
  const w = Math.min(maxW(), Math.max(MIN_W, startW - (e.clientX - startX)))
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
  if (saved >= MIN_W && saved <= maxW()) applyWidth(saved)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="notes-slide">
      <div v-if="notesOpen" class="notes-overlay" @click.self="notesOpen = false">
        <div class="notes-panel" :class="{ 'notes-panel-wide': layout === 'split-h' }">
          <div class="notes-resizer" @mousedown="onResizerMouseDown" />

          <div class="notes-header">
            <div class="notes-tabs">
              <button class="notes-tab" :class="{ active: tab === 'page' }"   @click="switchTab('page')">This page</button>
              <button class="notes-tab" :class="{ active: tab === 'global' }" @click="switchTab('global')">Global</button>
              <button class="notes-tab" :class="{ active: tab === 'all' }"    @click="switchTab('all')">All</button>
            </div>
            <div class="notes-actions">
              <template v-if="tab !== 'all'">
                <button class="notes-icon-btn" :class="{ active: layout === 'editor' }"  title="Editor only"    @click="layout = 'editor'">  <Edit2    :size="14" /></button>
                <button class="notes-icon-btn" :class="{ active: layout === 'split-v' }" title="Split top/bottom" @click="layout = 'split-v'"><Rows     :size="14" /></button>
                <button class="notes-icon-btn" :class="{ active: layout === 'split-h' }" title="Split side by side" @click="layout = 'split-h'"><Columns2 :size="14" /></button>
                <button class="notes-icon-btn" :class="{ active: layout === 'preview' }" title="Preview only"   @click="layout = 'preview'"> <Eye      :size="14" /></button>
              </template>
              <button class="notes-icon-btn" title="Close" @click="notesOpen = false"><X :size="14" /></button>
            </div>
          </div>

          <!-- Formatting toolbar -->
          <div v-if="isEditorVisible && tab !== 'all'" class="notes-toolbar">
            <button class="toolbar-btn" title="Bold"          @mousedown.prevent="applyFormat('bold')">   <Bold         :size="13" /></button>
            <button class="toolbar-btn" title="Italic"        @mousedown.prevent="applyFormat('italic')"> <Italic       :size="13" /></button>
            <div class="toolbar-sep" />
            <button class="toolbar-btn" title="Heading 1"     @mousedown.prevent="applyFormat('h1')">     <Heading1     :size="13" /></button>
            <button class="toolbar-btn" title="Heading 2"     @mousedown.prevent="applyFormat('h2')">     <Heading2     :size="13" /></button>
            <div class="toolbar-sep" />
            <button class="toolbar-btn" title="Bullet list"   @mousedown.prevent="applyFormat('ul')">     <List         :size="13" /></button>
            <button class="toolbar-btn" title="Numbered list" @mousedown.prevent="applyFormat('ol')">     <ListOrdered  :size="13" /></button>
            <div class="toolbar-sep" />
            <button class="toolbar-btn" title="Inline code"   @mousedown.prevent="applyFormat('code')">   <Code         :size="13" /></button>
          </div>

          <!-- All tab -->
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
            <!-- Editor only -->
            <textarea
              v-if="layout === 'editor'"
              ref="textarea"
              class="notes-textarea"
              v-model="currentNotes"
              placeholder="Write notes…"
            />

            <!-- Preview only -->
            <div
              v-else-if="layout === 'preview'"
              class="notes-rendered notes-rendered-main"
              v-html="marked(currentNotes)"
            />

            <!-- Split vertical (top / bottom) -->
            <div v-else-if="layout === 'split-v'" class="notes-split notes-split-v">
              <textarea ref="textarea" class="notes-textarea notes-split-pane" v-model="currentNotes" placeholder="Write notes…" />
              <div class="notes-split-divider" />
              <div class="notes-rendered notes-rendered-main notes-split-pane" v-html="marked(currentNotes)" />
            </div>

            <!-- Split horizontal (left / right) -->
            <div v-else-if="layout === 'split-h'" class="notes-split notes-split-h">
              <textarea ref="textarea" class="notes-textarea notes-split-pane" v-model="currentNotes" placeholder="Write notes…" />
              <div class="notes-split-divider" />
              <div class="notes-rendered notes-rendered-main notes-split-pane" v-html="marked(currentNotes)" />
            </div>
          </template>

          <div class="notes-footer">
            <button class="notes-save-btn" @click="notesOpen = false">Save &amp; close</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
