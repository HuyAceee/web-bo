import { ApprovalTableDataModel } from '@/models/views'
import { BaseModelResponse, DataTablePaginationResponseModel } from '../../BaseModelResponse'

export interface ProductTicketApprovalResponseModel {
  productReqeustKey: string
  productReqeustCode: string
  productKey: string
  errMessage: string
  sucessMessage: string
}

export interface ProductTicketApproveListResponse extends DataTablePaginationResponseModel<ApprovalTableDataModel> {}

export interface ProductTicketChangeStatusApprovalResponse extends BaseModelResponse<ProductTicketApprovalResponseModel> {}
