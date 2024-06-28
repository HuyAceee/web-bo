import { useStorage } from '@/composables/common'
import { RouteRecordRawChildItem, RouteRecordRawExtends } from '@/models'
import { WelfareMenuItemModel } from '@/models/uikit/WelfareMenu'
import { listRouteForwardPath } from '@/router/private'
import { menuApi } from '@/services/api/menu/MenuApi'
import { defineStore } from 'pinia'

export const useSiteMenuStore = defineStore('site-menu', () => {
  const [listMenuNavigation, setListMenuNavigation] = useStorage<RouteRecordRawExtends[]>('site-menu')

  const handleGetSiteMenu = () => {
    menuApi
      .getMenuData()
      .then((data) => {
        if (!data.data.length) {
          setListMenuNavigation([])
          return
        }
        const newList = listRouteForwardPath
          .map((router) => {
            const currentRoute = data?.data?.find((i) => i.menuKey === router.id)
            if (!currentRoute) return undefined
            return {
              id: currentRoute?.menuKey,
              name: currentRoute?.menuName,
              order: currentRoute?.menuOrder,
              children: getValueItem(router.children, currentRoute)
            }
          })
          .filter((item) => item)
          .sort((a, b) => Number(a?.order) - Number(b?.order))
        setListMenuNavigation(newList)
      })
      .catch(() => {
        setListMenuNavigation([])
      })
  }

  const getValueItem = (data: RouteRecordRawChildItem[], currentRoute: WelfareMenuItemModel): RouteRecordRawChildItem[] | any => {
    return data
      .map((item) => {
        const subRoute = currentRoute?.subMenus.find((i) => i.menuKey === item.id)
        if (!subRoute) return undefined
        return {
          ...item,
          name: subRoute?.menuName,
          order: subRoute?.menuOrder,
          children: getValueItem(item?.children ?? [], subRoute)
        }
      })
      .filter((item) => item)
      .sort((a, b) => Number(a?.order) - Number(b?.order))
  }

  return {
    listMenuNavigation,
    handleGetSiteMenu
  }
})
