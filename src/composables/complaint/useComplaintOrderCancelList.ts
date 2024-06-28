import {
  COMPLAINT_ORDER_CANCEL_STATUS,
  ComplaintOrderCancelFormModel,
  ComplaintOrderCancelListFormModel,
  complaintOrderCancelListModelConfig,
  complaintOrderCancelSelectOptionDefault,
  complaintOrderCancelSelectProductDefault,
  ComplaintOrderCancelTableConfig
} from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { useFormFilterTable, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ref, watch } from 'vue'
import { DataTableRowSelectEvent } from 'primevue/datatable'
import router from '@/router'
import {
  DEFAULT_DATE_FORMAT,
  exportExcel,
  exportFileName,
  handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD,
  MEMBER_POINT_ADJUSTMENT_REGISTRATION,
  renderSortDataTable
} from '@/common'
import { complaintOrderCancelApi } from '@/services/api/complaint/ComplaintOrderCancelApi'

import {
  ComplaintOrderCancelKeywordSearchType,
  ComplaintOrderCancelRequestConvertor
} from '@/models/services/requests/complaint/complaintOrderCancel/ComplaintOrderCancelListRequest'
import {
  deliveryClaimReasonStatusCommonCodeName,
  deliveryOrderProcessStatusCommonCodeName
} from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'
import { deliveryClaimDetailReasonTypeOptions } from '@/models/views/delivery/common'
import { useComplaintOrderCancelWrapperModal } from '@/composables/complaint/modal/useComplaintOrderCancelWrapperModal'
import { useComplaintOrderCancelDetailModal } from '@/composables/complaint/modal/useComplaintOrderCancelDetailModal'
import { useDeliveryTicketProductModalDetail } from '@/composables/delivery/modal/useDeliveryTicketProductModalDetail'
import { useDeliveryMemberSellerCompany } from '@/composables/delivery/ticketProductOrderManagement/useDeliveryMemberSellerCompany'

export const useComplaintOrderCancelList = () => {
  const dateActiveNumber = complaintOrderCancelListModelConfig.listButtonDateFilter[3].value
  const initialData: ComplaintOrderCancelFormModel = {
    claimKey: '',
    claimStatus: complaintOrderCancelListModelConfig.selectRow1.options[0],
    orderMemberKey: '',
    customerKey: '',
    orderKey: '',
    orderer: '',
    receiver: '',
    receiverPhone: '',
    sellerKey: '',
    subcontractKey: complaintOrderCancelListModelConfig.selectRow4.options[0],
    mdKey: complaintOrderCancelSelectOptionDefault,
    periodSearchType: complaintOrderCancelListModelConfig.listSelectDate.options[0],
    fromDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).lastCustomDayString,
    toDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).currentDateString,
    productKey: complaintOrderCancelSelectProductDefault,
    keyword: '',
    keywordSearchType: complaintOrderCancelListModelConfig.listSelectSearchType.options[0]
  }
  const selectedMember = ref()
  const complaintTicketProdFileName = exportFileName('Claim-order-cancel', DEFAULT_DATE_FORMAT)
  const { openModalOrderCancel } = useComplaintOrderCancelWrapperModal()
  const { onShowModal: onShowModalOrderCancelDetail } = useComplaintOrderCancelDetailModal()
  const { openModal: onShowModalOrderDetail } = useDeliveryTicketProductModalDetail()
  const complaintFormFilterRef = ref()

  const { openModal } = useModalNotification()

  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const submitParamsValue = ref<ComplaintOrderCancelFormModel>(initialData)

  const getMemberPointAllocationList = (page: number, size: number) => {
    return complaintOrderCancelApi.getOrderCancelList(ComplaintOrderCancelRequestConvertor.from(submitParamsValue.value, page, size))
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
    totalItems,
    refTable,
    onSubmit,
    clearChecked,
    onRowSelected,
    listChecked,
    onSelectAllChange,
    setData
  } = useFormFilterTable<ComplaintOrderCancelListFormModel, ComplaintOrderCancelFormModel>({
    initialDate: dateActiveNumber,
    initialValuesForm: initialData,
    fetchDataCallback: getMemberPointAllocationList,
    disabledFetchApiFirst: true
  })

  const { sellerCompanies } = useDeliveryMemberSellerCompany<ComplaintOrderCancelFormModel>(values, setFieldValue)
  const onDownloadExcel = () => {
    if (!items.value) return

    const newItems = items.value?.map((newValue) => {
      return {
        ...newValue,
        claimType: deliveryClaimReasonStatusCommonCodeName?.find((item) => item.value === newValue.claimType)?.label,
        claimStatus: deliveryOrderProcessStatusCommonCodeName?.find((item) => item.value === newValue.claimStatus)?.label,
        orderStatus: deliveryOrderProcessStatusCommonCodeName?.find((item) => item.value === newValue.orderStatus)?.label,
        claimDetailReason: deliveryClaimDetailReasonTypeOptions?.find((item) => item.value === newValue.claimDetailReason)?.label
      }
    })
    const sortedData = renderSortDataTable(newItems, ComplaintOrderCancelTableConfig)
    exportExcel(
      sortedData,
      complaintTicketProdFileName,
      ComplaintOrderCancelTableConfig.map((item) => item.header)
    )
  }
  const onSubmitForm = () => {
    if (values.keywordSearchType.value !== complaintOrderCancelListModelConfig.listSelectSearchType.options[0].value && !values.keyword) {
      openModal({
        content: '검색어를 입력해 주세요.'
      })
    } else {
      resetChecked()
      submitParamsValue.value = values
      onSubmit()
    }
  }
  const onRowSelect = (select: DataTableRowSelectEvent) => {
    selectedMember.value = select
  }

  const submitRegistration = () => {
    if (selectedMember.value) {
      router.push(MEMBER_POINT_ADJUSTMENT_REGISTRATION)
    } else {
      openModal?.({
        buttonLabel: '확인',
        content: '필수입력 항목을 입력하세요.'
      })
    }
  }

  const disposalRequestAction = () => {
    complaintOrderCancelApi
      .putDisposalTicketRequest(listChecked.value)
      .then(() => {
        openModal?.({
          content: '티켓 폐기 요청이 전송되었습니다.',
          onAccept() {
            resetChecked()
            onSubmitForm()
            closeModalByPop?.()
          }
        })
      })
      .catch(() => {
        //error
      })
  }

  const goToEditPage = () => {
    if (listChecked.value?.length > 0) {
      const checkStatus = items.value?.some((item) => {
        return (
          item?.claimProductKey === listChecked?.value?.find((idChecked) => idChecked?.toString() === item?.claimKey?.toString()) &&
          item?.claimStatus !== COMPLAINT_ORDER_CANCEL_STATUS.DISUSE_FAIL
        )
      })
      if (checkStatus) {
        openModal?.({
          content: '처리할 수 없는 상태의 상품이 존재합니다. 다시 확인해 주세요.'
        })
      } else {
        openModalConfirm({
          content: '선택하신 티켓 상품에 대해 폐기요청을 재전송 하시겠습니까?',
          buttonCancelLabel: '닫기',
          buttonConfirmLabel: '확인',
          onConfirm: () => {
            closeModalByPop?.()
            disposalRequestAction()
          }
        })
      }
    } else {
      openModal?.({
        content: '대상 상품을 선택해 주세요.'
      })
    }
  }

  const resetDataForm = () => {
    submitParamsValue.value = initialData
    complaintFormFilterRef?.value?.resetFormComplaint()
    handleResetFormFilter()
    resetChecked()
    setData([])
    totalItems.value = 0
  }

  const resetChecked = () => {
    clearChecked()
    refTable.value?.clearCheckAll()
  }

  const openModalOrderCancellation = () => {
    if (listChecked.value?.length > 0) {
      const checkStatus = items.value?.some((item) => {
        return (
          item?.claimProductKey === listChecked?.value?.find((idChecked) => idChecked?.toString() === item?.claimKey?.toString()) &&
          item?.claimStatus !== COMPLAINT_ORDER_CANCEL_STATUS.ORDER_CANCEL &&
          item?.claimStatus !== COMPLAINT_ORDER_CANCEL_STATUS.DISUSE_FAIL
        )
      })
      if (checkStatus) {
        openModal?.({
          content: '처리할 수 없는 상태의 상품이 존재합니다. 다시 확인해 주세요.'
        })
      } else {
        openModalOrderCancel(
          listChecked.value.map((item) => Number(item)),
          () => {
            resetChecked()
            onSubmitForm()
          }
        )
      }
    } else {
      openModal?.({
        content: '대상 상품을 선택해 주세요.'
      })
    }
  }

  watch(
    () => values.keywordSearchType,
    (newValue) => {
      if (newValue.value !== ComplaintOrderCancelKeywordSearchType.NONE) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { keywordSearchType, ...newObject } = initialData
        Object.keys(newObject).map((keyObject) => {
          setFieldValue(keyObject, newObject[keyObject])
        })
      }
    }
  )

  return {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    ...complaintOrderCancelListModelConfig,
    handleResetFormFilter: resetDataForm,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onSubmitForm,
    onRowSelect,
    selectedMember,
    submitRegistration,
    goToEditPage,
    sellerCompanies,
    onRowSelected,
    onSelectAllChange,
    clearChecked,
    openModalOrderCancel: openModalOrderCancellation,
    onShowModalOrderCancelDetail,
    onShowModalOrderDetail,
    onDownloadExcel,
    complaintFormFilterRef
  }
}
