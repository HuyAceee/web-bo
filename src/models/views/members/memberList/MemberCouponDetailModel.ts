import { DataTableContainerConfigModel } from '@/models'
export interface MemberCouponDetailDataTableModel {
  index: string
  memberCouponKey: number;
  couponKey: number;
  couponName: string;
  couponType: string;
  couponIssueType: string
  benefitValue: number;
  usedAmount: number;
  usedDate: string;
  useStatus: string;
  productClassification: string
  orderKey: number;
  audit: {
    registerKey: number;
    registerId: string;
    registerName: string;
    registeredDate: string;
    modifierKey: number;
    modifierId: string;
    modifierName: string;
    modifiedDate: string;
  };
}

export const memberHeaderFieldTableMemberListCouponDetailConfig: DataTableContainerConfigModel[] = [
  { header: 'No.', field: 'index', class: 'wf_m-w-50' },
  { header: '쿠폰코드', field: 'couponKey', class: 'wf_m-w-120 wf-text_link wf_text-sub-02 wf_flex wf_justify-center wf-pointer' },
  { header: '쿠폰명', field: 'couponName', class: 'wf_m-w-150' },
  { header: '쿠폰유형', field: 'couponType', class: 'wf_m-w-80' },
  { header: '할인금액', field: 'benefitValue', class: 'wf_m-w-80' },
  { header: '사용금액', field: 'usedAmount', class: 'wf_m-w-80' },
  { header: '사용일시', field: 'usedDate', class: 'wf_m-w-200' },
  { header: '사용여부', field: 'useStatus', class: 'wf_m-w-80' },
  { header: '주문번호', field: 'orderKey', class: 'wf_m-w-150 wf-text_link wf_text-sub-02 wf_flex wf_justify-center wf-pointer' },
  { header: '등록자', field: 'registrant', class: 'wf_m-w-150' },
  { header: '등록일시', field: 'registrationDateTime', class: 'wf_m-w-50' }
]

export const memberExportCouponDetailHeaderName = [
  'No.',
  '쿠폰코드',
  '쿠폰명',
  '쿠폰유형',
  '할인금액',
  '사용금액',
  '사용일시',
  '사용여부',
  '주문번호',
  '등록자',
  '등록일시'
]

export const MemberCouponDetailUseStatusEnum = [
  { label: '사용', value: 'USD' },
  { label: '미사용', value: 'UUD' },
  { label: '기간만료', value: 'EXP' },
]
export const MemberCouponDetailTypes = [
  { label: '상품', value: 'PRD' },
  { label: '장바구니', value: 'CRT' },
  { label: '무료배송', value: 'FSP' },
]

export enum MemberCouponDetailIssueEnum {
  DIRECT = 'DIR',
  EVENT = 'EVT',
  AUTO = 'AUT'
}

export enum MemberCouponDetailProductClassificationEnum {
  TICKET = '01',
  DELIVERY = '02'
}
