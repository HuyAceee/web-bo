import { BaseApi } from '../BaseApi'
import {
  ExhibitionGnbGroupListResponse,
  ExhibitionGnbReservationGroupResponse
} from '@/models/services/responses/exhibition/exhibitionGnbManagement/ExhibtionGnbGroupListResponse'
import {
  ExhibitionPostGnbGroupResponse,
  ExhibitionPutGnbGroupResponse
} from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { ExhibitionGnbReservationListRequest } from '@/models/services/requests/exhibition/ExhiibitionGnbGroupRequest'

class ExhibitionGnbManagementApi extends BaseApi {
  constructor() {
    super('shop/bo')
  }

  getGnbGroupList(applyChannelType: string) {
    return new Promise<ExhibitionGnbGroupListResponse>((resolve, reject) => {
      this.get('display/gnb/group/list', { applyChannelType })
        .then((res) => {
          const dataWithIndex = res.data.map((item: any, index: any) => ({
            id: item.gnbGroupKey,
            no: index + 1,
            ...item
          }))
          resolve({
            totalItems: res?.page?.totalCount,
            data: dataWithIndex
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  getGnbCustomerGroupList(applyChannelType: string, customerId: string) {
    return new Promise<ExhibitionGnbGroupListResponse>((resolve, reject) => {
      this.get('display/gnb/customer/group/list', { applyChannelType, customerId })
        .then((res) => {
          const dataWithIndex = res.data.map((item: any, index: any) => ({
            id: item.gnbGroupKey,
            gnbGroupTypeCurrent: item.gnbGroupType,
            no: index + 1,
            ...item
          }))
          resolve({
            totalItems: res?.page?.totalCount,
            data: dataWithIndex
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  getGnbReservationGroupList(gnbGroupKey: string) {
    return new Promise<ExhibitionGnbReservationGroupResponse>((resolve, reject) => {
      this.get(`display/gnb/list/${gnbGroupKey}`)
        .then((res) => {
          const dataWithIndex = res.data.map((item: any, index: any) => ({
            id: item.gnbDisplayKey,
            no: index + 1,
            ...item
          }))
          resolve({
            totalItems: res?.page?.totalCount,
            data: dataWithIndex
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  getGnbReservationGroupCustomerList(gnbGroupKey: string) {
    return new Promise<ExhibitionGnbReservationGroupResponse>((resolve, reject) => {
      this.get(`display/gnb/customer/list/${gnbGroupKey}`)
        .then((res) => {
          const dataWithIndex = res.data.map((item: any, index: any) => ({
            id: item.gnbDisplayKey,
            no: index + 1,
            ...item
          }))
          resolve({
            totalItems: res?.page?.totalCount,
            data: dataWithIndex
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  postNewGnbGroup(gnbGroupList: ExhibitionPostGnbGroupResponse): Promise<BaseModelErrorResponse> {
    return this.post('display/gnb/group/list:register', gnbGroupList)
  }

  postNewGnbCustomerGroup(gnbGroupList: ExhibitionPostGnbGroupResponse): Promise<BaseModelErrorResponse> {
    return this.post('display/gnb/customer/group/list:register', gnbGroupList)
  }

  putNewGnbGroup(modifyRequestList: ExhibitionPutGnbGroupResponse[]): Promise<BaseModelErrorResponse> {
    return this.put('display/gnb/group/list:modify', { modifyRequestList })
  }

  putNewGnbCustomerGroup(modifyRequestList: ExhibitionPutGnbGroupResponse[]): Promise<BaseModelErrorResponse> {
    return this.put('display/gnb/customer/group/list:modify', { modifyRequestList })
  }

  deleteNewGnbGroup(deleteList: string[]): Promise<BaseModelErrorResponse> {
    return this.delete('display/gnb/group/list:delete', { deleteList })
  }

  deleteNewGnbCustomerGroup(deleteList: string[]): Promise<BaseModelErrorResponse> {
    return this.delete('display/gnb/customer/group/list:delete', { deleteList })
  }

  postNewGnbReservationGroup(gnbGroupList: ExhibitionGnbReservationListRequest): Promise<BaseModelErrorResponse> {
    return this.post('display/gnb/list:register', gnbGroupList)
  }

  postNewGnbCustomerReservationGroup(gnbGroupList: ExhibitionGnbReservationListRequest): Promise<BaseModelErrorResponse> {
    return this.post('display/gnb/customer/list:register', gnbGroupList)
  }

  putNewGnbReservationGroup(modifyRequestList: ExhibitionGnbReservationListRequest[]): Promise<BaseModelErrorResponse> {
    return this.put('display/gnb/list:modify', { modifyRequestList })
  }

  putNewGnbCustomerReservationGroup(modifyRequestList: ExhibitionGnbReservationListRequest[]): Promise<BaseModelErrorResponse> {
    return this.put('display/gnb/customer/list:modify', { modifyRequestList })
  }

  deleteGnbReservationGroup(deleteList: string[]): Promise<BaseModelErrorResponse> {
    return this.delete('display/gnb/list:delete', { deleteList })
  }

  deleteGnbCustomerReservationGroup(deleteList: string[]): Promise<BaseModelErrorResponse> {
    return this.delete('display/gnb/customer/list:delete', { deleteList })
  }
}

export const exhibitionGnbManagementApi = new ExhibitionGnbManagementApi()
