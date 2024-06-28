import { ID_CHECKBOX_ALL } from '@/common'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import { useFormFilterTable, useModal, useModalConfirm, useModalNotification } from '@/composables'
import { DataTableRequestModel, ICheckBoxData, WelfareSelectOptionType } from '@/models'
import { ComputedRef, ref } from 'vue'

interface BaseComplaintListParams<T, K> {
  fetchDataCallback: DataTableRequestModel<T>
  initialValuesForm: K,
  initialDate?: number
  listActionCheckBox?: ComputedRef<{ [key: string]: ICheckBoxData }>
  defaultValueControlFilter: WelfareSelectOptionType
  disabledFetchApiFirst?: boolean,
  onResetForm?: () => void
}

export function useBaseFormFilterTable<T, K>({
  fetchDataCallback,
  listActionCheckBox,
  initialValuesForm,
  defaultValueControlFilter,
  disabledFetchApiFirst = false,
  onResetForm,
  initialDate = 6
}: BaseComplaintListParams<T, K>) {
  const handleResetForm = () => {
    const entriesCheckBox = Object.entries(listActionCheckBox?.value ?? {})
    entriesCheckBox.forEach((item) => {
      item[1].handleChangeCheckBoxItem(false, ID_CHECKBOX_ALL)
    })
    resetForm()
    componentSearch.value?.handleReset()
    mdSearch.value?.handleReset()
    brandSearch.value?.handleReset()
    handleChangeCountDate(initialDate)
    onResetForm?.()
  }

  const handleResetFilter = () => {
    handleResetForm()
    formFilter.value = { ...defaultValueControlFilter }
    isDisabledFilter.value = false
    totalItems.value = 0
    setData([])
  }

  const {
    items,
    totalItems,
    isLoading,
    fetchDataWith,
    setData,
    onRowSelected,
    onSelectAllChange,
    values,
    setFieldValue,
    resetForm,
    refTable,
    currentFilterDate,
    handleSetDateFormCustom,
    listChecked,
    clearChecked,
    handleResetFormFilter,
    handleChangeCountDate,
    onPageChange,
    checkListChecked,
    onSubmit,
    refreshData
  } = useFormFilterTable<T, K>({ initialValuesForm, fetchDataCallback, onResetForm: handleResetFilter, disabledFetchApiFirst, initialDate })

  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const { showModal, replaceModal } = useModal()
  const componentSearch = ref<InstanceType<typeof ProductSearchModalWrapper> | null>(null)
  const mdSearch = ref<InstanceType<typeof ProductSearchModalWrapper> | null>(null)
  const brandSearch = ref<InstanceType<typeof ProductSearchModalWrapper> | null>(null)
  const listRefInput = [componentSearch, mdSearch, brandSearch]
  const formFilter = ref({ ...defaultValueControlFilter })
  const isDisabledFilter = ref(false)

  const getIsCheckBox = (fieldKey: string, id: string) => {
    const newField = fieldKey as 'productTypeCheckBox'
    return listActionCheckBox?.value?.[newField]?.getChecked(id)
  }

  const handleChangeValueSelect = (field: any, value: any) => {
    setFieldValue(field, value)
  }

  const handleCheckBoxChange = (fieldKey: string, value: boolean, id: string) => {
    const newField = fieldKey as 'productTypeCheckBox'
    listActionCheckBox?.value?.[newField]?.handleChangeCheckBoxItem(value, id)
  }

  const handleChangeFilterForm = (value: WelfareSelectOptionType) => {
    if (value.value === formFilter.value.value) return
    formFilter.value = value
    handleResetForm()
    if (value.value === '1') {
      isDisabledFilter.value = false
      handleSetDateFormCustom(initialDate)
    } else {
      isDisabledFilter.value = true
    }
  }

  return {
    items,
    totalItems,
    isLoading,
    fetchDataWith,
    setData,
    checkListChecked,
    onPageChange,
    handleChangeCountDate,
    handleResetFilter: handleResetFormFilter,
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
    resetForm,
    refTable,
    componentSearch,
    mdSearch,
    brandSearch,
    currentFilterDate,
    formFilter,
    isDisabledFilter,
    handleResetForm,
    handleSetDateFormCustom,
    listChecked,
    openModal,
    showModal,
    clearChecked,
    replaceModal,
    onSubmit,
    refreshData
  }
}
