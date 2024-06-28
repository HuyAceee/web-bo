import { formatDateToISOString, removeEmptyObjectProperties } from '@/common'
import { WelfareSelectOptionType } from '@/models/uikit'
import { ProductDataFieldFormApprovalTicketProductListConfig, ProductSearchRecordModel } from '@/models/views'
import { ICheckBoxData } from '@/models/widgets'

export interface ProductApprovalTicketProductListForm {
  standardCategorySelect?: WelfareSelectOptionType
  primaryClassificationSelect?: WelfareSelectOptionType
  secondaryClassificationSelect?: WelfareSelectOptionType
  tertiaryClassificationSelect?: WelfareSelectOptionType
  companyChild?: WelfareSelectOptionType
  findSellerInput?: ProductSearchRecordModel
  findMdInput?: ProductSearchRecordModel
  findBrandInput?: string
  findModelInput?: string
  requestClassification?: string
  saveTemporarily: string
  productDateSelect?: WelfareSelectOptionType
  fromDate?: string
  toDate?: string
  productType?: string[]
  salesStatus?: string[]
  exhibitionType?: string[]
  exposureChannel?: string[]
  searchWord?: string
  formFilter?: WelfareSelectOptionType
  productTypeCheckBox?: ICheckBoxData
  salesStatusCheckBox?: ICheckBoxData
  exhibitionTypeCheckBox?: ICheckBoxData
  exposureChannelCheckBox?: ICheckBoxData
  approvalStatusCheckBox?: ICheckBoxData
  externalIntegrationCheckBox?: ICheckBoxData
  selectSubSellerInput?: WelfareSelectOptionType
}
export interface ProductTicketApprovalRequestParams {
  productClassificationCode: string
  productProcessRequestType: string
  categoryType?: string
  catgoryId?: string
  sellerKey?: string
  lowSellerKey?: string
  chargeMdKey?: string
  externalInterfaceYn?: string
  searchDateType?: string
  fromDate?: string
  toDate?: string
  productType?: string
  taxType?: string
  lastProductProgressStatusCode?: string
  productRequestTempYn?: string
  displayYn?: string
  exposureChannel?: string
  searchWordType?: string
  searchWord?: string
  pageNum: number
  rowSize: number
}

export enum ProductProcessRequestType {
  UPDATE = 'U',
  CREATION = 'C'
}
export enum ProductClassificationCode {
  TICKET = '01',
  DELIVERY = '02'
}

export class ProductTicketApprovedListRequestConvertor {
  static from(item: ProductApprovalTicketProductListForm, rowSize: number, pageNum: number): Partial<ProductTicketApprovalRequestParams> {
    let params: ProductTicketApprovalRequestParams
    const externalInterface =
      item.externalIntegrationCheckBox?.listChecked?.value &&
      item.externalIntegrationCheckBox?.listChecked?.value.length &&
      !item.externalIntegrationCheckBox?.isCheckboxAll.value
        ? item.externalIntegrationCheckBox?.listChecked?.value.toString()
        : ''
    const tax =
      item.salesStatusCheckBox?.listChecked?.value &&
      item.salesStatusCheckBox?.listChecked?.value.length &&
      !item.salesStatusCheckBox?.isCheckboxAll.value
        ? item.salesStatusCheckBox?.listChecked?.value.toString()
        : ''
    const salesStatus =
      item.approvalStatusCheckBox?.listChecked?.value &&
      item.approvalStatusCheckBox?.listChecked?.value.length &&
      !item.approvalStatusCheckBox?.isCheckboxAll.value
        ? item.approvalStatusCheckBox?.listChecked?.value.toString()
        : ''
    const display =
      item.exhibitionTypeCheckBox?.listChecked?.value &&
      item.exhibitionTypeCheckBox?.listChecked?.value.length &&
      !item.exhibitionTypeCheckBox?.isCheckboxAll.value
        ? item.exhibitionTypeCheckBox?.listChecked?.value.toString()
        : ''
    const exposure =
      item.exposureChannelCheckBox?.listChecked?.value &&
      item.exposureChannelCheckBox?.listChecked?.value.length &&
      !item.exposureChannelCheckBox?.isCheckboxAll.value
        ? item.exposureChannelCheckBox?.listChecked?.value.toString()
        : ''
    const productType =
      item.productTypeCheckBox?.listChecked?.value &&
      item.productTypeCheckBox?.listChecked?.value.length &&
      !item.productTypeCheckBox?.isCheckboxAll.value
        ? item.productTypeCheckBox?.listChecked?.value.toString()
        : ''

    if (item?.formFilter?.value.value === 'none') {
      let startDate, endDate
      if (item.fromDate && item.toDate) {
        startDate = formatDateToISOString(new Date(item.fromDate))
        endDate = formatDateToISOString(new Date(item.toDate))
      }
      params = {
        productClassificationCode: salesStatus ?? '',
        productProcessRequestType: item.requestClassification ?? '',
        categoryType: item.standardCategorySelect?.value,
        catgoryId: item.primaryClassificationSelect?.value,
        sellerKey: item.findSellerInput?.code.toString() ?? '',
        lowSellerKey: item.companyChild?.value,
        chargeMdKey: item.findMdInput?.code.toString() ?? '',
        externalInterfaceYn: externalInterface,
        searchDateType: item.productDateSelect?.value,
        fromDate: startDate,
        toDate: endDate,
        productRequestTempYn: item.saveTemporarily,
        // findBrandInput: item.findBrandInput,
        productType: productType,
        taxType: tax,
        lastProductProgressStatusCode: salesStatus,
        displayYn: display,
        exposureChannel: exposure,
        pageNum: pageNum,
        rowSize: rowSize
      }
    } else {
      params = {
        productClassificationCode: ProductClassificationCode.TICKET,
        productProcessRequestType: ProductProcessRequestType.CREATION,
        productRequestTempYn: item.saveTemporarily,
        searchWordType: item?.formFilter?.value.value ?? ProductDataFieldFormApprovalTicketProductListConfig.optionsProductListFilter[0].value, //not working
        searchWord: item.searchWord,
        pageNum: pageNum,
        rowSize: rowSize
      }
    }

    return removeEmptyObjectProperties<ProductTicketApprovalRequestParams>(params)
  }
}
