import { useModal } from '@/composables/common'
import ComplaintOrderCancelDetailModal from '@/views/complaint/modal/ComplaintOrderCancelDetailModal.vue'

export const useComplaintOrderCancelDetailModal = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = (id: number) => {
    showModal?.({
      component: ComplaintOrderCancelDetailModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        id
      }
    })
  }

  return { onShowModal, closeModalByPop }
}
