import { useModal } from '@/composables'
import { DeliverySearchProductSelectedValueModel } from '@/models/views/delivery/modal/DeliverySearchProductModel'
import DeliverySearchProductModal from '@/views/delivery/modal/DeliverySearchProductModal.vue'
import { ref } from 'vue'

export const useDeliverySearchProductModal = () => {
  const { showModal, closeModalByPop } = useModal()
  const searchText = ref()
  const searchResData = ref<DeliverySearchProductSelectedValueModel>({ productCode: '', productName: '', productKey: '' })

  const onShowModal = () => {
    showModal?.({
      component: DeliverySearchProductModal,
      props: {
        onClose: closeModalByPop,
        onSelect: onSelect,
        searchInput: searchText
      }
    })
  }

  const onSelect = (value: DeliverySearchProductSelectedValueModel) => {
    searchText.value = value.productKey ? `${value.productKey} (${value.productName})` : ''
    searchResData.value = value
    closeModalByPop?.()
  }

  return { onShowModal, searchResData, searchText }
}
