import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionCommonBannerRegistrationDetailDisplayBannerModelResponse,
  ExhibitionCommonBannerRegistrationDetailModelResponse
} from '@/models/services/responses/exhibition/exhibitionCommon/ExhibitionCommonBannerRegistrationResponse'
import { ExhibitionCommonBannerRegisPopupModel } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerRegisModel'
import { BaseApi } from '@/services/api/BaseApi'
class ExhibitionCommonBannerRegisApi extends BaseApi {
  constructor() {
    super('shop/bo/display/banner')
  }
  //get data
  async getDetail(keywordKey: string | number): Promise<ExhibitionCommonBannerRegistrationDetailModelResponse> {
    const resData = await this.get(`detail/${keywordKey}`)
    return Promise.resolve(resData)
  }
  // get data banner display
  async getDetailDisplayBanner(keywordKey: string | number): Promise<ExhibitionCommonBannerRegistrationDetailDisplayBannerModelResponse> {
    const { data, code, message } = await this.get(`detail/display/${keywordKey}`)
    const resData = {
      code,
      message,
      data
    }
    return Promise.resolve(resData)
  }
  // register
  async register(data: ExhibitionCommonBannerRegisPopupModel): Promise<BaseModelErrorResponse> {
    return this.post('detail:register', data, {}, false)
  }
  // update
  async update(data: ExhibitionCommonBannerRegisPopupModel): Promise<BaseModelErrorResponse> {
    return this.put('detail:modify', data, {}, false)
  }
  //upload file
  async uploadFile(file: any) {
    const data = new FormData()
    data.append('file', file)
    return this.postMultipart('detail/file:upload', data, {}, false)
  }
}

export const exhibitionCommonBannerRegisApi = new ExhibitionCommonBannerRegisApi()
