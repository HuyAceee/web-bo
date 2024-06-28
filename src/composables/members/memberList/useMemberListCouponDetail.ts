import { DEFAULT_DATE_FORMAT, exportExcel, exportFileName } from '@/common'
import { useDataTablePagination } from '@/composables/widgets'
import { useComingSoonModal } from '@/composables/widgets/modal/useComingSoonModal'
import { MemberCouponDetailDataTableModel, MemberDetailBaseTabProps, defaultPageState, memberExportCouponDetailHeaderName } from '@/models'
import { memberListCouponDetailApi } from '@/services/api/members/MemberListCouponDetailApi'
import { PageState } from 'primevue/paginator'
import { ref, watch } from 'vue'

export const useMemberListCouponDetail = (props: MemberDetailBaseTabProps) => {
  const tableRef = ref()
  const memberData = ref<any>(props?.data)
  const page = ref<PageState>(defaultPageState)
  const MemberDetailFtCouponDetailFileName = exportFileName('CouponDetail', DEFAULT_DATE_FORMAT)
  
  /**
   * use for todo feature 
   * BO_H0101_020101 , BO_H0102_020101 , BO_E0103_010101 has not been developed yet.
   */
  const { openComingSoonModal } = useComingSoonModal()

  const getData = (page: number, size: number) => {
    if (!memberData.value?.memberKey) throw new Error('Member Key is undefined')
    return memberListCouponDetailApi.getMemberListCouponDetail(memberData.value?.memberKey as string, { pageNum: page + 1, rowSize: size })
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<MemberCouponDetailDataTableModel>(getData)

  const refreshData = () => {
    onPageChange(page.value)
  }

  watch(
    () => props.data,
    () => {
      try {
        memberData.value = props.data
        refreshData()
      } catch (error) {
        /* empty */
      }
    }
  )

  const onPageChange = (pageState: PageState) => {
    if (memberData.value?.memberKey) {
      page.value = pageState
      fetchDataWith({
        numberOfItems: pageState.rows,
        page: pageState.page
      })
        .then(() => {
          tableRef.value.scrollToTop()
        })
        .catch(() => {})
    } else {
      isLoading.value = false
    }
  }

  const onDownloadExcel = () => {
    const exportData =
      items.value?.map((it) => {
        return {
          index: it.index,
          couponKey: it.couponKey,
          couponName: it.couponName,
          couponType: it.couponType,
          benefitValue: it.benefitValue,
          usedAmount: it.usedAmount,
          usedDate: it.usedDate,
          useStatus: it.useStatus,
          orderKey: it.orderKey,
          registrant: `${it.audit?.modifierName} (${it.audit?.registerId})`,
          registrationDateTime: it.audit?.registeredDate
        }
      }) ?? []
    exportExcel(exportData, MemberDetailFtCouponDetailFileName, memberExportCouponDetailHeaderName)
  }

  return {
    items,
    totalItems,
    isLoading,
    onPageChange,
    tableRef,
    onDownloadExcel,
    openComingSoonModal
  }
}
