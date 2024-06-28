import { useForm } from 'vee-validate'
import { DAYS_PER_MONTH, handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD, isEmptyObject } from '@/common'
import { onMounted, ref, watch } from 'vue'
import { defaultPageState, WelfareSelectOptionType } from '@/models'
import { useDataTablePagination } from '@/composables'
import { PageState } from 'primevue/paginator'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { useDeliveryProductStandardCategory } from '../ticketProductOrderManagement/useDeliveryProductStandardCategory'
import { deliverySearchProductApi } from '@/services/api/delivery/DeliverySearchProductApi'
import { deliverySellerCompaniesApi } from '@/services/api/delivery/DeliverySellerCompaniesApi'
import { DeliverySearchProductConvertor } from '@/models/services/requests/delivery/modal/DeliverySearchProductRequest'
import { DeliverySellerCompaniesSearchResponseModel } from '@/models/services/responses/delivery/DeliverySellerCompaniesResponse'
import {
  deliverySearchDateType,
  DeliverySearchProductModel,
  DeliverySearchProductProps,
  DeliverySearchProductTableModel
} from '@/models/views/delivery/modal/DeliverySearchProductModel'
import {
  DeliveryCategoryTypeModel,
  deliveryCategoryTypeOptions
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'

export const useDeliverySearchProductModalLogic = (props: DeliverySearchProductProps) => {
  const { values, setFieldValue, resetForm, errors } = useForm<DeliverySearchProductModel>({
    initialValues: {
      searchDateType: deliverySearchDateType[0],
      categoryType: deliveryCategoryTypeOptions[0],
      chargeMdKey: ''
    }
  })

  const typeCustomer = ref()
  const { categoryDepth1, categoryDepth2, categoryDepth3 } = useDeliveryProductStandardCategory<DeliverySearchProductModel>(
    values,
    setFieldValue as any,
    false,
    '0'
  )
  const page = ref<PageState>(defaultPageState)
  const currentFilterDate = ref()
  const selectValue = ref()
  const sellerSelectOptions = ref<WelfareSelectOptionType[]>()
  const enableQuerySearchRequest = ref(false)

  onMounted(() => {
    handleChangeCountDate(DAYS_PER_MONTH)
    getSellerSelectOptions()
  })

  const getSellerSelectOptions = () => {
    deliverySellerCompaniesApi.searchAllSellers().then((resData) => {
      sellerSelectOptions.value = resData.data.map((it: DeliverySellerCompaniesSearchResponseModel): WelfareSelectOptionType => {
        return {
          label: `(${it?.sellerKey}) ${it?.sellerName}`,
          value: it?.sellerKey
        }
      })
    })
  }

  const handleSearch = () => {
    if (isEmptyObject(errors.value)) {
      fetchDataWith({
        numberOfItems: page.value.rows,
        page: page.value.page
      }).catch(() => {})
    }
  }
  const handleResetForm = () => {
    resetForm()
    handleChangeCountDate(DAYS_PER_MONTH)
  }

  const handleChangeCountDate = (number: number) => {
    currentFilterDate.value = number
    handleSetDateFormCustom(number)
  }

  const getData = (page: number, size: number) => {
    const params = DeliverySearchProductConvertor.from(values, page + 1, size)
    return deliverySearchProductApi.search(params)
  }

  const {
    items: searchResults,
    totalItems: totalSearchItems,
    isLoading,
    fetchDataWith
  } = useDataTablePagination<DeliverySearchProductTableModel>(getData)

  const handleSetDateFormCustom = (number: number) => {
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)

    setFieldValue('fromDate', lastCustomDayString)
    setFieldValue('toDate', currentDateString)
  }

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    if (enableQuerySearchRequest.value) {
      handleSearch()
    } else {
      enableQuerySearchRequest.value = true
    }
  }

  const onRowSelect = (select: DataTableRowClickEvent) => {
    selectValue.value = {
      productCode: select.data.productCode,
      productName: select.data.productName,
      productKey: select.data.productKey
    }
  }

  const handleSelectValue = () => {
    if (selectValue.value) {
      props.onSelect(selectValue.value)
    } else {
      props.onClose?.()
    }
  }

  watch(
    () => values.categoryType,
    () => {
      setFieldValue('categoryDepthId1', undefined)
      setFieldValue('categoryDepthId2', undefined)
      setFieldValue('categoryDepthId3', undefined)
    },
    { deep: true }
  )
  let timeoutId: any

  watch(
    () => values.chargeMdKey,
    () => {
      if (values.categoryType.value === DeliveryCategoryTypeModel.STANDARD) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          setFieldValue('categoryType', deliveryCategoryTypeOptions[0])
          setFieldValue('categoryDepthId1', undefined)
          setFieldValue('categoryDepthId2', undefined)
          setFieldValue('categoryDepthId3', undefined)
        }, 500)
      }
    }
  )

  return {
    values,
    setFieldValue,
    handleResetForm,
    handleSearch,
    categoryDepth1,
    categoryDepth2,
    categoryDepth3,
    searchResults,
    totalSearchItems,
    isLoading,
    onPageChange,
    onRowSelect,
    handleSelectValue,
    typeCustomer,
    currentFilterDate,
    handleChangeCountDate,
    sellerSelectOptions
  }
}
