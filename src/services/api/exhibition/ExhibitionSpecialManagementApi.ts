import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { BaseApi } from '../BaseApi'
import {
  ExhibitionSpecialEditListRequest,
  ExhibitionSpecialListRequest
} from '@/models/services/requests/exhibition/ExhibitionSpecialManagementListRequest'
import { ExhibitionSpecialManagementListFormModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialManagementModel'
import { ExhibitionSpecialManagementListResponse } from '@/models/services/responses/exhibition/ExhibitionSpecialManagementListResponse'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

class ExhibitionSpecialManagementApi extends BaseApi {
  constructor() {
    super('shop/bo/display')
  }

  getExhibitionSpecialList(request: ExhibitionSpecialListRequest & PaginationModelRequest) {
    return new Promise<ExhibitionSpecialManagementListResponse>((resolve, reject) => {
      this.get('exhibition/list', request)
        .then((res) => {
          resolve({
            totalItems: res?.page?.totalCount,
            data: res.data.map((item: ExhibitionSpecialManagementListFormModel) => {
              return { ...item, id: item.exhibitionKey }
            })
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  getExhibitionSellerSpecialList(request: ExhibitionSpecialListRequest & PaginationModelRequest) {
    return new Promise<ExhibitionSpecialManagementListResponse>((resolve, reject) => {
      this.get('seller-exhibition/list', request)
        .then((res) => {
          resolve({
            totalItems: res?.page?.totalCount,
            data: res.data.map((item: ExhibitionSpecialManagementListFormModel) => {
              return { ...item, id: item.exhibitionKey }
            })
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  putExhibition(modifyRequestList: ExhibitionSpecialEditListRequest[]): Promise<BaseModelErrorResponse> {
    return this.put('exhibition/list:modify', { modifyRequestList })
  }

  putSellerExhibition(modifyRequestList: ExhibitionSpecialEditListRequest[]): Promise<BaseModelErrorResponse> {
    return this.put('seller-exhibition/list:modify', { modifyRequestList })
  }

  deleteExhibition(deleteList: string[]): Promise<BaseModelErrorResponse> {
    return this.delete('exhibition/list:delete', { deleteList })
  }

  deleteSellerExhibition(deleteList: string[]): Promise<BaseModelErrorResponse> {
    return this.delete('seller-exhibition/list:delete', { deleteList })
  }
}

export const exhibitionSpecialManagementApi = new ExhibitionSpecialManagementApi()
