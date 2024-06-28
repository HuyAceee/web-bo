import { DATA_TABLE_NUMBER_ITEMS_PAGE_50, exportExcel, exportFileName } from '@/common'
import { useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables/widgets'
import {
  MemberCustomerSpecialInfoExportModel,
  MemberCustomerSpecialInfoModel,
  MemberDetailBaseModel,
  MemberDetailBaseTabProps,
  defaultPageState,
  memberExportRemarkHeaderName
} from '@/models'
import { memberRemarkApi } from '@/services/api/members/MemberRemarkApi'
import { PageState } from 'primevue/paginator'
import { ref, watch } from 'vue'
import { useMemberDetailCustomerSpecialMemoDetailModal } from './useMemberDetailCustomerSpecialMemoDetailModal'
import { useMemberDetailCustomerSpecialMemoRegistrationModal } from './useMemberDetailCustomerSpecialMemoRegistrationModal'

export const useMemberListManageCustomerSpecialInfo = (props: MemberDetailBaseTabProps) => {
  const getData = async (page: number, size: number) => {
    if (!memberData.value?.memberKey) throw new Error('Member Key is undefined')
    const resData = await memberRemarkApi.getList(memberData.value?.memberKey as string, {
      pageNum: page + 1,
      rowSize: size
    })
    return Promise.resolve({
      totalItems: resData.totalItems,
      data: resData.data
    })
  }

  const refreshData = () => {
    onPageChange(page.value)
  }

  const tableRef = ref()
  const page = ref<PageState>({ ...defaultPageState, rows: DATA_TABLE_NUMBER_ITEMS_PAGE_50 })
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { openModal: openMemoDetail } = useMemberDetailCustomerSpecialMemoDetailModal()
  const { openModal: openMemoRegistration } = useMemberDetailCustomerSpecialMemoRegistrationModal(refreshData)

  const memberData = ref<MemberDetailBaseModel>(props?.data)
  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<MemberCustomerSpecialInfoModel>(getData)
  const checkedItems = ref<MemberCustomerSpecialInfoModel[]>([])

  watch(
    () => props.data,
    () => {
      memberData.value = props.data
      refreshData()
    }
  )

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tableRef.value.scrollToTop()
      })
      .catch(() => {})
  }

  const onRowCheckedChange = (item: MemberCustomerSpecialInfoModel) => {
    checkedItems.value = item.isSelected ? checkedItems.value.concat(item) : checkedItems.value.filter((_) => _.id !== item.id)
  }

  const onSelectAllChange = (checked: boolean) => {
    checkedItems.value = checked ? items?.value ?? [] : []
  }

  const onDelete = () => {
    openConfirm({
      content: '메모를 삭제 하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        handleDelete()
      }
    })
  }
  const handleDelete = async () => {
    try {
      const reqData = { memoIds: checkedItems.value.map((it) => +it.id) }
      await memberRemarkApi.deleteList(reqData)
      checkedItems.value = []
      fetchDataWith({
        numberOfItems: page.value.rows,
        page: page.value.page
      })
        .then(() => {
          tableRef.value.scrollToTop()
        })
        .catch(() => {})
      openNotification({
        content: '메모가 삭제 되었습니다.'
      })
    } catch (error) {
      /* empty */
    }
  }

  const onShowMemoDetail = (data: MemberCustomerSpecialInfoModel) => {
    openMemoDetail?.(memberData.value, data)
  }

  const onShowMemoRegistration = () => {
    openMemoRegistration?.(memberData.value)
  }

  const onDownLoad = () => {
    const exportData =
      items.value?.map((it) => {
        return { memo: it.detail, register: `${it.registerName}(${it.registerId})`, time: it.registrationDate }
      }) ?? []
    exportExcel<MemberCustomerSpecialInfoExportModel>(exportData, exportFileName('Memo'), memberExportRemarkHeaderName)
  }

  return {
    tableRef,
    items,
    isLoading,
    totalItems,
    checkedItems,
    onPageChange,
    onRowCheckedChange,
    onSelectAllChange,
    onDelete,
    onShowMemoDetail,
    onShowMemoRegistration,
    onDownLoad
  }
}
