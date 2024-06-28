export interface DeliverySearchProductResponse {
  productKey: number
  productCode: string
  productName: string
  sellerKey: number
  sellerName: string
  brandId: string
  brandName: string
  productClassificationCode: string
  productClassificationName: string
  productType: string
  productTypeName: string
  salePrice: number
  lastProductSalesStatusCode: string
  lastProductSalesStatusName: string
  lastProductProgressStatusCode: string
  lastProductProgressStatusName: string
  chargeMdKey: number
  createdBy: string
  createdByName: string
  createdYyyymmdd: string
  lastModifiedYyyymmdd: string
  lastModifiedBy: string
  lastModifiedByName: string
  standardCategoryPath: string
  displayCategoryPath: string
  displayYn?: string
}
