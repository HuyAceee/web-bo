import { useModal } from '@/composables/common'
import { ProductSelectDefinitionType } from '@/models'
import OperatingImageCoverModal from '@/views/operating/modal/registerFile/OperatingImageCoverModal.vue'

export interface OnShowModalArgModel {
  name: string
  events?: any
  alt?: string
  type?: ProductSelectDefinitionType
}

export const useOperatingModalChangeImage = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = ({ name, alt, events = {}, type }: OnShowModalArgModel) => {
    showModal?.({
      component: OperatingImageCoverModal,
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
