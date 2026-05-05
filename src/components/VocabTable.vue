<script setup>
defineProps({ rows: Array })

const badgeClass = { 'form.': 'b-form', 'inf.': 'b-inf', 'std.': 'b-std' }
</script>

<template>
  <table>
    <thead>
      <tr><th>Deutsch</th><th>English</th></tr>
    </thead>
    <tbody>
      <tr v-for="([de, en, tag], i) in rows" :key="i">
        <td class="de">{{ de }}</td>
        <td>
          {{ en }}
          <span v-if="tag" class="badge" :class="badgeClass[tag] || ''">{{ tag }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
