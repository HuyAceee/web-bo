import { handleAddClass, handleRemoveClass, hasClass } from '@/common/html'
import { ref, watch } from 'vue'

const isExpanderAll = ref(false)

export function useHandleExpanderNavigation(nameClass?: string) {
  const refParent = ref<HTMLElement>()

  const handleToggle = (index: number) => {
    if (refParent.value) {
      const expanderElements = refParent.value.querySelectorAll(`.${nameClass}`)

      if (expanderElements.length) {
        const isHasClass = hasClass(expanderElements?.[index], 'wf-expanded')

        if (!isHasClass) {
          expanderElements.forEach((item) => {
            handleRemoveClass(item, 'wf-expanded')
          })
          handleAddClass(expanderElements?.[index], 'wf-expanded')
        } else {
          handleRemoveClass(expanderElements?.[index], 'wf-expanded')
        }
      }
    }
  }

  watch(isExpanderAll, (newIsExpanderAll) => {
    if (refParent?.value) {
      const expanderElements = refParent?.value?.querySelectorAll(`li.${nameClass}`)

      expanderElements.forEach((item) => {
        if (newIsExpanderAll) {
          handleAddClass(item, 'wf-expanded')
        } else {
          handleRemoveClass(item, 'wf-expanded')
        }
      })
    }
  })

  return {
    handleToggle,
    isExpanderAll,
    refParent
  }
}