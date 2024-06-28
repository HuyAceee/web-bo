import { PartnerContractInformationModel } from '@/models/views/partner/PartnerContractInformationModel'
import { BaseModelResponse, DataTablePaginationResponseModel } from '../BaseModelResponse'

export interface PartnerContractInfoFileModel {
  type?: string
  size?: number
}
export interface PartnerContractInfoResponse extends BaseModelResponse<PartnerContractInformationModel> {}
export interface PartnerContractInfoTableResponse extends DataTablePaginationResponseModel<PartnerContractInformationModel> {}
