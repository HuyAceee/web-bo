import { scrollMouseHorizontal } from '@/common'
import { onBeforeUnmount, onMounted, ref } from 'vue'

export const useScrollMouseHorizontal = (className: string) => {
  const wrapperTab = ref()
  onMounted(() => {
    wrapperTab.value = document.querySelector(className)
    if (!wrapperTab.value) return
    wrapperTab.value.addEventListener('wheel', (event: any) => scrollMouseHorizontal(event, wrapperTab.value), { passive: true })
  })

  onBeforeUnmount(() => {
    if (!wrapperTab.value) return
    wrapperTab.value.removeEventListener('wheel', (event: any) => scrollMouseHorizontal(event, wrapperTab.value), { passive: true })
  })
}
