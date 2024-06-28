import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionGnbGroupListTableModel,
  ExhibitionGnbReservationTableModel
} from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'

export interface ExhibitionGnbGroupListResponse extends DataTablePaginationResponseModel<ExhibitionGnbGroupListTableModel> {}

export interface ExhibitionGnbReservationGroupResponse extends DataTablePaginationResponseModel<ExhibitionGnbReservationTableModel> {}
