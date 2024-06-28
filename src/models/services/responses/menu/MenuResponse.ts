import { WelfareMenuItemModel, WelfareMenuFavoriteModel } from '@/models/uikit/WelfareMenu'
import { BaseModelResponse } from '../BaseModelResponse'

export interface WelfareMenuItemResponse extends BaseModelResponse<WelfareMenuItemModel[]> {}
export interface WelfareMenuFavoriteItemResponse extends BaseModelResponse<WelfareMenuFavoriteModel[]> {}
