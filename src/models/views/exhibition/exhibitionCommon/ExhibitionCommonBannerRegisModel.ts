import { GenericOptionType, YnOptions } from '@/models/common'
import { ExhibitionGnbLinkType } from '../modal/ExhibitionCornerConnectionModalModel'

export interface ExhibitionCommonBannerRegisPopupConfig {
  type?: 'register' | 'modify'
}

export interface ExhibitionCommonBannerRegisPopupProps {
  data?: ExhibitionCommonBannerRegisPopupModel
  config?: ExhibitionCommonBannerRegisPopupConfig
}
export interface ExhibitionCommonBannerRegisPopupEmits {
  (e: 'callback'): void
}
export interface ExhibitionCommonBannerRegisPopupModel {
  bannerGroupKey?: string
  bannerGroupName?: string
  bannerKey?: string
  bannerName?: string
  bannerOrderType?: string
  displayYn?: YnOptions
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
  applyChannelType?: string
  commonBannerCount?: number
  pcBannerCount?: number
  mobileBannerCount?: number
  bannerDisplayCreateRequestList: ExhibitionCommonBannerDisplayCreateRequestModel[]
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}

export interface ExhibitionCommonBannerDisplayCreateRequestModel {
  bannerDisplayOrder?: string
  imagePathName?: string
  imageName?: string
  imageUseYn?: YnOptions
  imageAltName?: string
  imageDeleteYn?: YnOptions
  imageTextUseYn?: YnOptions
  imageTextName?: string
  colorHexaUseYn?: YnOptions
  colorHexaValue?: string
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
  bannerContents?: string
}

export enum exhibitionBannerOrderType {
  ORDER = 'order',
  RANDOM = 'random'
}

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

export const exhibitionBannerOrderOptions: GenericOptionType<string>[] = [
  {
    label: '전시 순서',
    value: exhibitionBannerOrderType.ORDER
  },
  {
    label: '랜덤',
    value: exhibitionBannerOrderType.RANDOM
  }
]

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
