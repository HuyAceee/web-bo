import { YnOptions } from '@/models'
import { ExhibitionApplyChannelType } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonModel'

export interface ExhibitionBannerGroupModalModalProps {
  onCancel?: () => void
  onSelect?: () => void
  bannerGroupKey?: string
}

export interface ExhibitionBannerGroupDetailModel {
  bannerGroupKey: string
  bannerGroupName: string
  bannerGroupUseYn: string
  applyChannelType: string
  createdByName: string
  createdDate: string
  lastModifiedByName: string
  lastModifiedDate: string
}

export interface ExhibitionBannerExcludeCustomerModel {
  id?: number
  excludeCustomerKey?: number
  customerKey?: number
  customerName: string
  lastContractStatusCode?: string
  lastContractStatusName?: string
  customerUseYn?: string
}


export const exhibitionBannerGroupUseYnType = [
  { label: '사용', value: YnOptions.Y },
  { label: '미사용', value: YnOptions.N }
]

export const exhibitionBannerApplyChannelType = [
  { label: '전체', value: ExhibitionApplyChannelType.ALL },
  { label: 'PC', value: ExhibitionApplyChannelType.PC },
  { label: '모바일', value: ExhibitionApplyChannelType.MOBILE }
]

export const exhibitionGnbBannerModalTableHeaderConfig = [
  { header: 'No.', field: 'no', class: 'wf_m-w-50' },
  { header: '고객사코드', field: 'customerKey', class: 'wf_m-w-200' },
  { header: '고객사', field: 'customerName', class: 'wf_m-w-300' },
  { header: '고객사 계약상태', field: 'lastContractStatusName', class: 'wf_m-w-300' },
  { header: '고객사 상태', field: 'customerUseYn', class: 'wf_m-w-300' },
  { header: '삭제', field: 'action', class: 'wf_m-w-200' }
]
