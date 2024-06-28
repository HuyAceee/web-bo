import { defaultColor } from '@/common/color'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHandleExpanderNavigation } from '@/composables'

export const useMenuNavigation = () => {
  const { handleToggle, refParent } = useHandleExpanderNavigation('wf-body-navigation-item')
  const colorIcon = ref(defaultColor._a8afbf)
  const route = useRoute()
  watch(
    () => route.fullPath,
    (newIsCurrentRouter) => {
      if (newIsCurrentRouter === '/' || newIsCurrentRouter === '/ui-kit/menu') {
        colorIcon.value = defaultColor._333
      } else {
        colorIcon.value = defaultColor._a8afbf
      }
    },
    { immediate: true }
  )

  return {
    handleToggle,
    refParent,
    colorIcon
  }
}
