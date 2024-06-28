import { ConfirmModalProps } from '@/models/widgets'

export interface ComplaintCancellationFeeModalModel extends Omit<ConfirmModalProps, 'onConfirm'> {
  lastPayAmount: number
  onConfirm?: (cancellationFee: string) => Promise<any>
}

export interface ComplaintCancellationFeeProps extends Omit<ConfirmModalProps, 'onConfirm'> {
  claimKey: string
  lastPayAmount: string
  onConfirm?: (cancellationFee: string) => Promise<any>
}
