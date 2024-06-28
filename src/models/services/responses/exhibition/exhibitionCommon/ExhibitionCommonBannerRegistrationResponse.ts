import { ExhibitionCommonBannerRegisPopupModel } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerRegisModel'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { YnOptions } from '@/models/common'

export type ExhibitionCommonBannerRegistrationDetailModelResponse = BaseModelResponse<ExhibitionCommonBannerRegisPopupModel>
export type ExhibitionCommonBannerRegistrationDetailDisplayBannerModelResponse = BaseModelResponse<
  {
    bannerDisplayOrder?: string
    imageUseYn?: YnOptions
    imagePathName?: string
    imageName?: string
    imageDeleteYn?: YnOptions
    imageAltName?: string
    imageTextUseYn?: YnOptions
    imageTextName?: string
    colorHexaUseYn?: YnOptions
    colorHexaValue?: string
    linkUseYn?: YnOptions
    linkUrl?: string
    bannerContents?: string
  }[]
>
