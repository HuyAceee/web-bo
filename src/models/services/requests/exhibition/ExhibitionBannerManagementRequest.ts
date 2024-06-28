import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface ExhibitionBannerGroupListRequest extends PaginationModelRequest, ExhibitionBannerGroupListRequestModel {}

export interface ExhibitionBannerGroupListRequestModel {
  customerKey?: string
  bannerGroupName?: string
  bannerGroupUseYn?: string
  applyChannelType: string
  searchPeriodType: string
  fromDate: string
  toDate: string
  searchWordType: string
  searchWord: string
}

export interface ExhibitionBannerListRequest extends PaginationModelRequest {
  bannerGroupKey: string
}

export interface ExhibitionCommonBannerGroupModifyRequestListType {
  bannerGroupKey?: number
  bannerGroupUseYn?: string
}

export interface ExhibitionCommonBannerModifyRequestListType {
  bannerKey?: number
  displayOrder?: number
  displayYn?: string
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
}

export interface ExhibitionCommonModifyBannerGroupListRequest {
  modifyRequestList: ExhibitionCommonBannerGroupModifyRequestListType[]
}

export interface ExhibitionCommonModifyBannerListRequest {
  modifyRequestList: ExhibitionCommonBannerModifyRequestListType[]
}
