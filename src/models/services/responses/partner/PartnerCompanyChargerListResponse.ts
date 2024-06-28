import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'

export interface PartnerCompanyChargerListResponse extends DataTablePaginationResponseModel<PartnerCompanyChargerResponseModel> {
}

export interface PartnerCompanyChargerResponseModel {
  chargerName: string
  chargerPosition: string
  chargerPhone: string
  chargerEmail: string
  chargerType: string
  chargerKey: number
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}