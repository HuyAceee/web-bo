import { BaseModelResponse } from "../BaseModelResponse"

export interface PartnerRegistrationExistNumberModel {
  isExist: boolean
}

export interface RegistrationBusinessClassificationsItemModel {
  bizItemCode?: number,
  bizItemName?: string
}

export interface RegistrationBusinessClassificationsModel {
  bizCategoryCode?: number,
  bizCategoryName?: string,
  bizItemList?: RegistrationBusinessClassificationsItemModel[]
}

export interface PartnerRegistrationExistNumberResponse extends BaseModelResponse<PartnerRegistrationExistNumberModel> { }
export interface PartnerRegistrationBusinessClassificationsResponse extends BaseModelResponse<RegistrationBusinessClassificationsModel[]> { }
