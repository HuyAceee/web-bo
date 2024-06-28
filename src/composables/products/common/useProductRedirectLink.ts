import {
  PRODUCT_APPROVAL_DELIVERY_PRODUCT_LIST,
  PRODUCT_APPROVAL_TICKET_PRODUCT_LIST,
  PRODUCT_DELIVERY_APPROVAL_PRODUCT,
  PRODUCT_DELIVERY_PRODUCT_LIST,
  PRODUCT_DELIVERY_REGISTRATION,
  PRODUCT_TICKET_APPROVAL_PRODUCT,
  PRODUCT_TICKET_PRODUCT_LIST,
  PRODUCT_TICKET_REGISTRATION
} from '@/common'
import { ProductTab } from '@/models'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useProductRedirectLink = (type: string, tab: string = ProductTab.EXHIBITION, query?: string) => {
  const redirectSavedLink = computed(() => {
    let prefix = ''
    if (type == productBaseInfoType.delivery) {
      prefix = PRODUCT_DELIVERY_REGISTRATION
    } else if (type == productBaseInfoType.ticket) {
      prefix = PRODUCT_TICKET_REGISTRATION
    } else if (type == productBaseInfoType.approval_delivery) {
      prefix = PRODUCT_DELIVERY_APPROVAL_PRODUCT
    } else if (type == productBaseInfoType.approval_ticket) {
      prefix = PRODUCT_TICKET_APPROVAL_PRODUCT
    }
    const link = prefix + '?tab=' + tab
    const linkWithQuery = link + '&' + query
    return query ? linkWithQuery : link
  })
  const redirectCancelLink = computed(() => {
    if (type == productBaseInfoType.delivery) {
      return PRODUCT_DELIVERY_PRODUCT_LIST
    } else if (type == productBaseInfoType.ticket) {
      return PRODUCT_TICKET_PRODUCT_LIST
    } else if (type == productBaseInfoType.approval_delivery) {
      return PRODUCT_APPROVAL_DELIVERY_PRODUCT_LIST
    } else if (type == productBaseInfoType.approval_ticket) {
      return PRODUCT_APPROVAL_TICKET_PRODUCT_LIST
    }

    return PRODUCT_DELIVERY_PRODUCT_LIST
  })

  return {
    redirectSavedLink,
    redirectCancelLink
  }
}

export const useProductCodeQuery = () => {
  const route = useRoute()
  return `code=${route.query.code}&classification=${route.query.classification}`
}
export const useProductApprovalCodeQuery = () => {
  const route = useRoute()
  return `productRequestKey=${route.query.productRequestKey}`
}
export const useProductRequestKeyQuery = () => {
  const route = useRoute()
  return `productRequestKey=${route.query.productRequestKey}`
}

export const getProductRegistrationRedirectLink = (
  productRequestKey?: string,
  baseUrl: string = PRODUCT_TICKET_REGISTRATION,
  tab: string = ProductTab.EXHIBITION
) => {
  return `${baseUrl}?tab=${tab}&productRequestKey=${productRequestKey}`
}
