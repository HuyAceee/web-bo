import { useModal } from '@/composables'
import { DEFAULT_DATE_FORMAT_DOT, formatTime } from '@/common'
import { deliveryInfoApi } from '@/services/api/delivery/DeliveryInfoApi'
import DeliveryCustomerInfoModal from '@/views/delivery/modal/DeliveryCustomerInfoModal.vue'
import { DeliveryCustomerInfoModel } from '@/models/views/delivery/modal/DeliveryCustomerInfoModel'

export const useDeliveryCustomerInfoModal = () => {
  const { showModal, closeModalByPop } = useModal()
  const onShowModal = (data: DeliveryCustomerInfoModel) => {
    showModal?.({
      component: DeliveryCustomerInfoModal,
      props: {
        data
      }
    })
  }
  const handleOpenModal = async (customerKey: number) => {
    const { data } = await deliveryInfoApi.getCustomerInfo(customerKey)
    closeModalByPop?.()
    onShowModal({
      customerKey: data.customerKey,
      customerName: data.customerName,
      bizRegNum: data.bizRegNum,
      corpRegNum: data.corpRegNum,
      contractStartDate: formatTime(data.contractStartDate, DEFAULT_DATE_FORMAT_DOT),
      contractEndDate: formatTime(data.contractEndDate, DEFAULT_DATE_FORMAT_DOT),
      representativeName: data.representativeName,
      streetAddress: data.streetAddress,
      masterAccountPhone: data.masterAccountPhone,
      masterAccountName: data.masterAccountName
    })
  }

  return { handleOpenModal, closeModalByPop }
}
