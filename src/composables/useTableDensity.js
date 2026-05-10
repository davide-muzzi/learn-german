import { ref, watch } from 'vue'

const KEY = 'table-density'
const density = ref(localStorage.getItem(KEY) ?? 'normal')

watch(density, val => {
  localStorage.setItem(KEY, val)
  document.documentElement.setAttribute('data-density', val)
})

document.documentElement.setAttribute('data-density', density.value)

export function useTableDensity() { return { density } }
