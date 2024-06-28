import { DeliveryCategoryTypeModel } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import { getFirstNumberFromString } from '@/common'
import { TreeNode } from 'primevue/tree'
import { useRouter } from 'vue-router'
export const getCurrentNodeDeepByKey = (node: TreeNode): number => {
  /* the category depth is the first number in the categoryId */
  const depth = node.key ? getFirstNumberFromString(node.key) : undefined
  return depth ?? 1
}

export const useMenuItemSelected = () => {
  const router = useRouter()
  const handleMenuItemSelected = (value: TreeNode, type?: DeliveryCategoryTypeModel) => {
    const depth = getCurrentNodeDeepByKey(value)
    const id = value.standardCategoryId
    if (id) {
      const routeStd = getCategoryStandardManagementRoute(depth.toString(), id)
      router.push(routeStd)
    } else {
      const routeStd = getCategoryStandardManagementRoute(value.standardCategoryDepth)
      const routeDsp = getCategoryDspManagementRoute(value.standardCategoryDepth)
      const idDsp = checkDspCatByKey(value?.upperStandardCategoryId)
      if (type === DeliveryCategoryTypeModel.DISPLAY || idDsp) {
        const displayCatId = value.standardCategoryId ? value.standardCategoryId : ''
        const createParams =
        routeDsp +
        `&displayCategoryDepth=${value.standardCategoryDepth}&upperDisplayCategoryId=${value.upperStandardCategoryId}&displayCategoryId=${displayCatId}&displayCategoryExposureOrder=${value.standardCategoryDisplayOrder}`
        router.push(createParams)
      } else {
        const createParams =
          routeStd +
          `&standardCategoryDepth=${value.standardCategoryDepth}&standardCategoryDisplayOrder=${value.standardCategoryDisplayOrder}&upperStandardCategoryId=${value.upperStandardCategoryId}`
        router.push(createParams)
      }
    }
  }

  return { handleMenuItemSelected }
}

// category standard
export const getCategoryStandardManagementRoute = (depth: string, id?: string) => {
  if (id) {
    return `/category/standard-category/management?depth=${depth}&id=${id}`
  }
  return `/category/standard-category/management?depth=${depth}`
}
export const getCategoryDspManagementRoute = (depth: string, id?: string) => {
  if (id) {
    return `/category/exhibition-category/management?depth=${depth}&id=${id}`
  }
  return `/category/exhibition-category/management?depth=${depth}`
}

export const checkDspCatByKey = (key: string) => {
  const startDspKeyString = 'D'
  return key?.[0] === startDspKeyString
}

export const DEFAULT_MENU_DEPTH = 1
export const DEFAULT_MENU_ORDER = 1
// export const DEFAULT_MD_KEY = 1
