import { CHARACTER_SEPARATOR, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss, ID_CHECKBOX_ALL, TEXT_MAX_NUMBER_1, TEXT_MAX_NUMBER_50, exportExcel, getDateByFormat, renderSortDataTable } from '@/common'
import { useBaseFormFilterTable, useCheckbox, useModalNotification } from '@/composables'
import { computed, ref, watch } from 'vue'
import { useDeliveryTableHandleKey } from './useDeliveryTableHandleKey'
import { useDeliveryProductCategory } from '../ticketProductOrderManagement/useDeliveryProductCategory'
import { useDeliveryMemberSellerCompany } from '../ticketProductOrderManagement/useDeliveryMemberSellerCompany'
import { DeliveryTicketProductFilterTableRequest } from '@/models/services/requests/delivery/common/DeliveryTicketProductFilterTableRequest'
import { DeliveryTicketProductFilterTableResponse } from '@/models/services/responses/delivery/common/DeliveryTicketProductFilterTableResponse'
import { removeEmptyObjectProperties } from '@/common/common'
import { deliveryKeywordSearchOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import {
  DeliveryProductTypeModel,
  DeliveryCategoryTypeModel,
  deliveryProductTypeOptions
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import {
  DeliveryOrderStatusModel,
  deliveryClaimStatusOrderCancelOptions,
  deliveryClaimStatusRefundRequestOptions
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductTicketListModel'
import {
  DataTableContaineDeliveryConfigModel,
  DeliveryKeywordSearchType,
  DeliveryPeriodSearchType,
  DeliverySelectOptionModel,
  DeliveryTicketProductFilterTableFormModel,
  DeliveryTicketProductFilterTableModel
} from '@/models/views/delivery/common'

export const useDeliveryTicketProductFilterTable = (
  sheetName: string,
  callback: (params: DeliveryTicketProductFilterTableRequest) => Promise<DeliveryTicketProductFilterTableResponse>,
  dateSelectDefault: DeliverySelectOptionModel<DeliveryPeriodSearchType>,
  renderTableHeadersConfig: (
    onClickOrderKey: (value?: DeliveryTicketProductFilterTableModel | undefined) => void,
    onClickClaimKey: (value?: DeliveryTicketProductFilterTableModel | undefined) => void,
    onClickProductKey: (value?: DeliveryTicketProductFilterTableModel | undefined) => void,
    onClickSellerKey: (value?: DeliveryTicketProductFilterTableModel | undefined) => void,
    onClickMemberKey: (value?: DeliveryTicketProductFilterTableModel | undefined) => void,
    onClickCustomerKey: (value?: DeliveryTicketProductFilterTableModel | undefined) => void
  ) => DataTableContaineDeliveryConfigModel[]
) => {
  const searchSellerKeyRef = ref()
  const searchOrderMemberKeyRef = ref()
  const searchMemberKeyRef = ref()
  const searchCustomerKeyRef = ref()
  const searchMDKeyRef = ref()
  const searchProductKeyRef = ref()
  const { openModal, closeModalByPop } = useModalNotification()
  let isNotify = true
  const initialValuesForm: DeliveryTicketProductFilterTableFormModel = {
    orderKey: '',
    customerKey: '',
    orderMemberKey: '',
    ordererName: '',
    receiverName: '',
    receiverPhoneNumber: undefined,
    categoryId: '',
    categoryDepthId1: '',
    categoryDepthId2: '',
    categoryDepthId3: '',
    categoryType: DeliveryCategoryTypeModel.STANDARD,
    claimStatus: DeliveryOrderStatusModel.NO_CLAIM,
    mdKey: '',
    orderStatus: DeliveryOrderStatusModel.ALL,
    productKey: '',
    productType: DeliveryProductTypeModel.TICKET_GENERAL,
    sellerKey: '',
    subcontractKey: '',
    periodSearchType: DeliveryPeriodSearchType.PAYMENT_DATE,
    fromDate: '',
    toDate: '',
    keywordSearchType: DeliveryKeywordSearchType.NONE,
    keywords: '',
    dateSelect: dateSelectDefault
  }

  const fetchDataCallback = async (pageNum: number, rowSize: number) => {
    const { fromDate = '', toDate = '', dateSelect, categoryDepthId1, categoryDepthId2, categoryDepthId3, ...otherValues } = values
    const productTypeData = (productType.listChecked.value.length === 2 ? '' : productType.listChecked.value?.[0] ?? '') as DeliveryProductTypeModel
    const params = {
      ...otherValues,
      fromDate: fromDate ? getDateByFormat(fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : '',
      toDate: toDate ? getDateByFormat(toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : '',
      periodSearchType: dateSelect?.value,
      categoryId: categoryDepthId1 ?? categoryDepthId2 ?? categoryDepthId3,
      productType: productTypeData
    }
    const data = await callback({
      ...removeEmptyObjectProperties(params),
      pageNum: pageNum + 1,
      rowSize
    })
    return data
  }

  const listIdCheckBoxType = computed(() => {
    return deliveryProductTypeOptions.list.filter((item) => item?.id.toLocaleLowerCase() !== ID_CHECKBOX_ALL)?.map((item) => item.id)
  })

  const productType = useCheckbox(listIdCheckBoxType)

  const listActionCheckBox = computed(() => {
    return {
      productType
    }
  })

  const {
    values,
    setFieldValue,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    listChecked,
    resetForm,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit,
    getIsCheckBox,
    handleCheckBoxChange,
    handleResetForm,
    clearChecked,
    setData,
    handleResetFilter
  } = useBaseFormFilterTable<DeliveryTicketProductFilterTableModel, DeliveryTicketProductFilterTableFormModel>({
    initialValuesForm,
    fetchDataCallback,
    disabledFetchApiFirst: true,
    onResetForm: () => {
      searchSellerKeyRef?.value?.handleReset()
      searchOrderMemberKeyRef?.value?.handleReset()
      searchMDKeyRef?.value?.handleReset()
      searchProductKeyRef?.value?.handleReset()
      searchMemberKeyRef?.value?.handleReset()
      searchCustomerKeyRef?.value?.handleReset()
    },
    listActionCheckBox,
    defaultValueControlFilter: {
      ...deliveryKeywordSearchOptions[0]
    }
  })

  const { categoryDepth1, categoryDepth2, categoryDepth3 } = useDeliveryProductCategory<DeliveryTicketProductFilterTableFormModel>(
    values,
    setFieldValue
  )

  const { sellerCompanies } = useDeliveryMemberSellerCompany<DeliveryTicketProductFilterTableFormModel>(values, setFieldValue)

  const tableHeadersDownload = computed(() => {
    return tableConfigs.value?.map((config) => config.header)
  })

  const onDownload = () => {
    if (!items.value) return
    exportExcel(renderSortDataTable(items.value, tableConfigs.value), sheetName, tableHeadersDownload.value)
  }

  const handleOpenPopupSearchOrderMember = () => {
    searchOrderMemberKeyRef.value.handlePopupSearch()
  }

  const handleOpenPopupSearchSeller = () => {
    searchSellerKeyRef.value.handlePopupSearch()
  }

  const handleOpenPopupSearchMember = () => {
    searchMemberKeyRef.value.handlePopupSearch()
  }

  const handleOpenPopupSearchCustomer = () => {
    searchCustomerKeyRef.value.handlePopupSearch()
  }

  const handleOpenPopupSearchProduct = () => {
    searchProductKeyRef.value.handlePopupSearch()
  }

  const { onClickOrderKey, onClickClaimKey, onClickProductKey, onClickSellerKey, onClickMemberKey, onClickCustomerKey } =
    useDeliveryTableHandleKey<DeliveryTicketProductFilterTableModel>()

  const tableConfigs = computed(() => {
    return renderTableHeadersConfig(onClickOrderKey, onClickClaimKey, onClickProductKey, onClickSellerKey, onClickMemberKey, onClickCustomerKey)
  })

  watch(
    () => values?.orderStatus,
    () => {
      setFieldValue('claimStatus', DeliveryOrderStatusModel.ALL)
    }
  )

  const deliveryClaimStatusOptions = computed(() => {
    if (values.orderStatus === DeliveryOrderStatusModel.REFUND_REQUEST) return deliveryClaimStatusRefundRequestOptions
    return deliveryClaimStatusOrderCancelOptions
  })

  const isDisabledClaimStatus = computed(() => {
    if (!values?.orderStatus) return true
    return ![DeliveryOrderStatusModel.REFUND_REQUEST, DeliveryOrderStatusModel.ORDER_CANCEL].includes(values.orderStatus)
  })

  const handleChangeKeywordFilter = (value: DeliveryKeywordSearchType | undefined) => {
    handleResetFilter()
    setFieldValue('keywordSearchType', value)
  }

  const handleInputFieldChange = (e: any) => {
    if (values.keywordSearchType === DeliveryKeywordSearchType.MEMBER_ID) {
      const arrayValue = e.target.value.split(CHARACTER_SEPARATOR)
      const maxNumber = values.keywordSearchType === DeliveryKeywordSearchType.MEMBER_ID ? TEXT_MAX_NUMBER_1 : TEXT_MAX_NUMBER_50
      if (arrayValue.length > maxNumber && isNotify) {
        ;(document.activeElement as HTMLInputElement).blur()
        isNotify = false
        openModal({
          content: ` 최대 ${maxNumber}개까지 입력 가능합니다.`,
          onAccept() {
            isNotify = true
            closeModalByPop?.()
            setFieldValue('keywords', arrayValue.splice(0, maxNumber).join())
          }
        })
      }
    }
  }

  const placeholderKeywordSearch = computed(() => {
    return values.keywordSearchType === DeliveryKeywordSearchType.MEMBER_ID ? '아이디는 1개만 검색할 수 있습니다' : '최대 50개 까지 입력 가능'
  })

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
    clearChecked,
    tableConfigs,
    searchProductKeyRef,
    handleOpenPopupSearchProduct,
    deliveryClaimStatusOptions,
    isDisabledClaimStatus,
    setData,
    handleResetFilter,
    searchMemberKeyRef,
    searchCustomerKeyRef,
    handleOpenPopupSearchOrderMember,
    handleOpenPopupSearchCustomer,
    handleChangeKeywordFilter,
    handleInputFieldChange,
    placeholderKeywordSearch
  }
}
