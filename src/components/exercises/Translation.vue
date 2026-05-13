<script setup>
import { ref } from 'vue'
import { TRANSLATIONS } from '../../data/index.js'

const props = defineProps({
  data: { type: Array, default: () => TRANSLATIONS },
})

const visible = ref({})

function toggle(qi) {
  visible.value = { ...visible.value, [qi]: !visible.value[qi] }
}
</script>

<template>
  <div class="card">
    <div class="card-title">Translation</div>
    <div class="ex-instruction">
      Translate each sentence into German mentally (or jot it down), then reveal the answer to check.
    </div>

    <div v-for="(q, qi) in data" :key="qi" class="tr-block">
      <span class="q-label">Sentence {{ qi + 1 }}</span>
      <div class="tr-en">{{ q.en }}</div>
      <button class="reveal-btn" @click="toggle(qi)">
        {{ visible[qi] ? 'Hide Answer' : 'Reveal Answer' }}
      </button>
      <div class="tr-answer" :class="{ visible: visible[qi] }">{{ q.de }}</div>
    </div>
  </div>
</template>
