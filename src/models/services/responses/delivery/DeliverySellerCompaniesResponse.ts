import { BaseModelResponse } from '../BaseModelResponse'

export interface DeliverySellerCompaniesSearchResponseModel {
  sellerKey: number
  sellerName: string
  sellerStatus: string
  bizRegNum: string
  corpRegNum: string
  contractType: string
  contractStatus: string
  contractStartDate: string
  contractEndDate: string
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
  }
}

export interface DeliverySellerCompaniesResponseModel extends BaseModelResponse<DeliverySellerCompaniesSearchResponseModel[]> {}
