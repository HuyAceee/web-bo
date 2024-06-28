import { exportExcel, renderSortDataTable, CHARACTER_SEPARATOR, TEXT_MAX_NUMBER_1, TEXT_MAX_NUMBER_50 } from '@/common'
import { useBaseFormFilterTable, useModalNotification } from '@/composables'
import { deliveryListOrderStatusApi } from '@/services/api/delivery/DeliveryTicketProductOrderManagementApi'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDeliveryTableHandleKey } from '@/composables/delivery/common/useDeliveryTableHandleKey'
import { useDeliveryCancellationFeeChangeModal } from '@/composables/delivery/modal/useDeliveryCancellationFeeChangeModal'
import { useDeliveryIssuanceDelayInfoDetailModal } from '@/composables/delivery/modal/useDeliveryIssuanceDelayInfoDetailModal'
import { deliveryErrorResultInfoData } from '@/assets/mockData/data/delivery/delivery-error-result-info-data'
import { removeEmptyObjectProperties } from '@/common/common'
import {
  DeliveryPaymentMethodModel,
  DeliveryTicketProductListOrderStatusFormModel,
  deliveryTicketProductListOrderStatusHeaders,
  deliveryTicketProductListOrderStatusHeaderTableConfig,
  DeliveryTicketProductListOrderStatusModel,
  DeliveryOrderChannelModel,
  deliveryTicketProductListOrderStatusXlsxSheetName,
  deliveryKeywordSearchOptions,
  DeliveryTicketProductRequestConvertor
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import { DeliveryKeywordSearchType, DeliveryPeriodSearchType } from '@/models/views/delivery/common'
import { useDeliveryTicketProductModalDetail } from '../modal/useDeliveryTicketProductModalDetail'
import { useProductModalErrorResultInfo } from '../useProductModalErrorResultInfo'

export const useDeliveryTicketProductOrderManagement = () => {
  const searchCustomerKeyRef = ref()
  const searchOrderMemberKeyRef = ref()
  const { openModal, closeModalByPop } = useModalNotification()
  const initialValuesForm: DeliveryTicketProductListOrderStatusFormModel = {
    orderKey: '',
    customerKey: '',
    orderMemberKey: '',
    ordererName: '',
    receiverName: '',
    receiverPhone: undefined,
    paymentMethod: DeliveryPaymentMethodModel.ALL,
    orderChannel: DeliveryOrderChannelModel.ALL,
    periodSearchType: DeliveryPeriodSearchType.PAYMENT_DATE,
    fromDate: '',
    toDate: '',
    keywordSearchType: DeliveryKeywordSearchType.NONE,
    keywords: ''
  }

  const route = useRoute()
  const errorResultInfo = useProductModalErrorResultInfo()
  const cancellationFeeChangeModal = useDeliveryCancellationFeeChangeModal()
  const issuanceDelayInfoDetailModal = useDeliveryIssuanceDelayInfoDetailModal()
  const deliveryTicketProductModal = useDeliveryTicketProductModalDetail()

  onMounted(() => {
    if (route.query.modal === 'failure-result-info-modal') {
      errorResultInfo.onShowModal(deliveryErrorResultInfoData, [
        {
          content: '송장일괄등록에 실패하였습니다.',
          isEmphasize: true
        },
        { content: '다음의 오류를 확인 후 재시도해 주세요.', isEmphasize: false }
      ])
    } else if (route.query.modal === 'cancellation-fee-change-modal') {
      cancellationFeeChangeModal.onShowModal({
        cancellationFee: 0,
        claimKey: 1,
        finalPaymentAmount: 1000
      })
    } else if (route.query.modal === 'issuance-delay-info-detail') {
      issuanceDelayInfoDetailModal.onShowModal({
        receiverProductOrderKey: 1,
        issuanceDelayProcessingDateTime: '2023.06.19 17:35:01',
        manager: '(12345) 김메가'
      })
    } else if (route.query.modal === 'coupon-image-preview-popup') {
      // hard code for display modal on HTML list
      deliveryTicketProductModal.openModal('10000')
    }
  })

  const fetchDataCallback = async (pageNum: number, rowSize: number) => {
    const params = DeliveryTicketProductRequestConvertor.from(values)
    const data = await deliveryListOrderStatusApi.getList({
      ...removeEmptyObjectProperties(params),
      pageNum: pageNum + 1,
      rowSize
    })
    return data
  }

  const {
    values,
    setFieldValue,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    listChecked,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit,
    handleResetFilter
  } = useBaseFormFilterTable<DeliveryTicketProductListOrderStatusModel, DeliveryTicketProductListOrderStatusFormModel>({
    initialValuesForm,
    fetchDataCallback,
    disabledFetchApiFirst: true,
    onResetForm: () => {
      searchCustomerKeyRef.value.handleReset()
      searchOrderMemberKeyRef.value.handleReset()
    },
    defaultValueControlFilter: {
      ...deliveryKeywordSearchOptions[0]
    }
  })

  const { onClickOrderKey, onClickMemberKey, onClickCustomerKey } = useDeliveryTableHandleKey<DeliveryTicketProductListOrderStatusModel>()

  const tableConfigs = computed(() => {
    return deliveryTicketProductListOrderStatusHeaderTableConfig(onClickOrderKey, onClickMemberKey, onClickCustomerKey)
  })

  const onDownload = () => {
    if (!items.value) return
    exportExcel(
      renderSortDataTable(items.value, tableConfigs.value),
      deliveryTicketProductListOrderStatusXlsxSheetName,
      deliveryTicketProductListOrderStatusHeaders
    )
  }

  const handleOpenPopupSearchMember = () => {
    searchOrderMemberKeyRef.value.handlePopupSearch()
  }
  let isNotify = true
  const handleInputFieldChange = (e: any) => {
    if (values.keywordSearchType === DeliveryKeywordSearchType.MEMBER_ID) {
      const arrayValue = e.target.value.split(CHARACTER_SEPARATOR)
      const maxNumber = values.keywordSearchType === DeliveryKeywordSearchType.MEMBER_ID ? TEXT_MAX_NUMBER_1 : TEXT_MAX_NUMBER_50
      if (arrayValue.length > maxNumber && isNotify) {
        ;(document.activeElement as HTMLInputElement).blur()
        isNotify = false
        openModal({
          content: ` 최대 ${maxNumber}개까지 입력 가능합니다.`,
          onAccept() {
            isNotify = true
            closeModalByPop?.()
            setFieldValue('keywords', arrayValue.splice(0, maxNumber).join())
          }
        })
      }
    }
  }
  const placeholderKeywordSearch = computed(() => {
    return values.keywordSearchType === DeliveryKeywordSearchType.MEMBER_ID ? '아이디는 1개만 검색할 수 있습니다' : '최대 50개 까지 입력 가능'
  })
  const onSubmitForm = () => {
    if (values.keywordSearchType !== DeliveryKeywordSearchType.NONE && !values.keywords) {
      openModal({
        content: '검색어를 입력해 주세요.'
      })
    } else {
      onSubmit()
    }
  }
  const onChangeSelectKeywordSearch = (value: string) => {
    setFieldValue('keywordSearchType', value)
    setFieldValue('keywords', '')
  }
  return {
    values,
    setFieldValue,
    onPageChange,
    listChecked,
    onRowSelected,
    onSelectAllChange,
    items,
    isLoading,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit,
    onDownload,
    searchCustomerKeyRef,
    searchOrderMemberKeyRef,
    handleOpenPopupSearchMember,
    tableConfigs,
    handleResetFilter,
    handleInputFieldChange,
    placeholderKeywordSearch,
    onSubmitForm,
    onChangeSelectKeywordSearch
  }
}
