import { ExhibitionSearchKeywordModel } from "@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchKeywordModel"

export interface ExhibitionCommonSearchKeywordGetListParamsModelRequest {
  searchPeriodType: string
  fromDate: string
  toDate: string
  pageNum: number
  rowSize: number
  [key: string]: unknown
}

export interface ExhibitionCommonSearchKeywordPutDataModelRequest {
  modifyRequestList: ExhibitionSearchKeywordModel[]
}

export interface ExhibitionCommonSearchKeywordDeleteDataModelRequest {
  deleteList: number[]
}