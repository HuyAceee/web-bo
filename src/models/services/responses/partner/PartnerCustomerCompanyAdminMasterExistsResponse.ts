import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface CustomerCompanyAdminsMasterExistsResponse extends BaseModelResponse<CustomerCompanyAdminsMasterExistsModel> {
}

export interface CustomerCompanyAdminsMasterExistsModel {
  isExist: boolean
}