import { exportExcel, formatNumberDot } from '@/common'
import { useDataTablePagination } from '@/composables/widgets'
import { defaultPageState } from '@/models'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import {
  MemberPointDeductionDetailConfig,
  MemberPointDeductionDetailParamsModel,
  MemberPointDeductionDetailTableModel
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointDeductionDetailModel'
import { memberPointTargetKindOptions } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { MemberDeliveryPointAllocationAdjustmentListModel } from '@/models/views/members/pointUsageList/MemberPointUsageListModel'
import { memberPointDeductionApi } from '@/services/api/members/MemberPointDeductionApi'
import { PageState } from 'primevue/paginator'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useMemberPointDeductionDetail = () => {
  const pointDetail = ref<MemberDeliveryPointAllocationAdjustmentListModel>({} as MemberDeliveryPointAllocationAdjustmentListModel)
  const allSuccessItems = ref<MemberPointDeductionDetailTableModel[]>([])
  const page = ref<PageState>(defaultPageState)
  const totalItems = ref<number>()
  const route = useRoute()
  const { customerKey = '', pointKey = '' } = route.query as MemberPointDeductionDetailParamsModel
  const getPointDetail = async (customerKey: string | undefined, pointKey: string | undefined) => {
    try {
      if (!customerKey || !pointKey) return
      const { data } = await memberPointDeductionApi.getPointDeductionDetail(customerKey, pointKey)
      pointDetail.value = data
      const foMemberList: MemberPointDeductionDetailTableModel[] = data.foMemberList.map((it) => {
        return {
          memberKey: it.memberDetails?.memberKey.toString(),
          memberName: it.memberDetails?.memberName,
          memberId: it.memberDetails?.memberId,
          cellphoneNumber: it.memberDetails?.cellphone,
          pointAmount: formatNumberDot(it.pointAmount).toString(),
          customerKey: it.memberDetails?.customerDetails?.customerKey.toString(),
          customerName: it.memberDetails?.customerDetails?.customerName,
          // managerMemo: it.managerMemo
        }
      })
      allSuccessItems.value = foMemberList
      totalItems.value = foMemberList.length
      handleFetchData()
    } catch (error) {
      // empty
    }
  }

  const totalPoints = computed(() => {
    if (!pointDetail.value?.pointAmount || !pointDetail.value?.foMemberCount) return 0
    return -(pointDetail.value?.pointAmount as number) * ((pointDetail.value?.foMemberCount as number) || 0)
  })

  const targetKindOptions = computed(() => {
    return memberPointTargetKindOptions.map((item) => {
      const renderLabel =
        item.value === pointDetail.value?.targetKind?.code ? `${item.label} (${pointDetail.value?.foMemberList?.length ?? 0} 명)` : item.label
      return {
        ...item,
        label: renderLabel
      }
    })
  })

  const getDataSuccess = async (page: number, size: number) => {
    return {
      totalItems: totalItems.value,
      data: allSuccessItems.value.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberPointDeductionDetailTableModel>
  }

  const {
    items: pageItems,
    isLoading: loading,
    fetchDataWith: fetchDataSuccess
  } = useDataTablePagination<MemberPointDeductionDetailTableModel>(getDataSuccess)

  const handleFetchData = () => {
    fetchDataSuccess({
      numberOfItems: page.value.rows,
      page: page.value.page
    })
  }

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    handleFetchData()
  }

  const onExport = () => {
    exportExcel(
      pageItems.value ?? [],
      'MembersPointList',
      MemberPointDeductionDetailConfig.map((item) => item.header ?? '')
    )
  }

  onMounted(() => {
    if (customerKey && pointKey) {
      getPointDetail(customerKey, pointKey)
    }
  })

  return {
    pointDetail,
    totalPoints,
    targetKindOptions,
    pageItems,
    loading,
    onPageChange,
    totalItems,
    onExport
  }
}
