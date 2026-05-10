import { ref, watch } from 'vue'

const KEY = 'nav-auto-collapse'
const autoCollapse = ref(localStorage.getItem(KEY) !== 'false')

watch(autoCollapse, val => localStorage.setItem(KEY, String(val)))

export function useNavAutoCollapse() { return { autoCollapse } }
