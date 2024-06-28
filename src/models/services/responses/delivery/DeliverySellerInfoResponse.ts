import { BaseModelResponse } from '../BaseModelResponse'

export interface DeliverySellerInfoResponse extends BaseModelResponse<DeliverySellerInfoResponseModel> {}

interface DeliverySellerInfoResponseModel {
  sellerKey: number
  sellerName: string
  bizRegNum: string
  corpRegNum: string
  standardCategoryNameList: string[]
  representativeName: string
  streetAddress: string
  masterAccountName: string
  masterAccountPhone: string
}
