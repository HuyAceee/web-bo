import {
  ProductTicketListForm,
  externalInterfaceOptions,
  productStatusOptions,
  productDisplayYnOptions,
  productRequestTempYnOptions,
  productType
} from '@/models'
import { BaseApi } from '../BaseApi'
import { renderLabelEnum } from '@/common'
import {
  ProductTicketApproveListRequestConvertor,
  ProductTicketChangeStatusApproveRequest
} from '@/models/services/requests/products/ticket/ProductTicketApproveRequest'
import { ProductTicketStandardCategoryListRequest, ProductTicketStdCategoryRequest } from '@/models/services/requests/products/ticket/ProductTicketListRequest'
import { ProductStandardCategoryRequestParams } from '@/models/services/requests/products/category/ProductCategoryRequest'
import { ProductTicketApprovalRequestParams } from '@/models/services/requests/products/approval/ProductTicketApprovalListRequest'
import { ProductTicketApprovalItemResponseModel } from '@/models/services/responses/products/approval/ProductTicketApprovalListResponse'
import {
  ProductTicketApproveListResponse,
  ProductTicketChangeStatusApprovalResponse
} from '@/models/services/responses/products/ticket/ProductTicketApproveResponse'
import {
ProductStandardCategoryListResponse,
  ProductTicketCategoryDspResponse,
  ProductTicketListResponse,
  ProductTicketStandardCategoryResponse,
  ProductTicketUpdateSellerResponse
} from '@/models/services/responses/products/ticket/ProductTicketListResponse'
class ProductTicketApi extends BaseApi {
  constructor() {
    super('shop/bo')
  }
  async getTicketApprovalList(request: Partial<ProductTicketApprovalRequestParams>): Promise<ProductTicketApproveListResponse> {
    const response = await this.get('item/product-request-list', request)
    const transformResponse: ProductTicketApproveListResponse = {
      totalItems: response.page?.totalCount,
      data: response.data.map((it: ProductTicketApprovalItemResponseModel) => {
        return {
          id: it.productReqeustKey,
          product_code: it.productReqeustCode,
          product_name: it.productName,
          integration: renderLabelEnum(externalInterfaceOptions, it.externalInterfaceYn ?? ''),
          product_type: renderLabelEnum(productType, it.productType ?? ''),
          request_type: it.lastProductProgressStatusName,
          save_temporarily: renderLabelEnum(productRequestTempYnOptions, it.productRequestTempYn ?? ''),
          exhibition_status: renderLabelEnum(productDisplayYnOptions, it.displayYn ?? ''),
          exposure_channel: it.exposureChannelName,
          price: it.salePrice,
          tax_classification: it.taxTypeName,
          standard_category: it.standardCategoryPath,
          exhibition_category: it.displayCategoryPath,
          seller: it.sellerKey,
          sub_company: it.lowSellerKey,
          brand: it.lowSellerKey,
          model_name: it.productName,
          product_registration_date: it.createdYyyymmdd,
          product_modification_date: it.lastModifiedYyyymmdd,
          registrant: it.createdByName,
          approver: it.lastProductApprovedByName,
          approver_request_date: it.createdYyyymmdd,
          approver_status: renderLabelEnum(productStatusOptions, it.lastProductProgressStatusCode ?? ''),
          approval_management: it.lastProductApprovedByName,
          standardCategoryId: it.standardCategoryId,
          isSelected: false,
          productKey: it.productKey
        }
      })
    }

    return Promise.resolve(transformResponse)
  }

  async getDataTicketList(pageNum: number, size: number, otherParams: ProductTicketListForm) {
    const params = ProductTicketApproveListRequestConvertor.from(otherParams, pageNum, size)
    const { data, page: pageRes, ...otherData } = await this.get('item/product-list', params)

    const resData: ProductTicketListResponse = {
      data: data.map((it: any) => {
        return {
          id: it.productKey,
          product_code: it.productCode,
          product_name: it.productName,
          integration: renderLabelEnum(externalInterfaceOptions, it.externalInterfaceYn ?? ''),
          product_type: renderLabelEnum(productType, it.productType ?? ''),
          exposure_channel: it.exposureChannelName,
          exhibition_status: renderLabelEnum(productDisplayYnOptions, it.displayYn ?? ''),
          price: it.salePrice,
          instant_discount_price: it.productDiscountAmount,
          sales_status: it.lastProductSalesStatusName,
          tax_classification: it.taxTypeName,
          standard_category: it.standardCategoryPath,
          exhibition_category: it.exhibition_category,
          seller: `${it.sellerKey}(${it.sellerName})`,
          sub_company: `${it.lowSellerKey}(${it.lowSellerName})`,
          product_registration_date: it.createdYyyymmdd,
          product_modification_date: it.lastModifiedYyyymmdd,
          sales_start_date: it.saleStartYyyymmdd,
          sale_end_date: it.saleEndYyyymmdd,
          md: `${it.chargeMdKey}(${it.chargeMdName})`,
          registrant: `${it.createdBy}(${it.createdByName})`,
          modifier: `${it.lastModifiedBy}(${it.lastModifiedByName})`,
          approver: `${it.lastProductApprovedBy}(${it.lastProductApprovedByName})`,
          productClassificationCode: it.productClassificationCode
        }
      }),
      totalItems: pageRes.totalCount,
      ...otherData
    }
    return Promise.resolve(resData)
  }

  async getDataTicketDspCategoryDepth1(): Promise<ProductTicketCategoryDspResponse> {
    return await this.get('category/dsp-category-depth1')
  }

  async getDataTicketDspCategoryDepth2(params: string): Promise<ProductTicketCategoryDspResponse> {
    const paramConvert = ProductTicketApproveListRequestConvertor.fromCategory(params)
    return this.get('category/dsp-category-depth2', paramConvert)
  }

  async getDataTicketDspCategoryDepth3(params: string): Promise<ProductTicketCategoryDspResponse> {
    const paramConvert = ProductTicketApproveListRequestConvertor.fromCategory(params)
    return this.get('category/dsp-category-depth3', paramConvert)
  }

  async getStandardCategory(depth: number, params: ProductStandardCategoryRequestParams): Promise<ProductTicketStandardCategoryResponse> {
    return this.get(`category/std-category-depth${depth}`, params)
  }

  async getDataTicketStdCategoryDepth1(params: ProductTicketStdCategoryRequest): Promise<ProductTicketCategoryDspResponse> {
    return await this.get('category/std-category-depth1', params)
  }

  async getDataTicketStdCategoryDepth2(params: ProductTicketStdCategoryRequest): Promise<ProductTicketCategoryDspResponse> {
    return this.get('category/std-category-depth2', params)
  }

  async getDataTicketStdCategoryDepth3(params: ProductTicketStdCategoryRequest): Promise<ProductTicketCategoryDspResponse> {
    return this.get('category/std-category-depth3', params)
  }

  updateStatusSeller(params: number[]): Promise<ProductTicketUpdateSellerResponse> {
    const paramConvert = ProductTicketApproveListRequestConvertor.fromUpdateSeller(params)
    return this.put('item/item-end-of-sale', paramConvert)
  }

  async itemRequestApproval(request: ProductTicketChangeStatusApproveRequest): Promise<ProductTicketChangeStatusApprovalResponse> {
    return this.put('item/item-request-approval', request)
  }
  async itemRequestReject(request: any): Promise<ProductTicketChangeStatusApprovalResponse> {
    return this.put('item/item-request-reject', request)
  }

  async getStandardCategoryList(request: ProductTicketStandardCategoryListRequest): Promise<ProductStandardCategoryListResponse> {
    return this.get('category/std-dsp-category-list-popup', request)
  }
}

export const productTicketApi = new ProductTicketApi()
