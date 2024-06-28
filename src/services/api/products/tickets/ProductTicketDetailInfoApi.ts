import { BaseApi } from '@/services/api/BaseApi'
import {
  ProductTicketDetailBasicInfoRequest,
  ProductTicketItemBasicManageRequestModel
} from '@/models/services/requests/products/ticket/ProductTicketBaseInfoRequest'
import {
  ProductDetailOptionPopupInfoRequest,
  ProductTicketDetailIssuedInfoRequest,
  ProductTicketIssuedManageRequest
} from '@/models/services/requests/products/ticket/ProductIssuedInfoRequest'
import {
  ProductTicketItemOptionDeleteRequest,
  ProductTicketItemOptionInventoryManageRequest,
  ProductTicketItemOptionManageRequest
} from '@/models/services/requests/products/ticket/ProductTicketItemOptionRequest'
import {
  ProductApprovalTicketItemIssuedManageRequest,
  ProductApprovalTicketItemOptionDeleteRequest,
  ProductApprovalTicketItemOptionDetailRequest,
  ProductApprovalTicketItemOptionInventoryManageRequest,
  ProductApprovalTicketItemOptionManageRequest
} from '@/models/services/requests/products/approval/ProductApprovalTicketItemOptionDetailRequest'
import {
  ProductApprovalItemDetailIssuedInfoResponse,
  ProductApprovalItemOptionDetailResponse,
  ProductApprovalTicketItemOptionDetailPopupResponse,
  ProductApprovalTicketItemOptionDetailResponse
} from '@/models/services/responses/products/approval/ProductApprovalTicketItemOptionDetailResponse'
import {
  ProductItemBasicManageResponse,
  ProductTicketDetailBasicInfoExceptCompanyResponse,
  ProductTicketDetailBasicInfoResponse
} from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'
import {
  ProductTicketDetailIssuedInfoResponse,
  ProductTicketIssuedManageResponse
} from '@/models/services/responses/products/ticket/ProductIssuedInfoResponse'
import {
  ProductTicketItemDetailOptionInfoResponse,
  ProductTicketItemDetailOptionPopupInfoResponse,
  ProductTicketItemOptionManageResponse
} from '@/models/services/responses/products/ticket/ProductTicketItemOptionResponse'

class ProductTicketDetailInfoApi extends BaseApi {
  constructor() {
    super('shop/bo/item')
  }

  getBasicDetailInfo(request: ProductTicketDetailBasicInfoRequest): Promise<ProductTicketDetailBasicInfoResponse> {
    return this.get('item-detail-basic-info', request)
  }

  getBasicDetailInfoExceptCompany(request: ProductTicketDetailBasicInfoRequest): Promise<ProductTicketDetailBasicInfoExceptCompanyResponse> {
    return this.get('item-detail-basic-except-company', request)
  }

  putItemBasicManage(request: Partial<ProductTicketItemBasicManageRequestModel>): Promise<ProductItemBasicManageResponse> {
    return this.put('item-basic-manage', request)
  }

  getBasicRequestDetailInfo(request: ProductApprovalTicketItemOptionDetailRequest): Promise<ProductTicketDetailBasicInfoResponse> {
    return this.get('item-request-detail-basic-info', request)
  }

  getBasicRequestDetailInfoExceptCompany(
    request: ProductApprovalTicketItemOptionDetailRequest
  ): Promise<ProductTicketDetailBasicInfoExceptCompanyResponse> {
    return this.get('item-request-detail-basic-except-company', request)
  }

  putItemRequestBasicManage(request: Partial<ProductTicketItemBasicManageRequestModel>): Promise<ProductItemBasicManageResponse> {
    return this.put('item-request-basic-manage', request)
  }

  getIssuedInfo(request: ProductTicketDetailIssuedInfoRequest): Promise<ProductTicketDetailIssuedInfoResponse> {
    return this.get('item-detail-issued-info', request)
  }

  updateIssuesInfo(request: ProductTicketIssuedManageRequest): Promise<ProductTicketIssuedManageResponse> {
    return this.put('item-issued-manage', request, false)
  }

  updateItemOptionManage(request: ProductTicketItemOptionManageRequest): Promise<ProductTicketItemOptionManageResponse> {
    return this.put('item-option-manage', request)
  }
  getItemDetailOptionInfo(request: ProductTicketDetailIssuedInfoRequest): Promise<ProductTicketItemDetailOptionInfoResponse> {
    return this.get('item-detail-option-info', request, false)
  }

  updateItemOptionInventoryManage(request: ProductTicketItemOptionInventoryManageRequest): Promise<ProductTicketItemOptionManageResponse> {
    return this.put('item-option-inventory-manage', request)
  }

  deleteItemOption(request: ProductTicketItemOptionDeleteRequest): Promise<ProductTicketItemOptionManageResponse> {
    return this.put('item-option-delete', request)
  }

  getItemRequestDetailOptionInfo(request: ProductApprovalTicketItemOptionDetailRequest): Promise<ProductApprovalTicketItemOptionDetailResponse> {
    return this.get('item-request-detail-option-info', request, false)
  }

  updateItemRequestOptionInventoryManage(
    request: ProductApprovalTicketItemOptionInventoryManageRequest
  ): Promise<ProductApprovalItemOptionDetailResponse> {
    return this.put('item-request-option-inventory-manage', request)
  }

  deleteItemRequestOption(request: ProductApprovalTicketItemOptionDeleteRequest): Promise<ProductApprovalItemOptionDetailResponse> {
    return this.put('item-request-option-delete', request)
  }

  getItemRequestDetailIssuedInfo(request: ProductApprovalTicketItemOptionDetailRequest): Promise<ProductApprovalItemDetailIssuedInfoResponse> {
    return this.get('item-request-detail-issued-info', request, false)
  }

  updateItemRequestIssuedManage(request: ProductApprovalTicketItemIssuedManageRequest): Promise<ProductApprovalItemOptionDetailResponse> {
    return this.put('item-request-issued-manage', request)
  }

  updateItemRequestOptionManage(request: ProductApprovalTicketItemOptionManageRequest): Promise<ProductApprovalItemOptionDetailResponse> {
    return this.put('item-request-option-manage', request)
  }

  getItemRequestDetailOptionPopupInfo(request: ProductApprovalTicketItemOptionDetailRequest): Promise<ProductApprovalTicketItemOptionDetailPopupResponse> {
    return this.get('item-request-detail-option-popup-info', request, false)
  }

  getItemDetailOptionPopupInfo(request: ProductDetailOptionPopupInfoRequest): Promise<ProductTicketItemDetailOptionPopupInfoResponse> {
    return this.get('item-detail-option-popup-info', request, false)
  }
}

export const productTicketDetailInfoApi = new ProductTicketDetailInfoApi()
