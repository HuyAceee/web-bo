import { DAYS_PER_WEEK, handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD } from '@/common'
import { useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { defaultPageState, ProductSearchItemModalProps } from '@/models'
import { PageState } from 'primevue/paginator'
import { computed, ref } from 'vue'
import { productStatusSellEnum } from '@/models/common'
import { deliveryProductClassification, deliverySearchDateType } from '@/models/views/delivery/modal/DeliverySearchProductModel'
import { deliverySearchProductApi } from '@/services/api/delivery/DeliverySearchProductApi'
import { ProductSearchProductConvertor } from '@/models/services/requests/delivery/modal/DeliverySearchProductRequest'
import { ProductSearchModalQuery, ProductSearchProductTableModel } from '@/models/views/products/modal/ProductSearchProductModalModel'
import { DeliveryKeywordSearchType } from '@/models/views/delivery/common'
import { PRODUCT_STATUS_ENUM } from '@/models/views/products/common/ProductTypeModel'

export const useProductSearchItemModalLogic = (props: ProductSearchItemModalProps) => {
  const salesStatusOptions = props.typeApproval
    ? [{ label: '판매중', value: productStatusSellEnum.ON_SALE }]
    : [
        { label: '전체', value: '' },
        { label: '판매중', value: productStatusSellEnum.ON_SALE },
        { label: '판매일시중지', value: productStatusSellEnum.TEMPORARILY_SUSPENDED },
        { label: '일시품절', value: productStatusSellEnum.TEMPORARILY_OUT_OF_STOCK },
        { label: '품절', value: productStatusSellEnum.OUT_OF_STOCK },
        { label: '판매종료', value: productStatusSellEnum.END_OF_SALE }
      ]

  const approvalStatusOptions = props.typeApproval
    ? [
        {
          label: '승인완료',
          value: PRODUCT_STATUS_ENUM.APPROVAL_COMPLETED
        }
      ]
    : [
        { label: '전체', value: '' },
        { label: '상품등록중', value: PRODUCT_STATUS_ENUM.PRODUCT_REGISTRATION_IN_PROGRESS },
        { label: '승인대기', value: PRODUCT_STATUS_ENUM.APPROVAL_PENDING },
        { label: '승인철회', value: PRODUCT_STATUS_ENUM.APPROVAL_WITHDRAWN },
        { label: '승인반려', value: PRODUCT_STATUS_ENUM.APPROVAL_REJECTED },
        { label: '승인완료', value: PRODUCT_STATUS_ENUM.APPROVAL_COMPLETED }
      ]

  const codeSearchOptions = [
    { label: '사용안함', value: DeliveryKeywordSearchType.NONE },
    { label: '상품코드', value: DeliveryKeywordSearchType.PRODUCT_KEY }
  ]

  const defaultQuery: ProductSearchModalQuery = {
    productClassificationCode: deliveryProductClassification[0],
    chargeMdKey: '',
    productName: '',
    productCode: '',
    lastProductSalesStatusCode: salesStatusOptions[0],
    lastProductProgressStatusCode: approvalStatusOptions[0],
    searchDateType: deliverySearchDateType[0],
    fromDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(DAYS_PER_WEEK).lastCustomDayString,
    toDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(DAYS_PER_WEEK).currentDateString,
    codeSearch: codeSearchOptions[0],
    codeQuery: ''
  }

  const { openModal, closeAllModal, closeModalByPop } = useModalConfirm()
  const { openModal: openModalNotification } = useModalNotification()

  const query = ref<ProductSearchModalQuery>({ ...defaultQuery })
  const codeSearchEnabled = computed(() => query.value.codeSearch.value !== codeSearchOptions[0].value)

  const groupDateRef = ref()
  const tableRef = ref()

  const page = ref<PageState>(defaultPageState)
  const enableQuerySearchRequest = ref(false)

  const fetchData = (page: number, size: number) => {
    const params = ProductSearchProductConvertor.from(query.value, page + 1, size)
    return deliverySearchProductApi.searchProduct(params)
  }

  const { items, totalItems, isLoading, fetchDataWith, setData } = useDataTablePagination<ProductSearchProductTableModel>(fetchData)
  const itemsCheckedList = ref<any[]>([])

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    if (enableQuerySearchRequest.value) {
      handleSearch()
    } else {
      enableQuerySearchRequest.value = true
    }
  }

  const handleSearch = () => {
    tableRef.value?.scrollToTop?.()
    fetchDataWith({
      numberOfItems: page.value.rows,
      page: page.value.first
    })
      .then(() => {
        tableRef?.value?.clearCheckAll()
      })
      .catch(() => {})
  }

  const handleReset = () => {
    groupDateRef?.value?.handleReset()
    tableRef?.value?.clearCheckAll()
    setData([])
    itemsCheckedList.value = []
    totalItems.value = 0
    query.value = { ...defaultQuery }
  }
  /* Call when click one row */

  const onRowCheckedChange = (item: any) => {
    if (item.isSelected) {
      itemsCheckedList.value = itemsCheckedList.value.concat(item)
    } else {
      itemsCheckedList.value = itemsCheckedList.value.filter((_) => _.id !== item.id)
    }
  }

  const onSelectAllChange = (checked: boolean) => {
    if (checked) {
      itemsCheckedList.value = items.value as any[]
    } else {
      itemsCheckedList.value = []
    }
  }

  const handleConfirm = () => {
    openModal({
      content: '선택한 상품을 등록 하시겠습니까?',
      onConfirm: () => {
        const itemData = props?.itemCheck?.find(
          (item) => item?.productKey === itemsCheckedList?.value?.find((item2) => item2?.productKey === item?.productKey)?.productKey
        )
        if (itemData) {
          closeModalByPop?.()
          openModalNotification({ content: '선택한 항목 중 해당 카테고리에 이미 저장된 상품이 있습니다.' })
        } else {
          props?.onSelect(itemsCheckedList.value)
          closeAllModal?.()
        }
      }
    })
  }

  return {
    groupDateRef,
    query,
    productClassification: deliveryProductClassification,
    salesStatusOptions,
    approvalStatusOptions,
    codeSearchOptions,
    codeSearchEnabled,
    itemsCheckedList,
    tableRef,
    items,
    isLoading,
    totalItems,
    onPageChange,
    onRowCheckedChange,
    onSelectAllChange,
    handleReset,
    handleSearch,
    handleConfirm
  }
}
