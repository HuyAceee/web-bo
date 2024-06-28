import { MergeColsTableConfigType, YnOptions } from '@/models/common'

export enum ExhibitionStatusType {
  EXPECT = 'expect',
  ON = 'on',
  TERMINATE = 'terminate',
  END = 'end'
}

export enum ExhibitionFormType {
  TAB = 'tab',
  DROPDOWN = 'dropdown',
  BUTTON = 'button'
}

export interface ExhibitionSellerSpecialConnectionMngtPopupProps {
  exhibitionKey?: string
}

export interface ExhibitionSellerSpecialConnectionMngtPopupModel {
  exhibitionKey: string
  sellerKey: string
  exhibitionType: string
  exhibitionName: string
  exhibitionContents: string
  chargeMdCode: string
  displayYn: string
  exhibitionPeriodUseYn: string
  applyChannelAllYn: string
  applyChannelPcYn: string
  applyChannelMobileYn: string
  applyChannelMobileWebYn: string
  exhibitionFormType: string
  exhibitionStatusType: string
  terminateReasonContents: string
  exhibitionRepresentativeType: string
  imagePathName: string
  imageName: string
  imageDeleteYn: string
  imageAltName: string
  mainTitleName1: string
  mainTitleName2: string
  subTitleName: string
  colorHexaUseYn: string
  colorHexaValue: string
  exhibitionVideoType: string
  videoPathName: string
  videoName: string
  videoDeleteYn: string
  videoAltName: string
  videoThumbnailPathName: string
  videoThumbnailName: string
  videoThumbnailDeleteYn: string
  videoThumbnailAltName: string
  youtubeUrl: string
  youtubeAltName: string
  htmlContents: string
  noticeDisplayYn: string
  noticeUseYn: string
  noticeContents: string
  marketingDisplayYn: YnOptions
  marketingBannerYn: YnOptions
  marketingCouponYn: YnOptions
  marketingImageCommonYn: YnOptions
  pcMarketingImagePathName: string
  pcMarketingImageName: string
  pcMarketingImageDeleteYn: string
  pcMarketingImageAltName: string
  pcMarketingImageLinkTypeCode: string
  pcMarketingImageLinkUrl: string
  pcMarketingImageLinkExhibitionKey: string
  pcMarketingImageLinkEventKey: string
  pcMarketingImageLinkProductKey: string
  pcMarketingImageLinkPromotionKey: string
  mobileMarketingImagePathName: string
  mobileMarketingImageName: string
  mobileMarketingImageDeleteYn: string
  mobileMarketingImageAltName: string
  mobileMarketingImageLinkTypeCode: string
  mobileMarketingImageLinkUrl: string
  mobileMarketingImageLinkExhibitionKey: string
  mobileMarketingImageLinkEventKey: string
  mobileMarketingImageLinkProductKey: string
  mobileMarketingImageLinkPromotionKey: string
  marketingCouponMainTitleName: string
  marketingCouponSubTitleName: string
  marketingCouponImagePathName: string
  marketingCouponImageName: string
  marketingCouponImageDeleteYn: string
  marketingCouponImageAltName: string
  marketingCouponImageLinkUrl: string
  bannerImageUseYn: string
  bannerImagePathName: string
  bannerImageName: string
  bannerImageDeleteYn: string
  bannerImageAltName: string
  mclassDisplayCategoryId: string
  displayStartDate: string
  displayStartTime: string
  displayEndDate: string
  displayEndTime: string
  chargeMdName: string
  createdByName: string
  createdDate: string
  lastModifiedByName: string
  lastModifiedDate: string
}

export interface ExhibitionSellerSpecialConnectionMngtAllFormPopupModel extends ExhibitionSellerSpecialConnectionMngtPopupModel {
  keywordCreateRequestList?: ExhibitionKeywordCreateRequestListModel[]
  cornerCreateRequestList?: ExhibitionCornerListModel[]
  cornerProductCreateRequestList?: ExhibitionCornerProductListModel[]
  couponCreateRequestList?: {
    couponKey?: string | number
  }[]
  // displayCategoryCreateRequestList: ExhibitionSellerDisplayCategory[]
}

export interface ExhibitionKeywordCreateRequestListModel {
  exhibitionKeywordKey?: string
  exhibitionKey?: string
  keywordName?: string
}

export interface ExhibitionConnectionFormBasicInfoModel {
  exhibitionKey: string
  sellerKey: string
  exhibitionType: string
  exhibitionStatusType: ExhibitionStatusType
  exhibitionName: string
  exhibitionContents: string
  keywordCreateRequestList: ExhibitionKeywordCreateRequestListModel[]
  chargeMdCode: string
  displayYn: YnOptions
  exhibitionPeriodUseYn: YnOptions
  displayStartDate: string
  displayStartTime: string
  displayEndDate: string
  displayEndTime: string
  applyChannelAllYn: YnOptions
  applyChannelPcYn: YnOptions
  applyChannelMobileYn: YnOptions
  applyChannelMobileWebYn: YnOptions
  exhibitionFormType: ExhibitionFormType
  terminateReasonContents: string
  createdByName: string
  createdDate: string
  lastModifiedByName: string
  lastModifiedDate: string
  exhibitionFormAllYn: YnOptions

  [key: string]: any
}

export interface ExhibitionConnectionFormBasicInfoProps<T> {
  data?: T | undefined
}

export enum ExhibitionRepresentativeType { // undefined type values
  IMAGE = 'image',
  IMAGE_TEXT = 'imageText',
  VOD = 'vod',
  HTML = 'html'
}

export enum ExhibitionRepresentativeVideoType { // undefined type values
  VOD = 'vod',
  YOUTUBE = 'youtube'
}

export interface ExhibitionConnectionFormRepresentativeImgModel {
  exhibitionRepresentativeType?: ExhibitionRepresentativeType
  imagePathName?: string //handle
  imageName?: string
  imageAltName?: string
  mainTitleName1?: string
  mainTitleName2?: string
  subTitleName?: string
  colorHexaUseYn?: YnOptions
  colorHexaValue?: string
  exhibitionVideoType?: string
  videoPathName?: string //handle
  videoName?: string
  videoAltName?: string
  videoThumbnailPathName?: string //handle
  videoThumbnailName?: string
  videoThumbnailAltName?: string
  youtubeUrl?: string
  youtubeAltName?: string
  htmlContents?: string
  noticeUseYn?: YnOptions
  noticeDisplayYn?: YnOptions
  noticeContents?: string
}

export enum ExhibitionConnectionSpecialModalType {
  seller = 'seller',
  special = 'special'
}

export interface ExhibitionConnectionFormRepresentativeImgProps<T> {
  data?: T
  config: ExhibitionConnectionSpecialModalType
}

export interface ExhibitionCornerListModel {
  id?: string
  exhibitionCornerKey: string
  exhibitionKey: string
  cornerName: string
  cornerDisplayOrder: string
  displayYn: string
  displayStartDate: string
  displayStartTime: string
  displayEndDate: string
  displayEndTime: string
  lastModifiedByName: string
  lastModifiedDate: string
}

export const exhibitionCornerListDefaultRow = {
  exhibitionCornerKey: '',
  exhibitionKey: '',
  cornerDisplayOrder: '999',
  cornerName: '',
  displayYn: YnOptions.Y,
  displayStartDate: '',
  displayStartTime: '',
  displayEndDate: '',
  displayEndTime: '',
  lastModifiedByName: '',
  lastModifiedDate: ''
}

export const exhibitionCornerProductListDefaultRow = {
  exhibitionCornerProductKey: '',
  exhibitionCornerKey: '',
  productKey: '',
  displayYn: YnOptions.Y,
  cornerProductDisplayOrder: '',
  productName: '',
  lastSaleStatusCode: '',
  lastSaleStatusName: '',
  productSalePrice: '',
  lastModifiedByName: '',
  lastModifiedDate: ''
}

export interface ExhibitionCornerProductListModel {
  id?: string
  exhibitionCornerProductKey: string
  exhibitionCornerKey: string
  productKey: string
  displayYn: string
  cornerProductDisplayOrder: string
  productName: string
  lastSaleStatusCode: string
  lastSaleStatusName: string
  productSalePrice: string
  lastModifiedByName: string
  lastModifiedDate: string
}

export interface ExhibitionSellerDisplayCategory {
  mclassDisplayCategoryId?: string
  mclassDisplayCategoryName?: string
}

export interface ExhibitionCornerTableModel {
  cornerCreateRequestList: ExhibitionCornerListModel[]
  cornerProductCreateRequestList: ExhibitionCornerProductListModel[]
}

export const exhibitionConnectionFormCategoryTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'no',
    header: 'No.',
    required: false,
    class: 'wf_col-56',
    children: []
  },
  {
    field: 'exhibitionCornerKey',
    header: '코너번호',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'cornerDisplayOrder',
    header: '전시순서',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'displayYn',
    header: '전시여부',
    required: true,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'cornerName',
    header: '코너명',
    required: true,
    class: 'wf_col-100',
    children: []
  },
  { field: 'displayStartDate', header: '시작일', required: true, class: 'wf_col-200' },
  { field: 'displayStartTime', header: '시작시간', required: true, class: 'wf_col-100' },
  { field: 'displayEndDate', header: '종료일', required: true, class: 'wf_col-200' },
  { field: 'displayEndTime', header: '종료시간', required: true, class: 'wf_col-100' },
  {
    field: 'lastModifiedByName',
    header: '수정자',
    required: false,
    class: 'wf_col-200',
    children: []
  },
  {
    field: 'lastModifiedDate',
    header: '수정일',
    required: false,
    class: 'wf_col-100',
    children: []
  }
]

export const exhibitionConnectionFormProductTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'no',
    header: 'No.',
    required: false,
    class: 'wf_col-56',
    children: []
  },
  {
    field: 'exhibitionCornerProductKey',
    header: '코너번호',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'cornerProductDisplayOrder',
    header: '전시순서',
    required: true,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'displayYn',
    header: '전시여부',
    required: true,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'productKey',
    header: '상품코드',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'productName',
    header: '상품명',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'lastSaleStatusName',
    header: '판매상태',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'productSalePrice',
    header: '판매가',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'lastModifiedByName',
    header: '수정자',
    required: false,
    class: 'wf_col-200',
    children: []
  },
  {
    field: 'lastModifiedDate',
    header: '수정일',
    required: false,
    class: 'wf_col-100',
    children: []
  }
]
