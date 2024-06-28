import { DAYS_PER_WEEK, DEFAULT_DATE_FORMAT, exportExcel, exportFileName } from '@/common'
import { useModal } from '@/composables/common'
import { useFormFilterTable, useModalNotification } from '@/composables/widgets'
import { WelfareSelectOptionType } from '@/models'
import { MemberPointUsageListRequestConvertor } from '@/models/services/requests/members/MemberPointUsageListRequest'
import {
  MemberPointUsageListDataTableModel,
  memberAccountStatusOptions,
  memberEmploymentStatusOptions,
  memberListButtonDateFilter,
  memberListSelectDateOptions,
  MemberPointUsageCustomerDataTableModel,
  memberPointUsageCustomerHeaderName,
  MemberPointUsageListFormModel,
  memberWelfareKeywordSearchTypeOptions,
  ContractStatusOptions,
  MemberPointUsageListFormConvertModel,
  MemberSearchTypeStatus,
  memberPointUsageMemberHeaderName
} from '@/models/views/members/pointUsageList/MemberPointUsageListModel'
import { memberPointUsageListApi } from '@/services/api/members/MemberPointUsageListApi'
import MemberWelfarePointUsageDetailsModal from '@/views/members/modal/MemberWelfarePointUsageDetailsModal.vue'
import { computed, ref } from 'vue'

export const useMemberPointUsageList = () => {
  const searchCompanyCoderRef = ref()
  const searchMemberNameRef = ref()
  const customerFileName = exportFileName('CustomerInfo', DEFAULT_DATE_FORMAT)
  const memberFileName = exportFileName('MemberInfo', DEFAULT_DATE_FORMAT)
  const customerInformationData = ref<MemberPointUsageCustomerDataTableModel[]>([])
  const { showModal, closeModalByPop } = useModal()
  const { openModal } = useModalNotification()
  const loadingCustomerInfo = ref<boolean>(false)
  const emptyForm: MemberPointUsageListFormModel = {
    customerKey: '',
    memberName: '',
    memberKey: '',
    employmentStatus: memberEmploymentStatusOptions[0],
    accountStatus: memberAccountStatusOptions[0],
    searchType: memberWelfareKeywordSearchTypeOptions[0],
    fromDate: '',
    toDate: '',
    searchTerm: ''
  }
  const fetchDataCallback = (page: number, size: number) => {
    const request = MemberPointUsageListRequestConvertor.from(values, page, size)
    return memberPointUsageListApi.getPointUsageList(request)
  }

  const getCustomerInformation = (customerKey: string) => {
    loadingCustomerInfo.value = true
    memberPointUsageListApi
      .getCustomerInformation(customerKey)
      .then((res) => {
        const data = res.data
        const convertCustomerDetail: MemberPointUsageCustomerDataTableModel = {
          customerCompanyCode: data.customerKey.toString(),
          customer: data.customerName,
          contactStatus: ContractStatusOptions.find((it) => it.value === data.contractStatus)?.label ?? '',
          numberOfCustomerTenure: data.inOfficeMemberCount.toString(),
          numberOfCustomerLeave: data.leaveOfficeMemberCount.toString(),
          totalHeldPoints: data.activeMemberCount.toString(),
          totalUsedPoints: data.inactiveMemberCount.toString(),
          totalAdjustmentPointAddition: data.totalAvailablePoint.toString(),
          totalAdjustmentPointDeduction: data.totalExpiringPoint.toString()
        }
        customerInformationData.value.splice(0, customerInformationData.value.length, convertCustomerDetail)
      })
      .catch(() => {
        // show error
      })
      .finally(() => {
        loadingCustomerInfo.value = false
      })
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
    refTable,
    refreshData
  } = useFormFilterTable<MemberPointUsageListDataTableModel, MemberPointUsageListFormConvertModel>({
    initialValuesForm: emptyForm,
    fetchDataCallback,
    initialDate: DAYS_PER_WEEK,
    onResetForm: () => {
      handleChangeCountDate(0)
      searchCompanyCoderRef.value?.handleReset()
      searchMemberNameRef.value?.handleReset()
    },
    disabledFetchApiFirst: true
  })

  const activeDetailedSearch = computed(() => values.searchType?.value === memberWelfareKeywordSearchTypeOptions[0].value)

  const handlesSubmitForm = () => {
    if (values.searchType.value === MemberSearchTypeStatus.MEMBER_NAME) {
      if (!values.customerKey) {
        openModal?.({
          content: '알럿) 고객사를 선택해주세요.'
        })
      } else {
        getCustomerInformation(values.customerKey)
        refreshData().catch(() => {})
      }
    } else {
      customerInformationData.value.splice(0, customerInformationData.value.length)
      refreshData().catch(() => {})
    }
  }

  const handleOpenPopupSearchMember = () => {
    if (!values.customerKey) {
      openModal?.({
        content: '고객사를 선택해주세요.'
      })
    } else {
      searchMemberNameRef.value.handlePopupSearch()
    }
  }

  const onShowMemberWelfarePointUsageDetailsModal = () => {
    showModal?.({
      component: MemberWelfarePointUsageDetailsModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        }
      }
    })
  }

  const onDownLoadExcel = () => {
    const exportData = (customerInformationData.value ?? []).map<MemberPointUsageCustomerDataTableModel>((it) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = it
      return rest
    })

    const exportDataMember = (items.value ?? []).map<MemberPointUsageListDataTableModel>((it) => {
      const { ...rest } = it
      return rest
    })
    if (values.searchType.value === MemberSearchTypeStatus.MEMBER_NAME) {
      exportExcel<MemberPointUsageCustomerDataTableModel>(exportData, customerFileName, memberPointUsageCustomerHeaderName)
      exportExcel<MemberPointUsageListDataTableModel>(exportDataMember, memberFileName, memberPointUsageMemberHeaderName)
    } else {
      exportExcel<MemberPointUsageListDataTableModel>(exportDataMember, memberFileName, memberPointUsageMemberHeaderName)
    }
  }

  const handleChangeFilterForm = (value: WelfareSelectOptionType) => {
    handleResetForm()
    setFieldValue('searchType', value)
  }

  const handleResetForm = () => {
    handleResetFormFilter()
    handleChangeCountDate(DAYS_PER_WEEK)
  }
  return {
    activeDetailedSearch,
    values,
    setFieldValue,
    handleResetForm,
    currentFilterDate,
    handleChangeCountDate,
    memberListSelectDateOptions,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable,
    onShowMemberWelfarePointUsageDetailsModal,
    memberListButtonDateFilter,
    handlesSubmitForm,
    searchCompanyCoderRef,
    searchMemberNameRef,
    customerInformationData,
    onDownLoadExcel,
    handleOpenPopupSearchMember,
    handleChangeFilterForm,
    loadingCustomerInfo
  }
}
