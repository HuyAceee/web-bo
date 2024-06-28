import { ExhibitionSearchBannerModel } from "@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchBannerModel"

export interface ExhibitionCommonSearchBannerGetListParamsModelRequest {
  searchPeriodType: string
  fromDate: string
  toDate: string
  pageNum: number
  rowSize: number
  [key: string]: unknown
}

export interface ExhibitionCommonSearchBannerPutDataModelRequest {
  modifyRequestList: ExhibitionSearchBannerModel[]
}

export interface ExhibitionCommonSearchBannerDeleteDataModelRequest {
  deleteList: number[]
}