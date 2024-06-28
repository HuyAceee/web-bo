import { exportExcel, handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD } from '@/common'
import { useDeliveryTicketProductModalDetail } from '@/composables/delivery/modal/useDeliveryTicketProductModalDetail'
import { useBaseFormFilterTable } from '@/composables/widgets/form/useBaseFormFilterTable'
import { useComingSoonModal } from '@/composables/widgets/modal/useComingSoonModal'
import {
  DataHeaderMemberOrderDetailTableModalConfig,
  MemberDetailBaseTabProps,
  MemberListOrderDetailDataTableModel,
  MemberSearchMemberListOrderDetailFormModel,
  memberSearchMemberOrderDetailPaymentMethodOptions,
  memberSearchMemberOrderDetailProductClassificationOptions
} from '@/models'
import { MemberOrderDetailRequestConvertor } from '@/models/services/requests/members/MemberListOrderDetailRequest'
import { complaintOrderCancelListModelConfig } from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { memberListOrderDetailApi } from '@/services/api/members/MemberListOrderDetailApi'
import { ref, watch } from 'vue'
export const useMemberListOrderDetail = (props: MemberDetailBaseTabProps) => {
  const optionProductClassification = memberSearchMemberOrderDetailProductClassificationOptions
  const optionPaymentMethod = memberSearchMemberOrderDetailPaymentMethodOptions
  const dateActiveNumber = complaintOrderCancelListModelConfig.listButtonDateFilter[0].value
  const memberData = ref<any>(props?.data)
  const { openComingSoonModal } = useComingSoonModal()
  const deliveryTicketProductModal = useDeliveryTicketProductModalDetail()
  const handleShowTicketDetails = (id: number) => {
    deliveryTicketProductModal.openModal(id)
  }
  const emptyForm: MemberSearchMemberListOrderDetailFormModel = {
    productClassification: memberSearchMemberOrderDetailProductClassificationOptions[0],
    paymentMethod: memberSearchMemberOrderDetailPaymentMethodOptions[0],
    fromDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).lastCustomDayString,
    toDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).currentDateString
  }
  const fetchDataCallback = (page: number, size: number) => {
    if (!memberData.value?.memberKey) throw new Error('Member Key is undefined')
    const newValues: MemberSearchMemberListOrderDetailFormModel = {
      ...values
    }
    return memberListOrderDetailApi.getMemberInfoWithOrderDetail(
      memberData.value?.memberKey as string,
      MemberOrderDetailRequestConvertor.from(newValues, page, size)
    )
  }
  const {
    items,
    values,
    refTable,
    totalItems,
    isLoading,
    onPageChange,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleChangeValueSelect,
    handleResetFilter,
    refreshData
  } = useBaseFormFilterTable<MemberListOrderDetailDataTableModel, MemberSearchMemberListOrderDetailFormModel>({
    initialValuesForm: emptyForm,
    fetchDataCallback,
    onResetForm: () => {},
    defaultValueControlFilter: { ...memberSearchMemberOrderDetailProductClassificationOptions[0] },
    disabledFetchApiFirst: true
  })
  watch(
    () => props.data,
    (val) => {
      memberData.value = val
    }
  )
  const onSubmitForm = () => {
    refreshData()
  }
  const exportOrdersExcel = () => {
    const preparedData =
      items.value?.map((item) => ({
        paymentDatetime: item?.paymentDatetime ? item?.paymentDatetime : '-',
        orderKey: item?.orderKey ? item?.orderKey : '-',
        productClassification: item?.productClassification ? item?.productClassification : '-',
        productName: item?.productName ? item?.productName : '-',
        orderQuantity: item?.orderQuantity ? item?.orderQuantity : '-',
        totalProductAmount: item?.totalProductAmount ? item?.totalProductAmount : '-',
        immediatelyDiscountAmount: item?.immediatelyDiscountAmount ? item?.immediatelyDiscountAmount : '-',
        orderCouponDiscountAmount: item?.orderCouponDiscountAmount ? item?.orderCouponDiscountAmount : '-',
        lastOrderAmount: item?.lastOrderAmount ? item?.lastOrderAmount : '-',
        deliveryAmount: item?.deliveryAmount ? item?.deliveryAmount : '-',
        deliveryDiscountAmount: item?.deliveryDiscountAmount ? item?.deliveryDiscountAmount : '-',
        lastPaymentAmount: item?.lastPaymentAmount ? item?.lastPaymentAmount : '-',
        cancelQuantity: item?.cancelQuantity ? item?.cancelQuantity : '-',
        cancelProductAmount: item?.cancelProductAmount ? item?.cancelProductAmount : '-',
        claimDeliveryAmount: item?.claimDeliveryAmount ? item?.claimDeliveryAmount : '-',
        cancelFeeAmount: item?.cancelFeeAmount ? item?.cancelFeeAmount : '-',
        remainingQuantity: item?.remainingQuantity ? item?.remainingQuantity : '-',
        remainingPaymentAmount: item?.remainingPaymentAmount ? item?.remainingPaymentAmount : '-',
        rewardPoint: item?.rewardPoint ? item?.rewardPoint : '-',
        welfarePointPaymentAmount: item?.welfarePointPaymentAmount ? item?.welfarePointPaymentAmount : '-',
        pgPaymentAmount: item?.pgPaymentAmount ? item?.pgPaymentAmount : '-',
        pgPaymentMethod: item?.pgPaymentMethod ? item?.pgPaymentMethod : '-',
        ordererName: item?.ordererName ? item?.ordererName : '-',
        receiverName: item?.orderMemberReceiverResponses?.length ? item?.orderMemberReceiverResponses.map((it) => it.receiverName).join(', ') : '-',
        receiverPhoneNumber: item?.orderMemberReceiverResponses?.length
          ? item?.orderMemberReceiverResponses.map((it) => it.receiverPhoneNumber).join(', ')
          : '-',
        receiverAddress: item?.orderMemberReceiverResponses?.length
          ? item?.orderMemberReceiverResponses.map((it) => it.receiverAddress).join(', ')
          : '-',
        orderChannel: item?.orderChannel ? item?.orderChannel : '-'
      })) ?? []
    exportExcel(
      preparedData,
      'Orders',
      DataHeaderMemberOrderDetailTableModalConfig.map((item) => item.header ?? '')
    )
  }
  return {
    optionProductClassification,
    optionPaymentMethod,
    items,
    values,
    refTable,
    totalItems,
    isLoading,
    onPageChange,
    setFieldValue,
    onSubmitForm,
    currentFilterDate,
    handleChangeCountDate,
    handleChangeValueSelect,
    handleResetFilter,
    openComingSoonModal,
    deliveryTicketProductModal,
    handleShowTicketDetails,
    exportOrdersExcel
  }
}