import { useModal } from '@/composables/common'
import { ProductSelectDefinitionType } from '@/models'
import ProductRegisterImageCoverModal from '@/views/products/modal/registerFile/ProductRegisterImageCoverModal.vue'

export interface OnShowModalArgModel {
  name: string
  events?: any
  alt?: string,
  type?: ProductSelectDefinitionType
}

export const useProductModalChangeImage = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = ({ name, alt, events = {}, type }: OnShowModalArgModel) => {
    showModal?.({
      component: ProductRegisterImageCoverModal,
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

  return { onShowModal, closeModalByPop }
}
