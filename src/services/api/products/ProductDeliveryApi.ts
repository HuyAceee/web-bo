import { MockDataDeliveryListTable, MockApprovalProductListTable } from '@/assets/mockData'
import { BaseApi } from '../BaseApi'
import { ProductDeliveryApprovalListRequest } from '@/models/services/requests/products/deliveryProduct/ProductDeliveryApprovalRequest'
import { ProductDeliveryListRequest } from '@/models/services/requests/products/deliveryProduct/ProductDeliveryListRequest'
import { ProductDeliveryApprovalListResponse } from '@/models/services/responses/products/deliveryProduct/ProductDeliveryApprovalResponse'
import { ProductDeliveryListResponse } from '@/models/services/responses/products/deliveryProduct/ProductDeliveryListResponse'

class ProductDeliveryApi extends BaseApi {
  getProductApproveDeliveryList(request: ProductDeliveryApprovalListRequest) {
    return new Promise<ProductDeliveryApprovalListResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockApprovalProductListTable,
            id: index,
            product_code: `${MockApprovalProductListTable.product_code}${index}`
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }
  getProductDeliveryList(request: ProductDeliveryListRequest) {
    return new Promise<ProductDeliveryListResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataDeliveryListTable,
            id: index,
            product_code: `${MockDataDeliveryListTable.product_code}${index}`
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }
}

export const productDeliveryApi = new ProductDeliveryApi()
