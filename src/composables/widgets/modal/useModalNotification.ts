import { ModalNotification } from '@/components/widgets'
import { useModal } from '@/composables/common'
import { NotificationModalProps } from '@/models/widgets'

export const  useModalNotification = () => {
  const modal = useModal<NotificationModalProps>()

  const openModal = (options: NotificationModalProps) => {
    modal.showModal?.({
      component: ModalNotification,
      props: {
        ...options,
        onAccept: options?.onAccept ? options.onAccept : modal.closeModalByPop
      }
    })
  }

  const replaceModalNotification = (options: NotificationModalProps, index = 0) => {
    modal.replaceModal?.(
      {
        component: ModalNotification,
        props: {
          ...options,
          onAccept: options?.onAccept ? options.onAccept : modal.closeModalByPop
        }
      },
      index
    )
  }
  return { openModal, replaceModalNotification, ...modal }
}
