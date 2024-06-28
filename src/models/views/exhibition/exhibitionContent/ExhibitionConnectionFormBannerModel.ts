import { YnOptions } from '@/models/common'
import { ExhibitionConnectionSpecialModalType } from './ExhibitionConnectionMngtModel'

export interface ExhibitionConnectionFormBannerProps {
  data?: ExhibitionConnectionFormBannerModel
  config?: ExhibitionConnectionSpecialModalType
  options?: any[]
}

export interface ExhibitionConnectionFormBannerDepthModel {
  mclassDisplayCategoryId?: string | number
}

export interface ExhibitionConnectionFormBannerModel {
  bannerImagePathName?: string
  bannerImageName?: string
  bannerImageAltName?: string
  bannerImageUseYn?: YnOptions
  bannerImageDeleteYn?: string //??
  mclassDisplayCategoryId?: string
}
