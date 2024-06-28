import { BaseModelResponse, DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import {
  MemberDeliveryPointAllocationAdjustmentListModel,
  MemberPointCustomerCompaniesModel,
  MemberPointUsageCustomerDataTableModel
} from '@/models/views/members/pointUsageList/MemberPointUsageListModel'

export interface MemberPointUsageCustomerInformationResponse {
  data: MemberPointUsageCustomerDataTableModel[]
}

export interface MemberRegistrationPointAllocationAdjustmentDataModel {
  pointKey: number
}

export interface DeliveryPointAllocationAdjustmentListResponse
  extends DataTablePaginationResponseModel<MemberDeliveryPointAllocationAdjustmentListModel> {}

export interface MemberRegistrationPointAllocationAdjustmentResponse
  extends BaseModelResponse<MemberRegistrationPointAllocationAdjustmentDataModel> {}

export interface MemberUsagePointDetailResponse extends BaseModelResponse<MemberDeliveryPointAllocationAdjustmentListModel> {}
export interface MemberUsagePointHistoriesResponse extends DataTablePaginationResponseModel<MemberDeliveryPointAllocationAdjustmentListModel> {}
export interface MemberUsagePointCustomerCompaniesResponse extends BaseModelResponse<MemberPointCustomerCompaniesModel> {}