export interface DeliveryCancellationFeeChangeProps {
  cancellationFee: number
  finalPaymentAmount: number
  claimKey: number
  onCheck?: (changedFee: number) => void
  onCancel?: () => void
}
