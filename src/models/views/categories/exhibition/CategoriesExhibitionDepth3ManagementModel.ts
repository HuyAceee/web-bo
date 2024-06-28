import { categoriesExhibitionExposureYnOptions } from "./CategoriesExhibitionInDepth2CategoryModel"

export const categoriesExhibitionDepth3ManagementModelHeaderConfig = [
  {
    header: '카테고리명',
    field: 'displayCategoryName',
    class: 'wf_m-w-734 '
  },
  {
    header: '대표여부',
    field: 'representativeDisplayCategoryYn',
    class: 'wf_m-w-240 '
  }
]

export enum CategoriesExhibitionStatusModel {
  DISPLAY = 'Y',
  NOT_DISPLAY = 'N'
}

export const categoriesExhibitionStatusOptions = [
  {
    label: '전시',
    value: CategoriesExhibitionStatusModel.DISPLAY
  },
  {
    label: '비전시',
    value: CategoriesExhibitionStatusModel.NOT_DISPLAY
  }
]

export enum CategoriesExhibitionRegisterStatusModel {
  UN_REISTER = 'N',
  REGISTED = 'Y'
}

export const categoriesExhibitionRegisterStatusOptions = [
  {
    label: '등록',
    value: CategoriesExhibitionRegisterStatusModel.REGISTED
  },
  {
    label: '미등록',
    value: CategoriesExhibitionRegisterStatusModel.UN_REISTER
  }
]

export enum CategoriesExhibitionExternalInterfaceModel {
  EXTERNAL_INTERFACE = 'Y',
  DIRECT_INPUT = 'N'
}

export const categoriesExhibitionExternalInterfaceOptions = [
  {
    label: '외부연동',
    value: CategoriesExhibitionExternalInterfaceModel.EXTERNAL_INTERFACE
  },
  {
    label: '직접등록',
    value: CategoriesExhibitionExternalInterfaceModel.DIRECT_INPUT
  }
]

export enum CategoriesExhibitionProductClassificationModel {
  TICKET = '01',
  DELIVERY = '02'
}

export const categoriesExhibitionProductClassificationOptions = [
  { label: '배송형', value: CategoriesExhibitionProductClassificationModel.DELIVERY },
  { label: '티켓형', value: CategoriesExhibitionProductClassificationModel.TICKET }
]

export enum CategoriesExhibitionProductExposureChannelModel {
  ALL = '01',
  PC = '02',
  MOBILE = '03'
}

export const categoriesExhibitionProductExposureChannelOptions = [
  { label: '전체', value: CategoriesExhibitionProductExposureChannelModel.ALL },
  { label: 'PC', value: CategoriesExhibitionProductExposureChannelModel.PC },
  { label: '모바일 표시', value: CategoriesExhibitionProductExposureChannelModel.MOBILE }
]

export enum CategoriesExhibitionSaleStatusModel {
  ON_SALE = '01',
  TEMPORARILY_SUSPENDED = '02',
  TEMPORARILY_OUT_OF_STOCK = '03',
  OUT_OF_STOCK = '04',
  END_OF_SALE = '05'
}

export const categoriesExhibitionSaleStatusOptions = [
  { label: '판매중', value: CategoriesExhibitionSaleStatusModel.ON_SALE },
  { label: '판매일시중지', value: CategoriesExhibitionSaleStatusModel.TEMPORARILY_SUSPENDED },
  { label: '일시품절', value: CategoriesExhibitionSaleStatusModel.TEMPORARILY_OUT_OF_STOCK },
  { label: '품절', value: CategoriesExhibitionSaleStatusModel.OUT_OF_STOCK },
  { label: '판매종료', value: CategoriesExhibitionSaleStatusModel.END_OF_SALE }
]

export interface CategoryExhibitionDspCategoryProductListFormModel {
  displayCategoryId: string
}

export interface CategoryExhibitionDspCategoryDetailFormModel {
  displayCategoryName: string
  displayCategoryExposureYn?: CategoriesExhibitionStatusModel
  boDspCatExpsrExclEntInsertList?: string[]
  displayExcludedCompanyYn?: CategoriesExhibitionRegisterStatusModel
}

export interface CategorySearchRecordModel {
  code: number
  name: string
  id?: string | number
}

export interface CategoryExhibitionDspCategoryProductListModel {
  id?: string
  isSelected?: boolean
  isNew?: boolean
  productKey: number
  productCode: string
  productName: string
  displayCategoryProductKey: number
  displayCategoryId: string
  representativeDisplayCategoryYn: CategoriesExhibitionStatusModel
  productClassificationCode: CategoriesExhibitionProductClassificationModel
  productClassificationName: string
  productType: string
  productTypeName: string
  displayYn: string
  exposureChannel: string
  exposureChannelName: string
  salePrice: number
  productDiscountAmount: number
  lastProductSalesStatusCode: string
  lastProductSalesStatusName: string
  standardCategoryId: string
  standardCategoryPath: string
  displayCategoryPath: string
  sellerKey: number
  lowSellerKey: number
  brandId: string
  brandName: string
  productModelName: string
  createdYyyymmdd: string
  lastModifiedYyyymmdd: string
  saleStartYyyymmdd: string
  saleEndYyyymmdd: string
  createdBy: string
  createdByName: string
  lastModifiedBy: string
  lastModifiedByName: string
}

export const categoriesExhibitionDepth3ProductModelHeaderConfig = ({
  onClickProductKey,
  onClickSellerKey
}: {
  onClickProductKey: (value?: CategoryExhibitionDspCategoryProductListModel) => void
  onClickSellerKey: (value?: CategoryExhibitionDspCategoryProductListModel) => void
}) => [
  {
    header: '상품코드',
    field: 'productCode',
    class: 'wf_m-w-200 ',
    onClick: onClickProductKey
  },
  {
    header: '상품명',
    field: 'productName',
    class: 'wf_m-w-200 ',
    onClick: onClickProductKey
  },
  {
    header: '외부연동 여부',
    field: 'externalInterfaceYn',
    class: 'wf_m-w-200 ',
    convertEnumValue: categoriesExhibitionExternalInterfaceOptions
  },
  {
    header: '상품 구분',
    field: 'productClassificationName',
    class: 'wf_m-w-200 '
  },
  {
    header: '전시여부',
    field: 'displayYn',
    class: 'wf_m-w-200 ',
    convertEnumValue: categoriesExhibitionStatusOptions
  },
  {
    header: '노출채널',
    field: 'exposureChannelName',
    class: 'wf_m-w-200 '
  },
  {
    header: '판매가',
    field: 'salePrice',
    class: 'wf_m-w-200 '
  },
  {
    header: '즉시 할인가',
    field: 'productDiscountAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '판매상태',
    field: 'lastProductSalesStatusName',
    class: 'wf_m-w-200 '
  },
  {
    header: '표준 카테고리',
    field: 'standardCategoryPath',
    class: 'wf_m-w-200 '
  },
  {
    header: '전시 카테고리',
    field: 'displayCategoryPath',
    class: 'wf_m-w-200 '
  },
  {
    header: '대표 여부',
    field: 'representativeDisplayCategoryYn',
    class: 'wf_m-w-200 ',
    convertEnumValue: categoriesExhibitionExposureYnOptions
  },
  {
    header: '판매사',
    field: 'sellerKey',
    class: 'wf_m-w-200 ',
    onClick: onClickSellerKey
  },
  {
    header: '하위업체',
    field: 'lowSellerKey',
    class: 'wf_m-w-200 '
  },
  {
    header: '브랜드',
    field: 'brandId',
    class: 'wf_m-w-200 '
  },
  {
    header: '모델명',
    field: 'productModelName',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품등록일',
    field: 'createdYyyymmdd',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품수정일',
    field: 'lastModifiedYyyymmdd',
    class: 'wf_m-w-200 '
  },
  {
    header: '판매시작일',
    field: 'saleStartYyyymmdd',
    class: 'wf_m-w-200 '
  },
  {
    header: '판매종료일',
    field: 'saleEndYyyymmdd',
    class: 'wf_m-w-200 '
  },
  {
    header: 'MD',
    field: 'chargeMdKey',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품등록자',
    field: 'createdBy',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품수정자',
    field: 'lastModifiedBy',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품승인자',
    field: 'lastProductApprovedBy',
    class: 'wf_m-w-200 '
  }
]
