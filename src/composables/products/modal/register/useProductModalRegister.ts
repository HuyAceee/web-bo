import { useModal } from '@/composables/common'
import { ProductOptionsDeliveryInfo, ProductRegisterSingleOptionModel } from '@/models'
import ProductRegisterModal from '@/views/products/modal/register/ProductRegisterModal.vue'

export const useProductModalRegister = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = (
    data: ProductRegisterSingleOptionModel,
    callback: (value: ProductOptionsDeliveryInfo[], checkMultipleValue?: boolean) => void
  ) => {
    showModal?.({
      component: ProductRegisterModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        data
      },
      events: {
        callback
      }
    })
  }

  return { onShowModal, closeModalByPop }
}
