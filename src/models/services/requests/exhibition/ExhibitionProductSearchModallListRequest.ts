import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss, formatTime } from '@/common'
import { ComplaintOrderCancelKeywordSearchType } from '@/models/services/requests/complaint/complaintOrderCancel/ComplaintOrderCancelListRequest'
import { ExhibitionProductSearchFormModel } from '@/models/views/exhibition/modal/ExhibitionProductSearchModalModel'
import { ProductSearchProductSearchRequest } from '@/models/services/requests/delivery/modal/DeliverySearchProductRequest'

export class ExhibitionProductSearchRequestConvertor {
  static from(model: ExhibitionProductSearchFormModel, page: number, size: number): ProductSearchProductSearchRequest {
    const { keyword, ...newModelValue } = model

    const searchDateType = model.searchDateType?.value
    const keywordSearchType = model.keywordSearchType?.value
    const salesStatus = model.salesStatus?.value
    const productClassificationCode = model.productClassificationCode?.value

    if (keywordSearchType !== ComplaintOrderCancelKeywordSearchType.NONE) {
      return {
        keyword: keyword,
        keywordSearchType,
        pageNum: page + 1,
        rowSize: size,
        productClassificationCode: productClassificationCode
      }
    }
    const fromDate = model.fromDate ? formatTime(model.fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : ''
    const toDate = model.toDate ? formatTime(model.toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : ''

    return {
      ...newModelValue,
      salesStatus,
      productClassificationCode,
      searchDateType,
      keywordSearchType,
      pageNum: page + 1,
      rowSize: size,
      fromDate,
      toDate
    }
  }
}
