import { ID_CHECKBOX_ALL } from '@/common'
import { useCheckbox } from '@/composables'
import { ApprovalTableDataModel, ProductDataFieldFormApprovalTicketProductListConfig, ProductSearchType, WelfareSelectOptionType } from '@/models'
import { YnOptions } from '@/models/common'
import { deliveryInfoApi } from '@/services/api/delivery/DeliveryInfoApi'
import { productTicketApi } from '@/services/api/products/ProductTicketApi'
import ProductReasonRejectApprovalModal from '@/views/products/modal/reasonProductApproval/ProductReasonRejectApprovalModal.vue'
import { Ref, computed, onMounted, ref, watch } from 'vue'
import { useProductBaseList } from '../deliveryProduct/useProductBaseList'
import {
  ProductApprovalTicketProductListForm,
  ProductProcessRequestType,
  ProductTicketApprovedListRequestConvertor
} from '@/models/services/requests/products/approval/ProductTicketApprovalListRequest'
import { ProductTicketCategoryDspModel } from '@/models/services/responses/products/ticket/ProductTicketListResponse'
import { DeliverySubSellerSimpleModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'
import { PRODUCT_STATUS, PRODUCT_STATUS_ENUM } from '@/models/views/products/common/ProductTypeModel'

interface IListTypeForm {
  type?: ProductSearchType
  options?: WelfareSelectOptionType[]
  class?: string
  field: keyof ProductApprovalTicketProductListForm
  placeholder: string
  [key: string]: any
}
interface IListRadioForm {
  title: string
  list: {
    label: string
    value: string
  }[]
  class?: string
  field: keyof ProductApprovalTicketProductListForm
}

const listFormSelectProduct: IListTypeForm[] = ProductDataFieldFormApprovalTicketProductListConfig.listSelectProductType as IListTypeForm[]
const listInputFindProduct: IListTypeForm[] = ProductDataFieldFormApprovalTicketProductListConfig.listInputFindProduct as IListTypeForm[]
const listCheckBoxTypes = ProductDataFieldFormApprovalTicketProductListConfig.listCheckBoxTypes
const listCheckBoxDevices = ProductDataFieldFormApprovalTicketProductListConfig.listCheckBoxDevices
const listCheckboxApprovalStatus = ProductDataFieldFormApprovalTicketProductListConfig.listCheckboxApprovalStatus
const listCheckBoxExternalIntegration = ProductDataFieldFormApprovalTicketProductListConfig.listCheckBoxExternalIntegration
const optionProductDate = ProductDataFieldFormApprovalTicketProductListConfig.optionProductDate
const optionsProductListFilter = ProductDataFieldFormApprovalTicketProductListConfig.optionsProductListFilter

const productCategoryData = [
  {
    options: [
      { label: '표준카테고리', value: '1' },
      { label: '전시카테고리', value: '2' }
    ],
    field: 'standardCategorySelect',
    placeholder: '표준카테고리'
  },
  {
    options: [],
    field: 'primaryClassificationSelect',
    placeholder: '1차 분류'
  },
  {
    options: [],
    field: 'secondaryClassificationSelect',
    placeholder: '2차 분류'
  },
  {
    options: [],
    field: 'tertiaryClassificationSelect',
    placeholder: '3차 분류'
  }
]
export const useProductApprovalTicketList = () => {
  const initialValues: ProductApprovalTicketProductListForm = {
    secondaryClassificationSelect: undefined,

    standardCategorySelect: undefined,
    primaryClassificationSelect: undefined,
    tertiaryClassificationSelect: undefined,

    requestClassification: ProductProcessRequestType.CREATION,
    companyChild: undefined,
    saveTemporarily: YnOptions.Y,
    findSellerInput: undefined,
    selectSubSellerInput: undefined,
    findMdInput: undefined,
    productDateSelect: optionProductDate[0],
    fromDate: '',
    toDate: '',
    productType: [],
    salesStatus: [],
    exhibitionType: [],
    exposureChannel: [],
    searchWord: ''
  }

  const productCategoryForm = ref(productCategoryData)

  const listIdCheckBoxType = computed(() => {
    return listCheckBoxTypes[0].list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })

  const listIdCheckBoxTypes = computed(() => {
    return listCheckBoxTypes[1].list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })
  const exhibitionIdTypeCheckBox = computed(() => {
    return listCheckBoxDevices[0].list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })
  const exposureIdChannelCheckBox = computed(() => {
    return listCheckBoxDevices[1].list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })

  const approvalStatusArrayCheckBox = computed(() => {
    return listCheckboxApprovalStatus.list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })

  const externalIntegrationArrayCheckBox = computed(() => {
    return listCheckBoxExternalIntegration.list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })

  const productTypeCheckBox = useCheckbox(listIdCheckBoxType)
  const salesStatusCheckBox = useCheckbox(listIdCheckBoxTypes)
  const exhibitionTypeCheckBox = useCheckbox(exhibitionIdTypeCheckBox)
  const exposureChannelCheckBox = useCheckbox(exposureIdChannelCheckBox)
  const approvalStatusCheckBox = useCheckbox(approvalStatusArrayCheckBox)
  const externalIntegrationCheckBox = useCheckbox(externalIntegrationArrayCheckBox)

  const listActionCheckBox = computed(() => {
    return {
      productTypeCheckBox,
      salesStatusCheckBox,
      exhibitionTypeCheckBox,
      exposureChannelCheckBox,
      approvalStatusCheckBox,
      externalIntegrationCheckBox
    }
  })

  const fetchData = (page: number, size: number) => {
    const requestAPIPage = page + 1
    return handleGetListItem(requestAPIPage, size)
  }

  const {
    items,
    totalItems,
    isLoading,
    setData,
    checkListChecked,
    handleShowInfoSeller,
    onPageChange,
    handleChangeCountDate,
    handleResetFilter,
    handleChangeFilterForm,
    handleCheckBoxChange,
    handleChangeValueSelect,
    getIsCheckBox,
    openModalConfirm,
    closeModalByPop,
    onRowSelected,
    onSelectAllChange,
    values,
    setFieldValue,
    refTable,
    componentSearch,
    mdSearch,
    currentFilterDate,
    formFilter,
    handleResetForm,
    listChecked,
    openModal,
    clearChecked,
    replaceModal,
    page,
    refreshData
  } = useProductBaseList<ApprovalTableDataModel, any>({
    initialValuesForm: initialValues,
    defaultValueControlFilter: { ...optionsProductListFilter[0] },
    fetchDataCallback: fetchData,
    listActionCheckBox,
    notInitData: true,
    notFilterInitForm: true
  })

  const row: Ref<number> = computed(() => page.value.rows)
  const subSeller: Ref<WelfareSelectOptionType[]> = ref([])

  // handle get data
  const handleGetListItem = async (page: number = 1, size: number = row.value) => {
    const formData = {
      ...values,
      ...listActionCheckBox.value,
      formFilter
    }
    const params = ProductTicketApprovedListRequestConvertor.from({ ...formData }, size, page)
    const data = await productTicketApi.getTicketApprovalList(params)

    return data
  }

  const handleSearch = async () => {
    refreshData().catch(() => {})
  }

  const isDisabledFilter = computed(() => {
    return formFilter.value.value !== 'none'
  })

  // handle get seller
  watch(
    () => values.findSellerInput?.code,
    async (val) => {
      if (val) {
        try {
          const { data: seller } = await deliveryInfoApi.getSellerInfo(val)

          const { data: subSellerData } = await deliveryInfoApi.getSubSellerSimpleInfo(seller.sellerKey)

          subSeller.value = subSellerData.map((it: DeliverySubSellerSimpleModel) => {
            return {
              label: it.subSellerName,
              value: it.managerKey
            }
          })
        } catch (error) {
          /* empty */
        }
      }
    },
    { immediate: true }
  )

  const handleSubmitApproval = async (listId: string[], type: string, reasonRefuse?: string) => {
    if (items.value) {
      const listProduct = items.value
        .filter((item) => listId.includes(item.id))
        .map((item) => {
          return {
            productReqeustKey: item.id,
            // productKey: item.productKey ?? '',
            // productRequestProgressStatus: type,
            productRequestProcessReason: reasonRefuse ?? ''
            // etcMemoCnts: ''
          }
        })
      try {
        if (type === PRODUCT_STATUS_ENUM.APPROVAL_REJECTED) {
          const preparedRequestReject = {
            boTempItemRejectRequestBodyList: listProduct
          }
          await productTicketApi.itemRequestReject(preparedRequestReject)
        } else {
          const preparedRequestApproval = {
            boTempItemApprovalRequestBodyList: listProduct.map((item) => {
              return {
                productReqeustKey: item.productReqeustKey
              }
            })
          }
          await productTicketApi.itemRequestApproval(preparedRequestApproval)
        }
        refreshData()
      } catch (error) {
        /* empty */
      }
    }
  }

  const handleChangeCategory = async () => {
    try {
      const { data } = await productTicketApi.getDataTicketDspCategoryDepth1()
      const standardCategory = data.map((it: ProductTicketCategoryDspModel) => {
        return {
          label: it.displayCategoryName ?? '',
          value: it.displayCategoryId ?? ''
        }
      })
      productCategoryForm.value[1].options = standardCategory
    } catch (error) {
      /* empty */
    }
  }
  watch(
    () => values.primaryClassificationSelect,
    async (newValue) => {
      if (!newValue) {
        setFieldValue('secondaryClassificationSelect', undefined)
        setFieldValue('tertiaryClassificationSelect', undefined)
        productCategoryForm.value[2].options = []
        productCategoryForm.value[3].options = []
        return
      }
      try {
        const { data } = await productTicketApi.getDataTicketDspCategoryDepth2(newValue.value)
        const primaryClassification = data.map((it: ProductTicketCategoryDspModel) => {
          return {
            label: it.displayCategoryName ?? '',
            value: it.displayCategoryId ?? ''
          }
        })
        productCategoryForm.value[2].options = primaryClassification
        productCategoryForm.value[3].options = []
      } catch (error) {
        /* empty */
      }
    },
    { immediate: true }
  )
  watch(
    () => values.secondaryClassificationSelect,
    async (newValue) => {
      if (!newValue) {
        setFieldValue('tertiaryClassificationSelect', undefined)
        productCategoryForm.value[3].options = []
        return
      }
      try {
        const { data } = await productTicketApi.getDataTicketDspCategoryDepth3(newValue.value)
        productCategoryForm.value[3].options = data.map((it: ProductTicketCategoryDspModel) => {
          return {
            label: it.displayCategoryName ?? '',
            value: it.displayCategoryId ?? ''
          }
        })
      } catch (error) {
        /* empty */
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    handleChangeCategory()
  })

  const handleCompleteApprovalStatus = async (listChecked: string[], typeApproval: string, reasonRefuse?: string) => {
    try {
      await handleSubmitApproval(listChecked, typeApproval, reasonRefuse)
    } catch (error) {
      /* empty */
    }
    const newItems = [...(items.value ?? [])]
    newItems.forEach((item) => {
      const isHas = listChecked.includes(item.id)
      if (isHas) {
        item.approver_status = typeApproval
        item.isSelected = false
      }
    })
    clearChecked()
    refTable?.value?.clearCheckAll()
    setData(newItems)
    closeModalByPop?.()
  }

  // handle refuse approval product
  const handleClickRefuseApprovalList = () => {
    checkListChecked(() => {
      const isRejected = listChecked.value.some(
        (i) => items.value?.find((item) => item.id === i)?.approver_status === PRODUCT_STATUS_ENUM.APPROVAL_REJECTED
      )
      handleMessageRefuseApproval(isRejected, listChecked.value, '이미 반려된 상품이 있습니다.')
    }, '선택된 상품이 없습니다.')
  }

  const handleMessageRefuseApproval = (iHas: boolean, listChecked: string[], message: string) => {
    if (iHas) {
      openModal?.({
        buttonLabel: '확인',
        content: message
      })
      return
    }
    openModalConfirm({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleShowPopupReason(listChecked)
      }
    })
  }

  const handleShowPopupReason = (listChecked: string[]) => {
    replaceModal?.({
      component: ProductReasonRejectApprovalModal,
      props: {
        usingApiMessage: true
      },
      events: {
        onClose: closeModalByPop,
        onSave: (reasonRefuse: string) => {
          handleCompleteApprovalStatus(listChecked, PRODUCT_STATUS_ENUM.APPROVAL_REJECTED, reasonRefuse)
        }
      }
    })
  }

  const handleRefuseApprovalById = (id: string) => {
    const isRejected = items.value?.find((item) => item.id === id)?.approver_status === PRODUCT_STATUS.refuse_approval
    handleMessageRefuseApproval(isRejected, [id], '이미 반려 처리되었습니다.')
  }

  // handle approval product

  const handleClickApprovalProductList = () => {
    checkListChecked(() => {
      const isApproval = listChecked.value.some((i) => items.value?.find((item) => item.id === i)?.approver_status === PRODUCT_STATUS.approval)
      handleMessageApproval(isApproval, listChecked.value, '이미 승인완료된 상품이 있습니다.')
    }, '선택된 상품이 없습니다.')
  }

  const handleMessageApproval = (iHas: boolean, listChecked: string[], message: string) => {
    if (iHas) {
      openModal?.({
        buttonLabel: '확인',
        content: message
      })
      return
    }
    openModalConfirm({
      content: '선택한 상품을 승인 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: async () => {
        closeModalByPop?.()
        await handleCompleteApprovalStatus(listChecked, PRODUCT_STATUS_ENUM.APPROVAL_COMPLETED)
        // await handleCompleteApproval(listChecked)
      }
    })
  }

  // const handleCompleteApproval = async (listChecked: string[]) => {
  //   replaceModal?.({
  //     component: ModalNotification,
  //     props: {
  //       content: '선택한 상품이 승인완료 되었습니다.',
  //       buttonLabel: '확인',
  //       onAccept: () => {
  //         closeModalByPop?.()
  //       }
  //     }
  //   })
  // }

  const handleApprovalById = (id: string) => {
    const isApproval = items.value?.find((item) => item.id === id)?.approver_status === PRODUCT_STATUS.approval
    handleMessageApproval(isApproval, [id], '이미 승인완료되었습니다.')
  }

  return {
    values,
    handleChangeValueSelect,
    handleChangeFilterForm,
    handleResetForm,
    getIsCheckBox,
    handleCheckBoxChange,
    listFormSelectProduct,
    listInputFindProduct,
    listCheckBoxTypes,
    listCheckBoxDevices,
    optionProductDate,
    optionsProductListFilter,
    currentFilterDate,
    isDisabledFilter,
    formFilter,
    setFieldValue,
    handleResetFilter,
    handleChangeCountDate,
    listRadioRequestClassificationChanged: ProductDataFieldFormApprovalTicketProductListConfig.listRadioRequestClassification as IListRadioForm,
    listRadioSaveTemporarily: ProductDataFieldFormApprovalTicketProductListConfig.listRadioSaveTemporarily as IListRadioForm,
    listCheckboxApprovalStatus,
    listCheckBoxExternalIntegration,
    onRowSelected,
    onPageChange,
    onSelectAllChange,
    totalItems,
    isLoading,
    items,
    handleShowInfoSeller,
    handleClickRefuseApprovalList,
    handleRefuseApprovalById,
    refTable,
    handleClickApprovalProductList,
    handleApprovalById,
    componentSearch,
    mdSearch,
    listCompanyChild: subSeller,
    handleGetListItem,
    productCategoryForm,
    handleSearch
  }
}
