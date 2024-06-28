import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm, formatTime } from '@/common'
import { ProductSearchModalQuery } from '@/models/views/products/modal/ProductSearchProductModalModel'
import { DeliverySearchProductModel } from '@/models/views/delivery/modal/DeliverySearchProductModel'
import { DeliveryKeywordSearchType } from '@/models/views/delivery/common'

export class DeliverySearchProductConvertor {
  static from(values: DeliverySearchProductModel, page: number, size: number): DeliverySearchProductSearchRequest {
    return {
      pageNum: page,
      rowSize: size,
      categoryType: values?.categoryType?.value,
      catgoryDepthId1: values.categoryDepthId1?.value,
      catgoryDepthId2: values.categoryDepthId2?.value,
      catgoryDepthId3: values.categoryDepthId3?.value,
      productClassificationCode: values.productClassificationCode?.value,
      productCode: values.productCode,
      productName: values.productName,
      sellerKey: values.sellerKey?.value,
      chargeMdKey: values.chargeMdKey,
      searchDateType: values.searchDateType?.value,
      fromDate: formatTime(values.fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm),
      toDate: formatTime(values.toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm),
      lastProductSalesStatusCode: values.lastProductSalesStatusCode?.value,
      displayYn: values.displayYn?.value
    }
  }
}

export class ProductSearchProductConvertor {
  static from(values: ProductSearchModalQuery, page: number, size: number): ProductSearchProductSearchRequest {
    const { codeQuery, codeSearch, ...newValue } = values
    if (codeSearch.value === DeliveryKeywordSearchType.PRODUCT_KEY) {
      return {
        productCode: codeQuery,
        pageNum: page,
        rowSize: size
      }
    }
    return {
      ...newValue,
      productClassificationCode: values.productClassificationCode.value,
      lastProductSalesStatusCode: values.lastProductSalesStatusCode.value,
      lastProductProgressStatusCode: values.lastProductProgressStatusCode.value,
      searchDateType: values.searchDateType.value,
      fromDate: formatTime(values.fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm),
      toDate: formatTime(values.toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm),
      pageNum: page,
      rowSize: size
    }
  }
}

export interface DeliverySearchProductSearchRequest extends PaginationModelRequest {
  categoryType: string
  catgoryDepthId1: string
  catgoryDepthId2: string
  catgoryDepthId3: string
  productClassificationCode: string
  productCode: string
  productName: string
  sellerKey: string
  chargeMdKey: string
  searchDateType: string
  fromDate: string
  toDate: string
  lastProductSalesStatusCode: string
  displayYn: string
}

export interface ProductSearchProductSearchRequest extends PaginationModelRequest {
  productClassificationCode?: string
  chargeMdKey?: string
  productName?: string
  productCode?: string
  lastProductSalesStatusCode?: string
  lastProductProgressStatusCode?: any
  searchDateType?: string
  fromDate?: string
  toDate?: string
  codeQuery?: string
  sellerKey?: string
  seller?: string
  brandName?: string
  brandCode?: string
  salesStatus?: string
  keyword?: string
  keywordSearchType?: string
}
