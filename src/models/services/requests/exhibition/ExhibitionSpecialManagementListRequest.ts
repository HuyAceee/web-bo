import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import {
  exhibitionSpecialManagementListModelConfig,
  ExhibitionSpecialManagementModel
} from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialManagementModel'
import { YnOptions } from '@/models'
import { FORMAT_DATE_YYYYMMDD, formatTime } from '@/common'

export interface ExhibitionSpecialListRequest {
  customerKey?: string
  exhibitionName?: string
  chargeMdCode?: string
  exhibitionType?: string
  exhibitionStatusType?: string
  displayYn?: string
  applyChannelAllYn?: string
  applyChannelPcYn?: string
  applyChannelMobileYn?: string
  applyChannelMobileWebYn?: string
  searchPeriodType: string
  fromDate: string
  toDate: string
  searchWordType?: string
  searchWord?: string
}

export interface ExhibitionSellerSpecialListRequest {
  sellerKey?: string
  exhibitionName?: string
  chargeMdCode?: string
  exhibitionType?: string
  exhibitionStatusType?: string
  displayYn?: string
  applyChannelAllYn?: string
  applyChannelPcYn?: string
  applyChannelMobileYn?: string
  applyChannelMobileWebYn?: string
  searchPeriodType: string
  fromDate: string
  toDate: string
  searchWordType?: string
  searchWord?: string
}

export interface ExhibitionSpecialEditListRequest {
  displayStartDate: string
  displayYn: string
  displayStartTime: string
  displayEndTime: string
  exhibitionKey: number
  displayEndDate: string
}

export class ExhibitionSpecialManagementListRequestConvertor {
  static from(model: ExhibitionSpecialManagementModel, page: number, size: number): ExhibitionSpecialListRequest & PaginationModelRequest {
    const {
      chargeMdCode,
      applyChannelAllYn,
      applyChannelPcYn,
      applyChannelMobileYn,
      applyChannelMobileWebYn,
      searchPeriodType,
      searchWordType,
      fromDate,
      toDate,
      displayYn,
      exhibitionStatusType,
      exhibitionType,
      customerKey,
      ...newValue
    } = model

    let newParamsSubmit: ExhibitionSpecialListRequest & PaginationModelRequest = {
      ...newValue,
      customerKey: customerKey.value,
      exhibitionStatusType,
      exhibitionType,
      displayYn: displayYn === exhibitionSpecialManagementListModelConfig.selectRow3[0].options[0].value ? '' : displayYn,
      chargeMdCode: chargeMdCode?.value,
      applyChannelAllYn: applyChannelAllYn ? YnOptions.Y : YnOptions.N,
      applyChannelPcYn: applyChannelPcYn ? YnOptions.Y : YnOptions.N,
      applyChannelMobileYn: applyChannelMobileYn ? YnOptions.Y : YnOptions.N,
      applyChannelMobileWebYn: applyChannelMobileWebYn ? YnOptions.Y : YnOptions.N,
      searchPeriodType: searchPeriodType?.value,
      searchWordType: searchWordType?.value,
      fromDate: formatTime(fromDate, FORMAT_DATE_YYYYMMDD),
      toDate: formatTime(toDate, FORMAT_DATE_YYYYMMDD),
      pageNum: page + 1,
      rowSize: size
    }

    if (!exhibitionStatusType) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { exhibitionStatusType, ...newParams1 } = newParamsSubmit
      newParamsSubmit = { ...newParams1 }
    }
    if (!exhibitionType) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { exhibitionType, ...newParams2 } = newParamsSubmit
      newParamsSubmit = { ...newParams2 }
    }

    return newParamsSubmit
  }
}

export class ExhibitionSellerSpecialManagementListRequestConvertor {
  static from(model: ExhibitionSpecialManagementModel, page: number, size: number): ExhibitionSellerSpecialListRequest & PaginationModelRequest {
    const {
      chargeMdCode,
      applyChannelAllYn,
      applyChannelPcYn,
      applyChannelMobileYn,
      applyChannelMobileWebYn,
      searchPeriodType,
      searchWordType,
      fromDate,
      toDate,
      displayYn,
      exhibitionStatusType,
      exhibitionType,
      customerKey,
      ...newValue
    } = model

    let newParamsSubmit: ExhibitionSellerSpecialListRequest & PaginationModelRequest = {
      ...newValue,
      exhibitionStatusType,
      exhibitionType,
      sellerKey: customerKey.value,
      displayYn: displayYn === exhibitionSpecialManagementListModelConfig.selectRow3[0].options[0].value ? '' : displayYn,
      chargeMdCode: chargeMdCode?.value,
      applyChannelAllYn: applyChannelAllYn ? YnOptions.Y : YnOptions.N,
      applyChannelPcYn: applyChannelPcYn ? YnOptions.Y : YnOptions.N,
      applyChannelMobileYn: applyChannelMobileYn ? YnOptions.Y : YnOptions.N,
      applyChannelMobileWebYn: applyChannelMobileWebYn ? YnOptions.Y : YnOptions.N,
      searchPeriodType: searchPeriodType?.value,
      searchWordType: searchWordType?.value,
      fromDate: formatTime(fromDate, FORMAT_DATE_YYYYMMDD),
      toDate: formatTime(toDate, FORMAT_DATE_YYYYMMDD),
      pageNum: page + 1,
      rowSize: size
    }

    if (!exhibitionStatusType) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { exhibitionStatusType, ...newParams1 } = newParamsSubmit
      newParamsSubmit = { ...newParams1 }
    }
    if (!exhibitionType) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { exhibitionType, ...newParams2 } = newParamsSubmit
      newParamsSubmit = { ...newParams2 }
    }

    return newParamsSubmit
  }
}
