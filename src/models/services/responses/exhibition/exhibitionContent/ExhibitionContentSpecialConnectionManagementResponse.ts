import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { YnOptions } from '@/models/common'
import { ExhibitionContentSpecialConnectionManagementPopupModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionManagementModel'
export type ExhibitionContentSpecialConnectionDetailModelResponse = BaseModelResponse<ExhibitionContentSpecialConnectionManagementPopupModel>
export type ExhibitionContentSpecialConnectionDetailWithExcludeCustomerModelResponse = BaseModelResponse<
  {
    customerKey?: string | number
  }[]
>
export type ExhibitionContentSpecialConnectionDetailWithKeywordModelResponse = BaseModelResponse<{ keywordName?: string }[]>
export type ExhibitionContentSpecialConnectionDetailWithCouponKeyModelResponse = BaseModelResponse<{ couponKey?: string | number }[]>
export type ExhibitionContentSpecialConnectionDetailWithCornerKeyModelResponse = BaseModelResponse<
  {
    exhibitionCornerKey?: string | number
    exhibitionKey?: string | number
    cornerName?: YnOptions
    displayStartDate?: string
    displayStartTime?: string
    displayEndDate?: string
    displayEndTime?: string
    lastModifiedByName?: string
    lastModifiedDate?: string
  }[]
>
