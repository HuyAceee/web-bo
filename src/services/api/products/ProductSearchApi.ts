import { MockProductSearchTableData } from '@/assets/mockData'
import { BaseApi } from '../BaseApi'
import { ProductSearchRequest } from '@/models/services/requests/products/common/ProductSearchRequest'
import { ProductSearchResponse } from '@/models/services/responses/common/ProductSearchResponse'

export class ProductSearchApi extends BaseApi {
  getProducts(request: ProductSearchRequest) {
    return new Promise<ProductSearchResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          items.push({
            ...MockProductSearchTableData,
            id: MockProductSearchTableData.id + i + 1,
            code: MockProductSearchTableData.code + i.toString()
          })
        }
        resolve({
          totalItems: request.totalItems ?? 1234,
          data: items
        })
      })
    })
  }
}

export const productSearchApi = new ProductSearchApi()
