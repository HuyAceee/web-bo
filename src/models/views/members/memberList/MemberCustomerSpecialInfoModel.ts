export interface MemberCustomerSpecialInfoModel {
  id: string
  detail: string
  registrant: string
  registerId: string
  registerName: string
  registrationDate: string
  isSelected?: boolean
}

export interface MemberCustomerSpecialInfoExportModel {
  memo?: string
  register?: string
  time?: string
}

export const memberExportRemarkHeaderName = ['내용', '등록자', '등록일시자']
