import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss, ID_CHECKBOX_ALL, exportExcel, getDateByFormat, renderSortDataTable } from '@/common'
import { useBaseFormFilterTable } from '@/composables'
import { useCheckbox } from '@/composables/common'
import { deliveryListOrderStatusApi } from '@/services/api/delivery/DeliveryTicketProductOrderManagementApi'
import { computed, ref } from 'vue'
import { useDeliveryTableHandleKey } from '@/composables/delivery/common/useDeliveryTableHandleKey'
import { useDeliveryProductCategory } from '@/composables/delivery/ticketProductOrderManagement/useDeliveryProductCategory'
import { useDeliveryMemberSellerCompany } from '@/composables/delivery/ticketProductOrderManagement/useDeliveryMemberSellerCompany'
import { removeEmptyObjectProperties } from '@/common/common'
import { deliveryKeywordSearchOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import {
  DeliveryProductTypeModel,
  DeliveryRankingByModel,
  DeliveryRankingRangeModel,
  DeliveryTicketProductOrderStatusProductFormModel,
  DeliveryTicketProductOrderStatusProductModel,
  deliveryProductTypeOptions,
  deliveryTicketProductOrderStatusProductHeaderTableConfig,
  deliveryTicketProductOrderStatusProductHeaders,
  deliveryTicketProductOrderStatusProductXlsxSheetName,
  DeliveryCategoryTypeModel
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import { DeliveryKeywordSearchType, DeliveryPeriodSearchType } from '@/models/views/delivery/common'

export const useDeliveryTicketProductOrderStatusProduct = () => {
  const searchSellerKeyRef = ref()
  const searchProductKeyRef = ref()
  const searchMDKeyRef = ref()

  const initialValuesForm: DeliveryTicketProductOrderStatusProductFormModel = {
    categoryType: DeliveryCategoryTypeModel.STANDARD,
    categoryId: '',
    categoryDepthId1: '',
    categoryDepthId2: '',
    categoryDepthId3: '',
    productKey: '',
    sellerKey: '',
    subcontractKey: '',
    productType: DeliveryProductTypeModel.DELIVERY_GENERAL,
    mdKey: '',
    rankingBy: DeliveryRankingByModel.AMOUNT,
    rankingRange: DeliveryRankingRangeModel.TOP_50,
    periodSearchType: DeliveryPeriodSearchType.PAYMENT_DATE,
    fromDate: '',
    toDate: '',
    keywordSearchType: DeliveryKeywordSearchType.NONE,
    keyword: ''
  }

  const fetchDataCallback = async (pageNum: number, rowSize: number) => {
    const { categoryDepthId1, categoryDepthId2, categoryDepthId3 } = values
    const { fromDate = '', toDate = '', dateSelect, ...otherValues } = values
    const productTypeData = (productType.listChecked.value.length === 2 ? '' : productType.listChecked.value?.[0] ?? '') as DeliveryProductTypeModel
    const params = {
      ...otherValues,
      fromDate: fromDate ? getDateByFormat(fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : '',
      toDate: toDate ? getDateByFormat(toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : '',
      periodSearchType: dateSelect?.value ?? DeliveryPeriodSearchType.PAYMENT_DATE,
      categoryId: categoryDepthId3 ?? categoryDepthId2 ?? categoryDepthId1,
      productType: productTypeData
    }
    const data = await deliveryListOrderStatusApi.getListByProduct({
      ...removeEmptyObjectProperties(params),
      pageNum: pageNum + 1,
      rowSize
    })
    return data
  }

  const listIdCheckBoxType = computed(() => {
    return deliveryProductTypeOptions.list.filter((item) => item?.id.toLocaleLowerCase() !== ID_CHECKBOX_ALL).map((item) => item.id)
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
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit,
    getIsCheckBox,
    handleCheckBoxChange,
    handleResetFilter
  } = useBaseFormFilterTable<DeliveryTicketProductOrderStatusProductModel, DeliveryTicketProductOrderStatusProductFormModel>({
    initialValuesForm,
    fetchDataCallback,
    disabledFetchApiFirst: true,
    listActionCheckBox,
    onResetForm: () => {
      searchSellerKeyRef?.value?.handleReset()
      searchProductKeyRef?.value?.handleReset()
      searchMDKeyRef?.value?.handleReset()
    },
    defaultValueControlFilter: {
      ...deliveryKeywordSearchOptions[0]
    }
  })

  const { categoryDepth1, categoryDepth2, categoryDepth3 } = useDeliveryProductCategory<DeliveryTicketProductOrderStatusProductFormModel>(
    values,
    setFieldValue
  )

  const { sellerCompanies } = useDeliveryMemberSellerCompany<DeliveryTicketProductOrderStatusProductFormModel>(values, setFieldValue)

  const { onClickProductKey, onClickSellerKey } = useDeliveryTableHandleKey<DeliveryTicketProductOrderStatusProductModel>()

  const onDownload = () => {
    if (!items.value) return
    exportExcel(
      renderSortDataTable(items.value, tableConfigs.value),
      deliveryTicketProductOrderStatusProductXlsxSheetName,
      deliveryTicketProductOrderStatusProductHeaders
    )
  }

  const handleOpenPopupSearchSeller = () => {
    searchSellerKeyRef.value.handlePopupSearch()
  }

  const handleOpenPopupSearchProduct = () => {
    searchProductKeyRef.value.handlePopupSearch()
  }

  const tableConfigs = computed(() => {
    return deliveryTicketProductOrderStatusProductHeaderTableConfig(onClickProductKey, onClickSellerKey)
  })

  return {
    values,
    setFieldValue,
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
    getIsCheckBox,
    handleCheckBoxChange,
    categoryDepth1,
    categoryDepth2,
    categoryDepth3,
    handleResetFilter,
    searchSellerKeyRef,
    handleOpenPopupSearchSeller,
    sellerCompanies,
    tableConfigs,
    searchProductKeyRef,
    handleOpenPopupSearchProduct,
    searchMDKeyRef
  }
}
