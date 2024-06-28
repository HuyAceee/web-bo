import { useModalConfirm, useModalNotification } from '@/composables'
import { useProductRedirectLink } from '@/composables/products/common/useProductRedirectLink'
import {
  ProductApprovalTicketBoTempItemOptionListModel,
  ProductOptionsDeliveryInfo,
  productOptionsTypeRegisterConfig,
  ProductOptionType,
  ProductRegisterValueOptionType,
  productTicketApprovalStatus,
  ProductTicketOptionTab,
  ProductTypeRegisterOptionValue
} from '@/models/views/products'
import { EmployeeStatusEnum, WelfareSelectOptionType } from '@/models'
import { computed, ComputedRef, onMounted, reactive, ref } from 'vue'
import { useProductReasonApproval } from '@/composables/products/modal/reasonProductApproval/useProductReasonApproval'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { CHECK_INPUT_WITH_0, cloneArray } from '@/common'
import { useRoute, useRouter } from 'vue-router'
import { useProductApprovalTicketWrapper } from '../ticketProduct/useProductApprovalTicketWrapper'
import { useHandleApprovalTicketProductActionButton } from '../../ticketProduct/provisionInfo/useProductTicketProvisionInformation'
import {
  ProductApprovalTicketItemOptionDeleteRequest,
  ProductApprovalTicketItemOptionDetailRequest,
  ProductApprovalTicketItemOptionInventoryManageRequest
} from '@/models/services/requests/products/approval/ProductApprovalTicketItemOptionDetailRequest'
import { PRODUCT_STATUS_ENUM, productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

export const useProductDeliveryApprovalOptionDetail = (type: string) => {
  const initProductOptionsDeliveryInfo: ProductOptionsDeliveryInfo[] = [
    {
      salesStatus: productOptionsTypeRegisterConfig[0]
    }
  ]
  let idDefault = 1000
  const valueType = reactive<ProductOptionsDeliveryInfo[]>(initProductOptionsDeliveryInfo)
  let oldValueType: ProductOptionsDeliveryInfo[] = []
  const valueOption = ref<ProductRegisterValueOptionType>(ProductRegisterValueOptionType.notUsed)
  const totalCount = ref<number | undefined>()
  const totalCountOld = ref<number | undefined>(0)
  const valueOptionOld = ref<ProductRegisterValueOptionType>(ProductRegisterValueOptionType.notUsed)
  const isSaveSuccess = ref<boolean>(false)
  const approvalValue = ref<boolean>(false)
  const dataMultipleValue = ref<boolean>(false)
  const typeOptionValue = ref<ProductTypeRegisterOptionValue>(undefined)
  const checkDataNull = ref<boolean>(false)
  const productKey = ref<number>(0)
  const productRequestKey = ref<number>(0)
  const lastProductProgressStatusCode = ref<string>('')
  const lastProductProgressStatusName = ref<string>('')
  const productCode = ref<string>('')
  const productName = ref<string>('')
  const totalCountNoUse = ref<number | undefined>(0)
  const { openModal: openConfirmModal } = useModalConfirm()
  const { openModal: openNotificationModal, closeModalByPop } = useModalNotification()
  const { onShowModal } = useProductReasonApproval()
  const { redirectCancelLink } = useProductRedirectLink(type)
  const router = useRouter()
  const route = useRoute()
  const { tabData } = useProductApprovalTicketWrapper()

  const updateValueType = (newValue: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean) => {
    if (type === productBaseInfoType.approval_ticket) {
      getItemRequestDetailPopupInfo(productRequestKey.value)
    } else {
      dataMultipleValue.value = checkDataMultiple ?? false
      const updatedValue = newValue.map((item) => ({
        ...item,
        optionId: item.optionId ?? ++idDefault,
        salesStatus: item.salesStatus ?? productOptionsTypeRegisterConfig[0]
      }))
      valueType.splice(0, valueType.length, ...updatedValue)
    }
  }

  const editValueType = (newValue: ProductOptionsDeliveryInfo, index: number) => {
    valueType[index] = newValue
  }

  const handleUpdateOptionYn = (newValue: ProductRegisterValueOptionType) => {
    valueOption.value = newValue
    valueOptionOld.value = newValue
    const newOld = cloneArray<ProductOptionsDeliveryInfo>(oldValueType)
    if (newValue === ProductRegisterValueOptionType.use) {
      valueType.splice(0, valueType.length, ...newOld)
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

  const deleteValueType = (index: number, productReqeustOptionKey?: number) => {
    if (type === productBaseInfoType.approval_ticket) {
      deleteItemRequestOption(productReqeustOptionKey ?? 0, productRequestKey.value, index)
    } else {
      valueType.splice(index, 1)
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
    valueType.forEach((item) => {
      if (item.inventory && item.salesStatus?.value === productOptionsTypeRegisterConfig[0].value) {
        totalCountValue = totalCountValue + item.inventory
      }
    })
    totalCount.value = totalCountValue
  }

  const openSaveModal = () => {
    let checkValue = true
    countTotalOption()
    if (!totalCount.value) {
      checkValue = true
    }
    if (valueOption.value === ProductRegisterValueOptionType.use) {
      if (
        !valueType.every((item) => {
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
      } else if (type === productBaseInfoType.approval_ticket) {
        if (lastProductProgressStatusCode.value === productTicketApprovalStatus.awaitingApproval) {
          openConfirmModal({
            content: '현재 승인 대기중인 상품이 존재합니다.'
          })
        } else {
          updateItemRequestOptionInventoryManage()
          if (valueOptionOld.value === ProductRegisterValueOptionType.notUsed && !checkDataNull.value) {
            valueOption.value = valueOptionOld.value
            totalCount.value = totalCountOld.value
            valueType.splice(
              0,
              valueType.length,
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
      isSaveSuccess.value = true
    } else {
      openConfirmModal({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
      })
    }
  }

  const onClickApproval = () => {
    approvalValue.value = true
  }

  const openApprovalReject = () => {
    openConfirmModal({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      onConfirm: () => {
        // Show modal ProductReasonRejectApprovalModal
        closeModalByPop?.()
        onShowModal()
      }
    })
  }

  const openConfirmApproval = () => {
    openConfirmModal({
      content: '선택한 상품을 승인 하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        showNotificationConfirmYesApproval()
      }
    })
  }
  const showNotificationConfirmYesApproval = () => {
    openNotificationModal({
      content: '선택한 상품이 승인완료 되었습니다.'
    })
  }

  const typeRegisterOption: ComputedRef<ProductTypeRegisterOptionValue> = computed(() => {
    if (!valueType.length) return undefined
    const isMultiple = valueType?.find((_) => _?.option1)
    if (isMultiple) return 'multiple'
    return 'single'
  })

  const handleNextTab = () => {
    router.push({
      query: {
        ...route.query,
        tab: tabData[ProductTicketOptionTab.TAB_RELEASE].name
      }
    })
  }

  const findSalesStatus = (value: string): WelfareSelectOptionType => {
    const salesStatus = productOptionsTypeRegisterConfig.find((it) => it.value === value)
    return salesStatus ?? productOptionsTypeRegisterConfig[0]
  }

  const getItemRequestDetailOptionInfo = (productRequestKey: number) => {
    const request = { productReqeustKey: productRequestKey }
    productTicketDetailInfoApi
      .getItemRequestDetailOptionInfo(request)
      .then((res) => {
        const data = res.data
        const optionUseYn =
          data.optionUseYn && data.optionUseYn === EmployeeStatusEnum.Y ? ProductRegisterValueOptionType.use : ProductRegisterValueOptionType.notUsed
        valueOption.value = optionUseYn
        valueOptionOld.value = optionUseYn
        totalCount.value = data.inventoryQuantity
        totalCountOld.value = data.inventoryQuantity
        productKey.value = data.productKey

        lastProductProgressStatusCode.value = data.lastProductProgressStatusCode
        lastProductProgressStatusName.value = data.lastProductProgressStatusName
        productCode.value = data.productReqeustCode
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
        valueType.splice(0, valueType.length, ...cloneArray([...dataBoSort]))
        oldValueType = cloneArray([...dataBoSort])
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
      .catch(() => {})
  }

  const updateItemRequestOptionInventoryManage = () => {
    const boItemOptionList: ProductApprovalTicketBoTempItemOptionListModel[] = valueType.map((it: ProductOptionsDeliveryInfo) => {
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
      .catch(() => {})
  }

  const deleteItemRequestOption = (productReqeustOptionKey: number, productReqeustKey: number, index: number) => {
    const request: ProductApprovalTicketItemOptionDeleteRequest = { productReqeustOptionKey, productReqeustKey }
    productTicketDetailInfoApi
      .deleteItemRequestOption(request)
      .then((res) => {
        if (res.data.sucessMessage) {
          if (valueType.length - 1 === 0) {
            valueType.splice(
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
            valueType.splice(index, 1)
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
        valueType.splice(0, valueType.length, ...cloneArray([...dataBoSort]))
        oldValueType = cloneArray<ProductOptionsDeliveryInfo>(dataBoSort)
      })
      .catch(() => {
        // show error
      })
  }
  const { handleRefuseApprovalById, handleApprovalById } = useHandleApprovalTicketProductActionButton()

  const handleRefuseApprovalByIdAction = () => {
    if (productRequestKey.value) {
      handleRefuseApprovalById(productRequestKey.value?.toString(), productKey.value?.toString(), lastProductProgressStatusCode.value, () => {
        lastProductProgressStatusCode.value = PRODUCT_STATUS_ENUM.APPROVAL_REJECTED
      })
    }
  }

  const handleApprovalByIdAction = () => {
    if (productRequestKey.value) {
      handleApprovalById(productRequestKey.value?.toString(), productKey.value?.toString(), lastProductProgressStatusCode.value, () => {
        lastProductProgressStatusCode.value = PRODUCT_STATUS_ENUM.APPROVAL_COMPLETED
      })
    }
  }

  onMounted(() => {
    if (type === productBaseInfoType.approval_ticket) {
      const routerRequestKey = Number(route?.query?.productRequestKey)
      productRequestKey.value = routerRequestKey
      getItemRequestDetailOptionInfo(routerRequestKey)
    }
  })

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
    openApprovalReject,
    openConfirmApproval,
    countTotalOption,
    productKey,
    typeOptionValue,
    lastProductProgressStatusCode,
    checkDataNull,
    productRequestKey,
    productCode,
    productName,
    handleRefuseApprovalByIdAction,
    handleApprovalByIdAction
  }
}
