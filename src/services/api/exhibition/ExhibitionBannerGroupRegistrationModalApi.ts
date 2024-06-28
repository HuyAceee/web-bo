import { BaseModelErrorResponse, BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

import { BaseApi } from '@/services/api/BaseApi'
import {
  ExhibitionBannerExcludeCustomerModel,
  ExhibitionBannerGroupDetailModel
} from '@/models/views/exhibition/modal/ExhibitionBannerGroupRegistrationModalModel'
import { ExhibitionBannerDetailModalRequest } from '@/models/services/requests/exhibition/ExhiibitionGnbGroupRequest'

class ExhibitionBannerGroupRegistrationModalApi extends BaseApi {
  constructor() {
    super('shop/bo')
  }

  getDetail(bannerGroupKey: string): Promise<BaseModelResponse<ExhibitionBannerGroupDetailModel>> {
    return this.get(`display/banner/group/detail/${bannerGroupKey}`)
  }

  getExcludeDetail(bannerGroupKey: string): Promise<BaseModelResponse<ExhibitionBannerExcludeCustomerModel[]>> {
    return this.get(`display/banner/group/detail/exclude-customer/${bannerGroupKey}`)
  }

  putBannerDetail(body: ExhibitionBannerDetailModalRequest): Promise<BaseModelErrorResponse> {
    return this.put(`display/banner/group/detail:modify`, body)
  }

  postBannerDetail(body: ExhibitionBannerDetailModalRequest): Promise<BaseModelErrorResponse> {
    return this.post(`display/banner/group/detail:register`, body)
  }
}

export const exhibitionBannerGroupRegistrationModalApi = new ExhibitionBannerGroupRegistrationModalApi()
