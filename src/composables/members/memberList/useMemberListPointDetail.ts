import { ref, watch } from 'vue'
import {
  MemberDetailBaseTabProps,
  MemberPointPaymentDataTableModel,
  MemberPointUsageDataTableModel,
  defaultPageState,
  memberExportPointPaymentHeaderName,
  memberExportPointUsageHeaderName
} from '@/models'
import { PageState } from 'primevue/paginator'
import { useDataTablePagination } from '@/composables/widgets'
import { memberListPointDetailApi } from '@/services/api/members/MemberListPointDetailApi'
import { DEFAULT_DATE_FORMAT, exportExcel, exportFileName } from '@/common'

export const useMemberListPointDetail = (props: MemberDetailBaseTabProps) => {
  const tablePaymentRef = ref()
  const tableUsageRef = ref()
  const pagePayment = ref<PageState>(defaultPageState)
  const pageUsage = ref<PageState>(defaultPageState)
  const memberData = ref<any>(props?.data)
  const pointPaymentFileName = exportFileName('PointPayment', DEFAULT_DATE_FORMAT)
  const pointUsageFileName = exportFileName('PointUsage', DEFAULT_DATE_FORMAT)

  const getDataPayment = (page: number, size: number) => {
    if (!memberData.value?.memberKey) throw new Error('Member Key is undefined')
    return memberListPointDetailApi.getMemberPointPaymentData(memberData.value?.memberKey as string, { pageNum: page + 1, rowSize: size })
  }

  const {
    items: itemsPayment,
    totalItems: totalItemsPayment,
    isLoading: isLoadingPayment,
    fetchDataWith: fetchDataWithPayment
  } = useDataTablePagination<MemberPointPaymentDataTableModel>(getDataPayment)

  const onPageChangePayment = (pageState: PageState) => {
    if (memberData.value?.memberKey) {
      pagePayment.value = pageState
      fetchDataWithPayment({
        numberOfItems: pageState.rows,
        page: pageState.page
      })
        .then(() => {
          tablePaymentRef.value.scrollToTop()
        })
        .catch(() => {})
    } else {
      isLoadingPayment.value = false
    }
  }

  const refreshDataPayment = () => {
    onPageChangePayment(pagePayment.value)
  }

  const getDataUsage = (page: number, size: number) => {
    if (!memberData.value?.memberKey) throw new Error('Member Key is undefined')
    return memberListPointDetailApi.getMemberPointUsageData(memberData.value?.memberKey as string, { pageNum: page + 1, rowSize: size })
  }

  const {
    items: itemsUsage,
    totalItems: totalItemsUsage,
    isLoading: isLoadingUsage,
    fetchDataWith: fetchDataWithUsage
  } = useDataTablePagination<MemberPointUsageDataTableModel>(getDataUsage)

  const onPageChangeUsage = (pageState: PageState) => {
    if (memberData.value?.memberKey) {
      pageUsage.value = pageState
      fetchDataWithUsage({
        numberOfItems: pageState.rows,
        page: pageState.page
      })
        .then(() => {
          tableUsageRef.value.scrollToTop()
        })
        .catch(() => {})
    } else {
      isLoadingUsage.value = false
    }
  }

  const refreshDataUsage = () => {
    onPageChangePayment(pageUsage.value)
  }

  watch(
    () => props.data,
    () => {
      try {
        memberData.value = props.data
        refreshDataPayment()
        refreshDataUsage()
      } catch (error) {
        /* empty */
      }
    }
  )

  const onDownloadExcelPayment = () => {
    const exportData =
      itemsPayment.value?.map((it) => {
        return {
          index: it.index,
          bend: it.useKind.title,
          pointKey: it.pointKey,
          point: it.pointAmount,
          pointName: it.pointName,
          expirationPeriod: `${it.useValidDate?.startDate} ~ (${it.useValidDate?.endDate})`,
          registrant: `${it.auditing?.modifierName}` + it.auditing?.registerId ? `(${it.auditing?.registerId})` : '',
          registrationDateTime: it.auditing?.registeredDate ?? ''
        }
      }) ?? []
    exportExcel(exportData, pointPaymentFileName, memberExportPointPaymentHeaderName)
  }

  const onDownloadExcelUsage = () => {
    const exportData =
      itemsUsage.value?.map((it) => {
        const isSystemUser = !it.auditing?.modifierName || !it.auditing?.registerId
        return {
          index: it.index,
          division: it.useKind.title,
          pointKey: it.pointKey,
          point: it.pointAmount,
          pointName: it.pointName,
          orderKey: it.order.orderKey === 0 ? 'ORDER_KEY' : it.order.orderKey,
          registrant: isSystemUser ? 'SYSTEM' : `${it.auditing?.modifierName}` + it.auditing?.registerId ? `(${it.auditing?.registerId})` : '',
          registrationDateTime: it.auditing?.registeredDate ?? ''
        }
      }) ?? []
    exportExcel(exportData, pointUsageFileName, memberExportPointUsageHeaderName)
  }

  return {
    itemsPayment,
    totalItemsPayment,
    isLoadingPayment,
    onPageChangePayment,
    tablePaymentRef,
    itemsUsage,
    totalItemsUsage,
    isLoadingUsage,
    onPageChangeUsage,
    tableUsageRef,
    onDownloadExcelPayment,
    onDownloadExcelUsage,
    memberData
  }
}
