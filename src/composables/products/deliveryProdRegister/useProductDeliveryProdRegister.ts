import { CHECK_INPUT_WITH_0, cloneArray } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables'
import { useProductRedirectLink } from '@/composables/products/common/useProductRedirectLink'
import { EmployeeStatusEnum, WelfareSelectOptionType } from '@/models'
import {
  ProductApprovalTicketBoTempItemOptionListModel,
  ProductOptionType,
  ProductOptionsDeliveryInfo,
  ProductRegisterValueOptionType,
  ProductTicketBoItemOptionListModel,
  ProductTicketOptionTab,
  ProductTypeRegisterOptionValue,
  productOptionsTypeRegisterConfig,
  productTicketApprovalStatus
} from '@/models/views/products'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { ComputedRef, computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductTicketRegistration } from '../ticketProduct/useProductTicketRegistration'
import {
  ProductDetailOptionPopupInfoRequest,
  ProductTicketDetailIssuedInfoRequest
} from '@/models/services/requests/products/ticket/ProductIssuedInfoRequest'
import {
  ProductTicketItemOptionDeleteRequest,
  ProductTicketItemOptionInventoryManageRequest
} from '@/models/services/requests/products/ticket/ProductTicketItemOptionRequest'
import {
  ProductApprovalTicketItemOptionDeleteRequest,
  ProductApprovalTicketItemOptionDetailRequest,
  ProductApprovalTicketItemOptionInventoryManageRequest
} from '@/models/services/requests/products/approval/ProductApprovalTicketItemOptionDetailRequest'
import { ProductTicketDetailBasicInfoProps } from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const initProductOptionsDeliveryInfo: ProductOptionsDeliveryInfo[] = [
  {
    salesStatus: productOptionsTypeRegisterConfig[0]
  }
]

export const useProductDeliveryProdRegister = (type: string, props?: ProductTicketDetailBasicInfoProps) => {
  let idDefault = 1000

  const checkDataNull = ref<boolean>(false)
  const valueType = ref<ProductOptionsDeliveryInfo[]>([...initProductOptionsDeliveryInfo])
  let oldValueType: ProductOptionsDeliveryInfo[] = []
  const valueOption = ref<ProductRegisterValueOptionType>(ProductRegisterValueOptionType.notUsed)
  const valueOptionOld = ref<ProductRegisterValueOptionType>(ProductRegisterValueOptionType.notUsed)
  const totalCount = ref<number | undefined>()
  const totalCountOld = ref<number | undefined>(0)
  const totalCountNoUse = ref<number | undefined>(0)
  const isSaveSuccess = ref<boolean>(false)
  const approvalValue = ref<boolean>(false)
  const dataMultipleValue = ref<boolean>(false)
  const typeOptionValue = ref<ProductTypeRegisterOptionValue>(undefined)
  const productKey = ref<number>(0)
  const lastProductProgressStatusCode = ref<string>('')
  const lastProductProgressStatusName = ref<string>('')
  const productCode = ref<string>('')
  const productClassificationCode = ref<string>('')
  const productRequestKey = ref<number>(0)
  const saveDisabled = ref<boolean>(false)
  const { openModal: openConfirmModal } = useModalConfirm()
  const { openModal: openNotificationModal, closeModalByPop } = useModalNotification()
  const route = useRoute()
  const router = useRouter()
  const { tabData } = useProductTicketRegistration()

  const code = route?.query?.code
  const classification = route?.query?.classification
  const productRequestKeyRoute = route?.query?.productRequestKey

  const { redirectCancelLink } = useProductRedirectLink(type)
  const updateValueType = (newValue: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean, typeOption?: ProductTypeRegisterOptionValue) => {
    if (type === productBaseInfoType.ticket && code && classification) {
      getItemDetailPopupInfo(productClassificationCode.value, productCode.value)
    } else if (productRequestKeyRoute) {
      getItemRequestDetailPopupInfo(Number(productRequestKeyRoute))
    } else {
      typeOptionValue.value = typeOption
      dataMultipleValue.value = checkDataMultiple ?? false

      const updatedValue = newValue.map((item) => ({
        ...item,
        optionId: item.optionId ?? ++idDefault,
        salesStatus: item.salesStatus || productOptionsTypeRegisterConfig[0]
      }))
      valueType.value.splice(0, valueType.value.length, ...updatedValue)
    }
  }

  const editValueType = (newValue: ProductOptionsDeliveryInfo, index: number) => {
    valueType.value[index] = newValue
  }

  const handleUpdateOptionYn = (newValue: ProductRegisterValueOptionType) => {
    valueOption.value = newValue
    const newOld = cloneArray<ProductOptionsDeliveryInfo>(oldValueType)
    if (newValue === ProductRegisterValueOptionType.use) {
      valueType.value.splice(0, valueType.value.length, ...newOld)
      totalCount.value = totalCountOld.value
    } else {
      totalCount.value = totalCountNoUse.value
    }
  }

  const updateValueOption = (newValue: ProductRegisterValueOptionType) => {
    const statusCode = lastProductProgressStatusCode.value
    if (statusCode || statusCode == null) {
      if (statusCode === productTicketApprovalStatus.awaitingApproval || statusCode === productTicketApprovalStatus.approvalCompleted) {
        openNotificationModal({
          content: '옵션을 변경할 수 없습니다.'
        })
      } else {
        openConfirmModal({
          content: '옵션을 변경할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
          onConfirm: () => {
            handleUpdateOptionYn(newValue)
            closeModalByPop?.()
          }
        })
      }
    } else {
      valueOption.value = newValue
    }
  }

  const deleteValueType = async (index: number, productOptionKey?: number) => {
    if (type === productBaseInfoType.ticket && code && classification) {
      deleteItemOption(productOptionKey ?? 0, productKey.value, index)
    } else if (productRequestKeyRoute) {
      deleteItemRequestOption(productOptionKey ?? 0, productRequestKey.value, index)
    } else {
      valueType.value.splice(index, 1)
    }
  }

  const updateValueTotalCount = (value: number | undefined) => {
    totalCount.value = value
  }

  const openCancelModal = () => {
    openConfirmModal({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(redirectCancelLink.value)
      }
    })
  }

  const openTemporaryStorageModal = () => {
    openNotificationModal({
      content: '입력한 정보가 저장되었습니다.'
    })
  }

  const countTotalOption = () => {
    let totalCountValue = 0
    valueType.value.forEach((item) => {
      if (item.inventory && item.salesStatus?.value === productOptionsTypeRegisterConfig[0].value) {
        totalCountValue = totalCountValue + item.inventory
      }
    })
    totalCount.value = totalCountValue
  }

  const openSaveModal = () => {
    let checkValue = false

    if (totalCount.value || totalCount.value === CHECK_INPUT_WITH_0) {
      checkValue = true
    }

    if (valueOption.value === ProductRegisterValueOptionType.use) {
      if (
        !valueType.value.every((item) => {
          const optionPrice = item.optionPrice
          const inventory = item.inventory
          const salesStatus = item.salesStatus?.value
          if (salesStatus === productOptionsTypeRegisterConfig[0].value) {
            if ((optionPrice || optionPrice === CHECK_INPUT_WITH_0) && (inventory || inventory === CHECK_INPUT_WITH_0)) {
              return true
            }
          } else {
            return true
          }
        })
      ) {
        checkValue = false
      }
    }

    if (checkValue) {
      if (
        lastProductProgressStatusCode.value === productTicketApprovalStatus.approvalCompleted &&
        valueOptionOld.value === ProductRegisterValueOptionType.use &&
        valueOption.value === ProductRegisterValueOptionType.notUsed
      ) {
        openNotificationModal({
          content: '승인완료 후 수정할 수 없는 항목입니다.'
        })
        valueOption.value = valueOptionOld.value
      } else if (type === productBaseInfoType.ticket) {
        if (lastProductProgressStatusCode.value === productTicketApprovalStatus.awaitingApproval) {
          openConfirmModal({
            content: '현재 승인 대기중인 상품이 존재합니다.'
          })
        } else {
          if (code && classification) {
            updateItemOptionInventoryManage()
          } else if (productRequestKeyRoute) {
            updateItemRequestOptionInventoryManage()
          }
          if (valueOptionOld.value === ProductRegisterValueOptionType.notUsed && !checkDataNull.value) {
            valueOption.value = valueOptionOld.value
            totalCount.value = totalCountOld.value
            valueType.value.splice(
              0,
              valueType.value.length,
              ...[
                {
                  salesStatus: productOptionsTypeRegisterConfig[0]
                }
              ]
            )
          }
        }
      } else {
        openNotificationModal({
          content: '배송정보 입력이 완료되었습니다.'
        })
      }
    } else {
      openNotificationModal({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
      })
    }
  }

  const onClickApproval = () => {
    openConfirmModal({
      content: '입력한 정보를 저장 완료한 후 승인요청 해주세요.'
    })
    approvalValue.value = true
  }

  const onPreviewClick = () => {
    // There are currently no pages linked to
  }

  const handleNextTab = () => {
    router.push({
      query: {
        ...route.query,
        tab: tabData[ProductTicketOptionTab.TAB_RELEASE].name
      }
    })
  }

  const typeRegisterOption: ComputedRef<ProductTypeRegisterOptionValue> = computed(() => {
    if (valueType.value.length == 0) return undefined
    return typeOptionValue.value
  })

  const findSalesStatus = (value: string): WelfareSelectOptionType => {
    const salesStatus = productOptionsTypeRegisterConfig.find((it) => it.value === value)
    return salesStatus ?? productOptionsTypeRegisterConfig[0]
  }

  const checkStatusButton = (progressStatusCode: string) => {
    lastProductProgressStatusCode.value = progressStatusCode
    productKey.value = props?.data?.productKey ?? 0
    if (progressStatusCode === productTicketApprovalStatus.approvalCompleted) {
      approvalValue.value = true
      saveDisabled.value = true
    } else if (progressStatusCode === productTicketApprovalStatus.registration) {
      saveDisabled.value = true
      approvalValue.value = false
    } else if (progressStatusCode == productTicketApprovalStatus.approvalWithdrawal) {
      saveDisabled.value = true
      approvalValue.value = false
    } else if (progressStatusCode === productTicketApprovalStatus.rejectedApproval) {
      saveDisabled.value = true
      approvalValue.value = false
    } else if (progressStatusCode === productTicketApprovalStatus.awaitingApproval) {
      saveDisabled.value = false
      approvalValue.value = false
    }
  }

  const getItemDetailOptionInfo = (productClassificationCode: string, productCode: string) => {
    if (productClassificationCode && productCode) {
      const request: ProductTicketDetailIssuedInfoRequest = { productClassificationCode, productCode }
      productTicketDetailInfoApi
        .getItemDetailOptionInfo(request)
        .then((res) => {
          const data = res.data
          const optionUseYn =
            data.optionUseYn && data.optionUseYn === EmployeeStatusEnum.Y
              ? ProductRegisterValueOptionType.use
              : ProductRegisterValueOptionType.notUsed

          valueOption.value = valueOptionOld.value === ProductRegisterValueOptionType.use ? valueOptionOld.value : optionUseYn
          valueOptionOld.value = optionUseYn
          totalCount.value = data.inventoryQuantity
          totalCountOld.value = data.inventoryQuantity

          productKey.value = data.productKey
          checkStatusButton(data.lastProductProgressStatusCode)
          const dataBoItemOptionListConvert: ProductOptionsDeliveryInfo[] = data.boItemOptionList.map((it: ProductTicketBoItemOptionListModel) => {
            return {
              no: it.optionDisplayOrder ?? 0,
              optionId: Number(it.optionId),
              option: it.option1DepthName,
              option1: it.option2DepthName,
              option2: it.option3DepthName,
              optionPrice: it.optionPrice,
              inventory: it.optionInventoryQuantity,
              salesStatus: findSalesStatus(it.optionSaleStatus!),
              selected: true,
              optionDisplayOrder: it.optionDisplayOrder,
              productKey: it.productKey,
              productReqeustOptionKey: it.productOptionKey
            }
          })
          const dataBoSort = dataBoItemOptionListConvert.sort((a, b) => (Number(a.no) ?? 0) - (Number(b.no) ?? 0))
          checkDataNull.value = dataBoSort.length > 0
          valueType.value.splice(0, valueType.value.length, ...cloneArray([...dataBoSort]))
          oldValueType = cloneArray<ProductOptionsDeliveryInfo>(dataBoSort)
          dataMultipleValue.value = data.sclassOptionUseYn === EmployeeStatusEnum.Y

          if (data.optionType === ProductOptionType.single) {
            typeOptionValue.value = 'single'
          } else if (data.optionType === ProductOptionType.multiple) {
            typeOptionValue.value = 'multiple'
          } else if (data.optionType === ProductOptionType.optional) {
            typeOptionValue.value = 'optional'
          } else {
            typeOptionValue.value = undefined
          }
          if (optionUseYn === ProductRegisterValueOptionType.notUsed) {
            totalCountNoUse.value = data.inventoryQuantity
          } else {
            countTotalOption()
          }
        })
        .catch(() => {
          // show error
        })
    }
  }

  const updateItemOptionInventoryManage = () => {
    const boItemOptionList: ProductTicketBoItemOptionListModel[] = valueType.value.map((it: ProductOptionsDeliveryInfo) => {
      return {
        productOptionKey: it.productReqeustOptionKey,
        optionId: it.optionId?.toString(),
        optionPrice: it.optionPrice,
        optionInventoryQuantity: it.inventory,
        optionSaleStatus: it.salesStatus?.value,
        optionDisplayOrder: it.no
      }
    })
    const request: ProductTicketItemOptionInventoryManageRequest = {
      optionUseYn: valueOption.value === ProductRegisterValueOptionType.use ? EmployeeStatusEnum.Y : EmployeeStatusEnum.N,
      inventoryQuantity: totalCount.value ?? 0,
      boItemOptionUpdateList: boItemOptionList,
      productKey: productKey.value
    }
    productTicketDetailInfoApi
      .updateItemOptionInventoryManage(request)
      .then((res) => {
        if (res.data.errMessage) {
          valueOption.value = valueOptionOld.value
          openNotificationModal({
            content: res.data.errMessage
          })
        } else if (res.data.sucessMessage) {
          openNotificationModal({
            content: res.data.sucessMessage,
            onAccept: handleNextTab
          })
        }
      })
      .catch(() => {
        valueOption.value = valueOptionOld.value
      })
  }

  const deleteItemOption = (productOptionKey: number, productKey: number, index: number) => {
    const request: ProductTicketItemOptionDeleteRequest = { productOptionKey, productKey }
    productTicketDetailInfoApi
      .deleteItemOption(request)
      .then((res) => {
        if (res.data.errMessage) {
          openNotificationModal({
            content: res.data.errMessage
          })
        } else if (res.data.sucessMessage) {
          if (valueType.value.length - 1 === 0) {
            valueType.value.splice(
              index,
              1,
              ...[
                {
                  salesStatus: productOptionsTypeRegisterConfig[0]
                }
              ]
            )
            typeOptionValue.value = undefined
          } else {
            valueType.value.splice(index, 1)
          }
        }
      })
      .catch(() => {
        //show error
      })
  }

  const getItemRequestDetailOptionInfo = (productRequestKey: number) => {
    const request = { productReqeustKey: productRequestKey }
    productTicketDetailInfoApi
      .getItemRequestDetailOptionInfo(request)
      .then((res) => {
        const data = res.data
        const optionUseYn =
          data.optionUseYn && data.optionUseYn === EmployeeStatusEnum.Y ? ProductRegisterValueOptionType.use : ProductRegisterValueOptionType.notUsed
        valueOption.value = valueOptionOld.value === ProductRegisterValueOptionType.use ? valueOptionOld.value : optionUseYn
        valueOptionOld.value = optionUseYn

        totalCount.value = data.inventoryQuantity
        totalCountOld.value = data.inventoryQuantity
        productKey.value = data.productKey

        lastProductProgressStatusCode.value = data.lastProductProgressStatusCode
        lastProductProgressStatusName.value = data.lastProductProgressStatusName
        productCode.value = data.productReqeustCode
        checkStatusButton(data.lastProductProgressStatusCode)
        const dataBoItemOptionListConvert: ProductOptionsDeliveryInfo[] = data.boTempItemOptionList.map(
          (it: ProductApprovalTicketBoTempItemOptionListModel) => {
            return {
              no: it.optionDisplayOrder ?? 0,
              optionId: Number(it.optionId),
              option: it.option1DepthName,
              option1: it.option2DepthName ?? '',
              option2: it.option3DepthName ?? '',
              optionPrice: it.optionPrice,
              inventory: it.optionInventoryQuantity,
              salesStatus: findSalesStatus(it.optionSaleStatus!),
              selected: true,
              optionDisplayOrder: it.optionDisplayOrder,
              productKey: it.productKey ?? 0,
              productReqeustOptionKey: it.productReqeustOptionKey
            }
          }
        )

        const dataBoSort = dataBoItemOptionListConvert.sort((a, b) => (Number(a.no) ?? 0) - (Number(b.no) ?? 0))

        checkDataNull.value = dataBoSort.length > 0
        valueType.value.splice(0, valueType.value.length, ...cloneArray([...dataBoSort]))
        oldValueType = cloneArray<ProductOptionsDeliveryInfo>(dataBoSort)
        dataMultipleValue.value = data.sclassOptionUseYn === EmployeeStatusEnum.Y

        if (data.optionType === ProductOptionType.single) {
          typeOptionValue.value = 'single'
        } else if (data.optionType === ProductOptionType.multiple) {
          typeOptionValue.value = 'multiple'
        } else if (data.optionType === ProductOptionType.optional) {
          typeOptionValue.value = 'optional'
        } else {
          typeOptionValue.value = undefined
        }
        if (optionUseYn === ProductRegisterValueOptionType.notUsed) {
          totalCountNoUse.value = data.inventoryQuantity
        } else {
          countTotalOption()
        }
      })
      .catch(() => {
        //show error
      })
  }

  const updateItemRequestOptionInventoryManage = () => {
    const boItemOptionList: ProductApprovalTicketBoTempItemOptionListModel[] = valueType.value.map((it: ProductOptionsDeliveryInfo) => {
      return {
        productReqeustOptionKey: it.productReqeustOptionKey,
        optionId: it.optionId?.toString(),
        optionPrice: it.optionPrice,
        optionInventoryQuantity: it.inventory,
        optionSaleStatus: it.salesStatus?.value,
        optionDisplayOrder: it.no
      }
    })

    const request: ProductApprovalTicketItemOptionInventoryManageRequest = {
      optionUseYn: valueOption.value === ProductRegisterValueOptionType.use ? EmployeeStatusEnum.Y : EmployeeStatusEnum.N,
      inventoryQuantity: totalCount.value ?? 0,
      boTempItemOptionUpdatList: boItemOptionList,
      productReqeustKey: productRequestKey.value,
      productKey: productKey.value
    }

    productTicketDetailInfoApi
      .updateItemRequestOptionInventoryManage(request)
      .then((res) => {
        if (res.data.errMessage) {
          valueOption.value = valueOptionOld.value
          openNotificationModal({
            content: res.data.errMessage
          })
        } else if (res.data.sucessMessage) {
          if (valueOption.value === ProductRegisterValueOptionType.notUsed) {
            totalCountNoUse.value = totalCount.value
          }
          openNotificationModal({
            content: res.data.sucessMessage,
            onAccept: handleNextTab
          })
        }
      })
      .catch(() => {
        valueOption.value = valueOptionOld.value
      })
  }

  const deleteItemRequestOption = (productReqeustOptionKey: number, productReqeustKey: number, index: number) => {
    const request: ProductApprovalTicketItemOptionDeleteRequest = { productReqeustOptionKey, productReqeustKey }
    productTicketDetailInfoApi
      .deleteItemRequestOption(request)
      .then((res) => {
        if (res.data.sucessMessage) {
          if (valueType.value.length - 1 === 0) {
            valueType.value.splice(
              index,
              1,
              ...[
                {
                  salesStatus: productOptionsTypeRegisterConfig[0]
                }
              ]
            )
            typeOptionValue.value = undefined
          } else {
            valueType.value.splice(index, 1)
          }
        } else if (res.data.errMessage) {
          openNotificationModal({
            content: res.data.errMessage
          })
        }
      })
      .catch(() => {})
  }

  const getItemRequestDetailPopupInfo = (productRequestKey: number) => {
    const request: ProductApprovalTicketItemOptionDetailRequest = { productReqeustKey: productRequestKey }
    productTicketDetailInfoApi
      .getItemRequestDetailOptionPopupInfo(request)
      .then((res) => {
        const data = res.data
        const dataBoItemOptionListConvert: ProductOptionsDeliveryInfo[] = data.boTempItemOptionPopupList.map(
          (it: ProductApprovalTicketBoTempItemOptionListModel) => {
            return {
              no: it.optionDisplayOrder ?? 0,
              optionId: Number(it.optionId),
              option: it.option1DepthName,
              option1: it.option2DepthName ?? '',
              option2: it.option3DepthName ?? '',
              salesStatus: findSalesStatus(it.optionSaleStatus!),
              selected: true,
              optionDisplayOrder: it.optionDisplayOrder,
              productKey: it.productKey ?? 0,
              productReqeustOptionKey: it.productReqeustOptionKey
            }
          }
        )
        const dataBoSort = dataBoItemOptionListConvert.sort((a, b) => (Number(a.no) ?? 0) - (Number(b.no) ?? 0))
        checkDataNull.value = dataBoSort.length > 0
        valueType.value.splice(0, valueType.value.length, ...cloneArray([...dataBoSort]))
        oldValueType = cloneArray<ProductOptionsDeliveryInfo>(dataBoSort)
      })
      .catch(() => {
        // show error
      })
  }

  const getItemDetailPopupInfo = (productClassificationCode: string, productCode: string) => {
    const request: ProductDetailOptionPopupInfoRequest = { productKey: productClassificationCode, productCode: productCode }
    productTicketDetailInfoApi
      .getItemDetailOptionPopupInfo(request)
      .then((res) => {
        const data = res.data
        const dataBoItemOptionListConvert: ProductOptionsDeliveryInfo[] = data.boItemOptionPopupList.map((it: ProductTicketBoItemOptionListModel) => {
          return {
            no: it.optionDisplayOrder ?? 0,
            optionId: Number(it.optionId),
            option: it.option1DepthName,
            option1: it.option2DepthName,
            option2: it.option3DepthName,
            salesStatus: findSalesStatus(it.optionSaleStatus!),
            selected: true,
            optionDisplayOrder: it.optionDisplayOrder,
            productKey: it.productKey,
            productReqeustOptionKey: it.productOptionKey
          }
        })

        const dataBoSort = dataBoItemOptionListConvert.sort((a, b) => (Number(a.no) ?? 0) - (Number(b.no) ?? 0))
        checkDataNull.value = dataBoSort.length > 0
        valueType.value.splice(0, valueType.value.length, ...cloneArray([...dataBoSort]))
        oldValueType = cloneArray<ProductOptionsDeliveryInfo>(dataBoSort)
      })
      .catch(() => {
        // show error
      })
  }

  watch(
    () => props?.data,
    () => {
      if (productRequestKeyRoute) {
        productRequestKey.value = Number(productRequestKeyRoute) ?? 0
        getItemRequestDetailOptionInfo(Number(productRequestKeyRoute))
      } else {
        const code = props?.data.productCode ?? ''
        const classificationCode = props?.data.productClassificationCode ?? ''
        if (type === productBaseInfoType?.ticket) {
          getItemDetailOptionInfo(classificationCode, code)
        }
      }
    },
    { immediate: true }
  )

  return {
    valueType,
    valueOption,
    isSaveSuccess,
    approvalValue,
    updateValueType,
    updateValueOption,
    editValueType,
    deleteValueType,
    totalCount,
    updateValueTotalCount,
    openCancelModal,
    openTemporaryStorageModal,
    openSaveModal,
    onClickApproval,
    typeRegisterOption,
    dataMultipleValue,
    countTotalOption,
    productKey,
    typeOptionValue,
    lastProductProgressStatusName,
    lastProductProgressStatusCode,
    onPreviewClick,
    checkDataNull,
    saveDisabled,
    productRequestKey
  }
}
