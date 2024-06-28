export interface ProductTicketMoreInformationModel {
  image?: string
  description: string
  video?: string
  type?: string
  mobileDescription?: string
  productStatus?: string
  arrImage?: any
  productKey?: number
  detailChannel?: string
  arrFileApproval?: any
  productRequestKey?: number
  lastProductProgressStatusCode?: string 
}

export const productInitValueProductTicketMoreInformationModel: ProductTicketMoreInformationModel = {
  image: '',
  description: '',
  mobileDescription: '',
  video: '',
  type: '01'
}

export const productTicketEmptyItem = {
  id: 1,
  name: '',
  url: '',
  alt: '',
  key: 1,
  imageRepresentativeYn: '',
  isNewImg: ''
}

export enum  ProductTicketMoreInformationTypeDescription {
  ALL = '01',
  PC = '02'
}
export enum ProductTicketMoreInformationIsNewImg {
  NEW = 'NEW',
  OLD = 'OLD'
}