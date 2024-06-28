import { computed, ref } from 'vue'
import { useModal } from '@/composables/common'
import { useFormFilterTable, useModalNotification } from '@/composables/widgets'
import { exportExcel } from '@/common'
import { memberFormModelConfig, MemberListDataTableModel, MemberListFormModel, memberTableHeaders, memberXlsxSheetName } from '@/models'
import { memberListApi } from '@/services/api/members/MemberListApi'
import MemberWelfarePointUsageDetailsModal from '@/views/members/modal/MemberWelfarePointUsageDetailsModal.vue'
import { MemberListRequestConvertor } from '@/models/services/requests/members/MemberListRequest'
import { MemberListListResponse } from '@/models/services/responses/members/MemberListResponse'

export const useMemberList = () => {
  const { showModal, closeModalByPop } = useModal()
  const { openModal } = useModalNotification()
  const searchCustomerRef = ref()
  const allSuccessDataMember = ref<MemberListDataTableModel[]>([])
  const isResetForm = ref<boolean>(false)
  const initialData: MemberListFormModel = {
    codeCustomer: '',
    nameMember: '',
    codeMember: '',
    email: '',
    employeePhone: '',
    phone: '',
    employmentStatus: memberFormModelConfig.listSelectRow2[0].options[0],
    accountStatus: memberFormModelConfig.listSelectRow2[1].options[0],
    membershipLevel: '1',
    dateSelect: memberFormModelConfig.listSelectDate.options[0],
    fromDate: '',
    toDate: ''
  }

  const fetchDataCallback = (page: number, size: number): Promise<MemberListListResponse> => {
    return memberListApi.getMemberListList(MemberListRequestConvertor.from(values, page, size)).then((result) => {
      allSuccessDataMember.value = { ...(result.data ?? []) }
      isResetForm.value = false
      return Promise.resolve(result)
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
    refreshData
  } = useFormFilterTable<MemberListDataTableModel, MemberListFormModel>({
    initialValuesForm: initialData,
    fetchDataCallback,
    disabledFetchApiFirst: true
  })

  const isListCheckedEmpty = computed(() => {
    return !listChecked.value.length
  })
  const onShowMemberWelfarePointUsageDetailsModal = () => {
    showModal?.({
      component: MemberWelfarePointUsageDetailsModal,
      events: {
        onClose: () => {
          closeModalByPop?.()
        }
      }
    })
  }
  const onDownload = () => {
    exportExcel<MemberListDataTableModel>(allSuccessDataMember.value, memberXlsxSheetName, memberTableHeaders)
  }

  const handleOpenPopupSearchCustomer = () => {
    searchCustomerRef.value.handlePopupSearch()
  }

  const handleResetForm = () => {
    handleResetFormFilter()
    isResetForm.value = true
  }

  return {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    ...memberFormModelConfig,
    handleResetFormFilter,
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
    onShowMemberWelfarePointUsageDetailsModal,
    searchCustomerRef,
    handleOpenPopupSearchCustomer,
    handleResetForm,
    isResetForm
  }
}
