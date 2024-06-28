import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHandleExpanderNavigation } from '@/composables/widgets'
import { defaultColor } from '@/common/color'

interface Props {
  data: any
  index: number
}

export const useWelfareNavigationListItem = (props: Props) => {
  const colorIcon = ref(defaultColor._a8afbf)

  const { handleToggle, refParent } = useHandleExpanderNavigation('wf-body-navigation-child-item')
  const router = useRoute()

  const isCurrentRouter = computed(() => {
    return router.path.startsWith(props?.data?.path)
  })

  const handleHover = () => {
    if (!isCurrentRouter.value) {
      colorIcon.value = defaultColor._333
    }
  }

  const handleLeave = () => {
    if (!isCurrentRouter.value) {
      colorIcon.value = defaultColor._a8afbf
    }
  }

  const renderClassNavigationItem = (index: number) => {
    return index === 3 || index === 6 || index === 7 ? 'wf_h-46' : 'wf_h-48'
  }

  watch(
    isCurrentRouter,
    (newIsCurrentRouter) => {
      if (newIsCurrentRouter) {
        colorIcon.value = defaultColor._333
      } else {
        colorIcon.value = defaultColor._a8afbf
      }
    },
    { immediate: true }
  )

  return {
    handleHover,
    handleLeave,
    handleToggle,
    refParent,
    isCurrentRouter,
    colorIcon,
    data: props.data,
    index: props.index,
    renderClassNavigationItem
  }
}
