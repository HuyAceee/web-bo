import { deliveryTicketDetailApi } from '@/services/api/delivery/DeliveryTicketDetailApi'
import { onMounted, ref } from 'vue'
import { useDeliveryTableHandleKey } from '../common/useDeliveryTableHandleKey'
import { DeliveryDetailModalProps } from '@/models/views/delivery/modal/DeliveryDetailModalModel'
import { DeliveryOrderDataModel } from '@/models/views/delivery/ticketDetailModal/DeliveryTicketDetailModalModel'
import { useDeliveryViewTicketImgModal } from './useDeliveryViewTicketImgModal'
import { useRoute } from 'vue-router'
import { DeliveryProductTypeModel } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'

export const useDeliveryTicketProductDetailLogic = (props: DeliveryDetailModalProps) => {
  const route = useRoute()
  const orderDetail = ref<DeliveryOrderDataModel>({} as DeliveryOrderDataModel)
  const fetchData = async () => {
    const response = await deliveryTicketDetailApi.getDetail(props.orderKey.toString())
    const orderedTicketProducts = response.data.orderedTicketProducts.map((item, index) => {
      return {
        ...item,
        no: index + 1
      }
    })
    orderDetail.value = {
      ...response.data,
      orderedTicketProducts: orderedTicketProducts
    }
  }
  const { onShowModal: onShowModalTicketImage } = useDeliveryViewTicketImgModal()

  onMounted(() => {
    fetchData()
    if (route.query.modal === 'coupon-image-preview-popup') {
      // hard code for display modal on HTML list
      onShowModalTicketImage('https://image.multicon.co.kr/createimage/?pin=284791329820')
    }
  })

  const { onClickProductKey, onClickMemberKey, onClickCustomerKey, onClickSellerKey, onClickOrderKey, onClickClaimKey } =
    useDeliveryTableHandleKey<DeliveryOrderDataModel>()

  const convertTicketType = (ticketType: string) => {
    switch (ticketType) {
      case DeliveryProductTypeModel.DELIVERY_GENERAL:
        return '일반'
      case DeliveryProductTypeModel.DELIVERY_INSTALL:
        return '설치형'
      case DeliveryProductTypeModel.TICKET_GENERAL:
        return '일반 티켓'
      case DeliveryProductTypeModel.TICKET_RESERVATION:
        return '예약 티켓'
      default:
        return '전체'
    }
  }

  return {
    orderDetail,
    onClickMemberKey,
    onClickSellerKey,
    onClickCustomerKey,
    onClickProductKey,
    onClickOrderKey,
    onClickClaimKey,
    onShowModalTicketImage,
    convertTicketType
  }
}
