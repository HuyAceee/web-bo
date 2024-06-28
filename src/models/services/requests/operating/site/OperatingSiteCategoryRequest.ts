export interface OperatingSiteCategoryDetailRequest {
  menuName: string
  subMenuActive: string
  exhibitionActive: string
  personalInformationIncluded: string
  parentMenuKey?: number
  menuId?: string
}

export interface OperatingSiteReOrderRequest {
  changeList: {
    menuKey: number
    changeOrder: number
  }[]
}
