import { BaseApi } from '@/services/api/BaseApi'
import { ProductDeliveryDetailsDataRow, ProductProvisionInputMethodType } from '@/models'
import {
  ProductTicketApprovalProvisionInformationResponse,
  ProductTicketBasicProvisionResponse,
  ProductTicketProvisionInformationResponse
} from '@/models/services/responses/products/ticket/ProductTicketProvisionInformationResponse'
import { ProductTicketUpdateSuccessResponse } from '@/models/services/responses/products/ticket/ProductTicketMoreInformationResponse'

class ProductTicketProvisionInformationApi extends BaseApi {
  constructor() {
    super('shop/bo')
  }

  async getBasicProvision(standardCategoryId: string): Promise<any> {
    const { data, ...otherData } = await this.get('item/info-pvsn-ancm-basic', { standardCategoryId })
    const resData: ProductTicketBasicProvisionResponse = {
      data: data.map((item: any) => ({
        infoProvisionKey: item.infoProvisionKey,
        order: '',
        item: item.infoProvisionContents,
        description: ''
      })),
      ...otherData
    }
    return resData
  }

  async getDetailInformation(params: any): Promise<any> {
    const { data, ...otherData } = await this.get('item/item-detail-info-pvsn-ancm', params)
    const resData: ProductTicketProvisionInformationResponse = {
      categoryId: data.standardCategoryId,
      inputType: data.infoProvisionInputType,
      productKey: data.productKey,
      data: data.boItemInfoPvsnAncmList.map((item: any) => {
        return {
          infoProvisionKey: item.infoProvisionKey,
          order: item.productInfoProvisionSortingOrder,
          item: item.productInfoProvisionItemContents,
          description: item.productInfoProvisionContents
        }
      }),
      ...otherData
    }
    return resData
  }

  getDetailApprovalInformation(params: any) {
    return new Promise<ProductTicketProvisionInformationResponse>((resolve, reject) => {
      this.get('item/item-request-detail-info-pvsn-ancm', params, false)
        .then((res) => {
          const { data } = res
          const resData: ProductTicketApprovalProvisionInformationResponse = {
            categoryId: data.standardCategoryId,
            inputType: data.infoProvisionInputType,
            productKey: data.productKey,
            productReqeustKey: data.productReqeustKey,
            lastProductProgressStatusCode: data.lastProductProgressStatusCode,
            data: data.boTempItemInfoPvsnAncmList.map((item: any) => {
              return {
                infoProvisionKey: item.infoProvisionKey,
                order: item.productInfoProvisionSortingOrder,
                item: item.productInfoProvisionItemContents,
                description: item.productInfoProvisionContents
              }
            })
          }
          resolve(resData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async putRequestProvision(data: any): Promise<ProductTicketUpdateSuccessResponse> {
    const reqData = {
      standardCategoryId: data.selectedCategory,
      infoProvisionInputType: data.radioSelectInputDataOption,
      productReqeustKey: data.productReqeustKey,
      boTempItemInfoPvsnAncmInsertList: data.dataList.map((item: ProductDeliveryDetailsDataRow) => ({
        infoProvisionKey: item.infoProvisionKey,
        productInfoProvisionContents: item.description,
        productInfoProvisionItemContents: item.item,
        productInfoProvisionSortingOrder: item.order
      }))
    }
    return this.put('item/item-request-pvsn-ancm-manage', reqData)
  }

  async putProvision(data: any): Promise<ProductTicketUpdateSuccessResponse> {
    const reqData = {
      standardCategoryId: data.selectedCategory,
      infoProvisionInputType: data.radioSelectInputDataOption,
      productKey: data.productKey,
      boItemInfoPvsnAncmList: data.dataList.map((item: ProductDeliveryDetailsDataRow) => ({
        infoProvisionKey: item.infoProvisionKey,
        productInfoProvisionContents: item.description,
        productInfoProvisionItemContents: item.item,
        productInfoProvisionSortingOrder: item.order
      }))
    }
    return this.put('item/item-pvsn-ancm-manage', reqData)
  }

  async putApprovalProvision(data: any): Promise<ProductTicketUpdateSuccessResponse> {
    const reqData = {
      productReqeustKey: data.productReqeustKey,
      productKey: data.productKey,
      standardCategoryId: data.selectedCategory,
      infoProvisionInputType: data.radioSelectInputDataOption,
      boTempItemInfoPvsnAncmInsertList: data.dataList.map((item: ProductDeliveryDetailsDataRow, index: number) => ({
        infoProvisionKey: data.radioSelectInputDataOption === ProductProvisionInputMethodType.FETCH ? index + 1 : item.infoProvisionKey,
        productInfoProvisionContents: item.description,
        productInfoProvisionItemContents: item.item,
        productInfoProvisionSortingOrder: item.order
      }))
    }
    return this.put('item/item-request-pvsn-ancm-manage', reqData)
  }
}

export const productTicketProvisionInformationApi = new ProductTicketProvisionInformationApi()
