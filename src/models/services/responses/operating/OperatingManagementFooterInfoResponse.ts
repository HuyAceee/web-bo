import { OperatingManagementFooterImageModel } from '@/models/views/operating/operatingMangement/OperatingManagementFooterInfoModel'
import { BaseModelResponse } from '../BaseModelResponse'
import { OperatingManagementFooterGetApiResponseModel } from '@/models/views/operating/operatingMangement/OperatingManagementFooterInfoModel'

export interface OperatingManagementFooterInfoResponse extends BaseModelResponse<OperatingManagementFooterGetApiResponseModel> {}

export interface OperatingManagementFooterImageResponse extends OperatingManagementFooterImageModel {}
