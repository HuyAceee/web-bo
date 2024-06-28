import { useModal } from '@/composables/common'
import { ProductSelectDefinitionType } from '@/models/views/products/modal'
import ProductRegisterVideoModal from '@/views/products/modal/registerFile/ProductRegisterVideoModal.vue'

interface OnShowModalArgModel {
  name?: string
  alt?: string
  type?: ProductSelectDefinitionType
  events?: any
}

export const useProductModalChangeVideo = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModalVideo = ({ name, alt, events = {}, type }: OnShowModalArgModel) => {
    showModal?.({
      component: ProductRegisterVideoModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        name,
        alt,
        type
      },
      events
    })
  }

  return { onShowModalVideo, closeModalByPop }
}
