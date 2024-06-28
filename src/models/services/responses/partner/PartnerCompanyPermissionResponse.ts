import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { YnOptions } from '@/models'

export interface PartnerCompanyPermissionResponse extends BaseModelResponse<PartnerCompanyPermissionModel> {
}

export interface PartnerCompanyPermissionModel {
  submitSpecificProductSalesPermission: YnOptions
  specificProductSalesPermissionList: PartnerCompanyPermissionListModel[]
}

export interface PartnerCompanyPermissionListModel {
  permissionType: string
  permissionFileOriginName: string
  permissionFileSize: number
  permissionFileDownloadLink: string
}