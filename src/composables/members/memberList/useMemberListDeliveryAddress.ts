import { useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { MemberDeliveryAddressModel, MemberDetailBaseTabProps, defaultPageState } from '@/models'
import { memberListApi } from '@/services/api/members/MemberListApi'
import { PageState } from 'primevue/paginator'
import { ref, watch } from 'vue'

export const useMemberListDeliveryAddress = (props: MemberDetailBaseTabProps) => {
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const tableRef = ref()
  const memberData = ref<any>(props?.data)
  const page = ref<PageState>(defaultPageState)
  const getData = async () => {
    if (!memberData.value?.memberKey) throw new Error('Member Key is undefined')
    return memberListApi.getMemberDeliveryAddressList(memberData.value?.memberKey as string)
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<MemberDeliveryAddressModel>(getData)
  const refreshData = () => {
    onPageChange(page.value)
  }

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

  const checkedItems = ref<MemberDeliveryAddressModel[]>([])

  const onRowCheckedChange = (item: MemberDeliveryAddressModel) => {
    checkedItems.value = item.isSelected ? checkedItems.value.concat(item) : checkedItems.value.filter((_) => _.id !== item.id)
  }

  const onSelectAllChange = (checked: boolean) => {
    checkedItems.value = checked ? items?.value ?? [] : []
  }

  const onDelete = () => {
    openConfirm({
      content: '배송지를 삭제하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        handleDelete()
      }
    })
  }

  const handleDelete = async () => {
    try {
      const reqData = { deliveryAddressIds: checkedItems.value.map((it) => +it.deliveryAddressKey) }
      await memberListApi.deleteListDeliveryAddress(reqData)
      checkedItems.value = []
      fetchDataWith({
        numberOfItems: page.value.rows,
        page: page.value.page
      })
        .then(() => {
          tableRef?.value?.scrollToTop()
          tableRef?.value?.clearCheckAll()
        })
        .catch(() => {})
      openNotification({
        content: '배송지 삭제되었습니다.'
      })
    } catch (error) {
      /* empty */
    }
  }

  // const addressConvert = (code: string) => {
  //   switch (code) {
  //     case 'HOME':
  //       return MemberDeliveryAddressCodeType.HOME
  //     case 'COMPANY':
  //       return MemberDeliveryAddressCodeType.COMPANY
  //     default:
  //       return MemberDeliveryAddressCodeType.ETC
  //   }
  // }

  return {
    tableRef,
    items,
    totalItems,
    isLoading,
    checkedItems,
    onPageChange,
    onRowCheckedChange,
    onSelectAllChange,
    onDelete
    // addressConvert
  }
}
