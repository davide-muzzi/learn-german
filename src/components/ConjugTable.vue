<script setup>
import { computed } from 'vue'
import { useTableDensity } from '../composables/useTableDensity.js'

const props = defineProps({ rows: Array, verb: String })
const { density } = useTableDensity()

const CHAR_PX = 8
const PADDING = 28
const BUFFER  = 20

function avgColWidth(colIdx) {
  if (!props.rows?.length) return '120px'
  const avg = props.rows.reduce((sum, r) => sum + (r[colIdx] ?? '').length, 0) / props.rows.length
  return Math.round(avg * CHAR_PX + PADDING + BUFFER) + 'px'
}

const col0Style = computed(() => density.value === 'compact' ? { width: avgColWidth(0) } : {})
const col1Style = computed(() => density.value === 'compact' ? { width: avgColWidth(1) } : {})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th :style="col0Style">Pronoun</th>
        <th :style="col1Style">{{ verb }}</th>
        <th>Meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="([pron, conj, en], i) in rows" :key="i">
        <td class="pron-col">{{ pron }}</td>
        <td class="bold-conj">{{ conj }}</td>
        <td class="en-col">{{ en }}</td>
      </tr>
    </tbody>
  </table>
</template>
