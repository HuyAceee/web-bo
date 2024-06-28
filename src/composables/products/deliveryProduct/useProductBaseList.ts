import { DataTableRequestModel, ICheckBoxData, WelfareSelectOptionType } from '@/models'
import { useFormFilterTable, useModal, useModalConfirm, useModalNotification } from '@/composables'
import { ComputedRef, ref } from 'vue'
import { ID_CHECKBOX_ALL } from '@/common'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import ProductVendorInformationModal from '@/views/products/modal/vendorInformation/ProductVendorInformationModal.vue'

interface BaseProductListParams<T, K> {
  fetchDataCallback: DataTableRequestModel<T>
  initialValuesForm: K
  listActionCheckBox: ComputedRef<{ [key: string]: ICheckBoxData }>
  defaultValueControlFilter: WelfareSelectOptionType
  notFilterInitForm?: boolean
  onResetForm?: () => void
  initData?: boolean
  notInitData?: boolean
}

export function useProductBaseList<T, K>({
  fetchDataCallback,
  listActionCheckBox,
  initialValuesForm,
  defaultValueControlFilter,
  onResetForm,
  notInitData = false,
  notFilterInitForm = false
}: BaseProductListParams<T, K>) {
  const handleResetForm = () => {
    const entriesCheckBox = Object.entries(listActionCheckBox.value)
    entriesCheckBox.forEach((item) => {
      item[1].handleChangeCheckBoxItem(false, ID_CHECKBOX_ALL)
    })
    resetForm()
    componentSearch.value?.handleReset()
    mdSearch.value?.handleReset()
    brandSearch.value?.handleReset()
    handleChangeCountDate(6)
    onResetForm?.()
  }

  const handleResetFilter = () => {
    handleResetForm()
    formFilter.value = { ...defaultValueControlFilter }
    isDisabledFilter.value = false
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
    refreshData,
    page
  } = useFormFilterTable<T, K>({
    initialValuesForm,
    fetchDataCallback,
    onResetForm: handleResetFilter,
    disabledFetchApiFirst: notInitData,
    notFilterDateForm: notFilterInitForm
  })

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
    return listActionCheckBox.value?.[newField].getChecked(id)
  }

  const handleChangeValueSelect = (field: any, value: any) => {
    setFieldValue(field, value)
  }

  const handleCheckBoxChange = (fieldKey: string, value: boolean, id: string) => {
    const newField = fieldKey as 'productTypeCheckBox'
    listActionCheckBox.value?.[newField].handleChangeCheckBoxItem(value, id)
  }

  const handleChangeFilterForm = (value: WelfareSelectOptionType) => {
    if (value.value === formFilter.value.value) return
    formFilter.value = value
    handleResetForm()
    if (value.value === '1') {
      isDisabledFilter.value = false
      handleSetDateFormCustom(6)
    } else {
      isDisabledFilter.value = true
    }
  }

  const handleShowInfoSeller = (code: string) => {
    showModal?.({
      component: ProductVendorInformationModal,
      props: {
        data: {
          sellerCode: code,
          nameOfSellingCompany: '우리뜰생협',
          salesDirectory: ['식품 > 신선 채소류 > 유기농', '패션 > 여성패션 > 액세서리'],
          masterAccount: '정우리',
          businessNumber: '111-87-555075',
          companyRegistrationNumber: '100037-345677811',
          representative: '김우리',
          workplace: '경기 포천시 동아리길 35',
          phoneNumber: '010-1234-1234'
        }
      }
    })
  }

  return {
    items,
    totalItems,
    isLoading,
    fetchDataWith,
    setData,
    checkListChecked,
    handleShowInfoSeller,
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
    refreshData,
    page
  }
}
