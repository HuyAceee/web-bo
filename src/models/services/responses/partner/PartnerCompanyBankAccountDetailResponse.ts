import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface PartnerCompanyBankAccountDetailResponse extends BaseModelResponse<PartnerCompanyBankAccountDetailModel> {
}

export interface PartnerCompanyBankAccountDetailModel {
  bankBranchName: string
  accountHolderName: string
  accountNumber: string
  accountImageOriginName: string
  accountImageSize: number
  accountImageDownloadLink: string
  bankCode: string
}