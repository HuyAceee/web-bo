import { ConfirmModalProps } from '@/models/widgets'

export interface ComplaintOrderCancelModalModel extends Omit<ConfirmModalProps, 'onConfirm'> {
  onConfirm?: (withdrawalReason: string) => Promise<any>
}

export interface ComplaintOrderCancelProps extends Omit<ConfirmModalProps, 'onConfirm'> {
  claimProductKey: number[]
  onConfirm?: (withdrawalReason: string) => Promise<any>
}

export enum ComplaintResearchMemberType {
  NORMAL = 'NORMAL',
  REQUEST = 'REQUEST'
}
