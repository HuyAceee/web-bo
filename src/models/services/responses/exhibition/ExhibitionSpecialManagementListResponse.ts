import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { ExhibitionSpecialManagementListFormModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialManagementModel'

export interface ExhibitionSpecialManagementListResponse extends DataTablePaginationResponseModel<ExhibitionSpecialManagementListFormModel> {}
