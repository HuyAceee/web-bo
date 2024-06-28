import { handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD } from '@/common'
import { useModalNotification } from '@/composables'
import { DataTableRequestModel, defaultPageState } from '@/models'
import { PageState } from 'primevue/paginator'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { object } from 'yup'
import { useCheckBoxTable, useDataTablePagination } from '../table'
interface FormFilterParams<T> {
  initialValuesForm: any
  initialDate?: number
  validateSchema?: any
  onResetForm?: () => void
  notFilterDateForm?: boolean
  fetchDataCallback: DataTableRequestModel<T>
  disabledFetchApiFirst?: boolean
}

export function useFormFilterTable<T, K>({
  fetchDataCallback,
  initialValuesForm,
  onResetForm,
  initialDate = 6,
  validateSchema,
  disabledFetchApiFirst = false,
  notFilterDateForm = false
}: FormFilterParams<T>) {
  const refTable = ref()
  const disabledCallApi = ref<boolean>(disabledFetchApiFirst)
  const page = ref<PageState>(defaultPageState)
  const { setFieldValue, values, resetForm, validate, ...dataForm } = useForm({
    initialValues: { ...initialValuesForm },
    validationSchema: object().shape(validateSchema)
  })

  const { items, totalItems, isLoading, fetchDataWith, setData, clearData, refreshData, numberOfItems } = useDataTablePagination(fetchDataCallback)

  const listId = computed(() => {
    return items.value?.map((item: any) => item.id) ?? []
  })

  const { listChecked, onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId)
  const { openModal } = useModalNotification()
  const currentFilterDate = ref(-1)

  const handleSetDateFormCustom = (number: number) => {
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)
    setFieldValue('fromDate', lastCustomDayString)
    setFieldValue('toDate', currentDateString)
  }

  const handleChangeCountDate = (number: number) => {
    currentFilterDate.value = number
    handleSetDateFormCustom(number)
  }

  onMounted(() => {
    if (!notFilterDateForm) {
      handleChangeCountDate(initialDate)
    }
  })

  watch(
    () => currentFilterDate.value,
    (newCurrentDate) => {
      if (newCurrentDate >= 0) {
        handleSetDateFormCustom(newCurrentDate)
      }
    },
    { immediate: true }
  )
  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    clearChecked()
    if (disabledCallApi.value) {
      disabledCallApi.value = false
      return
    }
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        refTable.value?.scrollToTop()
      })
      .catch(() => { })
  }
  const checkListChecked = (callback: () => void, massage = '판매 종료를 원하는 상품을 선택 후 버튼을 클릭해 주세요') => {
    if (!listChecked.value.length) {
      openModal?.({
        buttonLabel: '확인',
        content: massage
      })
      return
    }
    callback()
  }

  const onSubmit = () => {
    page.value.page = 0
    fetchDataWith({
      numberOfItems: page.value.rows,
      page: 0
    })
  }
  const handleResetFormFilter = () => {
    resetForm()
    onResetForm?.()
    handleChangeCountDate(initialDate)
    handleSetDateFormCustom(initialDate)
  }

  return {
    items,
    totalItems,
    isLoading,
    fetchDataWith,
    setData,
    ...dataForm,
    onRowSelected,
    onSelectAllChange,
    values: values as K,
    setFieldValue,
    resetForm,
    refTable,
    currentFilterDate,
    handleSetDateFormCustom,
    listChecked,
    clearChecked,
    handleResetFormFilter,
    onPageChange,
    checkListChecked,
    handleChangeCountDate,
    validate,
    refreshData,
    onSubmit,
    clearData,
    page,
    numberOfItems
  }
}
