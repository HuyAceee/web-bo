import { ProductStandardCategoryListItemModel } from "../products"

export enum PartnerContractType {
  ALL = "00",
  CONSIGNMENT = "01",
  DIRECT = "02"
}

export enum PartnerContractStatus {
  ALL = "00",
  STARTED = "01",
  UPCOMING = "02",
  TERMINATED = "03"
}

export enum PartnerSearchType {
  KEY = "KEY",
  NAME = "NAME",
  BIZ_REG_NUMBER = "BIZ_REG_NUMBER",
  REGISTER_ID = "REGISTER_ID"
}

export enum PartnerSalesCategoryItemFieldType {
  md = 'md',
  category = 'category',
  representative = 'representative',
  contractMarginRate = 'contractMarginRate',
}

export interface PartnerSalesCategoryItemModel {
  id: string
  representative: boolean
  category?: ProductStandardCategoryListItemModel
  md: string
  contractMarginRate: string
}

export const emptyPartnerSalesCategoryItem: PartnerSalesCategoryItemModel = {
  id: "0",
  representative: true,
  category: undefined,
  md: '',
  contractMarginRate: ''
}

export interface PartnerPermissionToSellItemModel {
  id: string
  productGroup: any
  file: any
}

export const emptyPartnerPermissionToSellItem: PartnerPermissionToSellItemModel = {
  id: "0",
  productGroup: undefined,
  file: undefined
}