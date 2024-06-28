import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import {
  OperatingAdministratorsFormModel,
  OperatingPermissionUseStatusModel
} from '@/models/views/operating/adminManagement/OperatingAdministratorsListOfAdministratorsModel'

export interface OperatingAdministratorsListRequest extends PaginationModelRequest, OperatingAdministratorsFormModel {}
export interface OperatingAdministratorsUpdateStatusRequest {
  isActive: OperatingPermissionUseStatusModel
  managerKeys: number[]
  status?: OperatingPermissionUseStatusModel
}

export interface OperatingAdministratorsPermissionUpdateStatusRequest {
  status: OperatingPermissionUseStatusModel
  groupKeys: number[]
}
  