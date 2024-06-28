import { MODAL_PROVIDE } from '@/common'
import { ModalContainerProps, ModalMutationProps, ModalProvideProps } from '@/models'
import { inject, provide, reactive, markRaw, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useModalProvide = () => {
  const modalData = reactive<ModalProvideProps>({
    modals: []
  })

  const router = useRoute()

  function showModal(params: ModalContainerProps<any>) {
    modalData.modals.push({
      ...params,
      component: markRaw(params.component)
    })
  }
  const closeAllModal = () => {
    modalData.modals = []
  }

  const closeModalByPop = () => {
    modalData.modals.pop()
  }

  const closeModalByIndex = (index: number | number[]) => {
    try {
      if (modalData.modals?.length) {
        if (typeof index === 'number') {
          modalData.modals.splice(index, 1)
        } else {
          modalData.modals = modalData.modals.filter((_item, _index) => !index.includes(_index))
        }
      }
    } catch (error) {
      //
    }
  }

  const replaceModal = (params: ModalContainerProps<any>, index = 0) => {
    if (modalData.modals?.length && index < modalData.modals?.length) {
      modalData.modals[index] = {
        ...params,
        component: markRaw(params.component)
      }
    }
  }

  provide(MODAL_PROVIDE, {
    closeAllModal,
    showModal,
    closeModalByPop,
    closeModalByIndex,
    replaceModal
  })

  watch(
    () => router.fullPath,
    () => {
      closeAllModal()
    }
  )

  return modalData
}

export function useModal<T>() {
  const mutationModal = inject<ModalMutationProps<T>>(MODAL_PROVIDE)
  return { ...mutationModal }
}
