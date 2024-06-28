import { ID_CHECKBOX_ALL, fileDocumentNames } from '@/common'
import { useCheckbox } from '@/composables/common'
import { handleDownloadFile } from '@/common/html'
import {
  ProductDataFieldFormDeliveryProductListModel,
  DeliveryProductListModal,
  ProductSearchRecordModel,
  ProductSearchType,
  WelfareSelectOptionType
} from '@/models'
import { productDeliveryApi } from '@/services/api/products/ProductDeliveryApi'
import { computed } from 'vue'
import { useProductBaseList } from './useProductBaseList'
import { PRODUCT_STATUS } from '@/models/views/products/common/ProductTypeModel'

interface DeliveryProductListForm {
  standardCategorySelect: WelfareSelectOptionType
  primaryClassificationSelect: WelfareSelectOptionType
  secondaryClassificationSelect: WelfareSelectOptionType
  tertiaryClassificationSelect: WelfareSelectOptionType
  companyChild: WelfareSelectOptionType
  findSellerInput: ProductSearchRecordModel
  findMdInput: ProductSearchRecordModel
  findBrandInput: ProductSearchRecordModel
  findModelInput: string
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
  field: keyof DeliveryProductListForm
  placeholder: string
  [key: string]: any
}

const listFormSelectProduct: IListTypeForm[] = ProductDataFieldFormDeliveryProductListModel.listSelectProductType as IListTypeForm[]
const listInputFindProduct: IListTypeForm[] = ProductDataFieldFormDeliveryProductListModel.listInputFindProduct as IListTypeForm[]
const listCheckBoxExternalIntegration = ProductDataFieldFormDeliveryProductListModel.listCheckBoxExternalIntegration
const listCheckBoxTypes = ProductDataFieldFormDeliveryProductListModel.listCheckBoxTypes
const listCheckBoxDevices = ProductDataFieldFormDeliveryProductListModel.listCheckBoxDevices
const optionProductDate = ProductDataFieldFormDeliveryProductListModel.optionProductDate
const optionsProductListFilter = ProductDataFieldFormDeliveryProductListModel.optionsProductListFilter

export const useProductDeliveryProductList = () => {
  const initialValues = {
    secondaryClassificationSelect: listFormSelectProduct.find((item) => item.field === 'secondaryClassificationSelect')!.options![0],
    standardCategorySelect: listFormSelectProduct.find((item) => item.field === 'standardCategorySelect')!.options![0],
    primaryClassificationSelect: listFormSelectProduct.find((item) => item.field === 'primaryClassificationSelect')!.options![0],
    tertiaryClassificationSelect: listFormSelectProduct.find((item) => item.field === 'tertiaryClassificationSelect')!.options![0],
    companyChild: undefined,
    findSellerInput: undefined,
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
    return productDeliveryApi.getProductDeliveryList({
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

  const externalLinkageCheckbox = computed(() => {
    return listCheckBoxExternalIntegration.list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })

  const productTypeCheckBox = useCheckbox(listIdCheckBoxType)
  const salesStatusCheckBox = useCheckbox(listIdCheckBoxTypes)
  const exhibitionTypeCheckBox = useCheckbox(exhibitionIdTypeCheckBox)
  const exposureChannelCheckBox = useCheckbox(exposureIdChannelCheckBox)
  const externalIntegrationCheckBox = useCheckbox(externalLinkageCheckbox)

  const listActionCheckBox = computed(() => {
    return {
      productTypeCheckBox,
      salesStatusCheckBox,
      exhibitionTypeCheckBox,
      exposureChannelCheckBox,
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
    listRefInput,
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
    clearChecked
  } = useProductBaseList<DeliveryProductListModal, any>({
    initialValuesForm: initialValues,
    defaultValueControlFilter: { ...optionsProductListFilter[0] },
    fetchDataCallback: fetchData,
    listActionCheckBox
  })

  const handleClickStopSell = () => {
    checkListChecked(() => {
      const isSoldOut = listChecked.value.some((i) => items.value?.find((item) => item.id === i)?.sales_status === PRODUCT_STATUS.sold_out)
      handleMessageStopSell(isSoldOut, listChecked.value)
    })
  }

  const handleMessageStopSell = (iHas: boolean, listChecked: string[]) => {
    if (iHas) {
      openModal?.({
        buttonLabel: '확인',
        content: '선택한 상품 중 이미 판매 종료 처리된 상품이 포함되어 있습니다.'
      })
      return
    }
    openModalConfirm({
      content: '판매종료 처리 시 즉시 비전시되며 주문 불가합니다. 선택한 항목을 판매종료 처리 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleCompleteSell(listChecked)
      }
    })
  }

  const handleCompleteSell = (listChecked: string[]) => {
    const newItems = [...(items.value ?? [])]
    newItems.forEach((item) => {
      const isHas = listChecked.includes(item.id)
      if (isHas) {
        item.sales_status = PRODUCT_STATUS.sold_out
        item.isSelected = false
      }
    })
    refTable?.value?.clearCheckAll?.()
    clearChecked()
    setData(newItems)
    closeModalByPop?.()
  }

  const handleStopOnlySeller = (id: string) => {
    const isSoldOut = items.value?.find((item) => item.id === id)?.sales_status === PRODUCT_STATUS.sold_out
    handleMessageStopSell(isSoldOut, [id])
  }

  const handleDownloadFileClick = () => {
    openModalConfirm({
      content: '조회된 상품을 다운로드 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleDownloadFile(fileDocumentNames.deliveryProductList.url, fileDocumentNames.deliveryProductList.name)
        closeModalByPop?.()
      }
    })
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
    listRefInput,
    componentSearch,
    mdSearch,
    brandSearch,
    items,
    totalItems,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    handleClickStopSell,
    handleDownloadFileClick,
    handleShowInfoSeller,
    handleStopOnlySeller,
    listCheckBoxExternalIntegration,
    refTable,
    listCompanyChild: ProductDataFieldFormDeliveryProductListModel.listCompanyChild
  }
}
