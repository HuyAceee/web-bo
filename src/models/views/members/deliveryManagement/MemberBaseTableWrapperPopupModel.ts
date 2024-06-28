export interface MemberBaseTableWrapperPopupModel {
  title?: string
  description?: string | any
  optionDistributeApplications?: boolean
  optionTypeMessage?: boolean
  optionMethodShipping?: boolean
  optionTargetMember?: boolean
  optionIsUsed?: boolean
  selectTypeDelivery?: string
  selectDeliveryTemplate?: string
  selectTypeDeliveryTemplate?: boolean
  createdBy?: string
  updatedBy?: string
  createdAt?: string
  updatedAt?: string
  deliveryDate?: string
}


export type MemberRowTableSideContentType = 'left' | 'right'

export const memberSelectTypeDeliveryConfig = [
  {
    label: '카카오',
    value: '1'
  },
  {
    label: '문자',
    value: '2'
  },
  {
    label: '앱푸시',
    value: '3'
  },
  {
    label: '이메일',
    value: '4'
  }
]

export const memberSelectDeliveryTemplateConfig = [
  { label: '회원', value: '1' },
  { label: '인증', value: '2' },
  { label: '약관', value: '3' },
  { label: '주문', value: '4' },
  { label: '입점사관리', value: '5' },
  { label: '기타', value: '6' }
]

export const memberOptionDistributeApplicationsConfig = [
  {
    label: 'Y',
    value: true
  },
  {
    label: 'N',
    value: false
  }
]

export const memberOptionTypeMessageConfig = [
  {
    label: '정보성',
    value: true
  },
  {
    label: '광고성',
    value: false
  }
]

export const memberOptionMethodShippingConfig = [
  {
    label: '즉시발송',
    value: true
  },
  {
    label: '예약발송',
    value: false
  }
]

export const memberOptionTargetMemberConfig = [
  {
    label: '전체회원',
    value: true
  },
  {
    label: '선택회원',
    value: false
  }
]

export const memberOptionIsUsedConfig = [
  {
    label: '사용',
    value: true
  },
  {
    label: '미사용',
    value: false
  }
]

export const memberOptionSelectTypeTemplateConfig = [
  {
    label: '선택',
    value: true
  },
  {
    label: '직접입력 ',
    value: false
  }
]
