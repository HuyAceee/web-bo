import { useModal } from '@/composables'
import ExhibitionCornerManagementDetailsModal from '@/views/exhibition/modal/ExhibitionCornerManagementDetailsModal.vue'
import { ExhibitionCornerManagementDetailsProps } from '@/models/views/exhibition/modal/ExhibtionCornerManagementDetailsModel'

interface Props {
  templateKey: number
  applyChannelType: string
  filePathName?: string
  fileName?: string
}

export const useExhibitionCornerManagementDetailsModal = () => {
  const { showModal, closeModalByPop } = useModal<ExhibitionCornerManagementDetailsProps>()

  const onShowModal = (props: Props) => {
    showModal?.({
      component: ExhibitionCornerManagementDetailsModal,
      props: {
        onClose: closeModalByPop,
        templateKey: props.templateKey,
        fileName: props.fileName,
        filePathName: props.filePathName,
        applyChannelType: props.applyChannelType
      }
    })
  }

  return { onShowModal }
}
