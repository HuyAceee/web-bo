export type ICustomerRegistrationResponse = {
  code: string
  message: string
}

export type BizCategoryItem = {
  bizCategoryName: string
  bizCategoryCode: string
  bizItemList: BizItem[]
}

export type BizItem = {
  bizItemCode: string
  bizItemName: string
}

export type ExistsRequest = {
  isExist: boolean
}

export type CommonCompanyListResponse<K> = ICustomerRegistrationResponse & {
  data: Array<K>
}

export type CommonCompanyItemResponse<K> = ICustomerRegistrationResponse & {
  data: K
}

export type UploadRequest = {
  attachmentType: string
  attachmentId: string
  attachmentFileOriginName: string
  attachmentFileSize: number
}
