import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionTemplateManagementModel,
  ExhibitionTemplateManagementTableModel
} from '@/models/views/exhibition/templateManagement/ExhibitionTemplateManagementModel'

export interface ExhibitionTemplateDataResponse extends BaseModelResponse<ExhibitionTemplateManagementTableModel[]> {}

export interface ExhibitionTemplateDetailByKeyResponse extends BaseModelResponse<ExhibitionTemplateManagementModel> {}

export interface ExhibitionTemplateFileUploadResponse extends BaseModelResponse<ExhibitionTemplateFileUploadResponseModel> {}

export interface ExhibitionTemplateFileUploadResponseModel {
  fileUrl?: string
  filePathName?: string
  fileName?: string
}
