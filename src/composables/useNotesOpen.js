import { ref } from 'vue'

export const notesOpen = ref(false)
export function toggleNotes() { notesOpen.value = !notesOpen.value }
