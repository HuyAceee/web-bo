import { BaseApi } from '@/services/api/BaseApi'
import {
  ProductTicketDetailBasicInfoRequest,
  ProductTicketItemBasicManageRequestModel,
  ProductItemDisplayManageModel,
  ProductSalesInfoUpdateRequest,
  ProductApprovalTicketDetailBasicInfoRequest,
  ProductRequestItemDisplayManageModel,
  ProductRequestSalesInfoUpdateRequest
} from '@/models/services/requests/products/ticket/ProductTicketBaseInfoRequest'
import { ProductTicketApprovalRequestParams } from '@/models/services/requests/products/approval/ProductTicketApprovalListRequest'
import { ProductTicketApprovalListResponse } from '@/models/services/responses/products/approval/ProductTicketApprovalListResponse'
import {
  ProductItemBasicManageResponse,
  ProductItemDetailDisplayResponse,
  ProductItemRequestDetailDisplayInfoResponse,
  ProductRequestItemBasicManagementResponse,
  ProductRequestSalesInfoResponse,
  ProductSalesInfoResponse,
  ProductTicketDetailBasicInfoExceptCompanyResponse,
  ProductTicketDetailBasicInfoResponse
} from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'

class ProductTicketItemApi extends BaseApi {
  constructor() {
    super('shop/bo/item')
  }

  getBasicDetailInfo(request: ProductTicketDetailBasicInfoRequest): Promise<ProductTicketDetailBasicInfoResponse> {
    return this.get('item-detail-basic-info', request)
  }

  getBasicDetailInfoExceptCompany(request: ProductTicketDetailBasicInfoRequest): Promise<ProductTicketDetailBasicInfoExceptCompanyResponse> {
    return this.get('item-detail-basic-except-company', request)
  }

  putItemBasicManage(request: ProductTicketItemBasicManageRequestModel): Promise<ProductItemBasicManageResponse> {
    return this.put('item-basic-manage', request)
  }

  getItemDetailsDisplayInfo(request: ProductTicketDetailBasicInfoRequest): Promise<ProductItemDetailDisplayResponse> {
    return this.get('item-detail-display-info', request)
  }

  putItemDisplayManage(request: ProductItemDisplayManageModel): Promise<ProductItemBasicManageResponse> {
    return this.put('item-display-manage', request)
  }
  getSalesInfo(request: ProductTicketDetailBasicInfoRequest): Promise<ProductSalesInfoResponse> {
    return this.get('item-detail-sale-info', request)
  }
  updateSalesInfo(request: ProductSalesInfoUpdateRequest): Promise<ProductItemBasicManageResponse> {
    return this.put('item-sale-manage', request)
  }

  getItemRequestDetailDisplayInfo(request: ProductApprovalTicketDetailBasicInfoRequest): Promise<ProductItemRequestDetailDisplayInfoResponse> {
    return this.get('item-request-detail-display-info', request)
  }

  getApprovalList(params: ProductTicketApprovalRequestParams): Promise<ProductTicketApprovalListResponse> {
    return this.get('product-request-list', params)
  }

  putItemRequestDisplayManage(
    productReqeustKey: number,
    request: ProductRequestItemDisplayManageModel
  ): Promise<ProductRequestItemBasicManagementResponse> {
    const reqData = { ...request, productReqeustKey }
    return this.put('item-request-display-manage', reqData)
  }
  getItemRequestDetailSaleInfo(request: ProductApprovalTicketDetailBasicInfoRequest): Promise<ProductRequestSalesInfoResponse> {
    return this.get('item-request-detail-sale-info', request)
  }
  updateRequestSalesInfo(request: ProductRequestSalesInfoUpdateRequest): Promise<ProductRequestItemBasicManagementResponse> {
    return this.put('item-request-sale-manage', request)
  }
}

export const productTicketItemApi = new ProductTicketItemApi()
