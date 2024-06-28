import { ExhibitionCornerManagementGetListCornerResponseModel } from '@/models/services/responses/exhibition/modal/ExhibitionCornerManagementDetailResponse'

export interface ExhibitionCornerManagementDetailRegisterCornerListRequest {
  createRequestList?: ExhibitionCornerManagementDetailRegisterCornerListRequestModel[]
}

export interface ExhibitionCornerManagementDetailRegisterCornerListRequestModel {
  templateKey?: number
  customerId?: string
  lclassCode?: string
  sclassCode?: string
  cornerName?: string
  areaAddYn?: string
}

export class ExhibitionCornerManagementDetailRegisterCornerListRequestConvertor {
  static from(value: ExhibitionCornerManagementGetListCornerResponseModel[]): ExhibitionCornerManagementDetailRegisterCornerListRequestModel[] {
    return value.map((it: ExhibitionCornerManagementGetListCornerResponseModel): ExhibitionCornerManagementDetailRegisterCornerListRequestModel => {
      return {
        templateKey: it.templateKey,
        customerId: it.customerId,
        lclassCode: it.lclassCode,
        sclassCode: it.sclassCode,
        cornerName: it.cornerName,
        areaAddYn: it.areaAddYn
      }
    })
  }
}
