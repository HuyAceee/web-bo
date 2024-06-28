import { BaseApi } from '../BaseApi'
import {
  DeliverySearchProductSearchRequest,
  ProductSearchProductSearchRequest
} from '@/models/services/requests/delivery/modal/DeliverySearchProductRequest'
import { DeliverySearchProductResponse } from '@/models/services/responses/delivery/DeliverySearchProductResponse'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { ProductSearchProductTableModel } from '@/models/views/products/modal/ProductSearchProductModalModel'
import { DeliverySearchProductTableModel } from '@/models/views/delivery/modal/DeliverySearchProductModel'

export class DeliverySearchProductApi extends BaseApi {
  constructor() {
    super('shop')
  }

  async search(params: DeliverySearchProductSearchRequest): Promise<DataTablePaginationResponseModel<DeliverySearchProductTableModel>> {
    const { data, page } = await this.get('bo/item/product-list-popup', params)
    const resData = {
      data: data.map((it: DeliverySearchProductResponse) => {
        return {
          id: it.productKey,
          ...it
        }
      }),
      totalItems: page.totalCount
    }
    return Promise.resolve(resData)
  }

  async searchProduct(params: ProductSearchProductSearchRequest): Promise<DataTablePaginationResponseModel<ProductSearchProductTableModel>> {
    const { data, page } = await this.get('bo/item/product-list-popup', params)
    const resData = {
      data: data.map((it: DeliverySearchProductResponse, index: number) => {
        const no = index + 1 + (params.pageNum - 1) * params.rowSize
        return {
          id: it.productKey,
          no: no,
          ...it
        }
      }),
      totalItems: page.totalCount
    }
    return Promise.resolve(resData)
  }
}

export const deliverySearchProductApi = new DeliverySearchProductApi()
