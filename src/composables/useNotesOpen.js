import { ref, watch } from 'vue'

export const notesOpen = ref(false)
export const notesDocked = ref(localStorage.getItem('notes-docked') === 'true')

watch(notesDocked, val => localStorage.setItem('notes-docked', String(val)))

export function toggleNotes() { notesOpen.value = !notesOpen.value }
