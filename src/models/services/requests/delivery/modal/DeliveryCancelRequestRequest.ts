import { DeliveryClaimDetailReasonType } from '@/models/views/delivery/common'

export interface DeliveryCancelRequestRequest {
  orderKey: number
  receiverProductOrderKey: number[]
  cancelReasonCode: DeliveryClaimDetailReasonType
  cancelMemo: string
  cancelFee: number
}
