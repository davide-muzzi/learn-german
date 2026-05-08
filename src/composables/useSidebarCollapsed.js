import { ref, watchEffect } from 'vue'

const collapsed = ref(localStorage.getItem('sidebar-collapsed') === 'true')
watchEffect(() => localStorage.setItem('sidebar-collapsed', String(collapsed.value)))

export function useSidebarCollapsed() {
  return { collapsed }
}
