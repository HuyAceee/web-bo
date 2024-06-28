import { useModal } from '@/composables'
import { ProductSearchItemModalProps } from '@/models'
import ProductSearchModal from '@/views/products/modal/searchProduct/ProductSearchModal.vue'
import { ProductBeforeDiscountPromotionListModel } from '@/models/views/products/modal/ProductSearchProductModalModel'

export const useProductSearchProductModal = () => {
  const modal = useModal<ProductSearchItemModalProps>()

  const openModal = (callback?: (items: any[]) => void, itemCheck?: ProductBeforeDiscountPromotionListModel[], typeApproval?: boolean) => {
    modal.showModal?.({
      component: ProductSearchModal,
      props: {
        onCancel: modal.closeModalByPop,
        onSelect: callback ?? (() => {}),
        itemCheck: itemCheck,
        typeApproval: typeApproval
      }
    })
  }

  return { ...modal, openModal }
}
