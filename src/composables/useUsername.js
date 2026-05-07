import { ref, watch } from 'vue'

const USERNAME_KEY = 'username'
const username = ref(localStorage.getItem(USERNAME_KEY) ?? '')

watch(username, val => {
  if (val) localStorage.setItem(USERNAME_KEY, val)
  else localStorage.removeItem(USERNAME_KEY)
})

export function useUsername() {
  return { username }
}
