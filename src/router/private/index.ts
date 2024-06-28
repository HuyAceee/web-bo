import main from './main'
import member from './member'
import product from './product'
import delivery from './delivery'
import complain from './complain'
import settled from './settled'
import reward from './reward'
import exhibition from './exhibition'
import bulletin from './bulletin'
import cs from './cs'
import statistical from './statistics'
import operate from './operate'
import category from './category'
import vendor from './vendor'
import customer from './customer'
import { RouteRecordRawExtends } from '@/models'

// navigation list
const listLinks: RouteRecordRawExtends[] = [
  main,
  // Manage member
  member,
  // Product Management
  product,
  // Category management
  category,
  // Manage order deliveries
  delivery,
  // Complaint management
  complain,
  // Settlement management
  settled,
  // General management
  reward,
  // Exhibition management
  exhibition,
  // Manage message boards
  bulletin,
  // CS management
  cs,
  // Statistics management
  statistical,
  // Operational management
  operate,
  // Seller management
  vendor,
  // Customer management
  customer
]

export const originRouter: RouteRecordRawExtends[] = listLinks.map((item) => {
  return {
    path: item.path,
    component: item.component,
    meta: item.meta,
    children: item.children?.map((_item) => ({
      path: `${item.path}/${_item.path}`,
      component: _item.component,
      meta: _item.meta,
      children: _item?.children?.map((__item) => ({
        path: `${item.path}/${_item.path}/${__item.path}`,
        component: __item.component,
        meta: __item.meta
      }))
    }))
  }
}) as RouteRecordRawExtends[]

function flattenArray(arr: RouteRecordRawExtends[]) {
  const result: any[] = []

  function recursiveFlatten(arr: any) {
    for (const item of arr) {
      result.push({
        name: item.name ?? '',
        path: item.path ?? '',
        component: item?.component,
        meta: item?.meta,
        tooltipElement: item?.tooltipElement ?? ''
      })
      if (item.children && Array.isArray(item.children) && item.children.length > 0) {
        recursiveFlatten(item.children)
      }
    }
  }

  recursiveFlatten(arr)
  return result
}

export const PrivateRoutes = flattenArray(originRouter)

export const listRouteForwardPath = listLinks
  .filter((item) => !item?.isHideMenu)
  .map((item) => {
    return {
      path: item.path,
      name: item.name,
      image: item.image,
      id: item.id,
      nameComponent: item?.nameComponent,
      children:
        item?.children
          ?.filter((_item) => !_item?.isHideMenu)
          .map((_item) => ({
            path: `${item.path}/${_item.path}`,
            name: _item.name,
            nameComponent: _item?.nameComponent,
            id: _item.id,
            tooltipElement: _item?.tooltipElement ?? '',
            children: _item?.children
              ?.filter((__item) => !__item?.isHideMenu)
              .map((__item) => ({
                path: `${item.path}/${_item.path}/${__item.path}`,
                id: __item.id,
                name: __item.name,
                nameComponent: __item?.nameComponent,
                tooltipElement: __item?.tooltipElement ?? ''
              }))
          })) ?? []
    }
  })

export const listRouteForwardPathHeaderLink = listLinks.map((item) => {
  return {
    path: item.path,
    name: item.name,
    image: item.image,
    id: item.id,
    nameComponent: item?.nameComponent,
    children:
      item?.children?.map((_item) => ({
        path: `${item.path}/${_item.path}`,
        name: _item.name,
        nameComponent: _item?.nameComponent,
        id: `${item.id}-${_item.id}`,
        isShowTips: _item?.isShowTips ?? false,
        tooltipElement: _item?.tooltipElement ?? '',
        children: _item?.children?.map((__item) => ({
          tooltipElement: __item?.tooltipElement ?? '',
          path: `${item.path}/${_item.path}/${__item.path}`,
          id: `${item.id}-${_item.id}-${__item.id}`,
          name: __item.name,
          nameComponent: __item?.nameComponent,
          isShowTips: __item?.isShowTips ?? false
        }))
      })) ?? []
  }
})

function flattenArrayForwardPath(arr: RouteRecordRawExtends[]) {
  const result: any[] = []
  function recursiveFlatten(arr: any[]) {
    for (const item of arr) {
      result.push({
        name: item.name ?? '',
        path: item.path ?? '',
        nameComponent: item.nameComponent,
        id: item?.id,
        isShowTips: item?.isShowTips ?? false,
        tooltipElement: item?.tooltipElement ?? ''
      })
      if (item.children && Array.isArray(item.children) && item.children.length > 0) {
        recursiveFlatten(item.children)
      }
    }
  }

  recursiveFlatten(arr)
  return result
}

export const listRouteForwardPathFlat = flattenArrayForwardPath(listRouteForwardPathHeaderLink)
