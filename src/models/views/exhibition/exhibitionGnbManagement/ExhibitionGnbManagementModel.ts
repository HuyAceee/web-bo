import { DataTableContainerConfigModel, YnOptions } from '@/models'
import { ExhibitionApplyChannelType, ExhibitionGnbLinkType } from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'
import { Ref } from 'vue'

export interface ExhibitionPostGnbGroupResponse {
  customerId: string
  displayOrder: number
  gnbGroupName: string
  gnbGroupType: string
  useYn: string
  applyChannelType: string
  displayYn: string
}

export interface ExhibitionPutGnbGroupResponse {
  gnbGroupKey: string
  displayOrder: number
  gnbGroupName: string
  gnbGroupType: string
  useYn: string
}

export enum ExhibitionGnbGroupType {
  MAIN = 'main',
  TIMEDEAL = 'timedeal',
  BEST = 'best',
  EVENT = 'event',
  PLANSHOP = 'planshop',
  THEME = 'theme'
}

export const ExhibitionGnbGroupTypeValue = [
  { label: '메인(홈)', value: ExhibitionGnbGroupType.MAIN },
  { label: '특가', value: ExhibitionGnbGroupType.TIMEDEAL },
  { label: '랭킹(베스트)', value: ExhibitionGnbGroupType.BEST },
  { label: '이벤트/쿠폰', value: ExhibitionGnbGroupType.EVENT },
  { label: '기획전', value: ExhibitionGnbGroupType.PLANSHOP },
  {
    label: '테마샵',
    value: ExhibitionGnbGroupType.THEME
  }
]

export const ExhibitionGnbGroupTypeUseYnValue = [
  { label: '사용', value: YnOptions.Y },
  { label: '미사용', value: YnOptions.N }
]

export const ExhibitionGnbGroupTypeApplicationChannelValue = [
  { label: '공통', value: ExhibitionApplyChannelType.COMMON },
  { label: 'PC', value: ExhibitionApplyChannelType.PC },
  { label: '모바일', value: ExhibitionApplyChannelType.MO }
]

export interface ExhibitionGnbLinkTypeColumnModel {
  data: ExhibitionGnbReservationTableModel
  index: number
}

export interface ExhibitionGnbLinkTypeProps {
  gnbGroupList: ExhibitionGnbReservationTableModel[]
  slotProps: ExhibitionGnbLinkTypeColumnModel
}

export interface ExhibitionGnbLinkTypeModel {
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

  [key: string]: any
}

export interface ExhibitionGnbLinkTypeField {
  linkType: string
  linkUrl: string
  linkExhibitionKey: string
  linkEventKey: string
  linkProductKey: string
  linkPromotionKey: string
  linkExhibitionName: string
  linkEventName: string
  linkProductName: string
}

export interface ExhibitionGnbLinkTypeChooseProps {
  index?: number
  data: ExhibitionGnbLinkTypeModel
  keyField?: ExhibitionGnbLinkTypeField
  classSelect?: any
}

export const ExhibitionGnbLinkTypeChooseDefaultKey = {
  linkType: 'linkType',
  linkUrl: 'linkUrl',
  linkExhibitionKey: 'linkExhibitionKey',
  linkEventKey: 'linkEventKey',
  linkProductKey: 'linkProductKey',
  linkPromotionKey: 'linkPromotionKey',
  linkExhibitionName: 'linkExhibitionName',
  linkEventName: 'linkEventName',
  linkProductName: 'linkProductName'
}

export const ExhibitionPcGnbLinkTypeChooseDefaultKey = {
  linkType: 'pcLinkType',
  linkUrl: 'pcLinkUrl',
  linkExhibitionKey: 'pcLinkExhibitionKey',
  linkEventKey: 'pcLinkEventKey',
  linkProductKey: 'pcLinkProductKey',
  linkPromotionKey: 'pcLinkPromotionKey',
  linkExhibitionName: 'pcLinkExhibitionName',
  linkEventName: 'pcLinkEventName',
  linkProductName: 'pcLinkProductName'
}

export const ExhibitionMobileGnbLinkTypeChooseDefaultKey = {
  linkType: 'mobileLinkType',
  linkUrl: 'mobileLinkUrl',
  linkExhibitionKey: 'mobileLinkExhibitionKey',
  linkEventKey: 'mobileLinkEventKey',
  linkProductKey: 'mobileLinkProductKey',
  linkPromotionKey: 'mobileLinkPromotionKey',
  linkExhibitionName: 'mobileLinkExhibitionName',
  linkEventName: 'mobileLinkEventName',
  linkProductName: 'mobileLinkProductName'
}

export interface ExhibitionGnbLinkTypeProps {
  gnbGroupList: ExhibitionGnbReservationTableModel[]
  slotProps: ExhibitionGnbLinkTypeColumnModel
}

export interface ExhibitionTextOptionKey {
  code: string
  name: string
}

export interface ExhibitionGnbReservationManagementProps {
  gnbGroupSelect: ExhibitionGnbGroupListTableModel | undefined
  typeGnbCustomer?: boolean
}

export interface ExhibitionGnbGroupListTableModel {
  rowNum: string
  gnbGroupKey: string
  customerId: string
  displayOrder: number
  gnbGroupName: string
  gnbGroupType: ExhibitionGnbGroupType | string
  useYn: string
  applyChannelType: ExhibitionApplyChannelType
  displayYn: string
  reservationYn: string
  lastModifiedDate: string
  gnbGroupTypeCurrent?: ExhibitionGnbGroupType | string

  [key: string]: any
}

export interface ExhibitionGnbReservationTableModel {
  id: string
  rowNum: string
  gnbDisplayKey: string
  gnbGroupKey: string
  displayYn: string
  displayStartDate: string
  displayStartTime?: string
  displayEndDate: string
  displayEndTime?: string
  mainTitleName: string
  linkType: ExhibitionGnbLinkType
  linkUrl: string
  linkExhibitionKey: string
  linkEventKey: string
  linkProductKey: string
  linkPromotionKey: string
  linkExhibitionName: string
  linkEventName: string
  linkProductName: string
  subTitleUseYn: string
  subTitleName: string
  createdByName: string
  createdDate: string
  lastModifiedByName: string
  lastModifiedDate: string

  [key: string]: any
}

export interface ExhibitionChooseDateTimeModel {
  displayStartDate: string
  displayStartTime?: string
  displayEndDate: string
  displayEndTime?: string

  [key: string]: any
}

export interface ExhibitionHandleChooseDateTimeParams {
  gnbGroupList: Ref<ExhibitionChooseDateTimeModel[]>
}

export interface ExhibitionGnbDataKeyModel {
  [key: string]: any
}

export const exhibitionGnbGroupManagementTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'rowNum',
    class: 'wf_m-w-50'
  },
  {
    header: '전시순서',
    field: 'displayOrder',
    class: 'wf_m-w-120'
  },
  {
    header: 'GNB',
    field: 'gnbGroupName',
    class: 'wf_m-w-120'
  },
  {
    header: 'GNB유형',
    field: 'gnbGroupType',
    class: 'wf_m-w-150'
  },
  {
    header: '사용여부',
    field: 'useYn',
    class: 'wf_m-w-120'
  },
  {
    header: '적용채널',
    field: 'applyChannelType',
    class: 'wf_m-w-120'
  },
  {
    header: '상위 카테고리 코드',
    field: 'gnbGroupKey',
    class: 'wf_m-w-180'
  },
  {
    header: '전시여부',
    field: 'displayYn',
    class: 'wf_m-w-120'
  },
  {
    header: '예약목록',
    field: 'reservationYn',
    class: 'wf_m-w-120'
  },
  {
    header: '업데이트 일시',
    field: 'lastModifiedDate',
    class: 'wf_m-w-120'
  }
]

export const exhibitionGnbReservationGroupManagementTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'rowNum',
    class: 'wf_m-w-50'
  },
  {
    header: 'select',
    field: 'select',
    class: 'wf_m-w-50'
  },
  {
    header: '전시여부',
    field: 'displayYn',
    class: 'wf_m-w-120'
  },
  {
    header: '전시시작일',
    field: 'displayStartDate',
    class: 'wf_m-w-200'
  },
  {
    header: '시작시간',
    field: 'displayStartTime',
    class: 'wf_m-w-120'
  },
  {
    header: '전시종료일',
    field: 'displayEndDate',
    class: 'wf_m-w-200'
  },
  {
    header: '종료시간',
    field: 'displayEndTime',
    class: 'wf_m-w-120'
  },
  {
    header: '메인타이틀',
    field: 'mainTitleName',
    class: 'wf_m-w-200'
  },
  {
    header: '랜딩 url',
    field: 'linkUrl',
    class: 'wf_m-w-400'
  },
  {
    header: '서브옵션',
    field: 'subTitleUseYn',
    class: 'wf_m-w-120'
  },
  {
    header: '서브타이틀',
    field: 'subTitleName',
    class: 'wf_m-w-200'
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_m-w-200'
  },
  {
    header: '등록일',
    field: 'createdDate',
    class: 'wf_m-w-200'
  },
  {
    header: '수정자',
    field: 'lastModifiedByName',
    class: 'wf_m-w-200'
  },
  {
    header: '수정일',
    field: 'lastModifiedDate',
    class: 'wf_m-w-200'
  }
]

export const exhibitionDefaultValueGnbGroup = {
  rowNum: '',
  gnbGroupKey: '',
  customerId: 'common',
  displayOrder: 999,
  gnbGroupName: '',
  gnbGroupType: '',
  useYn: YnOptions.Y,
  applyChannelType: ExhibitionApplyChannelType.COMMON,
  displayYn: '전시',
  reservationYn: YnOptions.N,
  lastModifiedDate: ''
}

export const exhibitionDefaultValueGnbReservationGroup = {
  id: '',
  rowNum: '',
  gnbDisplayKey: '',
  gnbGroupKey: '',
  displayYn: YnOptions.Y,
  displayStartDate: '9999-12-31',
  displayStartTime: '00:00',
  displayEndDate: '9999-12-31',
  displayEndTime: '00:00',
  mainTitleName: '',
  linkType: ExhibitionGnbLinkType.NO_LINK,
  linkUrl: '',
  linkExhibitionKey: '',
  linkEventKey: '',
  linkProductKey: '',
  linkPromotionKey: '',
  linkExhibitionName: '',
  linkEventName: '',
  linkProductName: '',
  linkPromotionName: '',
  subTitleUseYn: YnOptions.N,
  subTitleName: '',
  createdByName: '',
  createdDate: '',
  lastModifiedByName: '',
  lastModifiedDate: ''
}

export const exhibitionGnbDisplayYn = [
  {
    label: '사용',
    value: YnOptions.Y
  },
  {
    label: '비전시',
    value: YnOptions.N
  }
]

export const exhibitionGnbSubTitleUseYn = [
  {
    label: '사용안함',
    value: YnOptions.N
  },
  {
    label: '사용함',
    value: YnOptions.Y
  }
]
