import ProductSearchModal from '@/components/products/common/ProductSearchModal.vue'
import { useModal } from '@/composables'
import { ProductSearchItemModalProps } from '@/models'

export const useProductSearchItemModal = () => {
  const modal = useModal<ProductSearchItemModalProps>()

  const openModal = (callback?: (items: any[]) => void) => {
    modal.showModal?.({
      component: ProductSearchModal,
      props: {
        onCancel: modal.closeModalByPop,
        onSelect:
          callback ??
          (() => {
            // console.log(items)
          })
      }
    })
  }

  return { ...modal, openModal }
}
