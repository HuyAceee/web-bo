import { BaseApi } from '@/services/api/BaseApi'

export class ExhibitionBrandListPopupApi extends BaseApi {
  constructor() {
    super('shop/bo/item')
  }

  async getBrandList(brandName: string) {
    return this.get('brand-list-popup', { brandName: brandName })
  }
}

export const exhibitionBrandListPopupApi = new ExhibitionBrandListPopupApi()
