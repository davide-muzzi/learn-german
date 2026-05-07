<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { ArrowLeft, RotateCcw, X, Check, RefreshCw } from '@lucide/vue'
import { FLASHCARD_SETS, CHAPTERS } from '../data/index.js'
import { flashcardResetSignal } from '../composables/flashcardBus.js'

const STORAGE_KEY = 'fc-prefs'

function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {} } catch { return {} }
}

const prefs = loadPrefs()
const selectedIds = ref(prefs.selectedIds ?? [])
const direction = ref(prefs.direction ?? 'de-en')

watch([selectedIds, direction], () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    selectedIds: selectedIds.value,
    direction: direction.value,
  }))
}, { deep: true })

const allIds = FLASHCARD_SETS.map(s => s.id)
const allSelected = computed(() => allIds.every(id => selectedIds.value.includes(id)))
function toggleAll() {
  selectedIds.value = allSelected.value ? [] : [...allIds]
}

const totalCards = computed(() =>
  FLASHCARD_SETS.filter(s => selectedIds.value.includes(s.id)).reduce((n, s) => n + s.data.length, 0)
)

// Group sets by level > chapter for the hierarchy UI
const grouped = computed(() => {
  const levelMap = {}
  for (const set of FLASHCARD_SETS) {
    if (!levelMap[set.level]) levelMap[set.level] = { name: set.level, chapters: {} }
    const chs = levelMap[set.level].chapters
    if (!chs[set.chapter]) {
      const ch = CHAPTERS.find(c => c.n === set.chapter)
      chs[set.chapter] = { n: set.chapter, title: ch?.title ?? `Chapter ${set.chapter}`, sets: [] }
    }
    chs[set.chapter].sets.push(set)
  }
  return Object.values(levelMap).map(lvl => ({
    ...lvl,
    chapters: Object.values(lvl.chapters),
  }))
})

function chapterIds(ch) { return ch.sets.map(s => s.id) }
function levelIds(lvl) { return lvl.chapters.flatMap(ch => chapterIds(ch)) }

function selectionState(ids) {
  const n = ids.filter(id => selectedIds.value.includes(id)).length
  if (n === 0) return false
  if (n === ids.length) return true
  return 'indeterminate'
}
const chapterState = ch => selectionState(chapterIds(ch))
const levelState   = lvl => selectionState(levelIds(lvl))

function toggleGroup(ids) {
  const allSel = ids.every(id => selectedIds.value.includes(id))
  selectedIds.value = allSel
    ? selectedIds.value.filter(id => !ids.includes(id))
    : [...new Set([...selectedIds.value, ...ids])]
}
const toggleChapter = ch  => toggleGroup(chapterIds(ch))
const toggleLevel   = lvl => toggleGroup(levelIds(lvl))

function buildDeck(fromCards) {
  if (fromCards) return [...fromCards].sort(() => Math.random() - 0.5)
  const cards = []
  for (const set of FLASHCARD_SETS) {
    if (!selectedIds.value.includes(set.id)) continue
    for (const row of set.data) {
      let front, back, note
      if (set.type === 'vocab') {
        const [de, en, n] = row
        ;[front, back, note] = direction.value === 'de-en' ? [de, en, n] : [en, de, n]
      } else if (set.type === 'numbers') {
        const [num, de] = row
        ;[front, back, note] = direction.value === 'de-en' ? [String(num), de, ''] : [de, String(num), '']
      } else {
        // conjug: [pronoun, form, translation]
        const [pronoun, form, translation] = row
        if (direction.value === 'de-en') {
          front = pronoun; back = form; note = translation
        } else {
          front = translation; back = form; note = pronoun
        }
      }
      cards.push({ front, back, note, setTitle: set.title })
    }
  }
  return cards.sort(() => Math.random() - 0.5)
}

const SESSION_KEY = 'fc-session'

const phase = ref('setup')
const deck = ref([])
const idx = ref(0)
const flipped = ref(false)
const known = ref(0)
const unknown = ref(0)
const unknownCards = ref([])

// Load saved session snapshot for the "Continue" prompt — do NOT auto-restore
const savedSession = ref((() => {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY))
    return (s?.phase === 'session' || s?.phase === 'done') ? s : null
  } catch { return null }
})())

// Persist session state whenever it changes
watch([phase, deck, idx, known, unknown, unknownCards], () => {
  if (phase.value === 'session' || phase.value === 'done') {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      phase: phase.value,
      deck: deck.value,
      idx: idx.value,
      known: known.value,
      unknown: unknown.value,
      unknownCards: unknownCards.value,
    }))
  }
}, { deep: true })

const card = computed(() => deck.value[idx.value])

function continueSession() {
  const s = savedSession.value
  phase.value = s.phase
  deck.value = s.deck ?? []
  idx.value = s.idx ?? 0
  known.value = s.known ?? 0
  unknown.value = s.unknown ?? 0
  unknownCards.value = s.unknownCards ?? []
  flipped.value = false
  savedSession.value = null
}

function startSession(fromCards) {
  localStorage.removeItem(SESSION_KEY)
  savedSession.value = null
  deck.value = buildDeck(fromCards)
  idx.value = 0
  flipped.value = false
  known.value = 0
  unknown.value = 0
  unknownCards.value = []
  phase.value = 'session'
}

function retryUnknown() {
  startSession(unknownCards.value)
}

function backToSetup() {
  localStorage.removeItem(SESSION_KEY)
  savedSession.value = null
  phase.value = 'setup'
}

function flip() {
  if (!flipped.value) flipped.value = true
}

function answer(wasKnown) {
  if (wasKnown) known.value++
  else { unknown.value++; unknownCards.value.push(card.value) }
  if (idx.value + 1 >= deck.value.length) phase.value = 'done'
  else { idx.value++; flipped.value = false }
}

function onKey(e) {
  if (phase.value !== 'session') return
  if (e.code === 'Space') { e.preventDefault(); flip() }
  else if (e.code === 'ArrowRight' && flipped.value) answer(true)
  else if (e.code === 'ArrowLeft' && flipped.value) answer(false)
}

watch(flashcardResetSignal, backToSetup)

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>

  <!-- ── SETUP ── -->
  <template v-if="phase === 'setup'">
    <div class="page-header">
      <h1>Flashcards</h1>
      <p class="sub">Select sets to practise, then start.</p>
    </div>

    <div v-if="savedSession" class="card fc-resume-card">
      <div class="fc-resume-info">
        <div class="fc-resume-title">Session in progress</div>
        <div class="fc-resume-stats">
          Card {{ savedSession.idx + 1 }} of {{ savedSession.deck.length }}
          <span class="fc-count-yes">· ✓ {{ savedSession.known }}</span>
          <span class="fc-count-no">· ✗ {{ savedSession.unknown }}</span>
        </div>
      </div>
      <button class="btn-primary" @click="continueSession">Continue</button>
    </div>

    <div class="card">
      <div class="card-title">Language direction</div>
      <div class="fc-dir-row">
        <button :class="['fc-dir-btn', { active: direction === 'de-en' }]" @click="direction = 'de-en'">
          German → English
        </button>
        <button :class="['fc-dir-btn', { active: direction === 'en-de' }]" @click="direction = 'en-de'">
          English → German
        </button>
      </div>
    </div>

    <div class="card">
      <div class="fc-sets-header">
        <div class="card-title" style="margin-bottom:0">Sets</div>
        <button class="fc-select-all-btn" @click="toggleAll">
          {{ allSelected ? 'Deselect all' : 'Select all' }}
        </button>
      </div>
      <div v-for="lvl in grouped" :key="lvl.name" class="fc-level-group">
        <label class="fc-group-row">
          <input type="checkbox"
            :checked="levelState(lvl) === true"
            :indeterminate="levelState(lvl) === 'indeterminate'"
            @change="toggleLevel(lvl)"
            class="fc-checkbox"
          />
          <span class="fc-level-label">Level {{ lvl.name }}</span>
          <span class="fc-set-count">{{ levelIds(lvl).length }}</span>
        </label>

        <div v-for="ch in lvl.chapters" :key="ch.n" class="fc-chapter-group">
          <label class="fc-group-row">
            <input type="checkbox"
              :checked="chapterState(ch) === true"
              :indeterminate="chapterState(ch) === 'indeterminate'"
              @change="toggleChapter(ch)"
              class="fc-checkbox"
            />
            <span class="fc-chapter-label">Ch. {{ ch.n }} · {{ ch.title }}</span>
            <span class="fc-set-count">{{ chapterIds(ch).length }}</span>
          </label>

          <label v-for="set in ch.sets" :key="set.id" class="fc-set-row">
            <input type="checkbox" :value="set.id" v-model="selectedIds" class="fc-checkbox" />
            <span class="fc-set-name">{{ set.title }}</span>
            <span class="fc-set-count">{{ set.data.length }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="fc-start-row">
      <span class="fc-total-label">{{ totalCards }} card{{ totalCards !== 1 ? 's' : '' }} selected</span>
      <button class="btn-primary" :disabled="totalCards === 0" @click="startSession()">Start</button>
    </div>
  </template>

  <!-- ── SESSION ── -->
  <template v-else-if="phase === 'session'">
    <div class="fc-session-nav">
      <button class="fc-nav-link" @click="backToSetup"><ArrowLeft :size="13" /> Overview</button>
      <button class="fc-nav-link" @click="startSession()">Restart <RotateCcw :size="13" /></button>
    </div>

    <div class="fc-progress-wrap">
      <div class="fc-progress-top">
        <span class="fc-progress-text">{{ idx + 1 }} / {{ deck.length }}</span>
        <span class="fc-progress-counts">
          <span class="fc-count-yes">✓ {{ known }}</span>
          <span class="fc-count-no">✗ {{ unknown }}</span>
        </span>
      </div>
      <div class="fc-progress-bar">
        <div class="fc-progress-fill" :style="{ width: (idx / deck.length * 100) + '%' }" />
      </div>
    </div>

    <div class="fc-card-wrap" @click="flip">
      <div class="fc-card">
        <Transition name="fc-flip" mode="out-in">
          <div v-if="!flipped" key="front" class="fc-face">
            <span class="fc-set-badge">{{ card.setTitle }}</span>
            <div class="fc-term">{{ card.front }}</div>
            <span v-if="card.note" class="fc-note-tag">{{ card.note }}</span>
            <span class="fc-hint">Space or click to flip</span>
          </div>
          <div v-else key="back" class="fc-face fc-face-back">
            <span class="fc-set-badge">{{ card.setTitle }}</span>
            <div class="fc-front-echo">
              {{ card.front }}<span v-if="card.note" class="fc-note-tag fc-note-small">{{ card.note }}</span>
            </div>
            <hr class="fc-divider" />
            <div class="fc-answer">{{ card.back }}</div>
          </div>
        </Transition>
      </div>
    </div>

    <Transition name="fc-actions-fade">
      <div v-if="flipped" class="fc-actions">
        <button class="fc-btn fc-btn-no" @click="answer(false)"><X :size="16" /> Didn't know</button>
        <button class="fc-btn fc-btn-yes" @click="answer(true)">Got it <Check :size="16" /></button>
      </div>
    </Transition>

    <p v-if="flipped" class="fc-key-hint">Arrow keys also work</p>
  </template>

  <!-- ── DONE ── -->
  <template v-else>
    <div class="page-header">
      <h1>Session complete</h1>
      <p class="sub">{{ deck.length }} cards reviewed.</p>
    </div>
    <div class="card fc-results">
      <div class="fc-score-row">
        <div class="fc-score-box fc-score-yes">
          <div class="fc-score-n">{{ known }}</div>
          <div class="fc-score-label">Knew it</div>
        </div>
        <div class="fc-score-box fc-score-no">
          <div class="fc-score-n">{{ unknown }}</div>
          <div class="fc-score-label">Missed</div>
        </div>
      </div>
      <div class="fc-done-actions">
        <button v-if="unknownCards.length" class="btn-primary" @click="retryUnknown">
          <RefreshCw :size="14" /> Retry missed ({{ unknownCards.length }})
        </button>
        <button class="btn-secondary" @click="startSession()"><RotateCcw :size="14" /> Restart</button>
        <button class="btn-secondary" @click="backToSetup"><ArrowLeft :size="14" /> Back to overview</button>
      </div>
    </div>
  </template>

</template>
