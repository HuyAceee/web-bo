import { computed, ref } from 'vue'
import { WelfareSelectOptionType } from '@/models'
import { useCheckbox } from '@/composables'
import { MockProductTradeMarkListTable } from '@/assets'
import { stringFormatNumber } from '@/common'
import { useProductBaseList } from '../deliveryProduct/useProductBaseList'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { ProductDataFieldFormTradeMarkProductListConfig, TradeMarkModel } from '@/models/views/products/trademark/ProductTradeMarkModel'

interface TradeMarkProductListForm {
  trademarkSelect: WelfareSelectOptionType
  findCodeBrandInput: string
  brand: string
  brandCode: number | undefined
  findBrandInput: string
  productDateSelect: WelfareSelectOptionType
  fromDate: string
  toDate: string
}

const listFormSelectProduct = ProductDataFieldFormTradeMarkProductListConfig.listSelectTradeMarkType
const listInputProduct = ProductDataFieldFormTradeMarkProductListConfig.listInputFindProduct
const listCheckBoxTypes = ProductDataFieldFormTradeMarkProductListConfig.listCheckBoxExhibition
const optionProductDate = ProductDataFieldFormTradeMarkProductListConfig.optionProductDate
const optionsProductListFilter = ProductDataFieldFormTradeMarkProductListConfig.optionsProductListFilter

export const useProductTradeMarkList = () => {
  const initialValues: TradeMarkProductListForm = {
    trademarkSelect: listFormSelectProduct.options![0],
    brand: '',
    brandCode: undefined,
    findCodeBrandInput: '',
    findBrandInput: '',
    productDateSelect: optionProductDate[0],
    fromDate: '',
    toDate: ''
  }
  const brandCode = ref('')
  const fetchData = (page: number, size: number) => {
    // mock api return data with delay time
    return new Promise<DataTablePaginationResponseModel<TradeMarkModel>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = page * size + size
        for (let i = page * size; i < maxItemInPage; i++) {
          items.push({
            ...MockProductTradeMarkListTable
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }

  const listIdCheckBoxType = computed(() => {
    return listCheckBoxTypes.list.filter((item) => item.id !== 'all').map((item) => item.id)
  })

  const productTypeCheckBox = useCheckbox(listIdCheckBoxType)

  const listActionCheckBox = computed(() => {
    return {
      productTypeCheckBox
    }
  })

  const handleValidateIdInput = (values: Event) => {
    const value = (values.target as HTMLInputElement).value
    brandCode.value = value.replace(stringFormatNumber, '').slice(0, 4)
  }

  const {
    items,
    totalItems,
    isLoading,
    handleShowInfoSeller,
    onPageChange,
    handleChangeCountDate,
    handleResetFilter,
    handleChangeFilterForm,
    handleCheckBoxChange,
    handleChangeValueSelect,
    getIsCheckBox,
    values,
    setFieldValue,
    refTable,
    componentSearch,
    mdSearch,
    currentFilterDate,
    formFilter,
    isDisabledFilter,
    handleResetForm
  } = useProductBaseList<TradeMarkModel>({
    initialValuesForm: initialValues,
    defaultValueControlFilter: { ...optionsProductListFilter[0] },
    fetchDataCallback: fetchData,
    listActionCheckBox,
    onResetForm: () => {
      brandCode.value = ''
    }
  })

  return {
    values,
    handleChangeValueSelect,
    handleChangeFilterForm,
    handleResetForm,
    getIsCheckBox,
    handleCheckBoxChange,
    listFormSelectProduct,
    listCheckBoxTypes,
    optionProductDate,
    currentFilterDate,
    isDisabledFilter,
    formFilter,
    setFieldValue,
    handleResetFilter,
    handleChangeCountDate,
    onPageChange,
    items,
    totalItems,
    isLoading,
    handleShowInfoSeller,
    refTable,
    componentSearch,
    mdSearch,
    listInputProduct,
    optionsProductListFilter,
    handleValidateIdInput,
    brandCode
  }
}
