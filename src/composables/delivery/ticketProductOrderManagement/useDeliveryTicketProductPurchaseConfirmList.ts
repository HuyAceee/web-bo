import { deliveryListOrderStatusApi } from '@/services/api/delivery/DeliveryTicketProductOrderManagementApi'
import { useDeliveryTicketProductFilterTable } from '@/composables/delivery/common/useDeliveryTicketProductFilterTable'
import { DeliveryTicketProductFilterTableRequest } from '@/models/services/requests/delivery/common/DeliveryTicketProductFilterTableRequest'
import { deliveryListSelectDatePurchaseConfirmListOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import { deliveryTicketProductPurchaseConfirmListXlsxSheetName } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductPurchaseConfirmListModel'
import { deliveryTicketProductFilterTableHeaderTableConfig } from '@/models/views/delivery/common'

export const useDeliveryTicketProductPurchaseConfirmList = () => {
  const callback = async (params: DeliveryTicketProductFilterTableRequest) => {
    return await deliveryListOrderStatusApi.getAllPurchaseConfirmList(params)
  }

  const {
    values,
    setFieldValue,
    resetForm,
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
    searchSellerKeyRef,
    searchOrderMemberKeyRef,
    handleOpenPopupSearchMember,
    categoryDepth1,
    categoryDepth2,
    categoryDepth3,
    getIsCheckBox,
    handleCheckBoxChange,
    handleResetForm,
    handleOpenPopupSearchSeller,
    searchMDKeyRef,
    sellerCompanies,
    tableConfigs,
    searchProductKeyRef,
    handleOpenPopupSearchProduct,
    deliveryClaimStatusOptions,
    isDisabledClaimStatus,
    searchMemberKeyRef,
    searchCustomerKeyRef,
    handleOpenPopupSearchOrderMember,
    handleOpenPopupSearchCustomer,
    handleChangeKeywordFilter,
    handleInputFieldChange,
    placeholderKeywordSearch
  } = useDeliveryTicketProductFilterTable(
    deliveryTicketProductPurchaseConfirmListXlsxSheetName,
    callback,
    deliveryListSelectDatePurchaseConfirmListOptions[0],
    deliveryTicketProductFilterTableHeaderTableConfig
  )

  return {
    values,
    setFieldValue,
    resetForm,
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
    searchSellerKeyRef,
    searchOrderMemberKeyRef,
    searchMDKeyRef,
    handleOpenPopupSearchMember,
    categoryDepth1,
    categoryDepth2,
    categoryDepth3,
    getIsCheckBox,
    handleCheckBoxChange,
    handleResetForm,
    handleOpenPopupSearchSeller,
    sellerCompanies,
    tableConfigs,
    searchProductKeyRef,
    handleOpenPopupSearchProduct,
    isDisabledClaimStatus,
    deliveryClaimStatusOptions,
    searchMemberKeyRef,
    searchCustomerKeyRef,
    handleOpenPopupSearchOrderMember,
    handleOpenPopupSearchCustomer,
    handleChangeKeywordFilter,
    handleInputFieldChange,
    placeholderKeywordSearch
  }
}
