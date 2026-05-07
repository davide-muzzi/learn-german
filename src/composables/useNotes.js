import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const NOTES_KEY = 'notes-data'

function load() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || { global: '', pages: {} } }
  catch { return { global: '', pages: {} } }
}

const data = ref(load())

function persist() {
  localStorage.setItem(NOTES_KEY, JSON.stringify(data.value))
}

export function useNotes() {
  const route = useRoute()
  const pageKey = computed(() => route.path.slice(1) || 'home')

  const globalNotes = computed({
    get: () => data.value.global || '',
    set: val => { data.value = { ...data.value, global: val }; persist() },
  })

  const pageNotes = computed({
    get: () => (data.value.pages || {})[pageKey.value] || '',
    set: val => {
      const pages = { ...(data.value.pages || {}), [pageKey.value]: val }
      data.value = { ...data.value, pages }
      persist()
    },
  })

  const allNotes = computed(() =>
    Object.entries(data.value.pages || {})
      .filter(([, v]) => v?.trim())
      .map(([key, content]) => ({ key, content }))
  )

  return { globalNotes, pageNotes, allNotes, pageKey }
}
