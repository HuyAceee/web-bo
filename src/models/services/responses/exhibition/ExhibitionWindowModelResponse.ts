import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { ExhibitionWindowModel } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonWindowModel'

export type ExhibitionWindowGetListModelResponse = DataTablePaginationResponseModel<ExhibitionWindowModel>
