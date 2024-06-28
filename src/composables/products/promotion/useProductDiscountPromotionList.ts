import {
  ProductPromotionListFormModel,
  ProductDiscountPromotionListDataTableModel,
  productPromotionListSelectDateOptionsConfig,
  productPromotionDiscountPriceTypeConfig,
  ProductPromotionPmtPriceType,
  productPromotionProgressCheckBoxConfig,
  productPromotionDiscountCouponCheckBoxConfig,
  ProductPromotionProgressModel,
  ProductPromotionDiscountCouponModel,
  productPromotionKeywordSearchOptionsConfig,
  ProductPromotionKeywordSearchModel
} from '@/models'
import { productPromotionApi } from '@/services/api/products/ProductPromotionApi'
import { ID_CHECKBOX_ALL, handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD } from '@/common'
import { useBaseFormFilterTable, useCheckbox } from '@/composables'
import { computed, ref } from 'vue'
import { ProductDiscountPromotionListRequestConvertor } from '@/models/services/requests/products/promotion/ProductPromotionDiscountRequest'
import { complaintOrderCancelListModelConfig } from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'

export const useProductDiscountPromotionList = () => {
  const searchSellerRef = ref()
  const listRadio = productPromotionDiscountPriceTypeConfig.listRadios
  const dateActiveNumber = complaintOrderCancelListModelConfig.listButtonDateFilter[0].value
  const progressYn = productPromotionProgressCheckBoxConfig
  const discountCouponYn = productPromotionDiscountCouponCheckBoxConfig
  const optionPmtSearchWordType = productPromotionKeywordSearchOptionsConfig

  const emptyForm: ProductPromotionListFormModel = {
    discountPriceType: ProductPromotionPmtPriceType.SLCP,
    sellerKey: '',
    progressYn: ProductPromotionProgressModel.ALL,
    discountCouponYn: ProductPromotionDiscountCouponModel.ALL,
    pmtSearchDateType: productPromotionListSelectDateOptionsConfig[0],
    fromDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).lastCustomDayString,
    toDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).currentDateString,
    pmtSearchWordType: productPromotionKeywordSearchOptionsConfig[0],
    pmtSearchWord: ''
  }

  const listProgressYnCheckBoxType = computed(() => {
    return progressYn.list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })
  const listDiscountCouponYnCheckBoxType = computed(() => {
    return discountCouponYn.list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })
  const progressYnTypeCheckBox = useCheckbox(listProgressYnCheckBoxType)
  const discountCouponYnTypeCheckBox = useCheckbox(listDiscountCouponYnCheckBoxType)
  const listActionCheckBox = computed(() => {
    return {
      progressYnTypeCheckBox,
      discountCouponYnTypeCheckBox
    }
  })

  const fetchDataCallback = (page: number, size: number) => {
    const progressYnValue = progressYnTypeCheckBox.listChecked.value.length === 2 ? '' : progressYnTypeCheckBox.listChecked.value?.[0] ?? ''
    const discountCouponYnValue =
      discountCouponYnTypeCheckBox.listChecked.value.length === 2 ? '' : discountCouponYnTypeCheckBox.listChecked.value?.[0] ?? ''
    const newValues: ProductPromotionListFormModel = {
      ...values,
      progressYn: progressYnValue,
      discountCouponYn: discountCouponYnValue,
      pmtSearchWordType: formFilter.value
    }
    return productPromotionApi.getDiscountPromotionList(ProductDiscountPromotionListRequestConvertor.from(newValues, page, size))
  }

  const {
    items,
    values,
    refTable,
    totalItems,
    isLoading,
    onPageChange,
    setFieldValue,
    handleCheckBoxChange,
    getIsCheckBox,
    currentFilterDate,
    handleChangeCountDate,
    handleChangeValueSelect,
    handleChangeFilterForm,
    handleResetFilter,
    formFilter,
    refreshData
  } = useBaseFormFilterTable<ProductDiscountPromotionListDataTableModel, ProductPromotionListFormModel>({
    initialValuesForm: emptyForm,
    onResetForm: () => {
      searchSellerRef.value.handleReset()
    },
    fetchDataCallback,
    listActionCheckBox,
    defaultValueControlFilter: { ...productPromotionKeywordSearchOptionsConfig[0] },
    disabledFetchApiFirst: true
  })

  const onSubmitForm = () => {
    refreshData().catch(() => {})
  }

  const handleOpenPopupSearchSeller = () => {
    searchSellerRef.value.handlePopupSearch()
  }

  const isDisableForm = computed(() => {
    return formFilter.value.value !== ProductPromotionKeywordSearchModel.NO_USE
  })

  return {
    searchSellerRef,
    items,
    values,
    refTable,
    totalItems,
    isLoading,
    onPageChange,
    setFieldValue,
    handleCheckBoxChange,
    getIsCheckBox,
    currentFilterDate,
    handleChangeCountDate,
    handleChangeValueSelect,
    handleChangeFilterForm,
    handleResetFilter,
    refreshData,
    listRadio,
    handleOpenPopupSearchSeller,
    progressYn,
    discountCouponYn,
    optionPmtSearchWordType,
    onSubmitForm,
    isDisableForm,
    formFilter
  }
}
