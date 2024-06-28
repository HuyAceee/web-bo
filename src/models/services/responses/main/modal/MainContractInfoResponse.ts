import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface MainContractInfoResponse extends BaseModelResponse<MainContractInfoResponseModel[]> {}

export interface MainContractInfoResponseModel {
  chargerType: string
  sellerName: string
  chargerName: string
  chargerPosition: string
  chargerPhone: string
  chargerEmail: string
}
