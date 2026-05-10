<script setup>
defineProps({ rows: Array, verb: String })
</script>

<template>
  <table>
    <colgroup>
      <col style="width: 22%" />
      <col style="width: 33%" />
      <col style="width: 45%" />
    </colgroup>
    <thead>
      <tr><th>Pronoun</th><th>{{ verb }}</th><th>Meaning</th></tr>
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
