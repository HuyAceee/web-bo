import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface ExhibitionFlagListRequest extends PaginationModelRequest, ExhibitionFlagListRequestModel {}

export interface ExhibitionFlagListRequestModel {
  flagName?: string
  flagType?: string
  displayYn?: string
  searchPeriodType?: string
  fromDate?: string
  toDate?: string
  searchWordType?: string
  searchWord?: string
}

export interface ExhibitionFlagModifyRequestListType {
  flagKey?: number
  flagName?: string
  flagDisplayOrder?: string
  displayYn?: string
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
}

export interface ExhibitionModifyFlagListRequest {
  modifyRequestList: ExhibitionFlagModifyRequestListType[]
}
