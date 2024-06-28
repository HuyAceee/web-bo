export enum WelfareModalType {
  main = 'MAIN',
  backup = 'BACKUP'
}

export interface ModalContainerProps<T> {
  component: any | undefined
  props?: T
  events?: T
}

export interface ModalModelParams {
  component: any
  props?: any
}

export interface ModalProvideProps {
  modals: ModalContainerProps<any>[]
}

export interface ModalMutationProps<T> {
  showModal: (params: ModalContainerProps<T>) => void
  closeAllModal: () => void
  closeModalByPop: () => void
  closeModalByIndex: (index: number | number[]) => void
  replaceModal: (params: ModalContainerProps<T>, index?: number) => void
}

export interface BaseNotificationModalProps {
  content?: string
  type?: 'default' | 'warning'
}

export interface BaseNotificationMutationProps<T> extends ModalMutationProps<T> {
  openModal?: (options: T) => void
}

export interface NotificationModalProps extends BaseNotificationModalProps {
  buttonLabel?: string
  onAccept?: () => void
}

// export interface NotificationModalMutationProps extends BaseNotificationMutationProps<NotificationModalProps>{
// }

export interface ConfirmModalProps extends BaseNotificationModalProps {
  buttonCancelLabel?: string
  buttonConfirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void | Promise<any>
}

// export interface ConfirmModalMutationProps extends BaseNotificationMutationProps<ConfirmModalProps>{
// }

export interface ErrorResultInfoDataModel {
  errorLabel: string
  errorContent: string
}
