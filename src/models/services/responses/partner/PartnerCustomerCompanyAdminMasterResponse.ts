import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface CustomerCompanyAdminsMasterResponse extends BaseModelResponse<CustomerCompanyAdminsMasterModel> {
}

export interface CustomerCompanyAdminsMasterModel {
  managerKey: number
  managerId: string
  managerName: string
  phone: string
  email: string
}