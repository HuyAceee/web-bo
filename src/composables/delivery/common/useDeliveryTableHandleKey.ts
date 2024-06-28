import { MEMBER_DETAIL_INFO, PRODUCT_TICKET_PRODUCT_EDIT, onpenWindowWithQueryString } from '@/common'
import { MemberListTabType } from '@/models'
import { useDeliverySellerInfoModal } from '../modal/useDeliverySellerInfoModal'
import { useDeliveryCustomerInfoModal } from '../modal/useDeliveryCustomerInfoModal'
import { useDeliveryTicketProductModalDetail } from '../modal/useDeliveryTicketProductModalDetail'
import { useComplaintOrderCancelDetailModal } from '@/composables/complaint/modal/useComplaintOrderCancelDetailModal'

interface DeliveryTableHandleKeyModel {
  sellerKey?: number
  customerKey?: number
  orderKey?: number
  productKey?: number
  claimStatus?: string
  memberKey?: number
}

type HasTableHandleKeyProperty<T> = T extends DeliveryTableHandleKeyModel ? T : never

export const useDeliveryTableHandleKey = <T>() => {
  const { onShowModal } = useComplaintOrderCancelDetailModal()
  const { handleOpenModal } = useDeliverySellerInfoModal()
  const { handleOpenModal: handleOpenModalCustomerInfo } = useDeliveryCustomerInfoModal()
  const { openModal: openModalDeliveryModalDetail } = useDeliveryTicketProductModalDetail()
  const onClickOrderKey = (value?: HasTableHandleKeyProperty<T>) => {
    openModalDeliveryModalDetail?.(value?.orderKey ?? '')
  }
  const onClickProductKey = (value?: HasTableHandleKeyProperty<T>) => {
    onpenWindowWithQueryString(PRODUCT_TICKET_PRODUCT_EDIT, {
      tab: MemberListTabType.BASE_INFORMATION,
      productKey: value?.productKey ?? ''
    })
  }

  const onClickClaimKey = (value?: HasTableHandleKeyProperty<T>) => {
    onShowModal(Number(value?.claimStatus))
  }

  const onClickSellerKey = (value?: HasTableHandleKeyProperty<T>) => {
    handleOpenModal?.(Number(value?.sellerKey))
  }

  const onClickCustomerKey = (value?: HasTableHandleKeyProperty<T>) => {
    handleOpenModalCustomerInfo?.(Number(value?.customerKey))
  }

  const onClickMemberKey = (value?: HasTableHandleKeyProperty<T>) => {
    onpenWindowWithQueryString(MEMBER_DETAIL_INFO, {
      tab: MemberListTabType.BASE_INFORMATION,
      memberKey: value?.memberKey ?? ''
    })
  }

  return {
    onClickOrderKey,
    onClickClaimKey,
    onClickProductKey,
    onClickSellerKey,
    onClickMemberKey,
    onClickCustomerKey
  }
}
