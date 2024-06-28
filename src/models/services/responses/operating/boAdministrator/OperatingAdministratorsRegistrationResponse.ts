import { BaseModelResponse, DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { OperatingAdminPermissionRegisForm } from '@/models/views/operating/adminManagement/OperatingAdministratorsRegistrationModel'
export interface PermissionGroupAuthority {
  groupKey: number
  groupName: string
}

export interface GetGroupAuthorityResponse extends DataTablePaginationResponseModel<PermissionGroupAuthority> {}
export interface PermissionGroupDetailResponse extends BaseModelResponse<OperatingAdminPermissionRegisForm> {}
