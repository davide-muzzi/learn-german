<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: { type: Array, required: true },
})

const mcDone = ref({})
const mcCorrect = ref(0)

const shuffledData = computed(() =>
  props.data.map(q => ({ ...q, opts: [...q.opts].sort(() => Math.random() - 0.5) }))
)

const allAnswered = computed(() => Object.keys(mcDone.value).length === props.data.length)

function pick(qi, opt) {
  if (mcDone.value[qi] !== undefined) return
  const isCorrect = props.data[qi].ans.includes(opt)
  mcDone.value = { ...mcDone.value, [qi]: { chosen: opt, isCorrect } }
  if (isCorrect) mcCorrect.value++
}

function btnClass(qi, opt) {
  const done = mcDone.value[qi]
  if (!done) return ''
  if (props.data[qi].ans.includes(opt)) return 'mc-correct'
  if (done.chosen === opt) return 'mc-wrong'
  return ''
}

const scoreDisplay = computed(() => {
  if (!allAnswered.value) return null
  const total = props.data.length
  const pct = Math.round(mcCorrect.value / total * 100)
  const cls = pct >= 80 ? 'sc-great' : pct >= 50 ? 'sc-ok' : 'sc-poor'
  const emoji = pct === 100 ? '🎉 Perfect!' : pct >= 80 ? '✅ Great job!' : pct >= 50 ? '📝 Keep practicing!' : '❌ Try again after reviewing.'
  return { cls, emoji, correct: mcCorrect.value, total, pct }
})
</script>

<template>
  <div class="card">
    <div class="card-title">Multiple Choice</div>
    <div class="ex-instruction">
      Click the correct option to fill each gap. You'll get instant feedback.
    </div>

    <div v-for="(q, qi) in shuffledData" :key="qi" class="q-block">
      <span class="q-label">Frage {{ qi + 1 }}</span>
      <div style="font-weight:500;margin-bottom:6px;">{{ q.text }}</div>
      <div class="mc-opts">
        <button
          v-for="opt in q.opts"
          :key="opt"
          class="mc-btn"
          :class="btnClass(qi, opt)"
          :disabled="mcDone[qi] !== undefined"
          @click="pick(qi, opt)"
        >{{ opt }}</button>
      </div>
      <div v-if="q.note && mcDone[qi]" class="mc-note">💡 {{ q.note }}</div>
    </div>

    <div v-if="scoreDisplay" class="score-bar" :class="scoreDisplay.cls" style="margin-top:8px;">
      {{ scoreDisplay.emoji }}&nbsp;{{ scoreDisplay.correct }}/{{ scoreDisplay.total }} correct ({{ scoreDisplay.pct }}%)
    </div>
  </div>
</template>
