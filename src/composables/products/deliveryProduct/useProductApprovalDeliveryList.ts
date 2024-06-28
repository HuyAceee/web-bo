import { ID_CHECKBOX_ALL } from '@/common'
import { ModalNotification } from '@/components/widgets'
import { useCheckbox } from '@/composables'
import { ApprovalTableDataModel, ProductDataFieldFormApprovalProductListConfig, ProductSearchType, WelfareSelectOptionType } from '@/models'
import { productDeliveryApi } from '@/services/api/products/ProductDeliveryApi'
import ProductReasonRejectApprovalModal from '@/views/products/modal/reasonProductApproval/ProductReasonRejectApprovalModal.vue'
import { computed } from 'vue'
import { useProductBaseList } from './useProductBaseList'
import { PRODUCT_STATUS } from '@/models/views/products/common/ProductTypeModel'

interface ApprovalDeliveryProductListForm {
  standardCategorySelect: WelfareSelectOptionType
  primaryClassificationSelect: WelfareSelectOptionType
  secondaryClassificationSelect: WelfareSelectOptionType
  tertiaryClassificationSelect: WelfareSelectOptionType
  companyChild: WelfareSelectOptionType
  findSellerInput: string
  findMdInput: string
  findBrandInput: string
  findModelInput: string
  requestClassification: string
  saveTemporarily: string
  productDateSelect: WelfareSelectOptionType
  fromDate: string
  toDate: string
  productType: string[]
  salesStatus: string[]
  exhibitionType: string[]
  exposureChannel: string[]
}

interface IListTypeForm {
  type?: ProductSearchType
  options?: WelfareSelectOptionType[]
  class?: string
  field: keyof ApprovalDeliveryProductListForm
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
  field: keyof ApprovalDeliveryProductListForm
}

const listFormSelectProduct: IListTypeForm[] = ProductDataFieldFormApprovalProductListConfig.listSelectProductType as IListTypeForm[]
const listInputFindProduct: IListTypeForm[] = ProductDataFieldFormApprovalProductListConfig.listInputFindProduct as IListTypeForm[]
const listCheckBoxTypes = ProductDataFieldFormApprovalProductListConfig.listCheckBoxTypes
const listCheckBoxDevices = ProductDataFieldFormApprovalProductListConfig.listCheckBoxDevices
const listCheckboxApprovalStatus = ProductDataFieldFormApprovalProductListConfig.listCheckboxApprovalStatus
const listCheckBoxExternalIntegration = ProductDataFieldFormApprovalProductListConfig.listCheckBoxExternalIntegration
const optionProductDate = ProductDataFieldFormApprovalProductListConfig.optionProductDate
const optionsProductListFilter = ProductDataFieldFormApprovalProductListConfig.optionsProductListFilter

export const useProductApprovalDeliveryList = () => {
  const initialValues = {
    secondaryClassificationSelect: listFormSelectProduct.find((item) => item.field === 'secondaryClassificationSelect')!.options![0],
    standardCategorySelect: listFormSelectProduct.find((item) => item.field === 'standardCategorySelect')!.options![0],
    primaryClassificationSelect: listFormSelectProduct.find((item) => item.field === 'primaryClassificationSelect')!.options![0],
    tertiaryClassificationSelect: listFormSelectProduct.find((item) => item.field === 'tertiaryClassificationSelect')!.options![0],
    requestClassification: 'new_registration',
    companyChild: undefined,
    saveTemporarily: 'no',
    findSellerInput: '',
    findMdInput: undefined,
    findBrandInput: undefined,
    findModelInput: '',
    productDateSelect: optionProductDate[0],
    fromDate: '',
    toDate: '',
    productType: [],
    salesStatus: [],
    exhibitionType: [],
    exposureChannel: []
  }

  const fetchData = (page: number, size: number) => {
    return productDeliveryApi.getProductApproveDeliveryList({
      pageNum: page,
      rowSize: size
    })
  }

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
    brandSearch,
    currentFilterDate,
    formFilter,
    isDisabledFilter,
    handleResetForm,
    listChecked,
    openModal,
    clearChecked,
    replaceModal
  } = useProductBaseList<ApprovalTableDataModel, any>({
    initialValuesForm: initialValues,
    defaultValueControlFilter: { ...optionsProductListFilter[0] },
    fetchDataCallback: fetchData,
    listActionCheckBox,
    notFilterInitForm: true
  })

  // handle refuse approval product
  const handleClickRefuseApprovalList = () => {
    checkListChecked(() => {
      const isSoldOut = listChecked.value.some((i) => items.value?.find((item) => item.id === i)?.approver_status === PRODUCT_STATUS.refuse_approval)
      handleMessageRefuseApproval(isSoldOut, listChecked.value, '이미 반려된 상품이 있습니다.')
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
      events: {
        onClose: closeModalByPop,
        onSave: () => {
          handleCompleteApprovalStatus(listChecked, PRODUCT_STATUS.refuse_approval)
        }
      }
    })
  }

  const handleCompleteApprovalStatus = (listChecked: string[], typeApproval: string) => {
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

  const handleRefuseApprovalById = (id: string) => {
    const isSoldOut = items.value?.find((item) => item.id === id)?.approver_status === PRODUCT_STATUS.refuse_approval
    handleMessageRefuseApproval(isSoldOut, [id], '이미 반려 처리되었습니다.')
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
      onConfirm: () => {
        handleCompleteApproval(listChecked)
      }
    })
  }

  const handleCompleteApproval = (listChecked: string[]) => {
    replaceModal?.({
      component: ModalNotification,
      props: {
        content: '선택한 상품이 승인완료 되었습니다.',
        buttonLabel: '확인',
        onAccept: () => {
          handleCompleteApprovalStatus(listChecked, PRODUCT_STATUS.approval)
        }
      }
    })
  }

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
    listRadioRequestClassificationChanged: ProductDataFieldFormApprovalProductListConfig.listRadioRequestClassification as IListRadioForm,
    listRadioSaveTemporarily: ProductDataFieldFormApprovalProductListConfig.listRadioSaveTemporarily as IListRadioForm,
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
    brandSearch,
    listCompanyChild: ProductDataFieldFormApprovalProductListConfig.listCompanyChild
  }
}
