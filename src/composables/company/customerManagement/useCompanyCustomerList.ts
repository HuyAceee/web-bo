import { exportExcel, handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD } from '@/common'
import { useCheckbox, useModal } from '@/composables/common'
import { useFormFilterTable, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { WelfareSelectOptionType } from '@/models'
import { CompanyCustomerListRequestConvertor } from '@/models/services/requests/company/companyCustomers/CompanyCustomerListRequest'
import { CompanyCustomerListListResponse } from '@/models/services/responses/company/companyCustomers/CompanyCustomerListResponse'
import {
  COMPANY_ACTIVATE_MESSAGE,
  CompanyCustomerListDataTableModel,
  CompanyCustomerListFormModel,
  DownloadCustomerListConvertor,
  EContractStatus,
  ECustomerSearchType,
  ECustomerStatus,
  COMPANY_UNACTIVE_MESSAGE,
  companyCustomerFormModelConfig,
  companyCustomerTableHeaders,
  companyCustomerXlsxSheetName
} from '@/models/views/company/customerManagement/CompanyCustomerListModel'
import { companyCustomerListApi } from '@/services/api/company/customerCompanies/CompanyCustomerListApi'
import { computed, ref } from 'vue'

const listCheckboxContractStatus = companyCustomerFormModelConfig.listCheckboxContractStatus

export const useCompanyCustomerList = () => {
  const { showModal, closeModalByPop } = useModal()
  const { openModal } = useModalNotification()
  const { openModal: openConfirmModal, closeAllModal } = useModalConfirm()
  const searchCustomerRef = ref()
  const allSuccessDataCompanyCustomer = ref<CompanyCustomerListDataTableModel[]>([])
  const initialData: CompanyCustomerListFormModel = {
    customerKey: '',
    customerName: '',
    customerStatus: companyCustomerFormModelConfig.listRadioCustomerStatus.options[0].value,
    contractStatus: companyCustomerFormModelConfig.listCheckboxContractStatus.list[0].id,
    dateSelect: companyCustomerFormModelConfig.listSelectDate.options[0],
    fromDate: '',
    toDate: '',
    searchType: companyCustomerFormModelConfig.optionsListFilter[0],
    searchWord: ''
  }

  const listIdCheckBoxContractStatus = computed(() => {
    return listCheckboxContractStatus.list.filter((item) => item.id !== EContractStatus.All).map((item) => item.id)
  })

  const contractStatus = useCheckbox(listIdCheckBoxContractStatus, [EContractStatus.All])

  const listActionCheckBox = computed(() => {
    return {
      contractStatus
    }
  })

  const getIsCheckBox = (fieldKey: string, id: string) => {
    const newField = fieldKey as 'contractStatus'
    return listActionCheckBox.value?.[newField].getChecked(id)
  }

  const handleCheckBoxChange = (fieldKey: string, value: boolean, id: string) => {
    const newField = fieldKey as 'contractStatus'
    listActionCheckBox?.value?.[newField].handleChangeCheckBoxItem(value, id)
  }

  const fetchDataCallback = (page: number, size: number): Promise<CompanyCustomerListListResponse> => {
    return companyCustomerListApi
      .getCompanyCustomerList(
        CompanyCustomerListRequestConvertor.from(
          searchType.value.value !== ECustomerSearchType.NotUsed
            ? {
                searchType: searchType.value,
                searchWord: values.searchWord,
                contractStatus: EContractStatus.All
              }
            : { ...values, contractStatus: contractStatus.listChecked.value.join(','), searchType: searchType.value },
          page,
          size
        )
      )
      .then((result) => {
        allSuccessDataCompanyCustomer.value = { ...(result.data ?? []) }
        refTable.value.clearCheckAll()
        clearChecked()
        return Promise.resolve(result)
      })
  }

  const updateCompanyCustomerStatus = async (status: ECustomerStatus) => {
    try {
      await companyCustomerListApi.updateCompanyCustomerStatus(
        status,
        listChecked.value.map((i) => Number(i))
      )

      openModal?.({
        content: `${status === ECustomerStatus.Activate ? '‘활성’' : '‘비활성’'} 상태로 변경되었습니다.`
      })
      clearChecked()
      refTable.value.clearCheckAll()
      refreshData()
    } catch (e: any) {
      openModal?.({
        content: e.message
      })
    }
  }

  const promptUpdateCompanyCustomerStatus = async (status: ECustomerStatus) => {
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
      content: status == ECustomerStatus.Activate ? COMPANY_ACTIVATE_MESSAGE : COMPANY_UNACTIVE_MESSAGE,
      onConfirm: () => {
        closeAllModal?.()
        updateCompanyCustomerStatus(status)
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
    refreshData,
    page,
    numberOfItems
  } = useFormFilterTable<CompanyCustomerListDataTableModel, CompanyCustomerListFormModel>({
    initialValuesForm: initialData,
    fetchDataCallback,
    disabledFetchApiFirst: true
  })

  const isListCheckedEmpty = computed(() => {
    return !listChecked.value.length
  })

  const isDisabledFilter = ref(false)
  // TODO: Remove
  const onShowCompanyCustomerWelfarePointUsageDetailsModal = () => {
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
    exportExcel<any>(
      Object.values(allSuccessDataCompanyCustomer.value).map((i) => DownloadCustomerListConvertor.from(i)),
      companyCustomerXlsxSheetName,
      companyCustomerTableHeaders
    )
  }

  const searchType = ref({ ...companyCustomerFormModelConfig.optionsListFilter[0] })

  const handleSetDateFormCustom = (number: number) => {
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)
    setFieldValue('fromDate', lastCustomDayString)
    setFieldValue('toDate', currentDateString)
  }

  const handleChangeFilterForm = (value: WelfareSelectOptionType) => {
    if (value.value === searchType.value.value) return
    searchType.value = value
    handleResetFormFilter()
    if (value.value === ECustomerSearchType.NotUsed) {
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
    searchType.value = companyCustomerFormModelConfig.optionsListFilter[0]
    isDisabledFilter.value = false
    items.value = []
    page.value = {
      first: 0,
      page: 0,
      rows: numberOfItems
    }
    totalItems.value = 0
    for (const cb in listActionCheckBox.value) {
      const remap = cb as 'contractStatus'
      listActionCheckBox?.value[remap].setListChecked([EContractStatus.All])
    }
  }

  return {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    ...companyCustomerFormModelConfig,
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
    onShowCompanyCustomerWelfarePointUsageDetailsModal,
    searchCustomerRef,
    handleOpenPopupSearchCustomer,
    getIsCheckBox,
    handleCheckBoxChange,
    isDisabledFilter,
    searchType,
    handleChangeFilterForm,
    promptUpdateCompanyCustomerStatus
  }
}
