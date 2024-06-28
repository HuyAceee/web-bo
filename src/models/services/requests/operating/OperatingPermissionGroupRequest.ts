import { PermissionGroupType, OptionsPermissionType } from '@/models/views/operating/adminManagement/OperatingPermissionGroupRegistrationModel'

export interface OperatingPermissionGroupRequest {
  groupUseYn: OptionsPermissionType
  groupName: string
  deptInfo: string
  menus: PermissionGroupType[]
}
