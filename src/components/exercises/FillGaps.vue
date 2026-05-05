<script setup>
import { ref, reactive, computed } from 'vue'
import { FILL_GAPS } from '../../data/index.js'

const questions = FILL_GAPS.map((q, qi) => {
  let bi = 0
  return {
    qi,
    parts: q.parts.map(part => {
      if (Array.isArray(part)) {
        return { type: 'blank', answer: part[0], key: `${qi}-${bi++}` }
      }
      return { type: 'text', content: part }
    }),
  }
})

const inputs = reactive(
  Object.fromEntries(
    questions.flatMap(({ parts }) =>
      parts.filter(p => p.type === 'blank').map(p => [p.key, ''])
    )
  )
)
const results = reactive({})
const corrections = reactive({})
const score = ref(null)

const resultClass = { correct: 'b-correct', wrong: 'b-wrong' }

function checkFill() {
  let correct = 0, total = 0
  Object.keys(results).forEach(k => delete results[k])
  Object.keys(corrections).forEach(k => delete corrections[k])

  questions.forEach(({ parts }) => {
    parts.filter(p => p.type === 'blank').forEach(p => {
      const val = (inputs[p.key] || '').trim().toLowerCase()
      if (val === p.answer.toLowerCase()) {
        results[p.key] = 'correct'
        correct++
      } else {
        results[p.key] = 'wrong'
        corrections[p.key] = p.answer
      }
      total++
    })
  })

  score.value = { correct, total }
}

function resetFill() {
  questions.forEach(({ parts }) => {
    parts.filter(p => p.type === 'blank').forEach(p => { inputs[p.key] = '' })
  })
  Object.keys(results).forEach(k => delete results[k])
  Object.keys(corrections).forEach(k => delete corrections[k])
  score.value = null
}

const scoreDisplay = computed(() => {
  if (!score.value) return null
  const { correct, total } = score.value
  const pct = Math.round(correct / total * 100)
  const cls = pct >= 80 ? 'sc-great' : pct >= 50 ? 'sc-ok' : 'sc-poor'
  const emoji = pct === 100 ? '🎉 Perfect!' : pct >= 80 ? '✅ Great job!' : pct >= 50 ? '📝 Keep practicing!' : '❌ Review the material and try again.'
  return { cls, emoji, correct, total, pct }
})
</script>

<template>
  <div class="card">
    <div class="card-title">Fill in the Gaps</div>
    <div class="ex-instruction">
      Fill each blank with the correct conjugation of <strong>sein</strong> (to be) or <strong>haben</strong> (to have).<br>
      <span style="font-size:12px;opacity:.8;">Tip: answers are case-insensitive.</span>
    </div>

    <div v-for="{ qi, parts } in questions" :key="qi" class="q-block">
      <span class="q-label">Satz {{ qi + 1 }}</span>
      <div>
        <template v-for="part in parts" :key="part.key || part.content">
          <span v-if="part.type === 'text'">{{ part.content }}</span>
          <span v-else class="blank-wrap">
            <input
              class="blank-input"
              :class="resultClass[results[part.key]]"
              v-model="inputs[part.key]"
              type="text"
              autocomplete="off"
              spellcheck="false"
              placeholder="___"
            />
            <span v-if="corrections[part.key]" class="blank-correction">→ {{ corrections[part.key] }}</span>
          </span>
        </template>
      </div>
    </div>

    <div>
      <button class="check-btn" @click="checkFill">✓ Check Answers</button>
      <button class="reset-btn" @click="resetFill">↺ Reset</button>
    </div>

    <div v-if="scoreDisplay" class="score-bar" :class="scoreDisplay.cls">
      {{ scoreDisplay.emoji }}&nbsp;{{ scoreDisplay.correct }}/{{ scoreDisplay.total }} correct ({{ scoreDisplay.pct }}%)
    </div>
  </div>
</template>
