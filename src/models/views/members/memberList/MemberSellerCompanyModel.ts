export enum MemberActiveTypeModel {
  UNDEFINED = 'null',
  ACTIVE = 'Y',
  INACTIVE = 'N'
}

export interface MemberSellerCompanyModel {
  isActive: MemberActiveTypeModel
  managerId: string
  managerKey: number
  managerName: string
  auditing: {
    registerKey: number
    registerId: number
    registerName: number
    registeredDate: string
    modifierKey: number
    modifierId: number
    modifierName: number
    modifiedDate: string
  }
  subSellerName: string
}
