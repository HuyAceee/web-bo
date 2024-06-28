import { BaseApi } from './../../BaseApi';
import { ProductUploadAttachMentRequest } from '@/models/services/requests/products/ProductUploadAttachMentRequest'
import {
  ProductCategoryRequest,
  ProductDspCategoryExceptCompanyRequest,
  ProductDspCategoryImageDeleteRequest,
  ProductDspCategoryManageRequest,
  ProductDspCategoryManageSeqRequest,
  ProductStandardCategoryDetailRequest,
  ProductStandardCategoryListRequestParams,
  ProductStandardCategoryRequest,
  ProductStandardDspCategoryDeleteRequest,
  ProductStandardDspCategoryEditRequest,
  ProductStdCategorySeqDspRequest
} from '@/models/services/requests/products/category/ProductCategoryRequest'
import {
  ProductCategoryResponse,
  ProductDspCategoryDetailResponse,
  ProductDspCategoryExceptCompanyResponse,
  ProductDspCategoryListResponse,
  ProductDspCategoryManageResponse,
  ProductLowDspCategoryListResponse,
  ProductStandardCategoryResponse
} from '@/models/services/responses/products/category/ProductCategoryResponse'
import { CategoryExhibitionDeleteCategoryProductResponse, CategoryExhibitionDspCategoryProductListResponse, CategoryExhibitionUpdateCategoryProductResponse } from '@/models/services/responses/categories/exhibition/CategoryExhibitionDepth3ManagementResponse'
import { CategoryExhibitionDeleteCategoryProductRequest, CategoryExhibitionDspCategoryProductListRequest, CategoryExhibitionUpdateCategoryProductRequest } from '@/models/services/requests/categories/exhibition/CategoryExhibitionDepth3ManagementRequest'
import {
  ProductDisplayCategoryDetailResponse,
  ProductStandardCategoryDetailResponse,
  ProductStandardCategoryDetailResponseModel,
  ProductStandardCategoryDetailsResponse,
  ProductStandardCategoryListResponse
} from '@/models/services/responses/products/ticket/ProductTicketListResponse'
import { DeliveryProductCategoryDepthRank } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'

class ProductCategoryApi extends BaseApi{
  constructor() {
    super('shop/bo/category')
  }

  getCategoryDepth(rank: DeliveryProductCategoryDepthRank, request: ProductCategoryRequest): Promise<ProductCategoryResponse> {
    return this.get('dsp-category-depth' + rank, request)
  }

  getStandardCategoryDepth(
    rank: DeliveryProductCategoryDepthRank,
    request: ProductStandardCategoryRequest
  ): Promise<ProductStandardCategoryResponse> {
    return this.get('std-category-depth' + rank, request)
  }

  getDspCategoryExceptCompany = (request: ProductDspCategoryExceptCompanyRequest): Promise<ProductDspCategoryExceptCompanyResponse> => {
    return this.get('dsp-category-except-company', request)
  }

  updateDspCategoryManage = (request: ProductDspCategoryManageRequest): Promise<ProductDspCategoryManageResponse> => {
    return this.put('dsp-category-manage', request)
  }

  getLowDspCategoryList = (request: ProductDspCategoryExceptCompanyRequest): Promise<ProductLowDspCategoryListResponse> => {
    return this.get('low-dsp-category-list', request)
  }

  async uploadDisplay(params: any) {
    const paramsConvert = ProductUploadAttachMentRequest.from(params)
    return this.postMultipart('dsp-category-image-upload', paramsConvert)
  }

  removeImageCategory = (request: ProductDspCategoryImageDeleteRequest): Promise<ProductDspCategoryManageResponse> => {
    return this.put('dsp-category-image-delete', request)
  }

  removeDspCategoryDelete = (request: ProductDspCategoryExceptCompanyRequest): Promise<ProductDspCategoryManageResponse> => {
    return this.put('dsp-category-delete', request)
  }

  getDspCategoryDetail = (request: ProductDspCategoryExceptCompanyRequest): Promise<ProductDspCategoryDetailResponse> => {
    return this.get('dsp-category-detail', request, false)
  }
  async getCategoryList(): Promise<ProductStandardCategoryListResponse> {
    return this.get('std-category-list')
  }
  async getLowCategoryList(request: ProductStandardCategoryListRequestParams): Promise<ProductStandardCategoryListResponse> {
    return this.get('low-category-list', request, false)
  }
  async getStdCategoryDetail(request: ProductStandardCategoryListRequestParams): Promise<ProductStandardCategoryDetailsResponse> {
    return this.get('std-category-detail', request)
  }
  async deleteStdCategoryDetail(request: ProductStandardCategoryListRequestParams): Promise<ProductStandardCategoryDetailsResponse> {
    return this.put('std-category-delete', request)
  }
  async putStdCategory(request: ProductStandardCategoryDetailRequest): Promise<ProductStandardCategoryDetailResponse> {
    return this.put('std-category-manage', request)
  }

  async getDisplayCategoryList(): Promise<ProductDisplayCategoryDetailResponse> {
    return this.get('dsp-category-list')
  }

  async deleteStdCategoryDetailPopup(request: ProductStandardDspCategoryDeleteRequest): Promise<ProductStandardCategoryDetailResponseModel> {
    return this.put('std-dsp-category-delete-popup', request)
  }
  async editStdCategoryDetailPopup(request: ProductStandardDspCategoryEditRequest): Promise<ProductStandardCategoryDetailResponseModel> {
    return this.put('std-dsp-category-manage-popup', request)
  }
  async editStdCategorySeqDsp(request: ProductStdCategorySeqDspRequest): Promise<ProductStandardCategoryDetailResponseModel> {
    return this.put('std-category-manage-dsp-seq', request)
  }

  getDspCategoryList(): Promise<ProductDspCategoryListResponse> {
    return this.get('dsp-category-list')
  }

  updateDspCategoryManageSeq = (request: ProductDspCategoryManageSeqRequest): Promise<ProductDspCategoryManageResponse> => {
    return this.put('dsp-category-manage-expsr-seq', request)
  }

  getDspCategoryProductList = (
    request: CategoryExhibitionDspCategoryProductListRequest
  ): Promise<CategoryExhibitionDspCategoryProductListResponse> => {
    return this.get('dsp-category-product-list', request)
  }

  updateCategoryProduct = (request: CategoryExhibitionUpdateCategoryProductRequest): Promise<CategoryExhibitionUpdateCategoryProductResponse> => {
    return this.put('dsp-category-product-manage', request)
  }

  deleteCategoryProduct = (request: CategoryExhibitionDeleteCategoryProductRequest): Promise<CategoryExhibitionDeleteCategoryProductResponse> => {
    return this.put('dsp-category-product-delete', request)
  }
}

export const productCategoryApi = new ProductCategoryApi()
