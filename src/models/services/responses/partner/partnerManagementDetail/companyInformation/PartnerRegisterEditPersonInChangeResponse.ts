import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface PartnerRegisterEditPersonInChangeResponse extends BaseModelResponse<PartnerRegisterEditPersonInChangeModel> {}

export interface PartnerRegisterEditPersonInChangeModel {
  chargerKey: string | number
  chargerType: string
  chargerName: string
  isMainExposure: string
  chargerPosition: string
  chargerPhone: string
  chargerEmail: string
  auditing: {
    registerKey: string | number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: string | number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}
