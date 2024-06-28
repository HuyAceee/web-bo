import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import {
  OperatingAdministratorsTableModel,
  OperatingAuthorityGroupsNameModel
} from '@/models/views/operating/adminManagement/OperatingAdministratorsListOfAdministratorsModel'
import { OperatingAdministratorsPermissionTableModel } from '@/models/views/operating/adminManagement/OperatingAdministratorsListOfPermissionsModel'

export interface OperatingAdministratorsListResponse extends DataTablePaginationResponseModel<OperatingAdministratorsTableModel> {}
export interface OperatingAuthorityGroupsNamesResponse extends DataTablePaginationResponseModel<OperatingAuthorityGroupsNameModel> {}

export interface OperatingAdministratorsPermissionListResponse extends DataTablePaginationResponseModel<OperatingAdministratorsPermissionTableModel> {}
