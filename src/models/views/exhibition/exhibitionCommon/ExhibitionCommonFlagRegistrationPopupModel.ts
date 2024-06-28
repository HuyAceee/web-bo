import { WelfareRadioProps, YnOptions } from '@/models'
import { ExhibitionFlagDetailRegisterRequest } from '@/models/services/requests/exhibition/ExhibitionFlagRegistrationPopupRequest'

export interface ExhibitionCommonFlagRegistrationPopupProps {
  onClose: () => void
  flagKey?: string
  onRegister?: () => void
}

export const exhibitionCommonFlagRegistrationTargetProductTypeOptions: WelfareRadioProps[] = [
  { label: '전체', value: 'all' },
  { label: '배송형 상품', value: '02' },
  { label: '티켓형 상품', value: '01' }
]

export const exhibitionCommonFlagRegistrationDisplayYnOption: WelfareRadioProps[] = [
  { label: '전체', value: null },
  { label: '전시', value: YnOptions.Y },
  { label: '비전시', value: YnOptions.N }
]

export const exhibitionCommonFlagRegistrationFlagTypeOption: WelfareRadioProps[] = [
  { label: '엠블럼', value: 'emblem' },
  { label: '프로모션', value: 'promotion' }
]

export const exhibitionCommonFlagRegistrationExhibitionManagementTableConfig = [
  {
    header: '상품코드',
    field: 'productKey',
    class: 'wf_m-w-150'
  },
  {
    header: '상품명',
    field: 'productName',
    class: 'wf_m-w-150'
  },
  {
    header: '판매상태',
    field: 'lastSaleStatusName',
    class: 'wf_m-w-150'
  },
  {
    header: '전시여부',
    field: 'productDisplayYn',
    class: 'wf_m-w-150'
  },
  {
    header: '판매사',
    field: 'sellerName',
    class: 'wf_m-w-150'
  },
  {
    header: '판매사코드',
    field: 'sellerKey',
    class: 'wf_m-w-150'
  },
  {
    header: '담당MD',
    field: 'chargeMdName',
    class: 'wf_m-w-150'
  },
  {
    header: '상품수정자',
    field: 'lastModifiedByName',
    class: 'wf_m-w-150'
  },
  {
    header: '상품수정일',
    field: 'lastModifiedYyyymmdd',
    class: 'wf_m-w-150'
  }
]

export interface ExhibitionCommonFlagRegistrationExhibitionManagementTableModel {
  id: string
  isSelected: boolean
  productKey: string
  productName: string
  lastSaleStatusName: string
  productDisplayYn: string
  sellerKey: string
  sellerName: string
  chargeMdName: string
  lastModifiedByName: string
  lastModifiedYyyymmdd: string
}

export interface ExhibitionCommonFlagRegistrationFormModel extends ExhibitionFlagDetailRegisterRequest {
  categoryDepthId1?: string
  categoryDepthId2?: string
  categoryDepthId3?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
  flagKey?: number
}
