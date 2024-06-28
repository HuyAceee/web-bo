import { messageRequired } from '@/assets'
import { cloneArray, getDatesInRange, sortByField } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import {
  EmployeeStatusEnum,
  ProductApprovalTicketBoTempItemOptionListModel,
  ProductDataValueModel,
  ProductDateRowKey,
  ProductOptionType,
  ProductOptionsDeliveryInfo,
  ProductRegisterOptionPropsModel,
  ProductTicketBoItemOptionListModel,
  ProductTypeRegisterOptionValue
} from '@/models'
import { computed, reactive, watch } from 'vue'
import { useProductRowAction } from './useProductRowAction'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { useRoute } from 'vue-router'
import { ProductTicketItemOptionManageRequest } from '@/models/services/requests/products/ticket/ProductTicketItemOptionRequest'
import { ProductApprovalTicketItemOptionManageRequest } from '@/models/services/requests/products/approval/ProductApprovalTicketItemOptionDetailRequest'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

export const useProductRegisterOptional = (
  callback: (value: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean, type?: ProductTypeRegisterOptionValue) => void,
  data: ProductOptionsDeliveryInfo[] | undefined,
  options?: ProductRegisterOptionPropsModel
) => {
  const { openModal } = useModalNotification()
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const dataValue = reactive<ProductDataValueModel>({
    beginDate: '',
    endDate: '',
    checkOption: false,
    checkAll: false
  })
  const emptyDataOption2: ProductOptionsDeliveryInfo = {
    option1: ''
  }
  const emptyDataOption3: ProductOptionsDeliveryInfo = {
    option2: ''
  }
  const dataOptional = reactive<ProductOptionsDeliveryInfo[]>([emptyDataOption2])
  const dataOptionalRequired = reactive<ProductOptionsDeliveryInfo[]>([emptyDataOption3])
  const dataOptionalData = reactive<ProductOptionsDeliveryInfo[]>(cloneArray(data, false))
  const { decreaseRow, increaseRow } = useProductRowAction<ProductOptionsDeliveryInfo>(dataOptional)
  const { decreaseRow: decreaseRowRequired, increaseRow: increaseRowRequired } = useProductRowAction<ProductOptionsDeliveryInfo>(dataOptionalRequired)
  const { decreaseRow: decreaseRowData } = useProductRowAction<ProductOptionsDeliveryInfo>(dataOptionalData)
  const route = useRoute()
  const productRequestKeyRoute = route?.query?.productRequestKey
  const code = route?.query?.code
  const classification = route?.query?.classification
  const hasDataOptional = computed(() => {
    return (
      !!dataOptional.find((item) => item.option?.trim()) ||
      !!dataValue.beginDate ||
      !!dataValue.endDate ||
      !!dataOptionalRequired.find((item) => item.option?.trim())
    )
  })

  const invalidValidation = () => {
    const itemHasValue = dataOptional.find((item) => !item.option1?.trim())
    if (!dataValue.beginDate || !dataValue.endDate || itemHasValue) return true
    return false
  }

  const handleChangeDate = ({ key, value }: { key: ProductDateRowKey; value: string }) => {
    dataValue[key] = value
  }

  const handleMapData = () => {
    if (invalidValidation()) return openModal({ content: messageRequired })
    dataOptionalData.splice(0)
    const list1 = getDatesInRange(dataValue.beginDate, dataValue.endDate)
    dataOptionalRequired.flatMap((item1) =>
      dataOptional.map((item2) => ({
        option1: item2.option1,
        option2: item1.option2,
        no: item1.noOption3 || item2.no
      }))
    )
    list1.forEach((option) => {
      dataOptional.forEach((option1) => {
        if (!dataValue.checkOption)
          return dataOptionalData.push({
            option,
            option1: option1.option1,
            no: option1.no
          })
        dataOptionalRequired.forEach((option2) => {
          dataOptionalData.push({
            option,
            option1: option1.option1,
            option2: option2.option2,
            no: `${option1.no}${option2.noOption3}`
          })
        })
      })
    })
    sortByField(dataOptionalData, 'no')
  }

  watch(
    dataOptionalData,
    (n) => {
      const isUnchecked = n.find((_) => !_.selected)
      if (isUnchecked || !n?.length) return (dataValue.checkAll = false)
      dataValue.checkAll = true
    },
    { immediate: true }
  )

  const onConfirmDelete = () => {
    dataValue.checkAll = false
    const tempList = [...dataOptionalData]
    dataOptionalData.splice(0)
    tempList.forEach((_) => {
      if (!_.selected) {
        dataOptionalData.push({
          ..._,
          selected: dataValue.checkAll
        })
      }
    })
  }

  const deleteMultipleRecord = () => {
    openConfirm({
      content: '선택한 항목을 삭제 하시겠습니까?',
      onConfirm() {
        onConfirmDelete()
        closeModalByPop?.()
      }
    })
  }

  const handleCheckAll = () => {
    dataValue.checkAll = !dataValue.checkAll
    const tempList = [...dataOptionalData]
    dataOptionalData.splice(0)
    tempList.forEach((_) => {
      dataOptionalData.push({
        ..._,
        selected: dataValue.checkAll
      })
    })
  }

  const updateItemOptionManageSelect = () => {
    const boItemOptionPopupInsertList: ProductTicketBoItemOptionListModel[] = dataOptionalData.map((it: ProductOptionsDeliveryInfo, idx: number) => {
      return {
        optionDisplayOrder: it.no ? it.no : idx + 1,
        option1DepthName: it.option,
        option2DepthName: it.option1,
        option3DepthName: it.option2,
        optionId: it.optionId?.toString(),
        productKey: options?.productKey
      }
    })

    const request: ProductTicketItemOptionManageRequest = {
      optionType: ProductOptionType.optional,
      sclassOptionUseYn: EmployeeStatusEnum.N,
      boItemOptionPopupInsertList: boItemOptionPopupInsertList,
      productKey: options?.productKey!
    }
    productTicketDetailInfoApi.updateItemOptionManage(request).then((res) => {
      if (res.data.errMessage) {
        return openModal({ content: res.data.errMessage })
      } else if (res.data.sucessMessage) {
        callback([...dataOptionalData], false, 'optional')
        closeModalByPop?.()
      }
    })
  }

  const updateItemRequestOptionManageSelect = () => {
    const boItemOptionPopupInsertList: ProductApprovalTicketBoTempItemOptionListModel[] = dataOptionalData.map(
      (it: ProductOptionsDeliveryInfo, idx: number) => {
        return {
          optionDisplayOrder: it.no ? it.no : idx + 1,
          option1DepthName: it.option,
          option2DepthName: it.option1,
          option3DepthName: it.option2,
          optionId: it.optionId?.toString(),
          productKey: it.productKey
        }
      }
    )

    const request: ProductApprovalTicketItemOptionManageRequest = {
      optionType: ProductOptionType.optional,
      sclassOptionUseYn: EmployeeStatusEnum.N,
      productKey: options?.productKey!,
      productReqeustKey: options?.productRequestKey!,
      boTempItemOptionPopupInsertList: boItemOptionPopupInsertList
    }
    productTicketDetailInfoApi.updateItemRequestOptionManage(request).then((res) => {
      if (res.data.sucessMessage) {
        callback([...dataOptionalData], false, 'optional')
        closeModalByPop?.()
      } else if (res.data.errMessage) {
        return openModal({ content: res.data.errMessage })
      }
    })
  }

  const handleSubmit = async () => {
    const isError = [...dataOptionalData].find((item) => !item.option?.trim() || !item?.option1?.trim())
    if (isError) return openModal({ content: messageRequired })
    if (options?.baseInfoType === productBaseInfoType.ticket && classification && code) {
      updateItemOptionManageSelect()
    } else if (options?.baseInfoType === productBaseInfoType.approval_ticket || productRequestKeyRoute) {
      updateItemRequestOptionManageSelect()
    } else {
      callback([...dataOptionalData], false, 'optional')
      closeModalByPop?.()
    }
  }

  return {
    increaseRow,
    decreaseRow,
    dataOptional,
    hasDataOptional,
    dataOptionalRequired,
    increaseRowRequired,
    decreaseRowRequired,
    decreaseRowData,
    dataOptionalData,
    handleMapData,
    handleCheckAll,
    deleteMultipleRecord,
    handleSubmit,
    dataValue,
    handleChangeDate
  }
}
