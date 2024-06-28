import { onMounted, ref } from 'vue'
import { ExhibitionPromotionCouponResponseModel } from '@/models/services/responses/exhibition/modal/ExhibitionPromotionCouponResponse'
import {
  exhibitionCouponApplyChannelOptions,
  exhibitionCouponBenefitOptions,
  exhibitionCouponIssueMethodOptions,
  exhibitionCouponIssueTypeOptions,
  ExhibitionCouponPromotionInquiryProps,
  ExhibitionCouponPromotionInquiryTableModel,
  exhibitionCouponStatusOptions,
  exhibitionCouponTargetTypeOptions,
  exhibitionCouponTypeOptions,
  ExhibitionPromotionCouponByKeyModel
} from '@/models/views/exhibition/modal/ExhibitionCouponPromotionInquiryModel'
import { exhibitionCouponPromotionInquiryApi } from '@/services/api/exhibition/ExhibitionCouponPromotionInquiryApi'
import { PageState } from 'primevue/paginator'
import { defaultPageState } from '@/models'
import { ExhibitionPromotionCouponRequest } from '@/models/services/requests/exhibition/modal/ExhibitionPromotionCouponRequest'
import {
  DATA_TABLE_NUMBER_ITEMS_PAGE_50,
  FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm,
  FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS,
  formatTime,
  renderLabelEnum
} from '@/common'
import { useDataTablePagination } from '@/composables'
import { DataTableRowClickEvent } from 'primevue/datatable'

export const useExhibitionCouponPromotionInquiryModalLogic = (props: ExhibitionCouponPromotionInquiryProps) => {
  const couponDetailRef = ref<ExhibitionPromotionCouponByKeyModel>()
  const page = ref<PageState>(defaultPageState)
  const exhibitionCouponPromotionDetail = ref<ExhibitionPromotionCouponResponseModel>()
  const tableRef = ref()
  const selectedRowRef = ref<number>()
  const itemsCheckedList = ref<ExhibitionCouponPromotionInquiryTableModel[]>([])

  const getTableData = (page: number, size: number) => {
    const params: ExhibitionPromotionCouponRequest = {
      couponStatuses: exhibitionCouponStatusOptions
        .slice(0, 2)
        .map((item) => item.value)
        .join(','),
      pageNum: page + 1,
      rowSize: size
    }
    return exhibitionCouponPromotionInquiryApi.getPromotionCoupons(params)
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<ExhibitionCouponPromotionInquiryTableModel>(getTableData)

  const handleSearch = () => {
    tableRef.value?.scrollToTop?.()
    fetchDataWith({
      numberOfItems: DATA_TABLE_NUMBER_ITEMS_PAGE_50,
      page: page.value.page
    })
      .then(() => {
        tableRef?.value?.clearCheckAll()
      })
      .catch(() => {})
  }

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    couponDetailRef.value = {}
    handleSearch()
  }

  const onSelectCouponLink = () => {
    props.onSelect?.(itemsCheckedList.value)
    props.onClose?.()
  }

  const onRowCheckedChange = (item: ExhibitionCouponPromotionInquiryTableModel) => {
    if (item.isSelected) {
      itemsCheckedList.value = itemsCheckedList.value.concat(item)
    } else {
      itemsCheckedList.value = itemsCheckedList.value.filter((_) => _.id !== item.id)
    }
  }

  const onSelectAllChange = (checked: boolean) => {
    if (checked) {
      itemsCheckedList.value = items.value ?? []
    } else {
      itemsCheckedList.value = []
    }
  }

  const onRowClick = (event: DataTableRowClickEvent) => {
    selectedRowRef.value = event.data.couponKey
    exhibitionCouponPromotionInquiryApi
      .getCouponByKey(event.data.couponKey ?? 0)
      .then((resData) => {
        const data = resData.data
        const applyChannel: string[] = []
        data?.applyChannels?.forEach((item) => {
          applyChannel.push(renderLabelEnum(exhibitionCouponApplyChannelOptions, item))
        })
        couponDetailRef.value = {
          ...data,
          couponType: renderLabelEnum(exhibitionCouponTypeOptions, data?.couponType ?? ''),
          couponStatus: renderLabelEnum(exhibitionCouponStatusOptions, data?.couponStatus ?? ''),
          issueMethod: renderLabelEnum(exhibitionCouponIssueMethodOptions, data?.issueMethod ?? ''),
          issueDate: formatTime(data?.issueDate ?? '', FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm),
          couponBenefitType: renderLabelEnum(exhibitionCouponBenefitOptions, data?.couponBenefitType ?? ''),
          issueType: renderLabelEnum(exhibitionCouponIssueTypeOptions, data?.issueType ?? ''),
          applyChannelsString: applyChannel.join(', ') ?? '',
          displayFromDate: formatTime(data?.displayFromDate ?? '', FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm),
          displayToDate: formatTime(data?.displayToDate ?? '', FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm),
          forceEndDate: formatTime(data?.forceEndDate ?? '', FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS),
          couponRegisterDate: formatTime(data?.couponRegisterDate ?? '', FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS),
          targetType: renderLabelEnum(exhibitionCouponTargetTypeOptions, data?.targetType ?? '')
        }
      })
      .catch(() => {
        // error
      })
  }

  onMounted(() => {
    handleSearch()
  })

  return {
    exhibitionCouponPromotionDetail,
    items,
    tableRef,
    totalItems,
    isLoading,
    couponDetailRef,
    selectedRowRef,
    onRowCheckedChange,
    onSelectAllChange,
    onPageChange,
    onSelectCouponLink,
    onRowClick
  }
}
