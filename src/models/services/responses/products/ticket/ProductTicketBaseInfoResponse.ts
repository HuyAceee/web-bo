import { OperationSystemEnum, YnOptions, productStatusSell } from '@/models'
import { formatDateToISOString, removeEmptyObjectProperties } from '@/common'
import { WelfareSelectOptionType } from '@/models/uikit'
import {
  ProductBaseInfoFormModel,
  ProductSalesCouponPromotionDataModel,
  ProductSalesDiscountPromotionDataModel,
  ProductSalesSavingPromotionDataModel,
  ProductSalesTax
} from '@/models/views'
import {
  ProductDisplayCategoryModel,
  ProductItemDisplayManageModel,
  ProductRequestItemDisplayManageModel,
  ProductTicketItemBasicManageRequestModel
} from '@/models/services/requests/products/ticket/ProductTicketBaseInfoRequest'
import { ProductProcessRequestType } from '@/models/services/requests/products/approval/ProductTicketApprovalListRequest'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { OrderCouponPromotionModel, OrderSavingsPromotionModel } from '@/models/services/responses/order/OrderSavingsPromotionResponse'
import { ProductClassification } from '@/models/views/products/common/ProductTypeModel'

export interface ProductTicketDetailBasicInfoExceptCompanyModel {
  productKey: number
  productCode: string
  customerKey: string
  customerName: string
}

export interface ProductTicketDetailBasicInfoModel {
  externalInterfaceYn: string
  productClassificationCode: string
  productClassificationName: string
  productType: string
  productTypeName: string
  productName: string
  productKey: number
  productCode: string
  multilingualProductName: string
  sellerProductCode: string
  sellerKey: number
  lowSellerKey: number
  ticketPassType: string
  ticketPassTypeName: string
  ticketCancelPossibleType: string
  ticketCancelPossibleTypeName: string
  ticketType: string
  ticketTypeName: string
  ticketUseRuleType: string
  ticketUseRuleTypeName: string
  ticketValidityDateYn: string
  ticketValidityStartDateTime: string
  ticketValidityEndDateTime: string
  reviewPossibleYn: string
  inquiryPossibleYn: string
  giftPossibleYn: string
  minimumPurchaseQuantityYn: string
  minimumPurchaseQuantity: number
  maximumPurchaseQuantityYn: string
  maximumPurchaseQuantity: number
  excludedCompanyYn: string
  lastProductProgressStatusCode: string
  lastProductProgressStatusName: string
  productRequestProcessReason: string
  createdBy: string
  createdByName: string
  createdDate: string
  lastProductApprovedBy: string
  lastProductApprovedByName: string
  lastProductApprovedDate: string
  lastModifiedBy: string
  lastModifiedByName: string
  lastModifiedByDate: string
  lastProductSalesStatusCode: string
  lastProductSalesStatusName: string
  productReqeustKey?: string
  brandId?: string
  boKeyWordList?: {
    keywordName: string
  }[]
  boTempKeyWordList?: {
    keywordName: string
  }[]
  productReqeustCode?: string
  sellerName: string
}

interface ProductItemBasicManageModel {
  productKey: number
  productCode: string
  errMessage: string
  sucessMessage: string
  productReqeustKey?: string
  productReqeustCode?: string
}

interface ProductRequestItemBasicManagementModel {
  productReqeustKey: number
  productReqeustCode: string
  productKey: number
  errMessage: string
  sucessMessage: string
}

export interface ProductTicketDetailBasicInfoProps {
  data: ProductTicketDetailBasicInfoModel
  category: ProductItemDetailDisplayInfoModel
}

export interface ProductTicketDataNoticeProvidingProps {
  productRequestKey?: number
  productKey?: number
  productCode?: string
}

export enum ProductTicketNoticeProvidingType {
  Register = 'register',
  Edit = 'edit',
  RegisterApproval = 'registerApproval',
  EditApproval = 'editApproval'
}

export interface ProductTicketDetailNoticeProvidingInfoModel {
  data: ProductTicketDataNoticeProvidingProps
  category: ProductItemDetailDisplayInfoModel
}

export interface ProductItemDetailDisplayInfoModel {
  productKey: number
  productCode: string
  displayYn: YnOptions
  exposureChannel: string
  exposureChannelName: string
  displayStartDateTime: string
  displayEndDateTime: string
  chargeMdKey: number
  standardCategoryId: string
  standardCategoryIdDepth1: string
  standardCategoryIdDepth2: string
  standardCategoryIdDepth3: string
  lastProductProgressStatusCode?: string
  productReqeustKey?: string
  boItemDspCategoryList: ProductItemDisplayCategoryModel[]
  productRequestKey?: string
}

interface ProductItemDisplayCategoryModel {
  standardCategoryId?: string
  displayCategoryId?: string
  displayCategoryIdDepth1?: string
  displayCategoryNameDepth1?: string
  displayCategoryIdDepth2?: string
  displayCategoryNameDepth2?: string
  displayCategoryIdDepth3?: string
  displayCategoryNameDepth3?: string
  displayCategoryPathName?: string
  representativeDisplayCategoryYn: YnOptions.Y | YnOptions.N
}

export interface ProductItemRequestDetailDisplayInfoModel {
  productReqeustKey: string
  productReqeustCode: string
  productKey: number
  displayYn: YnOptions
  exposureChannel: string
  exposureChannelName: string
  displayStartDateTime: string
  displayEndDateTime: string
  chargeMdKey: number
  standardCategoryId: string
  standardCategoryIdDepth1: string
  standardCategoryIdDepth2: string
  standardCategoryIdDepth3: string
  lastProductProgressStatusCode?: string
  boTempItemDspCategoryList: ProductItemDisplayCategoryModel[]
}

export interface ProductExhibitionInfoFormModel {
  productReqeustKey?: number
  productStatus?: string
  exhibitionStatus: boolean
  devices: string[]
  startTime: string
  endTime: string
  selectFirst?: WelfareSelectOptionType
  selectSecond?: WelfareSelectOptionType
  selectThird?: WelfareSelectOptionType
  exhibitionCategories: string[]
  radioGroupCategories: number
  md: string
  productKey?: number
  standardCategoryId?: string
  boItemDspCategoryList?: ProductItemDisplayCategoryModel[]
  lastProductProgressStatusCode?: string
  productCode?: string
  productRequestKey?: string
}

export const productExhibitionChanel = {
  all_channel: '01',
  pc: '02',
  mobile: '03'
}
export const productExhibitionChanelList = {
  all_channel: ['pc', 'mobile'],
  pc: ['pc'],
  mobile: ['mobile']
}

export interface ProductSalesListModel {
  discountPromotionId: string
  discountPromotionName: string
  salePrice: number
  productDiscountAmount: number
}

export interface ProductSalesInfoModel {
  productKey: number
  productCode?: string
  salePeriodUseYn: string
  saleStartDateTime: string
  saleEndDateTime: string
  taxType: string
  taxTypeName: ProductSalesTax
  adultCertificationYn: string
  salePrice: number
  marginRateModificationYn: string
  marginRate: number
  marginPrice: number
  boDscntPmtProdList?: ProductSalesListModel[]
}

export interface ProductRequestSaleInfoModel {
  productReqeustKey: number
  productReqeustCode: string
  productKey: number
  salePeriodUseYn: string
  saleStartDateTime: string
  saleEndDateTime: string
  taxType: string
  taxTypeName: ProductSalesTax
  adultCertificationYn: string
  salePrice: number
  marginRateModificationYn: string
  marginRate: number
  marginPrice: number
  lastProductProgressStatusCode: string
  boTempDscntPmtProdList: ProductSalesListModel[]
}

export interface ProductTicketDetailBasicInfoResponse extends BaseModelResponse<ProductTicketDetailBasicInfoModel> {}

export interface ProductTicketDetailBasicInfoExceptCompanyResponse extends BaseModelResponse<ProductTicketDetailBasicInfoExceptCompanyModel[]> {}

export interface ProductItemBasicManageResponse extends BaseModelResponse<ProductItemBasicManageModel> {}

export interface ProductRequestItemBasicManagementResponse extends BaseModelResponse<ProductRequestItemBasicManagementModel> {}

export interface ProductItemDetailDisplayResponse extends BaseModelResponse<ProductItemDetailDisplayInfoModel> {}

export interface ProductItemRequestDetailDisplayInfoResponse extends BaseModelResponse<ProductItemRequestDetailDisplayInfoModel> {}

export interface ProductSalesInfoResponse extends BaseModelResponse<ProductSalesInfoModel> {}

export interface ProductRequestSalesInfoResponse extends BaseModelResponse<ProductRequestSaleInfoModel> {}

const optionsTypeProduct: WelfareSelectOptionType[] = [
  { label: '일반 티켓', value: '03' },
  { label: '예약 티켓', value: '04' }
]

const optionsTypeTicket: WelfareSelectOptionType[] = [
  { label: '모바일티켓', value: '01' },
  { label: '바우처', value: '02' }
]

export class ProductTicketDetailBasicInfoResponseConverter {
  static from(product: ProductTicketDetailBasicInfoModel): ProductBaseInfoFormModel {
    const selectSeller: WelfareSelectOptionType = { label: '', value: product?.lowSellerKey?.toString() }
    return {
      lastSavedTime: product?.lastModifiedByDate,
      lastApprovalFinishedTime: product?.lastProductApprovedDate,
      lastChangeSavedTime: new Date().toString(),
      externalIntegration: product?.externalInterfaceYn,
      selectTypeProduct: optionsTypeProduct.find((it) => it.value === product?.productType) ?? optionsTypeProduct[0],
      productName: product?.productName,
      productNameI18: product?.multilingualProductName,
      productStatus: product?.lastProductProgressStatusName,
      seller: product?.sellerKey?.toString(),
      selectSeller: selectSeller, //
      customerKeywords: [],
      brand: product?.brandId ?? '',
      registerProductReview: product?.reviewPossibleYn,
      qaRegistration: product?.inquiryPossibleYn,
      giveAGift: product?.giftPossibleYn,
      minimumPurchaseQuantity: product?.minimumPurchaseQuantity?.toString() ?? '',
      maximumPurchaseQuantity: product?.maximumPurchaseQuantity?.toString() ?? '',
      isMinimumPurchaseQuantity: product?.minimumPurchaseQuantityYn === YnOptions.Y,
      isMaximumPurchaseQuantity: product?.maximumPurchaseQuantityYn === YnOptions.Y,
      lastModifiedBy: product?.lastModifiedBy,
      lastModifiedByName: product?.lastModifiedByName,
      createdBy: product?.createdBy,
      createdByName: product?.createdByName,
      startTime: product?.ticketValidityStartDateTime,
      endTime: product?.ticketValidityEndDateTime,
      lastProductApprovedBy: product?.lastProductApprovedBy,
      lastProductApprovedByName: product?.lastProductApprovedByName,
      customerRegistration: product?.excludedCompanyYn === YnOptions.Y,
      key: product?.productKey,
      sellerKey: product?.sellerKey,
      lowSellerKey: product?.lowSellerKey,
      classification: product?.productClassificationCode,
      ticketValidityDateYn: product?.ticketValidityDateYn,
      ticketUseRuleType: product?.ticketUseRuleType,
      ticketCancelPossibleType: product?.ticketCancelPossibleType,
      ticketType: product?.ticketType,
      ticketPassType: product?.ticketPassType,
      inquiryPossibleYn: product?.inquiryPossibleYn,
      excludedCompanyYn: product?.excludedCompanyYn,
      sellerName: product?.sellerName,
      productType: product?.productType,
      selectTypeTicket: optionsTypeTicket.find((it) => it.value == product?.ticketType) ?? optionsTypeTicket[0],
      createdDate: product?.createdDate,
      lastProductSalesStatusCode: product?.lastProductSalesStatusCode,
      productRequestProcessReason: product?.productRequestProcessReason,
      lastProductProgressStatusCode: product?.lastProductProgressStatusCode,
      productCodeSeller: product?.sellerProductCode,
      productKey: product?.productKey,
      selectStatusSell: productStatusSell.find((it) => it.value === product?.lastProductSalesStatusCode) ?? productStatusSell[0],
      productCode: product?.productCode ?? product?.productReqeustCode ?? '',
      productRequestKey: product?.productReqeustKey ?? '',
      productKeywords: product?.boKeyWordList?.map((it) => it.keywordName) ?? product?.boTempKeyWordList?.map((it) => it.keywordName) ?? []
    }
  }
}
export class ProductTicketDetailBasicInfoRequestConverter {
  static from(product: ProductBaseInfoFormModel, type?: ProductProcessRequestType): Partial<ProductTicketItemBasicManageRequestModel> {
    let preparedData: Partial<ProductTicketItemBasicManageRequestModel> = {
      externalInterfaceYn: product?.externalIntegration ? YnOptions.Y : YnOptions.N,
      productClassificationCode: product?.classification || ProductClassification.TICKET,
      productType: product?.selectTypeProduct?.value,
      productName: product?.productName,
      productKey: product?.key?.toString() ?? '',
      productCode: product?.productCode,
      multilingualProductName: product?.productNameI18 ?? '',
      sellerProductCode: product?.productCodeSeller ?? '',
      sellerKey: parseInt(product?.seller.split('(')[1]).toString() ?? product?.sellerKey?.toString(),
      lowSellerKey: product?.selectSeller?.value ?? product?.lowSellerKey,
      brandKey: product?.brand ?? '',
      productModelName: product?.nameModel ?? '',
      ticketPassType: product?.ticketPassType,
      ticketCancelPossibleType: product?.ticketCancelPossibleType ?? '',
      ticketType: product?.selectTypeTicket?.value ?? product.ticketType,
      ticketUseRuleType: product?.ticketUseRuleType ?? '',
      ticketValidityDateYn: product?.ticketValidityDateYn,
      ticketValidityStartDateTime: product?.startTime ? formatDateToISOString(new Date(product?.startTime)) : '',
      ticketValidityEndDateTime: product?.endTime ? formatDateToISOString(new Date(product?.endTime)) : '',
      reviewPossibleYn: product?.qaRegistration,
      inquiryPossibleYn: product?.registerProductReview ? YnOptions.Y : YnOptions.N,
      giftPossibleYn: product?.giveAGift ? YnOptions.Y : YnOptions.N,
      minimumPurchaseQuantityYn: product?.isMinimumPurchaseQuantity ? YnOptions.Y : YnOptions.N,
      maximumPurchaseQuantityYn: product?.isMaximumPurchaseQuantity ? YnOptions.Y : YnOptions.N,
      maximumPurchaseQuantity: parseInt(product?.maximumPurchaseQuantity),
      minimumPurchaseQuantity: parseInt(product?.minimumPurchaseQuantity),
      excludedCompanyYn: product?.customerRegistration ? YnOptions.Y : YnOptions.N,
      lastProductSalesStatusCode: product?.selectStatusSell?.value,

      productReqeustKey: product?.productRequestKey ?? '',
      productReqeustCode: product?.productCode ?? ''
    }

    if (type) {
      preparedData = {
        ...preparedData,
        boTempKeyWordList: product?.productKeywords?.map((it) => ({
          productReqeustKey: product?.productRequestKey,
          keywordName: it
        })),
        boTempExpsrExclEntList: product?.customerKeywords.map((it) => ({
          customerKey: parseInt(it.split('(')[1]),
          productReqeustKey: product?.productRequestKey
        })),
        productProcessRequestType: type ?? '',
        operationSystmType: type ? OperationSystemEnum.BACK_OFFICE : '',
        productRequestTempYn: type ? YnOptions.N : ''
      }
    } else {
      preparedData = {
        ...preparedData,
        boKeyWordList: product?.productKeywords.map((it) => ({ modifiedBy: null, productKey: product?.key, keywordName: it })),
        boExpsrExclEntList: product?.customerKeywords.map((it) => ({
          customerKey: parseInt(it.split('(')[1]),
          productKey: product?.key
        }))
      }
    }
    return removeEmptyObjectProperties(preparedData)
  }
}
export class ProductTicketDetailInfoRequestConverter {
  static from(product: ProductItemDetailDisplayInfoModel): ProductExhibitionInfoFormModel {
    return {
      exhibitionStatus: product?.displayYn === YnOptions.Y,
      devices:
        product?.exposureChannel === productExhibitionChanel.all_channel
          ? productExhibitionChanelList.all_channel
          : product?.exposureChannel === productExhibitionChanel.pc
            ? productExhibitionChanelList.pc
            : product?.exposureChannel === productExhibitionChanel.mobile
              ? productExhibitionChanelList.mobile
              : [],
      productStatus: product?.displayEndDateTime,
      startTime: product?.displayStartDateTime,
      endTime: product?.displayEndDateTime,
      selectFirst: undefined,
      selectSecond: undefined,
      selectThird: undefined,
      exhibitionCategories: product?.boItemDspCategoryList.map((it) => it?.displayCategoryPathName || ''),
      radioGroupCategories: 0,
      md: product?.chargeMdKey?.toString(),
      productKey: product?.productKey,
      standardCategoryId: product?.standardCategoryId,
      boItemDspCategoryList: product?.boItemDspCategoryList,
      lastProductProgressStatusCode: product?.lastProductProgressStatusCode,
      productRequestKey: product?.productRequestKey,
      productCode: product?.productCode
    }
  }
  static fromDataToRequest(product: ProductExhibitionInfoFormModel): ProductItemDisplayManageModel {
    let originalChanel = ''
    if (product?.devices.length === 2) {
      originalChanel = productExhibitionChanel.all_channel
    } else if (product?.devices.length === 1 && product?.devices[0] === productExhibitionChanelList.pc[0]) {
      originalChanel = productExhibitionChanel.pc
    } else {
      originalChanel = productExhibitionChanel.mobile
    }
    const displayCategory = product?.boItemDspCategoryList?.find((it, id) => id === product?.radioGroupCategories)?.displayCategoryIdDepth3
    const previousList: ProductDisplayCategoryModel[] = product?.boItemDspCategoryList
      ? product?.boItemDspCategoryList.map((it, id) => {
          return {
            modifiedBy: null,
            displayCategoryId: displayCategory || it.displayCategoryId,
            productKey: product?.productKey,
            representativeDisplayCategoryYn: product?.radioGroupCategories === id ? YnOptions.Y : YnOptions.N
          }
        })
      : []
    const displayList = product?.boItemDspCategoryList ? [...previousList] : []
    const standardCategory = product?.boItemDspCategoryList?.find((it, id) => id === product?.radioGroupCategories)?.standardCategoryId

    return {
      modifiedBy: null,
      productKey: product?.productKey,
      displayYn: product?.exhibitionStatus ? YnOptions.Y : YnOptions.N,
      exposureChannel: originalChanel,
      displayStartDateTime: formatDateToISOString(new Date(product?.startTime)),
      displayEndDateTime: formatDateToISOString(new Date(product?.endTime)),
      chargeMdKey: isNaN(parseInt(product?.md)) ? parseInt(product?.md.split('(')[1]) : parseInt(product?.md.toString()),
      standardCategoryId: standardCategory ?? product?.standardCategoryId,
      boItemDspCategoryInsertList: displayList,
      lastProductProgressStatusCode: product?.lastProductProgressStatusCode,
      productRequestKey: product?.productRequestKey?.toString(),
      productCode: product?.productCode
    }
  }
}

export class ProductTicketRequestDetailInfoRequestConverter {
  static from(product: ProductItemRequestDetailDisplayInfoModel): ProductExhibitionInfoFormModel {
    return {
      exhibitionStatus: product?.displayYn === YnOptions.Y,
      devices:
        product?.exposureChannel === productExhibitionChanel.all_channel
          ? productExhibitionChanelList.all_channel
          : product?.exposureChannel === productExhibitionChanel.pc
            ? productExhibitionChanelList.pc
            : product?.exposureChannel === productExhibitionChanel.mobile
              ? productExhibitionChanelList.mobile
              : [],
      // productStatus: product?.displayEndDateTime,
      startTime: product?.displayStartDateTime,
      endTime: product?.displayEndDateTime,
      selectFirst: undefined,
      selectSecond: undefined,
      selectThird: undefined,
      exhibitionCategories: product?.boTempItemDspCategoryList.map((it) => it.displayCategoryPathName || ''),
      radioGroupCategories: 0,
      md: product?.chargeMdKey?.toString(),
      productKey: product?.productKey,
      lastProductProgressStatusCode: product?.lastProductProgressStatusCode,
      productRequestKey: product?.productReqeustKey?.toString(),
      standardCategoryId: product?.standardCategoryId,
      boItemDspCategoryList: product?.boTempItemDspCategoryList
    }
  }
  static fromDataToRequest(product: ProductExhibitionInfoFormModel): ProductRequestItemDisplayManageModel {
    let originalChanel = ''
    if (product?.devices.length === 2) {
      originalChanel = productExhibitionChanel.all_channel
    } else if (product?.devices.length === 1 && product?.devices[0] === productExhibitionChanelList.pc[0]) {
      originalChanel = productExhibitionChanel.pc
    } else {
      originalChanel = productExhibitionChanel.mobile
    }

    const displayCategory = product?.boItemDspCategoryList?.find((it, id) => id === product?.radioGroupCategories)?.displayCategoryIdDepth3
    const standardCategory = product?.boItemDspCategoryList?.find((it, id) => id === product?.radioGroupCategories)?.standardCategoryId

    const previousList: ProductDisplayCategoryModel[] = product?.boItemDspCategoryList
      ? product?.boItemDspCategoryList.map((it, id) => {
          return {
            modifiedBy: null,
            displayCategoryId: displayCategory || it.displayCategoryId,
            productKey: product?.productKey,
            representativeDisplayCategoryYn: product?.radioGroupCategories === id ? YnOptions.Y : YnOptions.N
          }
        })
      : []
    const displayList = product?.boItemDspCategoryList ? [...previousList] : []

    return {
      modifiedBy: null,
      productKey: product?.productKey,
      displayYn: product?.exhibitionStatus ? YnOptions.Y : YnOptions.N,
      exposureChannel: originalChanel,
      displayStartDateTime: formatDateToISOString(new Date(product?.startTime)),
      displayEndDateTime: formatDateToISOString(new Date(product?.endTime)),
      chargeMdKey: isNaN(parseInt(product?.md)) ? parseInt(product?.md.split('(')[1]) : parseInt(product?.md.toString()),
      standardCategoryId: standardCategory ?? product?.standardCategoryId,
      boTempItemDspCategoryInsertList: displayList
    }
  }
}
export class ProductTicketSalesResponseConverter {
  static toCoupon(product: OrderCouponPromotionModel): ProductSalesCouponPromotionDataModel {
    return {
      id: product?.couponKey,
      name: product?.couponName,
      fixedRate: product?.couponBenefitType,
      fixedAmount: product?.benefitSettingValue,
      discountPrice: product?.discountedPrice
    }
  }
  static toPromotion(product: ProductSalesListModel): ProductSalesDiscountPromotionDataModel {
    return {
      id: product?.discountPromotionId,
      name: product?.discountPromotionName,
      price: product?.salePrice,
      discountPrice: product?.productDiscountAmount,
      discountRate: ((product?.productDiscountAmount / product?.salePrice) * 100).toFixed(2)
    }
  }
  static toSavingsPromotion(product: OrderSavingsPromotionModel): ProductSalesSavingPromotionDataModel {
    return {
      id: product?.rewardPointKey,
      name: product?.rewardPointName,
      semen: product?.benefitType,
      fixedRate: product?.benefitValue,
      expectedSavings: product?.maxSavingAmount
    }
  }
}
