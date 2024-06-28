import { useDeliveryTicketProductModalDetail } from '@/composables/delivery/modal/useDeliveryTicketProductModalDetail'
import { useComplaintOrderCancelDetailModal } from '../modal/useComplaintOrderCancelDetailModal'

interface ComplaintTicketProductTableHandleKeyModel {
  claimKey?: number
  orderKey?: number
  sellerKey?: number
  memberKey?: number
  companyKey?: number
}

type HasTableHandleKeyProperty<T> = T extends ComplaintTicketProductTableHandleKeyModel ? T : never
export const useComplaintTableHandleKey = <T>() => {
  
  const { onShowModal: openModalCancelOrderDetail } = useComplaintOrderCancelDetailModal()
  const { openModal: openModalDeliveryModalDetail } = useDeliveryTicketProductModalDetail()

  const onClickClaimKey = (value?: HasTableHandleKeyProperty<T>) => {
    openModalCancelOrderDetail(Number(value?.claimKey))
  }
  const onClickOrderKey = (value?: HasTableHandleKeyProperty<T>) => {
    openModalDeliveryModalDetail?.(value?.orderKey ?? '')
  }

  return {
    onClickClaimKey,
    onClickOrderKey
  }
}
