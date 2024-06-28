import { DataTableContainerConfigModel } from '@/models'

export interface MemberPointPaymentDataTableModel {
  index: string
  useKey: number
  foMemberKey: number
  customerKey: number
  pointKey: number
  historyKey: number
  useKind: {
    code: string
    title: string
  }
  pointName: string
  pointAmount: number
  processContents: string
  processDate: string
  useValidDate: {
    startDate: string
    endDate: string
  }
  pointBalance: number
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}

export interface MemberPointUsageDataTableModel {
  index: string
  useKey: number
  foMemberKey: number
  customerKey: number
  pointKey: number
  historyKey: number
  order: {
    orderKey: number
    productClass: {
      code: string
      title: string
    }
  }
  useKind: {
    code: string
    title: string
  }
  pointName: string
  pointAmount: number
  processDate: string
  useValidDate: {
    startDate: string
  }
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}

export const memberHeaderFieldTableMemberListPointPaymentDetailConfig: DataTableContainerConfigModel[] = [
  { header: 'No.', field: 'index', class: 'wf_m-w-50' },
  { header: '구부', field: 'bend', class: 'wf_m-w-150' },
  { header: '복지포인트 코드', field: 'pointKey', class: 'wf_m-w-250' },
  { header: '포인트', field: 'pointAmount', class: 'wf_m-w-150' },
  { header: '복지포인트 명', field: 'pointName', class: 'wf_m-w-150' },
  { header: '유효기간', field: 'expirationPeriod', class: 'wf_m-w-300' },
  { header: '등록자', field: 'registrant', class: 'wf_m-w-150' },
  { header: '등록일시', field: 'registrationDateTime', class: 'wf_m-w-200' }
]

export const memberHeaderFieldTableMemberListPointUsageDetailConfig: DataTableContainerConfigModel[] = [
  { header: 'No.', field: 'index', class: 'wf_m-w-50' },
  { header: '구부', field: 'division', class: 'wf_m-w-150' },
  { header: '복지포인트 코드', field: 'pointKey', class: 'wf_m-w-250' },
  { header: '포인트', field: 'pointAmount', class: 'wf_m-w-150' },
  { header: '복지포인트 명', field: 'pointName', class: 'wf_m-w-150' },
  { header: '주문 코드', field: 'orderKey', class: 'wf_m-w-300' },
  { header: '등록자', field: 'registrant', class: 'wf_m-w-150' },
  { header: '등록일시', field: 'registrationDateTime', class: 'wf_m-w-200' }
]

export const memberExportPointPaymentHeaderName = ['No.', '구부', '복지포인트 코드', '포인트', '복지포인트 명', '유효기간', '등록자', '등록일시']

export const memberExportPointUsageHeaderName = ['No.', '구부', '복지포인트 코드', '포인트', '복지포인트 명', '유효기간', '등록자', '등록일시']

export enum MemberPointDetailWelfarePointUseKindEnum {
  ALLOCATED = 'ALLOCATED',
  ADJUSTED = 'ADJUSTED',
  DEDUCTED = 'DEDUCTED'
}
