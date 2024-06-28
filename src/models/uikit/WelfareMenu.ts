export interface WelfareMenuItemModel {
  menuKey: number
  menuName: string
  parentMenuKey: number
  menuDepth: number
  menuSortSeq: number
  menuOrder: number
  menuExhibitionStatus: 'Y' | 'N'
  subMenus: WelfareMenuItemModel[]
}

export interface WelfareMenuFavoriteModel {
  menuKey: number
  bookmarkStatus: boolean
}

export interface WelfareMenuPayloadModel {
  id: number
  isDelete: boolean
}
