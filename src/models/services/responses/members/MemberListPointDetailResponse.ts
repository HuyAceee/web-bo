import { MemberPointPaymentDataTableModel, MemberPointUsageDataTableModel } from '@/models/views';
import { DataTablePaginationResponseModel } from '../BaseModelResponse'

export interface MemberListPointPaymentDetailResponse extends DataTablePaginationResponseModel<MemberPointPaymentDataTableModel> {}
export interface MemberListPointUsageDetailResponse extends DataTablePaginationResponseModel<MemberPointUsageDataTableModel> {}
