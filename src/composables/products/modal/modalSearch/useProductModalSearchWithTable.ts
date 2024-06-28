import ProductSearchModalWithTable from '@/components/products/common/ProductSearchModalWithTable.vue'
import { useModal } from '@/composables'
import { ProductSearchModalProps, ProductSearchRecordModel, ProductSearchType } from '@/models'

import { ref } from 'vue'
import { DeliverySellerAndCustomerSearchTableModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'

export const useProductModalSearchWithTable = (reverseSearchText?: boolean) => {
  const modalTable = useModal<ProductSearchModalProps>()

  const searchResData = ref<ProductSearchRecordModel>()

  const searchText = ref('')

  const openModal = (type: ProductSearchType, callback?: (value: DeliverySellerAndCustomerSearchTableModel) => void) => {
    modalTable.showModal?.({
      component: ProductSearchModalWithTable,
      props: {
        onCancel: modalTable.closeModalByPop,
        onSelect: onSelect,
        onSelectRow: callback,
        searchInput: searchText.value,
        searchResData: searchResData.value,
        searchType: type
      }
    })
  }
  const onSelect = (value: ProductSearchRecordModel) => {
    if (reverseSearchText) {
      searchText.value = value.code ? `${value.name} (${value.code})` : ''
    } else {
      searchText.value = value.code ? `${value.code} (${value.name})` : ''
    }
    searchResData.value = value
    modalTable.closeModalByPop?.()
  }

  return { ...modalTable, openModal, searchText, searchResData }
}
