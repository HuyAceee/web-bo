import { BaseModelResponse, DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import {
  MemberCustomerCompanySelectModel,
  MemberPointAllocationListFormModel,
  MemberPointAllocationModel
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAllocationListModel'
import {
  MemberPointAdjustmentDeleteListFormModel,
  MemberPointAdjustmentListFormModel,
  MemberPointAdjustmentTableListFormModel,
  MemberPointAllocationDetailModel
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

export interface MemberPointAllocationListResponse extends DataTablePaginationResponseModel<MemberPointAllocationListFormModel> {}

export interface MemberPointAllocationResponse extends BaseModelResponse<MemberPointAllocationModel> {}

export interface MemberPointDeductionListResponse extends DataTablePaginationResponseModel<MemberPointAdjustmentListFormModel> {}

export interface MemberPointAdjustmentListResponse extends DataTablePaginationResponseModel<MemberPointAdjustmentDeleteListFormModel> {}

export interface MemberPointAdjustmentUpdateResponse extends DataTablePaginationResponseModel<MemberPointAdjustmentTableListFormModel> {}

export type MemberPointAllocationPointDetailResponse = BaseModelResponse<MemberPointAllocationDetailModel>

export type MemberPointAllocationRegistrationAdjustResponse = BaseModelResponse<{ pointKey?: string | number }>

export interface MemberCustomerSelectResponse extends BaseModelResponse<MemberCustomerCompanySelectModel[]> {}
