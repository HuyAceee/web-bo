import { GenericOptionType, YnOptions } from '@/models/common'
export interface ExhibitionSpecialConnectionFormBasicInfoProps {
  data?: ExhibitionSpecialConnectionFormBasicInfoModel
}

export enum ExhibitionStatusType {
  EXPECT = 'expect',
  ON = 'on',
  TERMINATE = 'terminate',
  END = 'end'
}

export enum ExhibitionType {
  DEFAULT = '',
  SHOP = 'shop',
  THEME = 'theme'
}

export enum ExhibitionFormType {
  TAB = 'tab',
  DROPDOWN = 'dropdown',
  BUTTON = 'button'
}

export interface ExhibitionSpecialConnectionFormBasicModels {
  id?: string
  customerCompanyKey?: string
  customer?: string
  customerContractStatus?: string
  customerStatus?: string
  action: any
  isSelected: boolean
}

export interface ExhibitionSpecialConnectionFormBasicInfoModel {
  exhibitionKey?: string
  exhibitionType?: ExhibitionType
  exhibitionStatusType?: ExhibitionStatusType
  exhibitionName?: string
  exhibitionContents?: string
  keywordCreateRequestList?: {
    keywordName?: string
  }[]
  chargeMdCode?: string
  displayYn?: YnOptions
  exhibitionPeriodUseYn?: YnOptions
  displayStartDate: string
  displayStartTime: string
  displayEndDate: string
  displayEndTime: string
  applyChannelAllYn?: YnOptions
  applyChannelPcYn?: YnOptions
  applyChannelMobileYn?: YnOptions
  applyChannelMobileWebYn?: YnOptions
  exhibitionFormAllYn?: YnOptions
  exhibitionFormType?: ExhibitionFormType
  terminateReasonContents?: string
  excludeCustomerCreateRequestList?: {
    customerKey?: string
    [key: string]: any
  }[]
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}

export const exhibitionDisplayStatusOptions: GenericOptionType<string>[] = [
  {
    label: '전시예정',
    value: ExhibitionStatusType.EXPECT
  },
  {
    label: '전시중',
    value: ExhibitionStatusType.ON
  },
  {
    label: '강제종료',
    value: ExhibitionStatusType.TERMINATE
  },
  {
    label: '기간종료',
    value: ExhibitionStatusType.END
  }
]

export const exhibitionSpecialExhibitionCategory: GenericOptionType<string>[] = [
  {
    label: '선택',
    value: ExhibitionType.DEFAULT
  },
  {
    label: '쇼핑',
    value: ExhibitionType.SHOP
  },
  {
    label: '테마샵',
    value: ExhibitionType.THEME
  }
]

export const exhibitionCategoryExposureTypeOptions: GenericOptionType<string>[] = [
  {
    label: '탭 가로형',
    value: ExhibitionFormType.TAB
  },
  {
    label: '드롭다운 메뉴형',
    value: ExhibitionFormType.DROPDOWN
  },
  {
    label: '버튼형',
    value: ExhibitionFormType.BUTTON
  }
]

export const exhibitionPlatformOptions: GenericOptionType<
  'applyChannelAllYn' | 'applyChannelPcYn' | 'applyChannelMobileYn' | 'applyChannelMobileWebYn'
>[] = [
  {
    label: '전체',
    value: 'applyChannelAllYn'
  },
  {
    label: 'PC',
    value: 'applyChannelPcYn'
  },
  {
    label: '모바일',
    value: 'applyChannelMobileYn'
  },
  {
    label: '모바일-웹',
    value: 'applyChannelMobileWebYn'
  }
]

export const exhibitionExposurePeriodOptions: GenericOptionType<string>[] = [
  {
    label: '전시',
    value: YnOptions.Y
  },
  {
    label: '비전시',
    value: YnOptions.N
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

export const exhibitionFullExposureDisplayOption: GenericOptionType<string>[] = [
  {
    label: 'Y',
    value: YnOptions.Y
  },
  {
    label: 'N',
    value: YnOptions.N
  }
]
