import { BaseModelResponse } from '../../BaseModelResponse'

export interface DeliveryIssuanceDelayInfoDetailResponse extends BaseModelResponse<DeliveryIssuanceDelayInfoDetailResponseModel> {}

export interface DeliveryIssuanceDelayInfoDetailResponseModel {
  receiverProductOrderKey: number
  orderKey: number
  transactionNumber: number
  productOrderKey: number
  productKey: number
  productName: string
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  issueDelayReason: string
  reasonContents: string
}
