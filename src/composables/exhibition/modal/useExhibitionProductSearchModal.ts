import { useModal } from '@/composables'
import ExhibitionProductSearchModal from '@/views/exhibition/modal/ExhibitionProductSearchModal.vue'
import { ExhibitionProductSearchModalProps } from '@/models/views/exhibition/modal/ExhibitionProductSearchModalModel'
import { ProductSearchProductTableModel } from '@/models/views/products/modal/ProductSearchProductModalModel'

export const useExhibitionProductSearchModal = () => {
  const modalTable = useModal<ExhibitionProductSearchModalProps>()

  const openModal = (callBack: (data: ProductSearchProductTableModel[]) => void) => {
    modalTable.showModal?.({
      component: ExhibitionProductSearchModal,
      props: {
        onCancel: modalTable.closeModalByPop,
        onSelect: callBack
      }
    })
  }

  return { openModal }
}
