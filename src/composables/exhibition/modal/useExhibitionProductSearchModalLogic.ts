import { useFormFilterTable } from '@/composables'
import { ref } from 'vue'
import {
  ExhibitionProductSearchFormModel,
  ExhibitionProductSearchModalProps,
  exhibitionProductSearchPeriodType,
  exhibitionProductSearchSaleStatusType,
  exhibitionProductSearchType
} from '@/models/views/exhibition/modal/ExhibitionProductSearchModalModel'
import { complaintOrderCancelListModelConfig } from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { deliverySearchProductApi } from '@/services/api/delivery/DeliverySearchProductApi'
import { ExhibitionProductSearchRequestConvertor } from '@/models/services/requests/exhibition/ExhibitionProductSearchModallListRequest'
import { ProductSearchProductTableModel } from '@/models/views/products/modal/ProductSearchProductModalModel'
import { handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD } from '@/common'
import { deliveryProductClassification } from '@/models/views/delivery/modal/DeliverySearchProductModel'

export const useExhibitionProductSearchModalLogic = (props: ExhibitionProductSearchModalProps) => {
  const dateActiveNumber = complaintOrderCancelListModelConfig.listButtonDateFilter[0].value
  const productFormFilterRef = ref()
  const initialData: ExhibitionProductSearchFormModel = {
    productName: '',
    productKey: '',
    mdKey: '',
    seller: '',
    sellerKey: '',
    brandName: '',
    brandCode: '',
    salesStatus: exhibitionProductSearchSaleStatusType[0],
    searchDateType: exhibitionProductSearchPeriodType[0],
    fromDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).lastCustomDayString,
    toDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).currentDateString,
    keyword: '',
    keywordSearchType: exhibitionProductSearchType[0],
    productClassificationCode: deliveryProductClassification[0]
  }

  const submitParamsValue = ref<ExhibitionProductSearchFormModel>(initialData)

  const getProductList = (page: number, size: number) => {
    return deliverySearchProductApi.searchProduct(ExhibitionProductSearchRequestConvertor.from(submitParamsValue.value, page, size))
  }

  const {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onSubmit,
    clearChecked,
    onRowSelected,
    onSelectAllChange,
    setData,
    listChecked
  } = useFormFilterTable<ProductSearchProductTableModel, ExhibitionProductSearchFormModel>({
    initialDate: dateActiveNumber,
    initialValuesForm: initialData,
    fetchDataCallback: getProductList,
    disabledFetchApiFirst: true
  })

  const onSubmitForm = () => {
    refTable.value.clearCheckAll?.()
    listChecked.value = []
    submitParamsValue.value = values
    onSubmit()
  }

  const resetDataForm = () => {
    submitParamsValue.value = initialData
    productFormFilterRef?.value?.resetFormComplaint()
    refTable.value.clearCheckAll?.()
    listChecked.value = []
    handleResetFormFilter()
    setData([])
    totalItems.value = 0
  }

  const handleSelectValue = () => {
    if (listChecked.value?.length) {
      const dataSelect = items.value?.filter((item) => {
        const productKey = item.productKey?.toString()
        return listChecked.value?.some((id) => id?.toString() === productKey)
      })
      props.onCancel?.()
      props.onSelect?.(dataSelect)
    }
  }

  return {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter: resetDataForm,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onSubmitForm,
    onRowSelected,
    onSelectAllChange,
    clearChecked,
    handleSelectValue
  }
}
