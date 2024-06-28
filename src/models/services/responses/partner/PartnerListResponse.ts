import { YnOptions } from "@/models/common"
import { DataTablePaginationResponseModel } from "../BaseModelResponse"

export interface PartnerListResponseModel {
  sellerKey: string,
  sellerName: string,
  sellerStatus: YnOptions,
  contractStatus: string,
  contractStartDate: string,
  contractEndDate: string,
  contractType: string,
  bizRegNum: string,
  auditing: {
    registerKey: string,
    registerId: string,
    registerName: string,
    registeredDate: string,
    modifierKey: string,
    modifierId: string,
    modifierName: string,
    modifiedDate: string
  }
}

export interface PartnerListResponse extends DataTablePaginationResponseModel<PartnerListResponseModel> {}
