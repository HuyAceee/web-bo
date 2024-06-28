export interface ProductTicketStdCategoryRequest {
  allFlag?: string
  chargeMdKey?: string
}

export interface ProductTicketStdCategoryChildRequest {
  allFlag?: string
  upperStandardCategoryId?: string
}

export interface ProductTicketStandardCategoryListRequest {
  standardCategoryId: string
}
