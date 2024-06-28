import { WelfareMenuItemResponse, WelfareMenuFavoriteItemResponse } from '@/models/services/responses/menu/MenuResponse'
import { BaseApi } from '../BaseApi'

class MenuApi extends BaseApi {
  constructor() {
    super('member')
  }

  getMenuData(): Promise<WelfareMenuItemResponse> {
    return this.get('bo/menu')
  }

  getFavorite(): Promise<WelfareMenuFavoriteItemResponse> {
    return this.get('bo/menu/bookmarks')
  }

  postFavorite(id: number) {
    return this.post(`bo/menu/bookmarks/${id}`)
  }

  deleteFavorite(id: number) {
    return this.delete(`bo/menu/bookmarks/${id}`)
  }
}

export const menuApi = new MenuApi()
