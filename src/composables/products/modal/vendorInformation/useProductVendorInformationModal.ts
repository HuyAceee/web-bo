import { useModal } from '@/composables/common'
import { ProductVendorInformationModel } from '@/models'
import ProductVendorInformationModal from '@/views/products/modal/vendorInformation/ProductVendorInformationModal.vue'

export const useProductVendorInformationModal = () => {
  const { showModal, closeModalByPop } = useModal()
  const onShowModal = (data?: ProductVendorInformationModel) => {
    showModal?.({
      component: ProductVendorInformationModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        data
      }
    })
  }

  return { onShowModal, closeModalByPop }
}
