import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface CompanyCustomerDetailContractInformationLastResponse extends BaseModelResponse<CompanyCustomerDetailContractInformationResponseModel> {}
export interface CompanyCustomerDetailContractInformationResponse extends BaseModelResponse<CompanyCustomerDetailContractInformationResponseModel[]> {
  page: {
    totalCount: number
  }
}

export interface CompanyCustomerDetailContractInformationResponseModel {
  contractKey: number
  customerKey: number
  contractStartDate: string
  contractEndDate: string
  contractStatus: string
  settlementDate: string
  contractRegDate: string
  contractFileOriginName: string
  contractFileSize: number
  contractFileDownloadLink: string
  auditing: Auditing
}

export interface Auditing {
  registerKey: number
  registerId: string
  registerName: string
  registeredDate: Date
  modifierKey: number
  modifierId: string
  modifierName: string
  modifiedDate: Date
}
