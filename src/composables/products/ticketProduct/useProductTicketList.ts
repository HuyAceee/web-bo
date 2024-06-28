import { ProductTicketCategoryDspModel } from '@/models/services/responses/products/ticket/ProductTicketListResponse'
import { ID_CHECKBOX_ALL, fileDocumentNames } from '@/common'
import { useCheckbox } from '@/composables'
import { useDeliveryMemberSellerCompany } from '@/composables/delivery/ticketProductOrderManagement/useDeliveryMemberSellerCompany'
import {
  ProductDataFieldFormTicketProductListlConfig,
  ProductSearchType,
  ProductTicketCategoryType,
  ProductTicketListForm,
  ProductTicketProductListModel,
  WelfareSelectOptionType,
  YnOptions
} from '@/models'
import { productTicketApi } from '@/services/api/products/ProductTicketApi'
import { computed, ref, watch } from 'vue'
import { useProductBaseList } from '../deliveryProduct/useProductBaseList'
import {
  ProductTicketStdCategoryChildRequest,
  ProductTicketStdCategoryRequest
} from '@/models/services/requests/products/ticket/ProductTicketListRequest'
import { handleDownloadFile } from '@/common/html'
import { PRODUCT_STATUS } from '@/models/views/products/common/ProductTypeModel'
interface IListTypeForm {
  type?: ProductSearchType
  options?: WelfareSelectOptionType[]
  class?: string
  field: keyof ProductTicketListForm
  placeholder: string
  [key: string]: any
}

const listFormSelectProduct: IListTypeForm[] = ProductDataFieldFormTicketProductListlConfig.listSelectProductType as IListTypeForm[]
const listInputFindProduct: IListTypeForm[] = ProductDataFieldFormTicketProductListlConfig.listInputFindProduct as IListTypeForm[]
const listCheckBoxTypes = ProductDataFieldFormTicketProductListlConfig.listCheckBoxTypes
const listCheckBoxDevices = ProductDataFieldFormTicketProductListlConfig.listCheckBoxDevices
const optionProductDate = ProductDataFieldFormTicketProductListlConfig.optionProductDate
const optionsProductListFilter = ProductDataFieldFormTicketProductListlConfig.optionsProductListFilter
const listCheckBoxExternalIntegration = ProductDataFieldFormTicketProductListlConfig.listCheckBoxExternalIntegration
const selectOptionCategoryDepth1 = ref<WelfareSelectOptionType[]>([])
const selectOptionCategoryDepth2 = ref<WelfareSelectOptionType[]>([])
const selectOptionCategoryDepth3 = ref<WelfareSelectOptionType[]>([])
const searchSellerRef = ref()
export const useProductTicketList = () => {
  const initialValues: ProductTicketListForm = {
    standardCategorySelect: listFormSelectProduct.find((item) => item.field === 'standardCategorySelect')!.options![0],
    subcontractKey: undefined,
    findMdInput: '',
    productDateSelect: optionProductDate[0],
    searchWord: '',
    fromDate: '',
    toDate: '',
    productType: '',
    salesStatus: '',
    exhibitionType: '',
    exposureChannel: ''
  }
  // const listSelectChildCompanies = ref<WelfareSelectOptionType>([])
  const paramsCateOptionStd = ref<ProductTicketStdCategoryRequest>({})
  const paramsCateOptionStdChild = ref<ProductTicketStdCategoryChildRequest>({})
  const listIdCheckBoxType = computed(() => {
    return listCheckBoxTypes[0].list.filter((item) => item.id !== 'all').map((item) => item.id)
  })

  const listIdCheckBoxTypes = computed(() => {
    return listCheckBoxTypes[1].list.filter((item) => item.id !== 'all').map((item) => item.id)
  })
  const exhibitionIdTypeCheckBox = computed(() => {
    return listCheckBoxDevices[0].list.filter((item) => item.id !== 'all').map((item) => item.id)
  })
  const exposureIdChannelCheckBox = computed(() => {
    return listCheckBoxDevices[1].list.filter((item) => item.id !== 'all').map((item) => item.id)
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

  const valueOptionConvert = (isAll: boolean, value: string) => {
    if (isAll) {
      return ''
    }
    return value
  }

  const fetchData = async (page: number, size: number) => {
    try {
      const resData = await productTicketApi.getDataTicketList(page, size, {
        ...values,
        externalIntegrationCheckBox: valueOptionConvert(
          listActionCheckBox.value.externalIntegrationCheckBox?.isCheckboxAll?.value,
          listActionCheckBox.value.externalIntegrationCheckBox?.listChecked?.value[0]
        ),
        exposureChannel: valueOptionConvert(
          listActionCheckBox.value.exposureChannelCheckBox?.isCheckboxAll?.value,
          listActionCheckBox.value.exposureChannelCheckBox?.listChecked?.value[0]
        ),
        exhibitionType: valueOptionConvert(
          listActionCheckBox.value.exhibitionTypeCheckBox?.isCheckboxAll?.value,
          listActionCheckBox.value.exhibitionTypeCheckBox?.listChecked?.value[0]
        ),
        salesStatus: valueOptionConvert(
          listActionCheckBox.value.salesStatusCheckBox?.isCheckboxAll?.value,
          listActionCheckBox.value.salesStatusCheckBox?.listChecked?.value[0]
        ),
        productType: valueOptionConvert(
          listActionCheckBox.value.productTypeCheckBox?.isCheckboxAll?.value,
          listActionCheckBox.value.productTypeCheckBox?.listChecked?.value[0]
        ),
        searchWordType: valueOptionConvert(formFilter.value?.id === 'all', formFilter.value?.id)
      })
      return Promise.resolve({ totalItems: +resData.totalItems, data: resData.data })
    } catch (error) {
      // console.error(error)
    }
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
    isDisabledFilter,
    handleResetForm,
    listChecked,
    openModal,
    clearChecked,
    refreshData
  } = useProductBaseList<ProductTicketProductListModel, ProductTicketListForm>({
    initialValuesForm: initialValues,
    onResetForm: () => {
      searchSellerRef.value.handleReset()
    },
    defaultValueControlFilter: { ...optionsProductListFilter[0] },
    fetchDataCallback: fetchData,
    listActionCheckBox,
    notFilterInitForm: true,
    notInitData: true
  })
  const { sellerCompanies } = useDeliveryMemberSellerCompany<ProductTicketListForm>(values, setFieldValue)
  watch(
    () => [
      values.findMdInput,
      valueOptionConvert(
        listActionCheckBox.value.exhibitionTypeCheckBox.isCheckboxAll.value,
        listActionCheckBox.value.exhibitionTypeCheckBox.listChecked.value[0]
      )
    ],
    (newData) => {
      const allFlag = newData[1] ? newData[1] : YnOptions.Y
      const mdKey = newData[0] ? newData[0].code.toString() : ''
      paramsCateOptionStd.value = { allFlag, chargeMdKey: mdKey }
    }
  )
  const handleClickStopSell = () => {
    checkListChecked(() => {
      const isSoldOut = listChecked.value.some((i) => items.value?.find((item) => item.id === i)?.sales_status === PRODUCT_STATUS.sold_out)
      handleMessageStopSell(isSoldOut, listChecked.value)
    }, '판매 종료를 원하는 상품을 선택 후 버튼을 클릭해 주세요.')
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

  const convertIdToNumber = (id: string): number => {
    return parseInt(id)
  }

  const handleCompleteSell = (listChecked: string[]) => {
    const newItems = [...(items.value ?? [])]

    const checkedNumbers = listChecked.map((item) => parseInt(item))

    productTicketApi.updateStatusSeller(checkedNumbers).then(() => {
      refreshData().catch(() => {})
    })

    refTable?.value?.clearCheckAll()
    clearChecked()
    setData(newItems)
    closeModalByPop?.()
  }

  const handleStopOnlySeller = (id: string) => {
    const idNumber = convertIdToNumber(id)
    productTicketApi.updateStatusSeller([idNumber]).then(() => {
      refreshData().catch(() => {})
    })
  }

  const handleDownloadFileClick = () => {
    openModalConfirm({
      content: '조회된 상품을 다운로드 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleDownloadFile(fileDocumentNames.ticketProductList.url, fileDocumentNames.ticketProductList.name)
        closeModalByPop?.()
      }
    })
  }

  watch(
    () => values.standardCategorySelect,
    async (newValue) => {
      try {
        if (newValue?.value == ProductTicketCategoryType.DSP) {
          const depth = await productTicketApi.getDataTicketDspCategoryDepth1()
          selectOptionCategoryDepth1.value = depth?.data?.map((item) => ({
            label: item.displayCategoryName ?? '',
            value: item.displayCategoryId
          }))
        } else {
          const depthStd = await productTicketApi.getDataTicketStdCategoryDepth1(paramsCateOptionStd.value)
          paramsCateOptionStdChild.value = {
            allFlag: paramsCateOptionStd.value.allFlag,
            upperStandardCategoryId: values.primaryClassificationSelect?.value
          }
          selectOptionCategoryDepth1.value = depthStd?.data?.map((item) => ({
            label: item.standardCategoryName ?? '',
            value: item.standardCategoryId
          }))
        }
      } catch (error) {
        // console.error(error)
      }
    }
  )

  watch(
    () => values.primaryClassificationSelect,
    (newValue: any) => {
      let promises: any[] = []
      if (values.standardCategorySelect?.value === ProductTicketCategoryType.DSP) {
        promises = [productTicketApi.getDataTicketDspCategoryDepth2(newValue), productTicketApi.getDataTicketDspCategoryDepth3(newValue)]
      } else {
        promises = [
          productTicketApi.getDataTicketStdCategoryDepth2(paramsCateOptionStdChild.value),
          productTicketApi.getDataTicketStdCategoryDepth3(paramsCateOptionStdChild.value)
        ]
      }
      Promise.all(promises)
        .then(([depth2, depth3]) => {
          if (depth2 || depth3) {
            selectOptionCategoryDepth2.value = depth2?.data?.map((item: ProductTicketCategoryDspModel) => ({
              label: item.displayCategoryName ? item.displayCategoryName : item.standardCategoryName,
              value: item.displayCategoryId ? item.displayCategoryId : item.upperStandardCategoryId
            }))

            selectOptionCategoryDepth3.value = depth3?.data?.map((item: ProductTicketCategoryDspModel) => ({
              label: item.displayCategoryName ? item.displayCategoryName : item.standardCategoryName,
              value: item.displayCategoryId ? item.displayCategoryId : item.upperStandardCategoryId
            }))
          }
        })
        .catch(() => {})
    }
  )
  const handleOpenPopupSearchSeller = () => {
    searchSellerRef.value.handlePopupSearch()
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
    listCheckBoxExternalIntegration,
    onRowSelected,
    onSelectAllChange,
    onPageChange,
    items,
    totalItems,
    isLoading,
    handleClickStopSell,
    handleStopOnlySeller,
    handleDownloadFileClick,
    handleShowInfoSeller,
    refTable,
    componentSearch,
    mdSearch,
    listCompanyChild: ProductDataFieldFormTicketProductListlConfig.listCompanyChild,
    refreshData,
    selectOptionCategoryDepth1,
    selectOptionCategoryDepth2,
    selectOptionCategoryDepth3,
    sellerCompanies,
    handleOpenPopupSearchSeller,
    searchSellerRef
  }
}
