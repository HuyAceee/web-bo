import { BaseModelResponse, DataTablePaginationResponseModel } from "@/models/services/responses/BaseModelResponse";
import { ExhibitionCommonSearchBannerDetailModel, ExhibitionSearchBannerModel } from "@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchBannerModel";

export type ExhibitionSearchBannerGetListModelResponse = DataTablePaginationResponseModel<ExhibitionSearchBannerModel>
export type ExhibitionSearchBannerDetailModelResponse = BaseModelResponse<ExhibitionCommonSearchBannerDetailModel>
