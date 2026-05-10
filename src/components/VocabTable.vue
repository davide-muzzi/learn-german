<script setup>
import { computed } from 'vue'

const props = defineProps({
  rows:    Array,
  headers: { type: Array, default: () => ['Deutsch', 'Meaning', 'Note'] },
})

const badgeClass  = { 'form.': 'b-form', 'inf.': 'b-inf', 'std.': 'b-std' }
const registerTags = new Set(['form.', 'inf.', 'std.'])

const hasNotes = computed(() => props.rows.some(r => r[2]))
</script>

<template>
  <table>
    <colgroup>
      <col style="width: 38%" />
      <col :style="hasNotes ? 'width: 47%' : 'width: 62%'" />
      <col v-if="hasNotes" style="width: 15%" />
    </colgroup>
    <thead>
      <tr>
        <th>{{ headers[0] }}</th>
        <th>{{ headers[1] }}</th>
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
