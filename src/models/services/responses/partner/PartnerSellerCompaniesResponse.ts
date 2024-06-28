import { PartnerBankAccountInfoModel, PartnerBasicContractInfoModel, PartnerPermissionsModel } from "@/models/views/partner/PartnerSellerContractDetailModel";
import { BaseModelResponse } from "../BaseModelResponse";
import { PartnerSalesCategoryModel } from "../../../views/partner/PartnerSellerContractDetailModel";

export interface PartnerBasicContractInfoResponse extends BaseModelResponse<PartnerBasicContractInfoModel> {}
export interface PartnerSalesCategoryResponse extends BaseModelResponse<PartnerSalesCategoryModel[]> {}
export interface PartnerPermissionsResponse extends BaseModelResponse<PartnerPermissionsModel> {}
export interface PartnerBankAccountInfoResponse extends BaseModelResponse<PartnerBankAccountInfoModel> {}
export interface PartnerCheckBankAccountResponse extends BaseModelResponse<{isExist: boolean}> {}