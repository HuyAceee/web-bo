import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface MemberFoInfoResponse extends BaseModelResponse<MemberFoInfoResponseModel> {}

export interface MemberFoInfoResponseModel {
  memberKey?: number
  memberId?: string
  passwordChangeDate?: string
  memberName?: string
  cellphoneNumber?: string
  authenticationYn?: string
  birthDate?: string
  genderCode?: string
  email?: string
  accountStatusCode?: {
    code?: string
    title?: string
  }
  gradeCode?: {
    code?: string
    title?: string
  }
  latestBlackListChangedAdminId?: string
  latestBlackListChangeAdminName?: string
  latestBlackListChangedDate: string
  latestLoginDate?: string
  deliveryZipCode?: string
  deliveryLoadNameAddress?: string
  deliveryLoadLotBasedAddress?: string
  deliveryDetailedAddress?: string
  company?: {
    customerKey?: number
    customerName?: string
    employeeNumber?: string
    holdingOfficeYn?: string
    rankName?: string
    companyZipCode?: string
    companyLoadNameAddress?: string
    companyLoadLotBasedAddress?: string
    companyDetailedAddress?: string
    customerStatus?: {
      code?: string
      title?: string
    }
    contractRegDate?: string
  }
  pointBalance?: number
  extinctionScheduledPoint?: number
  auditing?: {
    registerKey?: number
    registerId?: string
    registerName?: string
    registeredDate?: string
    modifierKey?: number
    modifierId?: string
    modifierName?: string
    modifiedDate?: string
  }
}
export interface MemberWelfarePointUsageDetailModalProps {
  onClose: () => void
  memberKey: string
}
