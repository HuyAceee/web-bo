import { DialogProps } from 'primevue/dialog'

export interface WelfareDialogProps extends DialogProps {
  styleRoot?: string
  styleHeader?: string
  styleHeaderTitle?: string
  styleContent?: string
  styleFooter?: string
  styleHeaderIcon?: string
  isModal: boolean
}

export interface WelfareDialogEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'after-hide'): void
}

export interface WelfareConfirmDialogProps extends DialogProps {
  title?: string
}

export interface WelfareConfirmDialogEmits extends WelfareDialogEmits {
  (e: 'confirm', event: any): void
}
