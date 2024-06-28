import { ExhibitionWindowModel } from "@/models/views/exhibition/exhibitionCommon/ExhibitionCommonWindowModel"

export interface ExhibitionCommonWindowGetListParamsModelRequest {
  searchPeriodType: string
  fromDate: string
  toDate: string
  pageNum: number
  rowSize: number
  [key: string]: unknown
}

export interface ExhibitionCommonWindowPutDataModelRequest {
  modifyRequestList: ExhibitionWindowModel[]
}

export interface ExhibitionCommonWindowDeleteDataModelRequest {
  deleteList: number[]
}