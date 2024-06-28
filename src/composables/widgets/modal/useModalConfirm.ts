import { ModalConfirm } from '@/components/widgets'
import { useModal } from '@/composables/common'
import { ConfirmModalProps } from '@/models/widgets'

export const useModalConfirm = () => {
  const modal = useModal<ConfirmModalProps>()

  const openModal = (options: ConfirmModalProps) => {
    modal.showModal?.({
      component: ModalConfirm,
      props: {
        ...options,
        onCancel: options?.onCancel ? options.onCancel : modal.closeModalByPop,
        onConfirm: options?.onConfirm ? options.onConfirm : modal.closeModalByPop
      }
    })
  }
  const replaceModalConfirm = (options: ConfirmModalProps, index = 0) => {
    modal.replaceModal?.(
      {
        component: ModalConfirm,
        props: {
          ...options,
          onCancel: options?.onCancel ? options.onCancel : modal.closeModalByPop,
          onConfirm: options?.onConfirm ? options.onConfirm : modal.closeModalByPop
        }
      },
      index
    )
  }
  return { ...modal, openModal, replaceModalConfirm }
}
