import { useModal } from '@/composables/common'
import { ref } from 'vue'
import ProductReasonRejectApprovalModal from '@/views/products/modal/reasonProductApproval/ProductReasonRejectApprovalModal.vue'

export const useProductReasonApproval = () => {
  const { showModal, closeModalByPop } = useModal()
  const valueRef = ref()

  const onShowModal = () => {
    showModal?.({
      component: ProductReasonRejectApprovalModal,
      events: {
        onClose: () => {
          closeModalByPop?.()
        },
        onSave: (value: string) => {
          valueRef.value = value
          closeModalByPop?.()
        }
      }
    })
  }

  return { value: valueRef, onShowModal, closeModalByPop }
}
