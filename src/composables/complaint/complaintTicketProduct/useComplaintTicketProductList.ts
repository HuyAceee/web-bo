import { computed, ref } from 'vue'
import {
  ComplaintClaimTypeModel,
  ComplaintKeywordSearchModel,
  ComplaintTicketProductListDataTableModel,
  ComplaintTicketProductListFormModel,
  complaintCheckBoxClaimConfig,
  complaintHeaderFieldTableTicketProductListConfig,
  complaintKeywordSearchOptionsConfig,
  complaintSelectDateOptionsConfig,
  complaintTicketProductListHeader
} from '@/models/views/complaint/complaintTicketProduct/ComplaintTicketProductListModel'
import { useCheckbox, useBaseFormFilterTable, useModalNotification } from '@/composables'
import {
  DEFAULT_DATE_FORMAT,
  ID_CHECKBOX_ALL,
  exportExcel,
  exportFileName,
  handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD,
  renderSortDataTable, MEMBER_DETAIL_INFO
} from '@/common'
import { complaintOrderCancelApi } from '@/services/api/complaint/ComplaintOrderCancelApi'
import { useDeliveryMemberSellerCompany } from '@/composables/delivery/ticketProductOrderManagement/useDeliveryMemberSellerCompany'
import { useComplaintTableHandleKey } from '../common/useComplaintTableHandleKey'
import { ComplaintTicketProductRequestConvertor } from '@/models/services/requests/complaint/complaintTicketProduct/ComplaintTicketProductListRequest'
import { complaintOrderCancelListModelConfig } from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { useComingSoonModal } from '@/composables/widgets/modal/useComingSoonModal'

export const useComplaintTicketProductList = () => {
  const searchMemberRef = ref()
  const searchCustomerRef = ref()
  const searchSellerRef = ref()
  const claimType = complaintCheckBoxClaimConfig
  const dateActiveNumber = complaintOrderCancelListModelConfig.listButtonDateFilter[3].value
  const complaintTicketProdFileName = exportFileName('Claim', DEFAULT_DATE_FORMAT)
  const emptyForm: ComplaintTicketProductListFormModel = {
    claimType: ComplaintClaimTypeModel.ALL,
    claimKey: '',
    orderMemberKey: '',
    customerKey: '',
    orderKey: '',
    orderer: '',
    receiver: '',
    receiverPhone: '',
    sellerKey: '',
    subcontractKey: '',
    mdKey: '',
    productKey: '',
    periodSearchType: complaintSelectDateOptionsConfig[0],
    fromDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).lastCustomDayString,
    toDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).currentDateString,
    keywordSearchType: complaintKeywordSearchOptionsConfig[0],
    keyword: ''
  }
  const { openModal } = useModalNotification()
  const { openComingSoonModal } = useComingSoonModal()
  const listClaimCheckBoxType = computed(() => {
    return claimType.list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })
  const claimTypeCheckBox = useCheckbox(listClaimCheckBoxType)
  const listActionCheckBox = computed(() => {
    return {
      claimTypeCheckBox
    }
  })

  const fetchDataCallback = (page: number, size: number) => {
    const claimTypeValue = claimTypeCheckBox.listChecked.value.length === 2 ? '' : claimTypeCheckBox.listChecked.value?.[0] ?? ''
    const newValues: ComplaintTicketProductListFormModel = {
      ...values,
      claimType: claimTypeValue,
      keywordSearchType: formFilter.value
    }
    return complaintOrderCancelApi.getComplaintTicketProdList(ComplaintTicketProductRequestConvertor.from(newValues, page, size))
  }

  const handleOpenPopupSearchMember = () => {
    searchMemberRef.value.handlePopupSearch()
  }

  const handleOpenPopupSearchCustomer = () => {
    searchCustomerRef.value.handlePopupSearch()
  }

  const handleOpenPopupSearchSeller = () => {
    searchSellerRef.value.handlePopupSearch()
  }

  const {
    items,
    refTable,
    totalItems,
    isLoading,
    onPageChange,
    setFieldValue,
    handleCheckBoxChange,
    getIsCheckBox,
    isDisabledFilter,
    values,
    currentFilterDate,
    handleChangeCountDate,
    handleChangeValueSelect,
    handleChangeFilterForm,
    formFilter,
    handleResetFilter,
    refreshData
  } = useBaseFormFilterTable<ComplaintTicketProductListDataTableModel, ComplaintTicketProductListFormModel>({
    initialValuesForm: emptyForm,
    initialDate: dateActiveNumber,
    onResetForm: () => {
      searchMemberRef.value.handleReset()
      searchCustomerRef.value.handleReset()
      searchSellerRef.value.handleReset()
    },
    fetchDataCallback,
    listActionCheckBox,
    defaultValueControlFilter: { ...complaintKeywordSearchOptionsConfig[0] },
    disabledFetchApiFirst: true
  })
  const { onClickClaimKey, onClickOrderKey } = useComplaintTableHandleKey<ComplaintTicketProductListDataTableModel>()
  const { sellerCompanies } = useDeliveryMemberSellerCompany<ComplaintTicketProductListFormModel>(values, setFieldValue)

  const onSubmitForm = () => {
    //refreshData() to call onsubmit and refresh Data
    if (formFilter.value.value !== ComplaintKeywordSearchModel.NONE && !values.keyword) {
      openModal({
        content: '검색어를 입력해 주세요.'
      })
    } else {
      refreshData()
    }
  }

  const onDownloadExcel = () => {
    if (!items.value) return
    const newItems = items.value?.map((newValue) => {
      return {
        ...newValue,
        subcontract: newValue.subcontract ?? '',
        claimDetailReason: newValue.claimDetailReason ?? ''
      }
    })
    const sortedData = renderSortDataTable(newItems, complaintHeaderFieldTableTicketProductListConfig)
    exportExcel(sortedData, complaintTicketProdFileName, complaintTicketProductListHeader)
  }

  const isDisableForm = computed(() => {
    return formFilter.value.value !== ComplaintKeywordSearchModel.NONE
  })

  const onClickOpenModalNoticeComingSoon = () => {
    openComingSoonModal()
  }

  const onClickMemberKey = (memberKey: string) => {
    open(`${MEMBER_DETAIL_INFO}?memberKey=${memberKey}`, '_blank')
  }

  return {
    searchMemberRef,
    searchCustomerRef,
    searchSellerRef,
    sellerCompanies,
    values,
    refTable,
    claimType,
    items,
    totalItems,
    isLoading,
    onPageChange,
    setFieldValue,
    getIsCheckBox,
    handleCheckBoxChange,
    isDisabledFilter,
    currentFilterDate,
    handleChangeCountDate,
    handleChangeValueSelect,
    handleChangeFilterForm,
    formFilter,
    handleOpenPopupSearchMember,
    handleOpenPopupSearchCustomer,
    handleOpenPopupSearchSeller,
    handleResetFilter,
    isDisableForm,
    onSubmitForm,
    onDownloadExcel,
    onClickClaimKey,
    onClickOrderKey,
    onClickMemberKey,
    onClickOpenModalNoticeComingSoon,
  }
}
