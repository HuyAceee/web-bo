import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { OptionsPermissionType } from '@/models/views/operating/adminManagement/OperatingPermissionGroupRegistrationModel'

interface PermissionGroupType {
  menuKey: number
  permissions: {
    read: boolean
    write: boolean
    approve: boolean
    personalInformationManagement: boolean
  }
}

export interface OperatingPermissionGroupDetailResponse {
  groupKey: number
  active: OptionsPermissionType
  name: string
  groupNameInput: string
  deptInfo: string
  menuPermissions: PermissionGroupType[]
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

export interface CheckGroupAuthorityExistedResponse extends BaseModelResponse<boolean> {}
export interface PermissionGroupDetailResponse extends BaseModelResponse<OperatingPermissionGroupDetailResponse> {}
