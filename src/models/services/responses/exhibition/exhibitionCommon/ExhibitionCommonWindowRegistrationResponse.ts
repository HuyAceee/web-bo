import { YnOptions } from '@/models/common'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { ExhibitionCommonWindowRegistrationPopupModel } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonWindowRegistrationModel'

export type ExhibitionCommonWindowRegistrationDetailModelResponse = BaseModelResponse<ExhibitionCommonWindowRegistrationPopupModel>
export type ExhibitionCommonWindowRegistrationDetailExcludeCustomerModelResponse = BaseModelResponse<
  {
    customerKey?: number | string
  }[]
>
export type ExhibitionCommonWindowRegistrationDetailDisplayPopupModelResponse = BaseModelResponse<
  {
    popupDisplayOrder?: string
    applyChannelType?: string
    imageDeleteYn?: YnOptions
    colorHexaUseYn?: string
    colorHexaValue?: string
    imagePathName?: string
    imageName?: string
    imageAltName?: string
    linkUrl?: string
    linkUseYn?: string
    mainTitleContents?: string
    subTitleContents?: string
  }[]
>
