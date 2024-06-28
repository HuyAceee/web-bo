import { GenericOptionType, MergeColsTableConfigType, YnOptions } from '@/models/common'
import { ExhibitionGnbLinkType } from '../modal/ExhibitionCornerConnectionModalModel'

export interface ExhibitionCommonWindowRegistrationPopupConfig {
  type?: 'register' | 'modify'
}
export interface ExhibitionCommonWindowRegistrationPopupProps {
  data?: ExhibitionCommonWindowRegistrationPopupModel
  config?: ExhibitionCommonWindowRegistrationPopupConfig
}

export interface ExhibitionCommonWindowRegistrationPopupEmits {
  (e: 'callback'): void
}

export interface ExhibitionCommonWindowRegistrationPopupModel {
  //form basic
  popupKey?: string
  popupName?: string
  displayYn?: YnOptions
  applyChannelType?: string
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
  popupAttributeType?: string
  commonPopupCount?: number
  pcPopupCount?: number
  mobilePopupCount?: number
  nonDisplayPeriodType?: string
  popupFormType?: string
  //missing Application screen field`
  excludeCustomerCreateRequestList?: {
    customerKey?: string | number
    [key: string]: any
  }[]
  // content form popup
  popupDisplayCreateRequestList: ExhibitionCommonPopupDisplayCreateRequestModel[]
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}

export interface ExhibitionCommonPopupDisplayCreateRequestModel {
  imagePathName?: string
  imageName?: string
  imageAltName?: string
  popupDisplayOrder?: string
  applyChannelType?: string
  imageDeleteYn?: YnOptions
  colorHexaUseYn?: string
  colorHexaValue?: string
  mainTitleContents?: string
  subTitleContents?: string
  linkType?: ExhibitionGnbLinkType
  linkUrl?: string
  linkExhibitionKey?: string
  linkEventKey?: string
  linkProductKey?: string
  linkPromotionKey?: string
  linkExhibitionName?: string
  linkEventName?: string
  linkProductName?: string
  linkPromotionName?: string
}

export enum exhibitionNatureType {
  IMAGE = 'image',
  IMAGE_TEXT = 'imageText',
  ORDER = 'order',
  RANDOM = 'random'
}

export enum exhibitionNonDisplayPeriodType {
  DAY = 'day',
  WEEK = 'week',
  CONTINUE = 'continue',
  UNUSED = 'unused'
}

export const exhibitionStatusOptions: GenericOptionType<string>[] = [
  {
    label: '전시',
    value: YnOptions.Y
  },
  {
    label: '비전시',
    value: YnOptions.N
  }
]

export enum ExhibitionApplicationChannelType {
  ALL = 'all',
  PC = 'pc',
  MO = 'mo'
}

export enum ExhibitionSelectOptionsType {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

export const exhibitionPlatformOptions: GenericOptionType<string>[] = [
  {
    label: '전체',
    value: ExhibitionApplicationChannelType.ALL
  },
  {
    label: 'PC',
    value: ExhibitionApplicationChannelType.PC
  },
  {
    label: '모바일',
    value: ExhibitionApplicationChannelType.MO
  }
]

export const exhibitionNatureOptions: GenericOptionType<string>[] = [
  {
    label: '이미지',
    value: exhibitionNatureType.IMAGE
  },
  {
    label: '이미지+텍스트',
    value: exhibitionNatureType.IMAGE_TEXT
  }
]

export const nonExhibitionPeriod: GenericOptionType<string>[] = [
  {
    label: '하루',
    value: exhibitionNonDisplayPeriodType.DAY
  },
  {
    label: '일주일',
    value: exhibitionNonDisplayPeriodType.WEEK
  },
  {
    label: '다시보지않기',
    value: exhibitionNonDisplayPeriodType.CONTINUE
  },
  {
    label: '미사용',
    value: exhibitionNonDisplayPeriodType.UNUSED
  }
]

export const exhibitionExposureOptions: GenericOptionType<string>[] = [
  {
    label: '순번 노출',
    value: exhibitionNatureType.ORDER
  },
  {
    label: '랜덤 노출',
    value: exhibitionNatureType.RANDOM
  }
]

export const exhibitionTotalPopup = [
  {
    label: '1',
    value: ExhibitionSelectOptionsType.ONE
  },
  {
    label: '2',
    value: ExhibitionSelectOptionsType.TWO
  },
  {
    label: '3',
    value: ExhibitionSelectOptionsType.THREE
  },
  {
    label: '4',
    value: ExhibitionSelectOptionsType.FOUR
  },
  {
    label: '5',
    value: ExhibitionSelectOptionsType.FIVE
  }
]

export const exhibitionCommonWindowRegistrationTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'no',
    header: 'No.',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'customerKey',
    header: '고객사코드',
    required: false,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'customerName',
    header: '고객사',
    required: false,
    class: 'wf_col-200',
    children: []
  },
  {
    field: 'contractStatus',
    header: '고객사 계약상태',
    required: false,
    class: 'wf_col-300',
    children: []
  },
  {
    field: 'customerStatus',
    header: '고객사 상태',
    required: false,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'delete',
    header: '삭제',
    required: false,
    class: 'wf_col-120',
    children: []
  }
]
