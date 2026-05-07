import { ref, watch } from 'vue'

const THEME_KEY = 'theme'

function getInitial() {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored !== null) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const dark = ref(getInitial())

function apply(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

apply(dark.value)

watch(dark, (isDark) => {
  apply(isDark)
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
})

export function useTheme() {
  return { dark, toggleTheme: () => { dark.value = !dark.value } }
}
