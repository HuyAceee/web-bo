import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface MemberCustomerCompaniesKeysResponse extends BaseModelResponse<MemberCustomerCompaniesKeysResponseModel[]> {}

export interface MemberCustomerCompaniesKeysResponseModel {
  customerName: string
  customerKey: number
}
