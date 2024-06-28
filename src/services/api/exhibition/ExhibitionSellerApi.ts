import { BaseApi } from "@/services/api/BaseApi";

class ExhibitionSellerApi extends BaseApi {
  constructor() {
    super('shop/bo/display/seller-exhibition')
  }

  async uploadFile(file: any) {
    const data = new FormData()
    data.append('file', file)
    return this.postMultipart('detail/file:upload', data, {}, false)
  }
}

export const exhibitionSellerApi = new ExhibitionSellerApi()