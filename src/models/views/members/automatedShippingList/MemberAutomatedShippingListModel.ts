import { DataTableContainerConfigModel } from '@/models'

export const memberAutomatedShippingHeaderTableFirstConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'number',
    class: 'wf_m-w-64 '
  },
  {
    header: '발송코드',
    field: 'code',
    class: 'wf_m-w-80 '
  },
  {
    header: '발송구분',
    field: 'type',
    class: 'wf_m-w-80 '
  },
  {
    header: '발송템플릿',
    field: 'pattern',
    class: 'wf_m-w-100 '
  },
  {
    header: '사용여부',
    field: 'isUse',
    class: 'wf_m-w-80 '
  },
  {
    header: '템플릿 제목',
    field: 'templateTitle',
    class: 'wf_m-w-120 '
  },
  {
    header: '템플릿 내용',
    field: 'templateContent',
    class: 'wf_m-w-250 '
  },
  {
    header: '발신번호/채널',
    field: 'callNumberOrChannel',
    class: 'wf_m-w-168_33 '
  },
  {
    header: '발송건수',
    field: 'numShipment',
    class: 'wf_m-w-100 '
  }
]

export const memberAutomatedShippingHeaderTableSecondConfig: DataTableContainerConfigModel[] = [
  {
    header: '발송형태',
    field: 'shippingType',
    class: 'wf_m-w-80 '
  },
  {
    header: '앱푸시발송',
    field: 'appPushSend',
    class: 'wf_m-w-100 '
  },
  {
    header: '발송방법',
    field: 'shippingMethod',
    class: 'wf_m-w-100 '
  }
]

export const memberAutomatedShippingHeaderTableThirdConfig: DataTableContainerConfigModel[] = [
  {
    header: '발송일시',
    field: 'deliveryDateTime',
    class: 'wf_m-w-200 '
  },
  {
    header: '등록일시',
    field: 'registrationDateTime',
    class: 'wf_m-w-200 '
  },
  {
    header: '등록자',
    field: 'registrant',
    class: 'wf_m-w-140 '
  },
  {
    header: '수정일시',
    field: 'modificationDate',
    class: 'wf_m-w-200 '
  },

  {
    header: '수정자',
    field: 'modifier',
    class: 'wf_m-w-140-not-important '
  }
]

export interface MemberAutomatedShippingDataTableModel {
  id: string
  number: string
  code: string
  type: string
  pattern: string
  isUse: string
  templateTitle: string
  templateContent: string
  callNumberOrChannel: string
  numShipment: string
  shippingStatusSuccess: string
  shippingStatusFailure: string
  shippingType: string
  appPushSend: string
  shippingMethod: string
  deliveryResult?: string
  deliveryDateTime: string
  registrationDateTime: string
  registrant: string
  modificationDate: string
  modifier: string
}

export interface MemberAutomatedShippingFormModel {}
