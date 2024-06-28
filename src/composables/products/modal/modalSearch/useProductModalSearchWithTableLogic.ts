import { memberCustomerSearchApi } from '@/services/api/members/MemberCustomerSearchApi'
import { handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD, isEmptyObject } from '@/common'
import { DAYS_PER_MONTH } from '@/common/constant'
import { useDataTablePagination, useModalNotification } from '@/composables'
import { defaultPageState, ProductSearchModalProps, ProductSearchRecordModel, productSearchRecordRes, ProductSearchType } from '@/models'
import {
  productModalSearchCustomerMeta,
  productModalSearchSellerMeta,
  ProductSearchCustomerTableHeaderConfig,
  ProductSearchSellerTableHeaderConfig
} from '@/models/views'
import { DataTableRowSelectEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { object, string } from 'yup'
import { deliverySellerCompaniesApi } from '@/services/api/delivery/DeliverySellerCompaniesApi'
import { DeliverySellerCompaniesConvertor } from '@/models/services/requests/delivery/modal/DeliverySellerCompaniesRequest'
import { DeliveryCustomerCompaniesConvertor } from '@/models/services/requests/delivery/modal/DeliveryCustomerCompaniesRequest'
import {
  DeliverySellerAndCustomerSearchModel,
  DeliverySellerAndCustomerSearchTableModel
} from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'

export const useProductModalSearchWithTableLogic = (props: ProductSearchModalProps) => {
  const getModalSearchMetaInfo = () => {
    return props.searchType === ProductSearchType.SELLER ? productModalSearchSellerMeta : productModalSearchCustomerMeta
  }
  const getTableColsConfig = () => {
    return props.searchType === ProductSearchType.SELLER ? ProductSearchSellerTableHeaderConfig : ProductSearchCustomerTableHeaderConfig
  }
  const modalSearchMetaInfo = getModalSearchMetaInfo()
  const tableCols = getTableColsConfig()
  const { openModal } = useModalNotification()
  const currentFilterDate = ref()
  const selectedProduct = ref()
  const page = ref<PageState>(defaultPageState)
  const selectValue = ref<ProductSearchRecordModel>(props.searchResData ?? productSearchRecordRes)
  const enableQuerySearchRequest = ref(false)

  onMounted(() => {
    handleChangeCountDate(DAYS_PER_MONTH)
  })

  const productSearchSchema = {
    searchCode: string(),
    searchName: string(),
    searchRegisterCode: string(),
    searchBusinessRegistrationNumber: string(),
    searchStartDate: string(),
    searchEndDate: string()
  }

  const { setFieldValue, errors, values, resetForm } = useForm<DeliverySellerAndCustomerSearchModel>({
    validationSchema: object().shape(productSearchSchema),
    initialValues: {
      status: { label: '전체', value: 'All' },
      contractStatus: { label: '전체', value: 'All' },
      searchCode: '',
      searchName: '',
      searchRegisterCode: '',
      searchBusinessRegistrationNumber: '',
      searchStartDate: '',
      searchEndDate: ''
    }
  })

  // set data

  const getData = async (page: number, size: number) => {
    if (props.searchType === ProductSearchType.CUSTOMER) {
      const params = DeliveryCustomerCompaniesConvertor.from(values, page, size)
      return await memberCustomerSearchApi.search(params)
    } else {
      const params = DeliverySellerCompaniesConvertor.from(values, page, size)
      return await deliverySellerCompaniesApi.search(params)
    }
  }

  const {
    items: searchResults,
    totalItems: totalSearchItems,
    isLoading,
    fetchDataWith,
    setData
  } = useDataTablePagination<DeliverySellerAndCustomerSearchTableModel>(getData)

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    if (enableQuerySearchRequest.value) {
      handleSearch().catch(() => {})
    } else {
      enableQuerySearchRequest.value = true
    }
  }

  const handleSearch = async () => {
    if (isEmptyObject(errors.value)) {
      try {
        await fetchDataWith({
          numberOfItems: page.value.rows,
          page: page.value.page
        })
      } catch {
        /* empty */
      }
    } else {
      setData([])
    }
  }

  //end mock data

  const handleSelectRow = (res: ProductSearchRecordModel) => {
    selectValue.value = res
  }

  const handleSelectValue = () => {
    if (selectValue.value) {
      props.onSelect(selectValue.value)
      props.onSelectRow?.(selectedProduct.value)
    } else {
      props.onCancel?.()
    }
  }

  const onRowSelect = (select: DataTableRowSelectEvent) => {
    selectedProduct.value = select.data
    const res = {
      code: select.data.id,
      name: select.data.name,
      id: select.data.customerId
    }
    handleSelectRow(res)
  }

  const handleResetForm = () => {
    resetForm()
    handleChangeCountDate(DAYS_PER_MONTH)
    searchResults.value = []
    totalSearchItems.value = 0
  }

  const handleChangeCountDate = (number: number) => {
    currentFilterDate.value = number
    handleSetDateFormCustom(number)
  }

  const handleSelectCustomDate = (field: keyof typeof productSearchSchema, value: string) => {
    if (field === 'searchStartDate' && values.searchEndDate < value) {
      openModal({
        content: '시작일은 종료일보다 뒤로 설정할 수 없습니다.'
      })
      return
    }
    if (field === 'searchEndDate' && values.searchStartDate > value) {
      openModal({
        content: '종료일은 시작일보다 앞으로 설정할 수 없습니다. '
      })
      return
    }
    setFieldValue(field, value)
    // handle custom select date btn
  }

  const handleSetDateFormCustom = (number: number) => {
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)

    setFieldValue('searchStartDate', lastCustomDayString)
    setFieldValue('searchEndDate', currentDateString)
  }

  //
  return {
    searchResults,
    handleSearch,
    handleSelectValue,
    modalSearchMetaInfo,
    onRowSelect,
    handleResetForm,
    values,
    setFieldValue,
    onPageChange,
    currentFilterDate,
    handleChangeCountDate,
    isLoading,
    totalSearchItems,
    selectedProduct,
    handleSelectCustomDate,
    tableCols
  }
}
