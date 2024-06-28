import { DataTableContainerConfigModel } from '@/models'

export const memberHeadersAcceptInformationTableWelfareConfig: DataTableContainerConfigModel[] = [
  {
    header: '선택 동의 항목',
    field: 'selectAgreeItem',
    class: 'wf_m-w-auto'
  },
  {
    header: '동의 여부',
    field: 'isAgree',
    class: 'wf_m-w-auto'
  },
  {
    header: '적용일',
    field: 'dateApplication',
    class: 'wf_m-w-auto'
  }
]

export const memberHeadersAcceptInformationTableWelfareMallConfig: DataTableContainerConfigModel[] = [
  {
    header: '판매사명',
    field: 'salesCompanyName',
    class: 'wf_m-w-auto'
  },
  {
    header: '구분',
    field: 'division',
    class: 'wf_m-w-auto'
  },
  {
    header: '동의여부',
    field: 'isAgree',
    class: 'wf_m-w-auto'
  },
  {
    header: '적용일',
    field: 'dateApplication',
    class: 'wf_m-w-auto'
  }
]

export const memberAgreeRadiosList = [
  { label: '동의', value: true },
  { label: '미동의', value: false }
]
