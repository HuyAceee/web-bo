import { messageRequired } from '@/assets'
import { cloneArray } from '@/common'
import { useModalNotification } from '@/composables/widgets'
import {
  EmployeeStatusEnum,
  ProductApprovalTicketBoTempItemOptionListModel,
  ProductOptionType,
  ProductOptionsDeliveryInfo,
  ProductRegisterOptionPropsModel,
  ProductTicketBoItemOptionListModel,
  ProductTypeRegisterOptionValue
} from '@/models'
import { computed, reactive } from 'vue'
import { useProductRowAction } from './useProductRowAction'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { useRoute } from 'vue-router'
import { ProductTicketItemOptionManageRequest } from '@/models/services/requests/products/ticket/ProductTicketItemOptionRequest'
import { ProductApprovalTicketItemOptionManageRequest } from '@/models/services/requests/products/approval/ProductApprovalTicketItemOptionDetailRequest'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

export const useProductRegisterSingleOptionModal = (
  callback: (value: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean, type?: ProductTypeRegisterOptionValue) => void,
  data: ProductOptionsDeliveryInfo[] | undefined,
  options?: ProductRegisterOptionPropsModel
) => {
  const route = useRoute()
  const dataSingle = reactive<ProductOptionsDeliveryInfo[]>(cloneArray(data))
  const { openModal, closeModalByPop } = useModalNotification()
  const { decreaseRow, increaseRow } = useProductRowAction<ProductOptionsDeliveryInfo>(dataSingle)
  const productRequestKeyRoute = route?.query?.productRequestKey
  const code = route?.query?.code
  const classification = route?.query?.classification
  const handleValidateSingle = () => {
    const isError = [...dataSingle].find((item) => !item.option?.trim())
    if (isError) return openModal({ content: messageRequired })
    if (options?.baseInfoType === productBaseInfoType.ticket && classification && code) {
      updateItemOptionManage()
    } else if (options?.baseInfoType === productBaseInfoType.approval_ticket || productRequestKeyRoute) {
      updateItemRequestOptionManage()
    } else {
      callback([...dataSingle], false, 'single')
      closeModalByPop?.()
    }
  }

  const updateItemOptionManage = () => {
    const boItemOptionPopupInsertList: ProductTicketBoItemOptionListModel[] = dataSingle.map((it: ProductOptionsDeliveryInfo) => {
      return {
        optionDisplayOrder: it.no,
        option1DepthName: it.option,
        optionId: it.optionId?.toString(),
        productKey: it.productKey
      }
    })

    const request: ProductTicketItemOptionManageRequest = {
      optionType: ProductOptionType.single,
      sclassOptionUseYn: EmployeeStatusEnum.N,
      boItemOptionPopupInsertList: boItemOptionPopupInsertList,
      productKey: options?.productKey!
    }

    productTicketDetailInfoApi.updateItemOptionManage(request).then((res) => {
      if (res.data.errMessage) {
        return openModal({ content: res.data.errMessage })
      } else if (res.data.sucessMessage) {
        callback([...dataSingle], false, 'single')
        closeModalByPop?.()
      }
    })
  }

  const updateItemRequestOptionManage = () => {
    const boItemOptionPopupInsertList: ProductApprovalTicketBoTempItemOptionListModel[] = dataSingle.map((it: ProductOptionsDeliveryInfo) => {
      return {
        optionDisplayOrder: it.no,
        option1DepthName: it.option,
        optionId: it.optionId?.toString(),
        productKey: it.productKey
      }
    })
    const request: ProductApprovalTicketItemOptionManageRequest = {
      optionType: ProductOptionType.single,
      sclassOptionUseYn: EmployeeStatusEnum.N,
      productKey: options?.productKey!,
      productReqeustKey: options?.productRequestKey!,
      boTempItemOptionPopupInsertList: boItemOptionPopupInsertList
    }

    productTicketDetailInfoApi.updateItemRequestOptionManage(request).then((res) => {
      if (res.data.sucessMessage) {
        callback([...dataSingle], false, 'single')
        closeModalByPop?.()
      } else if (res.data.errMessage) {
        return openModal({ content: res.data.errMessage })
      }
    })
  }

  const hasDataSingle = computed(() => {
    const itemHasValue = dataSingle.find((item) => item.option?.trim())
    return !!itemHasValue
  })

  return { decreaseRow, increaseRow, dataSingle, handleValidateSingle, hasDataSingle }
}
