<script setup>
import { computed } from 'vue'
import { useTableDensity } from '../composables/useTableDensity.js'

const props = defineProps({
  rows:    Array,
  headers: { type: Array, default: () => ['Deutsch', 'Meaning', 'Note'] },
})

const badgeClass  = { 'form.': 'b-form', 'inf.': 'b-inf', 'std.': 'b-std' }
const registerTags = new Set(['form.', 'inf.', 'std.'])

const hasNotes = computed(() => props.rows.some(r => r[2]))
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
        <th :style="col0Style">{{ headers[0] }}</th>
        <th :style="hasNotes ? col1Style : {}">{{ headers[1] }}</th>
        <th v-if="hasNotes">{{ headers[2] ?? 'Note' }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="([de, en, tag], i) in rows" :key="i">
        <td class="de">{{ de }}</td>
        <td>{{ en }}</td>
        <td v-if="hasNotes" class="note-col">
          <span v-if="tag && registerTags.has(tag)" class="badge" :class="badgeClass[tag]">{{ tag }}</span>
          <span v-else-if="tag" class="note-plain">{{ tag }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
