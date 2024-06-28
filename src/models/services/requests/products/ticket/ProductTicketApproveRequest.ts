import { formatDateToISOString } from '@/common'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { ProductTicketListForm } from '@/models/views'
import { ProductClassification } from '@/models/views/products/common/ProductTypeModel'

export interface ProductTicketApproveListRequest extends PaginationModelRequest {
  productClassificationCode?: string
  catgoryIdDepth1?: string
  catgoryIdDepth2?: string
  catgoryIdDepth3?: string
  categoryType?: string
  catgoryId?: string
  sellerKey?: string | number
  lowSellerKey?: string
  chargeMdKey?: string
  externalInterfaceYn?: string
  searchDateType?: string
  fromDate?: string
  toDate?: string
  productType?: string
  lastProductSalesStatusCode?: string
  displayYn?: string
  exposureChannel?: string
  searchWordType?: string
  searchWord?: string
}

interface ProductTicketKeyContentRequest {
  productKey: number
}
interface ProductTicketUploadSellerRequest {
  productKeyList: ProductTicketKeyContentRequest[]
}

export interface ProductDataTicketDspCategoryDepthRequest {
  upperDisplayCategoryId: string
}

export interface ProductTicketChangeStatusApproveModel {
  productReqeustKey: string
  productKey?: string
  productRequestProgressStatus?: string
  productRequestProcessReason?: string
  etcMemoCnts?: string
}

export interface ProductTicketChangeStatusApproveRequest {
  boTempItemApprovalRequestBodyList: ProductTicketChangeStatusApproveModel[]
}

export class ProductTicketApproveListRequestConvertor {
  static from(item: ProductTicketListForm, page: number, numberOfItems: number): ProductTicketApproveListRequest {
    return {
      pageNum: page + 1,
      rowSize: numberOfItems,
      productClassificationCode: ProductClassification.TICKET,
      categoryType: item.standardCategorySelect?.value,
      searchWord: item.searchWord,
      exposureChannel: item.exposureChannel,
      searchDateType: item.productDateSelect?.value,
      fromDate: item.fromDate ? formatDateToISOString(new Date(item.fromDate)) : '',
      toDate: item.toDate ? formatDateToISOString(new Date(item.toDate)) : '',
      productType: item.productType,
      sellerKey: item.sellerKey,
      chargeMdKey: item.findMdInput?.code,
      catgoryIdDepth1: item.primaryClassificationSelect?.value,
      catgoryIdDepth2: item.secondaryClassificationSelect?.value,
      catgoryIdDepth3: item.tertiaryClassificationSelect?.value,
      displayYn: item.exhibitionType,
      externalInterfaceYn: item.externalIntegrationCheckBox,
      lastProductSalesStatusCode: item.salesStatus,
      lowSellerKey: item.subcontractKey,
      searchWordType: item.searchWordType
    }
  }

  static fromCategory(item: string): ProductDataTicketDspCategoryDepthRequest {
    return {
      upperDisplayCategoryId: item
    }
  }
  static fromUpdateSeller(item: number[]): ProductTicketUploadSellerRequest {
    const productKeyList = item.map((id) => {
      return { productKey: id }
    })
    return { productKeyList }
  }
}
