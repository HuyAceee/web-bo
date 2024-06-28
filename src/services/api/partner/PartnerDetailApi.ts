import { BaseApi } from '@/services/api/BaseApi'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { PartnerCompanyDetailUpdateRequest } from '@/models/services/requests/partner/PartnerCompanyDetailUpdateRequest'
import { PartnerCompanyChargerListRequest } from '@/models/services/requests/partner/PartnerCompanyChargerListRequest'
import { PartnerCompanyDetailDetailResponse } from '@/models/services/responses/partner/PartnerCompanyDetailResponse'
import {
  PartnerCompanyBankAccountDetailResponse
} from '@/models/services/responses/partner/PartnerCompanyBankAccountDetailResponse'
import {
  PartnerCompanyChargerListResponse
} from '@/models/services/responses/partner/PartnerCompanyChargerListResponse'
import { PartnerCompanyApiKeyResponse } from '@/models/services/responses/partner/PartnerCompanyApiKeyResponse'
import { PartnerCompanyCategoryResponse } from '@/models/services/responses/partner/PartnerCompanyCategoryResponse'
import { PartnerCompanyPermissionResponse } from '@/models/services/responses/partner/PartnerCompanyPermissionResponse'

class PartnerDetailApi extends BaseApi {
  constructor() {
    super('member/bo/seller-companies')
  }

  async getPartnerDetail(sellerKey: string): Promise<PartnerCompanyDetailDetailResponse> {
    const { data, ...otherRes } = await this.get(`${sellerKey}`)
    const resData: any = {
      data, ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getPartnerBankDetail(sellerKey: string): Promise<PartnerCompanyBankAccountDetailResponse> {
    const { data, ...otherRes } = await this.get(`${sellerKey}/bank-account`)
    const resData: any = {
      data, ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getPartnerChargerList(sellerKey: string, params: PartnerCompanyChargerListRequest): Promise<PartnerCompanyChargerListResponse> {
    const { data, ...otherRes } = await this.get(`${sellerKey}/chargers`, params)
    const resData: any = {
      data, ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getApiKey(sellerKey: string): Promise<PartnerCompanyApiKeyResponse> {
    const { data, ...otherRes } = await this.get(`${sellerKey}/api-key`)
    const resData: any = {
      data, ...otherRes
    }
    return Promise.resolve(resData)
  }

  async deletePartnerCharger(sellerKey: string, keyList: number[]): Promise<BaseModelResponse<any>> {
    const { data, ...otherRes } = await this.delete(`${sellerKey}/chargers`, { keyList })
    const resData: any = {
      data, ...otherRes
    }
    return Promise.resolve(resData)

  }

  async getPartnerCategory(sellerKey: string): Promise<PartnerCompanyCategoryResponse> {
    const { data, ...otherRes } = await this.get(`${sellerKey}/categories`)
    const resData: any = {
      data, ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getPartnerPermission(sellerKey: string): Promise<PartnerCompanyPermissionResponse> {
    const { data, ...otherRes } = await this.get(`${sellerKey}/permissions`)
    const resData: any = {
      data, ...otherRes
    }
    return Promise.resolve(resData)
  }

  async updatePartnerDetail(sellerKey: string, data: PartnerCompanyDetailUpdateRequest): Promise<BaseModelResponse<any>> {
    const { data: resData, ...otherRes } = await this.put(`${sellerKey}`, data)
    const res: any = {
      data: resData, ...otherRes
    }
    return Promise.resolve(res)
  }

  async downloadFile(path: string): Promise<Blob> {
    const url = `${this.apiHostUrl}${path}`
    const respond = await this.getBlob(url, {}, false, true)
    return Promise.resolve(respond)
  }
}

export const partnerDetailApi = new PartnerDetailApi()