export interface RouteRecordRawExtends extends RouteRecordRawChildItem {
  image?: any
  isHideMenu?: boolean
  children: RouteRecordRawChild[]
}

export interface RouteRecordRawChild extends RouteRecordRawChildItem {
  path: string
  name: string
  nameComponent?: string
  isHideMenu?: boolean
  isShowTips?: boolean
  children: RouteRecordRawChildItem[]
}

export interface RouteRecordRawChildItem {
  path: string
  name?: string
  component?: any
  nameComponent?: string
  isHideMenu?: boolean
  id?: string | number
  isShowTips?: boolean
  meta?: any
  text?: string
  children?: RouteRecordRawChildItem[]
  tooltipElement?: string
}
