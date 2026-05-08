<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { X, Heading1, Heading2, Bold, Italic, Strikethrough, Code, Link2, List, ListOrdered, CheckSquare, Quote, Rows2, Columns2, PenLine, Eye } from '@lucide/vue'
import { useNotes } from '../composables/useNotes.js'
import { notesOpen } from '../composables/useNotesOpen.js'
import { render } from "../utils/render.js";
import { computed, watch } from 'vue'

const { globalNotes, pageNotes, allNotes } = useNotes()

const tab = ref('page')

// ── Layout mode ───────────────────────────────────────────────────
// modes: 'split-v' (top/bottom), 'split-h' (left/right), 'editor', 'preview'
const LAYOUT_KEY = 'notes-layout'
const layout = ref(localStorage.getItem(LAYOUT_KEY) || 'split-v')

function setLayout(mode) {
  layout.value = mode
  localStorage.setItem(LAYOUT_KEY, mode)
}

const currentNotes = computed({
  get: () => tab.value === 'global' ? globalNotes.value : pageNotes.value,
  set: val => {
    if (tab.value === 'global') globalNotes.value = val
    else pageNotes.value = val
  },
})

function switchTab(t) {
  tab.value = t
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

// ── Toolbar ──────────────────────────────────────────────────────
const textareaRef = ref(null)

const WRAP_FORMATS = {
  bold:   { marker: '**', placeholder: 'bold text' },
  italic: { marker: '*',  placeholder: 'italic text' },
  strike: { marker: '~~', placeholder: 'strikethrough' },
  code:   { marker: '`',  placeholder: 'code' },
}

const LINE_PREFIXES = {
  h1:    '# ',
  h2:    '## ',
  h3:    '### ',
  quote: '> ',
  ul:    '- ',
  ol:    '1. ',
  check: '- [ ] ',
}

function applyFormat(kind) {
  const el = textareaRef.value
  if (!el) return
  const start = el.selectionStart
  const end   = el.selectionEnd
  const text  = currentNotes.value ?? ''

  if (kind === 'link') {
    const sel = text.slice(start, end)
    let replacement, newStart, newEnd
    if (sel) {
      replacement = `[${sel}](url)`
      newStart = start + sel.length + 3
      newEnd   = newStart + 3
    } else {
      replacement = '[text](url)'
      newStart = start + 1
      newEnd   = newStart + 4
    }
    const next = text.slice(0, start) + replacement + text.slice(end)
    currentNotes.value = next
    nextTick(() => { el.focus(); el.setSelectionRange(newStart, newEnd) })
    return
  }

  if (WRAP_FORMATS[kind]) {
    const { marker, placeholder } = WRAP_FORMATS[kind]
    const sel = text.slice(start, end)
    let replacement, newStart, newEnd
    if (sel) {
      replacement = `${marker}${sel}${marker}`
      newStart = start + marker.length
      newEnd   = newStart + sel.length
    } else {
      replacement = `${marker}${placeholder}${marker}`
      newStart = start + marker.length
      newEnd   = newStart + placeholder.length
    }
    const next = text.slice(0, start) + replacement + text.slice(end)
    currentNotes.value = next
    nextTick(() => { el.focus(); el.setSelectionRange(newStart, newEnd) })
    return
  }

  if (LINE_PREFIXES[kind]) {
    const prefix = LINE_PREFIXES[kind]
    const lineStart = text.lastIndexOf('\n', start - 1) + 1
    const lineEnd   = text.indexOf('\n', end)
    const block     = text.slice(lineStart, lineEnd === -1 ? undefined : lineEnd)
    const lines     = block.split('\n')
    const prefixed  = lines.map(l => prefix + l).join('\n')
    const next      = text.slice(0, lineStart) + prefixed + (lineEnd === -1 ? '' : text.slice(lineEnd))
    const addedChars = lines.length * prefix.length
    currentNotes.value = next
    nextTick(() => {
      el.focus()
      el.setSelectionRange(start + prefix.length, end + addedChars)
    })
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
              <button class="notes-icon-btn" :class="{ active: layout === 'editor' }" title="Editor only"
                @click="setLayout('editor')">
                <PenLine :size="14" />
              </button>
              <button class="notes-icon-btn" :class="{ active: layout === 'split-v' }" title="Split top / bottom"
                @click="setLayout('split-v')">
                <Rows2 :size="14" />
              </button>
              <button class="notes-icon-btn" :class="{ active: layout === 'split-h' }" title="Split left / right"
                @click="setLayout('split-h')">
                <Columns2 :size="14" />
              </button>
              <button class="notes-icon-btn" :class="{ active: layout === 'preview' }" title="Preview only"
                @click="setLayout('preview')">
                <Eye :size="14" />
              </button>
              <span class="notes-toolbar-sep" style="height:18px;width:1px;margin:auto 4px;" />
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

          <div v-else class="notes-editor" :class="`layout-${layout}`">
            <div class="notes-toolbar"
              :style="layout === 'split-h' ? 'flex-direction: column; border-right: 1px solid var(--border); ' : '  border-bottom: 1px solid var(--border)'">
              <button class="notes-toolbar-btn" @click="applyFormat('h1')"    title="Title (H1)">        <Heading1    :size="14" /></button>
              <button class="notes-toolbar-btn" @click="applyFormat('h2')"    title="Subtitle (H2)">     <Heading2    :size="14" /></button>
              <span class="notes-toolbar-sep"
                :style="layout === 'split-h' ? ' width: 70%; height: 1px;' : 'width: 1px'" />
              <button class="notes-toolbar-btn" @click="applyFormat('bold')"   title="Bold">             <Bold        :size="14" /></button>
              <button class="notes-toolbar-btn" @click="applyFormat('italic')" title="Italic">           <Italic      :size="14" /></button>
              <button class="notes-toolbar-btn" @click="applyFormat('strike')" title="Strikethrough">    <Strikethrough :size="14" /></button>
              <button class="notes-toolbar-btn" @click="applyFormat('code')"   title="Inline code">      <Code        :size="14" /></button>
              <button class="notes-toolbar-btn" @click="applyFormat('link')"   title="Link">             <Link2       :size="14" /></button>
              <span class="notes-toolbar-sep"
                :style="layout === 'split-h' ? ' width: 70%; height: 1px;' : 'width: 1px'" />
              <button class="notes-toolbar-btn" @click="applyFormat('ul')"     title="Bullet list">      <List        :size="14" /></button>
              <button class="notes-toolbar-btn" @click="applyFormat('ol')"     title="Numbered list">    <ListOrdered :size="14" /></button>
              <button class="notes-toolbar-btn" @click="applyFormat('check')"  title="Checkbox">         <CheckSquare :size="14" /></button>
              <button class="notes-toolbar-btn" @click="applyFormat('quote')"  title="Blockquote">       <Quote       :size="14" /></button>
            </div>

            <textarea
v-if="layout !== 'preview'"
              ref="textareaRef"
              class="notes-input"
              v-model="currentNotes"
              placeholder="Write notes in Markdown… or use the toolbar above"
              spellcheck="false"
            />

            <div v-if="layout !== 'editor'" class="notes-preview notes-rendered"
              v-html="render(currentNotes) || '<span class=\'notes-preview-empty\'>Preview appears here</span>'" />
          </div>

          <div class="notes-footer">
            <button class="notes-save-btn" @click="notesOpen = false">Save & close</button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>
