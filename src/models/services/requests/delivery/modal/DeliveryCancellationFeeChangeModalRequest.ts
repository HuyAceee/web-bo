export interface DeliveryCancellationFeeChangeModalRequest {
  cancellationFee: number
  claimKey: number
  finalPaymentAmount: number
  onCheck: (changedFee: number) => void
  onCancel?: () => void
}
export interface DeliveryCancellationFeeChangeModalUpdateRequest {
  claimKey: number
  cancellationFee: number
}
