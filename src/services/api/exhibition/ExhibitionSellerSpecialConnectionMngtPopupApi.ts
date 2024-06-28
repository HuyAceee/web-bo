import { BaseApi } from '@/services/api/BaseApi'
import { BaseModelErrorResponse, BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionCornerListModel,
  ExhibitionCornerProductListModel,
  ExhibitionKeywordCreateRequestListModel,
  ExhibitionSellerDisplayCategory,
  ExhibitionSellerSpecialConnectionMngtAllFormPopupModel,
  ExhibitionSellerSpecialConnectionMngtPopupModel
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { ExhibitionContentSpecialConnectionDetailWithCouponKeyModelResponse } from '@/models/services/responses/exhibition/exhibitionContent/ExhibitionContentSpecialConnectionManagementResponse'

class ExhibitionSellerSpecialConnectionMngtPopupApi extends BaseApi {
  constructor() {
    super('shop/bo')
  }

  getDetail(exhibitionKey: string): Promise<BaseModelResponse<ExhibitionSellerSpecialConnectionMngtPopupModel>> {
    return this.get(`display/seller-exhibition/detail/${exhibitionKey}`)
  }

  getKeywordList(exhibitionKey: string): Promise<BaseModelResponse<ExhibitionKeywordCreateRequestListModel[]>> {
    return this.get(`display/seller-exhibition/detail/keyword/${exhibitionKey}`)
  }

  getCornerList(exhibitionKey: string): Promise<BaseModelResponse<ExhibitionCornerListModel[]>> {
    return this.get(`display/seller-exhibition/detail/corner/${exhibitionKey}`)
  }

  getCornerProductList(exhibitionKey: string): Promise<BaseModelResponse<ExhibitionCornerProductListModel[]>> {
    return this.get(`display/seller-exhibition/detail/corner-product/${exhibitionKey}`)
  }

  getCouponList(exhibitionKey: string): Promise<ExhibitionContentSpecialConnectionDetailWithCouponKeyModelResponse> {
    return this.get(`display/seller-exhibition/detail/coupon/${exhibitionKey}`)
  }

  getDisplayList(exhibitionKey: string): Promise<BaseModelResponse<ExhibitionSellerDisplayCategory[]>> {
    return this.get(`display/seller-exhibition/detail/display-category/${exhibitionKey}`)
  }

  putData(data: ExhibitionSellerSpecialConnectionMngtAllFormPopupModel): Promise<BaseModelErrorResponse> {
    return this.put(`display/seller-exhibition/detail:modify`, data)
  }

  postData(data: ExhibitionSellerSpecialConnectionMngtAllFormPopupModel): Promise<BaseModelErrorResponse> {
    return this.post(`display/seller-exhibition/detail:register`, data)
  }
}

export const exhibitionSellerSpecialConnectionMngtPopupApi = new ExhibitionSellerSpecialConnectionMngtPopupApi()
