import { useDataTablePagination } from '@/composables/widgets'
import { PageState } from 'primevue/paginator'
import { onMounted, ref } from 'vue'
import { exportExcel, exportFileName, DEFAULT_DATE_FORMAT, formatTime } from '@/common'
import { memberPointUsageListApi } from '@/services/api/members/MemberPointUsageListApi'
import { MemberFoInfoResponseModel, MemberWelfarePointUsageDetailModalProps } from '@/models/services/responses/members/MemberFoInfoResponse'
import {
  MemberPointUsageDetailsDataTableModel,
  memberPointUsageDetailsHeaderTableConfig
} from '@/models/views/members/pointUsageList/MemberPointUsageListModel'
export const useMemberWelfarePointUsageDetailLogic = (props: MemberWelfarePointUsageDetailModalProps) => {
  const refTable = ref()
  const dataMemberModel = ref(<MemberFoInfoResponseModel>{})
  const fetchData = (page: number, size: number) => {
    return memberPointUsageListApi.getPointUsageDetailTable(props.memberKey, { pageNum: page, rowSize: size })
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<MemberPointUsageDetailsDataTableModel>(fetchData)

  const onPageChange = (pageState: PageState) => {
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        refTable.value?.scrollToTop()
      })
      .catch(() => {})
  }

  const loadData = (memberKey: string) => {
    memberPointUsageListApi
      .getFoMemberInfo(memberKey)
      .then((value) => {
        dataMemberModel.value = {
          ...value.data,
          auditing: {
            ...value.data?.auditing,
            registeredDate: formatTime(value.data?.auditing?.registeredDate ?? '', DEFAULT_DATE_FORMAT)
          }
        }
      })
      .catch(() => {
        /* empty */
      })
  }

  const onDownLoad = () => {
    const exportData: MemberPointUsageDetailsDataTableModel[] = items.value ?? []
    const memberWelfarePointUsageDetailTableHeader = memberPointUsageDetailsHeaderTableConfig.map((it) => {
      return it.header
    })
    exportExcel<MemberPointUsageDetailsDataTableModel>(exportData, exportFileName('point_usage_detail'), memberWelfarePointUsageDetailTableHeader)
  }
  onMounted(() => {
    loadData(props.memberKey)
  })

  return {
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onDownLoad,
    dataMemberModel
  }
}
