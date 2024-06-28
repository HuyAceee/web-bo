import { messageRequired } from '@/assets'
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
import { computed, reactive, ref } from 'vue'
import { useProductRowAction } from './useProductRowAction'
import { cloneArray } from '@/common'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { useRoute } from 'vue-router'
import { ProductTicketItemOptionManageRequest } from '@/models/services/requests/products/ticket/ProductTicketItemOptionRequest'
import { ProductApprovalTicketItemOptionManageRequest } from '@/models/services/requests/products/approval/ProductApprovalTicketItemOptionDetailRequest'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

export const useProductRegisterMultipleOptionModal = (
  callback: (value: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean, type?: ProductTypeRegisterOptionValue) => void,
  data: ProductOptionsDeliveryInfo[] | undefined,
  checkOptionValue?: boolean,
  options?: ProductRegisterOptionPropsModel
) => {
  const route = useRoute()
  const { openModal, closeModalByPop } = useModalNotification()
  const checkOption = ref<boolean>(checkOptionValue ?? false)
  const dataMultiple = reactive<ProductOptionsDeliveryInfo[]>(cloneArray(data))
  const { decreaseRow, increaseRow } = useProductRowAction<ProductOptionsDeliveryInfo>(dataMultiple)
  const productRequestKeyRoute = route?.query?.productRequestKey
  const code = route?.query?.code
  const classification = route?.query?.classification
  const handleValidateMultiple = () => {
    const isError = [...dataMultiple].find((item) => !item.option?.trim() || !item?.option1?.trim())
    if (isError) return openModal({ content: messageRequired })
    const checkDataMultiple = checkOption.value
      ? [...dataMultiple]
      : [...dataMultiple].map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { option2, ...rest } = item
          return rest
        })
    if (options?.baseInfoType === productBaseInfoType.ticket && classification && code) {
      updateItemOptionManage(checkDataMultiple, checkOption.value)
    } else if (options?.baseInfoType === productBaseInfoType.approval_ticket || productRequestKeyRoute) {
      updateItemRequestOptionManage(checkDataMultiple, checkOption.value)
    } else {
      callback(checkDataMultiple, checkOption.value, 'multiple')
      closeModalByPop?.()
    }
  }

  const updateItemOptionManage = (checkDataMultiple: ProductOptionsDeliveryInfo[], checkOption2: boolean) => {
    const boItemOptionPopupInsertList: ProductTicketBoItemOptionListModel[] = dataMultiple.map((it: ProductOptionsDeliveryInfo) => {
      return {
        optionDisplayOrder: it.no,
        option1DepthName: it.option,
        option2DepthName: it.option1,
        option3DepthName: it.option2,
        optionId: it.optionId?.toString(),
        productKey: it.productKey
      }
    })

    const request: ProductTicketItemOptionManageRequest = {
      optionType: ProductOptionType.multiple,
      sclassOptionUseYn: checkOption2 ? EmployeeStatusEnum.Y : EmployeeStatusEnum.N,
      boItemOptionPopupInsertList: boItemOptionPopupInsertList,
      productKey: options?.productKey!
    }

    productTicketDetailInfoApi.updateItemOptionManage(request).then((res) => {
      if (res.data.errMessage) {
        return openModal({ content: res.data.errMessage })
      } else if (res.data.sucessMessage) {
        callback(checkDataMultiple, checkOption2, 'multiple')
        closeModalByPop?.()
      }
    })
  }

  const updateItemRequestOptionManage = (checkDataMultiple: ProductOptionsDeliveryInfo[], checkOption2: boolean) => {
    const boItemOptionPopupInsertList: ProductApprovalTicketBoTempItemOptionListModel[] = dataMultiple.map((it: ProductOptionsDeliveryInfo) => {
      return {
        optionDisplayOrder: it.no,
        option1DepthName: it.option,
        option2DepthName: it.option1,
        option3DepthName: it.option2,
        optionId: it.optionId?.toString(),
        productKey: it.productKey
      }
    })

    const request: ProductApprovalTicketItemOptionManageRequest = {
      optionType: ProductOptionType.multiple,
      sclassOptionUseYn: checkOption2 ? EmployeeStatusEnum.Y : EmployeeStatusEnum.N,
      productKey: options?.productKey ?? 0,
      productReqeustKey: options?.productRequestKey ?? 0,
      boTempItemOptionPopupInsertList: boItemOptionPopupInsertList
    }

    productTicketDetailInfoApi.updateItemRequestOptionManage(request).then((res) => {
      if (res.data.sucessMessage) {
        callback(checkDataMultiple, checkOption2, 'multiple')
        closeModalByPop?.()
      } else if (res.data.errMessage) {
        return openModal({ content: res.data.errMessage })
      }
    })
  }

  const hasDataMultiple = computed(() => {
    return !!dataMultiple.find((item) => item.option?.trim() ?? item.option1?.trim())
  })

  const handleUpdateCheckOption = (value: boolean) => {
    checkOption.value = value
  }

  return { increaseRow, decreaseRow, dataMultiple, handleValidateMultiple, checkOption, hasDataMultiple, handleUpdateCheckOption }
}
