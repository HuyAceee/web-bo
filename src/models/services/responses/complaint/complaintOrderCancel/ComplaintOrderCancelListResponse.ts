import { ClaimTicketDetailModel, ComplaintOrderCancelDetailFormModel } from '@/models/views/complaint/modal/ComplaintOrderCancelDetailModel'
import { DataTablePaginationResponseModel, BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { ComplaintOrderCancelListFormModel } from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'

export interface ComplaintOrderCancelListResponse extends DataTablePaginationResponseModel<ComplaintOrderCancelListFormModel> {}

export interface ComplaintOrderCancelDetailResponse extends BaseModelResponse<ComplaintOrderCancelDetailFormModel> {}

export interface ComplaintOrderCancelTicketDetailResponse extends BaseModelResponse<ClaimTicketDetailModel[]> {}
