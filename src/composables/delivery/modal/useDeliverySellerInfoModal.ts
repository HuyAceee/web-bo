import { useProductVendorInformationModal } from '@/composables/products/modal/vendorInformation/useProductVendorInformationModal'
import { deliveryInfoApi } from '@/services/api/delivery/DeliveryInfoApi'

export const useDeliverySellerInfoModal = () => {
  const { onShowModal, closeModalByPop } = useProductVendorInformationModal()

  const handleOpenModal = async (sellerKey: number) => {
    const { data } = await deliveryInfoApi.getSellerInfo(sellerKey)
    closeModalByPop?.()
    onShowModal({
      sellerCode: data.sellerKey,
      nameOfSellingCompany: data.sellerName,
      salesDirectory: data.standardCategoryNameList,
      masterAccount: data.masterAccountName,
      businessNumber: data.bizRegNum,
      companyRegistrationNumber: data.corpRegNum,
      representative: data.representativeName,
      workplace: data.streetAddress,
      phoneNumber: data.masterAccountPhone
    })
  }

  return { handleOpenModal }
}
