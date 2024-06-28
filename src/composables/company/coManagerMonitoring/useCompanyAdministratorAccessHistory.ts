import { exportExcel, handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD } from '@/common'
import { useModal } from '@/composables/common'
import { useFormFilterTable, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { WelfareSelectOptionType } from '@/models'
import { AdministratorAccessHistoryListRequestConvertor } from '@/models/services/requests/company/coManagerMonitoring/CompanyAdministratorAccessHistoryListRequest'
import { AdministratorAccessHistoryListListResponse } from '@/models/services/responses/company/coManagerMonitoring/CompanyAdministratorAccessHistoryListResponse'
import {
  administratorAccessHistoryFormModelConfig,
  AdministratorAccessHistoryListDataTableModel,
  AdministratorAccessHistoryListFormModel,
  administratorAccessHistoryTableHeaders,
  administratorAccessHistoryXlsxSheetName,
  EContractStatus,
  ECustomerStatus
} from '@/models/views/company/coManagerMonitoring/CompanyAdministratorAccessHistoryListModel'
import { companyAdministratorAccessHistoryListApi } from '@/services/api/company/coManagerMonitoring/CompanyAdministratorAccessHistoryListApi'
import { computed, ref } from 'vue'

// TODO: Temp logic
export const useCompanyAdministratorAccessHistory = () => {
  const customerSearchWrapper = ref()
  const { showModal, closeModalByPop } = useModal()
  const { openModal } = useModalNotification()
  const { openModal: openConfirmModal, closeAllModal } = useModalConfirm()
  const searchCustomerRef = ref()
  const allSuccessDataAdministratorAccessHistory = ref<AdministratorAccessHistoryListDataTableModel[]>([])
  const initialData: AdministratorAccessHistoryListFormModel = {
    customerKey: '',
    customerName: '',
    customerStatus: administratorAccessHistoryFormModelConfig.listRadioCustomerStatus.options[0].value,
    contractStatus: administratorAccessHistoryFormModelConfig.listCheckboxContractStatus.list[0].id,
    dateSelect: administratorAccessHistoryFormModelConfig.listSelectDate.options[0],
    fromDate: '',
    toDate: '',
    searchType: administratorAccessHistoryFormModelConfig.optionsListFilter[0],
    searchWord: ''
  }

  const fetchDataCallback = (page: number, size: number): Promise<AdministratorAccessHistoryListListResponse> => {
    return companyAdministratorAccessHistoryListApi
      .getAdministratorAccessHistoryList(
        AdministratorAccessHistoryListRequestConvertor.from(
          {
            searchType: searchType.value,
            searchWord: values.searchWord
          },
          page,
          size
        )
      )
      .then((result) => {
        allSuccessDataAdministratorAccessHistory.value = { ...(result.data ?? []) }
        return Promise.resolve(result)
      })
  }

  const updateAdministratorAccessHistoryStatus = async (status: ECustomerStatus) => {
    try {
      openModal?.({
        content: `${status === ECustomerStatus.Activate ? '‘활성’' : '‘비활성’'} 상태로 변경되었습니다.`
      })
      clearChecked()
      refreshData()
    } catch (e: any) {
      openModal?.({
        content: e.message
      })
    }
  }

  const promptUpdateAdministratorAccessHistoryStatus = async (status: ECustomerStatus) => {
    if (isListCheckedEmpty.value) {
      return openModal?.({
        content: '고객사를 선택해 주세요.'
      })
    }
    const targetItems = items.value?.filter((i) => listChecked.value.find((checked) => checked.toString() == i.customerKey.toString()))
    if (targetItems?.some((item) => item.customerStatus == status)) {
      return openModal?.({
        content: `처리할 수 없는 고객사가 포함되어 있습니다.<br>
        다시 확인해 주세요.`
      })
    }
    if (targetItems?.some((item) => item.contractStatus === EContractStatus.ContractTermination) && status == ECustomerStatus.Activate) {
      return openConfirmModal?.({
        content: `계약종료 고객사는<br>
        ‘활성’상태로 변경할 수 없습니다.
        `
      })
    }

    return openConfirmModal?.({
      content: `선택하신 고객사의 상태를<br>
      ${status == ECustomerStatus.Activate ? '‘활성’' : '‘비활성’'} 으로 변경하시겠습니까?`,
      onConfirm: () => {
        closeAllModal?.()
        updateAdministratorAccessHistoryStatus(status)
      }
    })
  }

  const handleSubmitFormFilter = () => {
    if (!values.fromDate) {
      openModal({
        content: '시작 날짜를 선택 해주세요.'
      })
      return
    }
    if (!values.toDate) {
      openModal({
        content: '종료 날짜를 선택 해주세요.'
      })
      return
    }
    refreshData().catch(() => {})
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
    onRowSelected,
    onSelectAllChange,
    totalItems,
    listChecked,
    refTable,
    clearChecked,
    refreshData
  } = useFormFilterTable<AdministratorAccessHistoryListDataTableModel, AdministratorAccessHistoryListFormModel>({
    initialValuesForm: initialData,
    fetchDataCallback,
    disabledFetchApiFirst: true
  })

  const isListCheckedEmpty = computed(() => {
    return !listChecked.value.length
  })

  const isDisabledFilter = ref(false)
  // TODO: Remove
  const onShowAdministratorAccessHistoryWelfarePointUsageDetailsModal = () => {
    showModal?.({
      component: null,
      events: {
        onClose: () => {
          closeModalByPop?.()
        }
      }
    })
  }
  const onDownload = () => {
    exportExcel<AdministratorAccessHistoryListDataTableModel>(
      allSuccessDataAdministratorAccessHistory.value,
      administratorAccessHistoryXlsxSheetName,
      administratorAccessHistoryTableHeaders
    )
  }

  const searchType = ref({ ...administratorAccessHistoryFormModelConfig.optionsListFilter[0] })

  const handleSetDateFormCustom = (number: number) => {
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)
    setFieldValue('fromDate', lastCustomDayString)
    setFieldValue('toDate', currentDateString)
  }

  const handleChangeFilterForm = (value: WelfareSelectOptionType) => {
    if (value.value === searchType.value.value) return
    searchType.value = value
    handleResetFormFilter()
    if (value.value === '1') {
      isDisabledFilter.value = false
      handleSetDateFormCustom(6)
    } else {
      isDisabledFilter.value = true
    }
  }

  const handleOpenPopupSearchCustomer = () => {
    searchCustomerRef.value.handlePopupSearch()
  }

  const customerResetFormFilter = () => {
    handleResetFormFilter()
    customerSearchWrapper.value?.handleReset()
    searchType.value = administratorAccessHistoryFormModelConfig.optionsListFilter[0]
    isDisabledFilter.value = false
  }

  return {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    ...administratorAccessHistoryFormModelConfig,
    handleResetFormFilter: customerResetFormFilter,
    handleSubmitFormFilter,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    isListCheckedEmpty,
    refTable,
    onDownload,
    onShowAdministratorAccessHistoryWelfarePointUsageDetailsModal,
    searchCustomerRef,
    handleOpenPopupSearchCustomer,
    isDisabledFilter,
    searchType,
    handleChangeFilterForm,
    promptUpdateAdministratorAccessHistoryStatus,
    customerSearchWrapper
  }
}
