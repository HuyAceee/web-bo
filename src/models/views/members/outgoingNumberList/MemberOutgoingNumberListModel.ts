import { DataTableContainerConfigModel } from '@/models'

export const memberOutgoingNumberHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'number',
    class: 'wf_m-w-80 '
  },
  {
    header: '발송구분',
    field: 'type',
    class: 'wf_m-w-200 '
  },
  {
    header: '소유자',
    field: 'owner',
    class: 'wf_m-w-231 '
  },
  {
    header: '발신번호',
    field: 'callerId',
    class: 'wf_m-w-231 '
  },
  {
    header: '승인여부',
    field: 'approval',
    class: 'wf_m-w-200 '
  },
  {
    header: '최근 업데이트 일시',
    field: 'lastUpdateDate',
    class: 'wf_m-w-280'
  }
]

export interface MemberOutgoingNumberDataTableModel {
  id: string
  number: string
  type: string
  owner: string
  callerId: string
  approval: string
  lastUpdateDate: string
  isSelected: boolean
}

export interface MemberOutgoingNumberListFormModel {
  callingNumber: string
  fromDate: string
  toDate: string
}

export const memberOutgoingNumberListButtonDateConfig = [
  {
    label: '오늘',
    class: 'wf_w-55',
    value: 0
  },
  {
    label: '7일',
    class: 'wf_w-55',
    value: 6
  },
  {
    label: '1개월',
    class: 'wf_w-55',
    value: 29
  },
  {
    label: '3개월',
    class: 'wf_w-55',
    value: 89
  },
  {
    label: '1년',
    class: 'wf_w-55',
    value: 364
  },
  {
    label: '직접입력',
    class: 'wf_w-55',
    value: -1
  }
]
