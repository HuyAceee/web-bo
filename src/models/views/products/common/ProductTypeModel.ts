export const PRODUCT_STATUS_ENUM = {
  PRODUCT_REGISTRATION_IN_PROGRESS: '01',
  APPROVAL_PENDING: '02',
  APPROVAL_WITHDRAWN: '03',
  APPROVAL_COMPLETED: '04',
  APPROVAL_REJECTED: '05',
  MODIFICATION_APPROVAL_PENDING: '06',
  MODIFICATION_APPROVAL_WITHDRAWN: '07',
  MODIFICATION_APPROVAL_COMPLETED: '08',
  MODIFICATION_APPROVAL_REJECTED: '09',
  ON_SALE: '01'
}

export const PRODUCT_STATUS = {
  sold_out: '품절',
  sale: '판매중',
  refuse_approval: '승인 거부',
  approval: '승인됨'
}

export const productApprovalStatus = {
  registration: '상품등록중',
  awaitingApproval: '승인대기',
  approvalWithdrawal: '승인철회',
  approvalCompleted: '승인완료',
  rejectedApproval: '승인반려'
}

export const productBaseInfoType = {
  delivery: 'DELIVERY',
  ticket: 'TICKET',
  approval_delivery: 'APPROVAL_DELIVERY',
  approval_ticket: 'APPROVAL_TICKET'
}

export enum ProductClassification {
  TICKET = '01',
  DELIVERY = '02'
}

export enum ProductAttachFileType {
  IMAGE = '01',
  MOV = '02'
}
