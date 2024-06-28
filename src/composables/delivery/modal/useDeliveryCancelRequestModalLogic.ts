import { calculateTotalFieldValues, formatNumberDot, isString } from '@/common'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables'
import { defaultPageState } from '@/models'
import { DeliveryClaimDetailReasonType, convertErrorFailureResponses } from '@/models/views/delivery/common'
import {
  DeliveryCancelRequestModalConfigs,
  DeliveryCancelRequestModalModel,
  DeliveryOrderedTicketProductModelContain,
  deliveryCancelRequestCaculateTotalFields
} from '@/models/views/delivery/modal/DeliveryCancelRequestModel'
import { DeliveryOrderProcessStatusModel } from '@/models/views/delivery/modal/DeliveryCancelSellModel'
import { deliveryHintListMockData } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderDetailModel'
import { deliveryListOrderStatusApi } from '@/services/api/delivery/DeliveryTicketProductOrderManagementApi'
import { PageState } from 'primevue/paginator'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import { object } from 'yup'
import { useDeliveryTableHandleKey } from '../common/useDeliveryTableHandleKey'
import { useDeliveryCancellationFeeChangeModal } from './useDeliveryCancellationFeeChangeModal'
import { useProductModalErrorResultInfo } from '../useProductModalErrorResultInfo'

export const useDeliveryCancelRequestModalLogic = (id: string | number) => {
  const page = ref<PageState>(defaultPageState)
  const claimDetailReason = ref<string>()
  const deliveryCancelRequestDetail = ref<DeliveryCancelRequestModalModel>({} as DeliveryCancelRequestModalModel)
  const orderedTicketProducts = ref<DeliveryOrderedTicketProductModelContain[]>([])
  const tableRef = ref()
  const cancelFee = ref<number>(0)
  const isCaculated = ref(false)
  const { onShowModal } = useProductModalErrorResultInfo()
  const { openModal: openNotificationModal } = useModalNotification()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { onShowModal: onShowModalCancellationFee } = useDeliveryCancellationFeeChangeModal()
  const listId = computed(() => {
    return (
      orderedTicketProducts.value
        .filter((item) => item.receiverProductOrderKey)
        ?.map((item: DeliveryOrderedTicketProductModelContain) => item.receiverProductOrderKey.toString()) ?? []
    )
  })
  const { listChecked, onRowSelected, onSelectAllChange, setListChecked } = useCheckBoxTable(listId)

  const schema = {
    cancelMemo: isString,
    cancelReasonCode: isString
  }

  const { values, handleSubmit, setFieldValue } = useForm({
    validationSchema: object().shape(schema)
  })

  const fetchDataCallback = async () => {
    const data = await deliveryListOrderStatusApi.getCancelRequestByOrderKey(id)
    deliveryCancelRequestDetail.value = data.data
    const dataMapping = data?.data?.orderedTicketProducts?.map((order, index) => ({
      ...order,
      id: order.receiverProductOrderKey?.toString(),
      no: index + 1,
      isSelected: true,
      isDisabled: order.orderStatus === DeliveryOrderProcessStatusModel.ORDER_CANCEL_WITHDRAWAL
    }))
    tableRef.value?.selectAllItem()
    const listCheckedTemp = dataMapping.map((item) => item?.id?.toString())
    setListChecked(listCheckedTemp)
    const totalRecord = calculateTotalFieldValues(
      dataMapping,
      deliveryCancelRequestCaculateTotalFields as [keyof DeliveryOrderedTicketProductModelContain]
    )
    orderedTicketProducts.value = dataMapping.concat([{ ...totalRecord, transactionNumber: '계' }])
  }

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
  }

  onMounted(() => {
    fetchDataCallback()
  })

  const { onClickOrderKey, onClickProductKey, onClickSellerKey } = useDeliveryTableHandleKey<DeliveryCancelRequestModalModel>()

  const tableConfigs = computed(() => {
    return DeliveryCancelRequestModalConfigs(deliveryCancelRequestDetail.value, onClickOrderKey, onClickProductKey, onClickSellerKey)
  })

  const handlePutOrderCancel = () => {
    if (!listChecked.value.length)
      return openNotificationModal({
        content: '먼저 원하는 주문을 선택해 주세요.'
      })
    openConfirmModal?.({
      content: '<p>선택한 주문을 취소하시겠습니까?</p>',
      async onConfirm() {
        closeModalByPop?.()
        handleConfirmPutOrderCancel()
      }
    })
  }

  const handleConfirmPutOrderCancel = handleSubmit(async (values) => {
    const receiverProductOrderKey = listChecked.value.map((key) => Number(key))
    const { data } = await deliveryListOrderStatusApi.putOrderCancel({
      cancelFee: cancelFee.value,
      cancelMemo: values?.cancelMemo,
      cancelReasonCode: values?.cancelReasonCode as DeliveryClaimDetailReasonType,
      orderKey: Number(id),
      receiverProductOrderKey
    })
    const errors = convertErrorFailureResponses(data.failureResponses)
    onShowModal(errors, deliveryHintListMockData)
  })

  const deliveryCancelRequestModalTableRefundAmount = computed(() => {
    return [
      {
        lastPaymentAmount: isCaculated.value ? formatNumberDot(deliveryCancelRequestDetail.value.lastPaymentAmount) + ' 원' : '-',
        cancelAmout: isCaculated.value ? formatNumberDot(totalCheckedRecord.value.productAmount) + ' 원' : '-',
        cancelFee: formatNumberDot(cancelFee.value) + ' 원',
        expectedRefundAmount: isCaculated.value ? formatNumberDot(totalCheckedRecord.value.productAmount - cancelFee.value) + ' 원' : '-'
      }
    ]
  })

  const showModalChangeCancelFee = () => {
    onShowModalCancellationFee({
      cancellationFee: cancelFee.value,
      claimKey: 10,
      finalPaymentAmount: totalCheckedRecord.value.productAmount - totalCheckedRecord.value.welfarePointPaymentAmount - cancelFee.value,
      onCheck: (value) => {
        cancelFee.value = Number(value)
      }
    })
  }

  const handleCanculate = () => {
    isCaculated.value = true
  }

  const itemsChecked = computed(() => {
    return orderedTicketProducts.value.filter((order) => listChecked.value.includes(order?.id?.toString()))
  })

  const totalCheckedRecord = computed(() => {
    return calculateTotalFieldValues(itemsChecked.value, deliveryCancelRequestCaculateTotalFields as [keyof DeliveryOrderedTicketProductModelContain])
  })

  const cancelRequestTableRefundPayment = computed(() => [
    {
      refundPayment1: formatNumberDot(totalCheckedRecord.value.welfarePointPaymentAmount) + ' 원',
      refundPayment2:
        formatNumberDot(totalCheckedRecord.value.productAmount - totalCheckedRecord.value.welfarePointPaymentAmount - cancelFee.value) + ' 원',
      refundPayment3: '신용카드'
    }
  ])

  return {
    cancelFee,
    onPageChange,
    orderedTicketProducts,
    onRowSelected,
    onSelectAllChange,
    listChecked,
    claimDetailReason,
    tableRef,
    tableConfigs,
    handlePutOrderCancel,
    showModalChangeCancelFee,
    values,
    setFieldValue,
    deliveryCancelRequestModalTableRefundAmount,
    isCaculated,
    handleCanculate,
    cancelRequestTableRefundPayment
  }
}
