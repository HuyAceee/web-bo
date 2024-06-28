import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductTicketFileType } from '@/models'

export const useProductDeleteFileModal = (callback: () => void) => {
  const { openModal: openModalNotification, closeModalByPop: closeModalByPopNotification } = useModalNotification()
  const { openModal, closeModalByPop } = useModalConfirm()
  const contentHandleFileMoreInfo = {
    deleteImage: '이미지를 삭제하시겠습니까?',
    notificationImage: '이미지가 삭제되었습니다.',
    deleteVideo: '동영상을 삭제하시겠습니까?',
    notificationVideo: '동영상이 삭제되었습니다.'
  }
  const handleAccept = () => {
    closeModalByPopNotification?.()
    callback()
  }

  const handleConfirmDelete = (type: ProductTicketFileType) => {
    closeModalByPop?.()
    openModalNotification?.({
      content: type === 'img' ? contentHandleFileMoreInfo.notificationImage : contentHandleFileMoreInfo.notificationVideo,
      onAccept: handleAccept
    })
  }
  const onShowModalDelete = (type: ProductTicketFileType) => {
    openModal({
      content: type === 'img' ? contentHandleFileMoreInfo.deleteImage : contentHandleFileMoreInfo.deleteVideo,
      onConfirm: () => handleConfirmDelete(type)
    })
  }
  return { onShowModalDelete, handleConfirmDelete }
}
