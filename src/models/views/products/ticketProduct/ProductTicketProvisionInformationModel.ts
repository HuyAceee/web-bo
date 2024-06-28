import { YnOptions } from '@/models'

export interface ProductTicketProvisionInformationItemModel {
  infoProvisionKey: number
  item: string
  description: string
  order: number
}

export interface ProductTicketProvisionInformationModel {
  data: ProductTicketProvisionInformationItemModel[]
  categoryId: string
  inputType: string
  productKey: string
  lastProductProgressStatusCode?: string
}

export const productTicketProvisionBaseParams = {
  data: { productReqeustKey: 13 },
  category: {
    productKey: 1,
    productCode: '1000000000001',
    displayYn: YnOptions.Y,
    exposureChannel: '01',
    exposureChannelName: '전체',
    displayStartDateTime: '2023-12-20T00:00:00',
    displayEndDateTime: '2023-12-25T00:00:00',
    chargeMdKey: 1,
    standardCategoryId: 'SC3DE027',
    standardCategoryIdDepth1: 'SC1DE003',
    standardCategoryIdDepth2: 'SC2DE009',
    standardCategoryIdDepth3: 'SC3DE027',
    boItemDspCategoryList: []
  }
}
