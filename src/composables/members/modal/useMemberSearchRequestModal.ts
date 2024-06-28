import { useCheckBoxTable } from '@/composables/widgets'
import { WelfareSelectOptionType } from '@/models'
import { MemberRequestModalProps, MemberSearchRequestModalEmits, MemberSearchTableModel } from '@/models/views/members/modal/MemberRequestModel'
import { memberPointAllocationApi } from '@/services/api/members/MemberPointAllocationApi'
import { PageState } from 'primevue/paginator'
import { Ref, computed, onMounted, ref } from 'vue'
import { useMemberRequestModalLogic } from './useMemberRequestModalLogic'

export const useMemberSearchRequestModal = (props: MemberRequestModalProps, emits: MemberSearchRequestModalEmits) => {
  const listCustomerCompany = ref<WelfareSelectOptionType[]>([])
  const {
    setFieldValue,
    values,
    currentFilterDate,
    handleChangeCountDate,
    memberRequestMarketingAgreeYn,
    memberRequestHoldingOfficeYn,
    memberRequestAccountStatusCodeResponse,
    memberRequestGradeCode,
    handleSelectValue,
    isLoading,
    handleSearch,
    onPageChange,
    totalSearchItems,
    searchResults,
    handleResetForm,
    refTable
  } = useMemberRequestModalLogic(props, () => {
    clearChecked()
  })

  const listId = computed(() => {
    return searchResults.value?.map((item) => item?.id?.toString() ?? '') ?? []
  })

  const { onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId as Ref<string[]>)

  onMounted(() => {
    memberPointAllocationApi
      .getCustomerCompanyKeys()
      .then((data) => {
        listCustomerCompany.value = [
          {
            label: '전체',
            value: ''
          },
          ...data.data.map((item) => ({
            label: item.customerName,
            value: item.customerKey
          }))
        ]
      })
      .catch(() => {
        //
      })
  })

  const handleSaveDate = () => {
    emits('save', Object.values(refTable.value?.getListCheckedTable?.()))
    emits('close')
  }

  const pageChange = (data: PageState) => {
    clearChecked()
    onPageChange(data)
    refTable.value?.scrollToTop()
  }

  const onCheckBoxItem = (item: MemberSearchTableModel) => {
    onRowSelected({ ...item, id: item?.id?.toString() })
  }

  return {
    setFieldValue,
    values,
    currentFilterDate,
    handleChangeCountDate,
    memberRequestMarketingAgreeYn,
    memberRequestHoldingOfficeYn,
    memberRequestAccountStatusCodeResponse,
    memberRequestGradeCode,
    handleSelectValue,
    isLoading,
    handleSearch,
    onPageChange: pageChange,
    totalSearchItems,
    searchResults,
    handleResetForm,
    listCustomerCompany,
    onRowSelected: onCheckBoxItem,
    onSelectAllChange,
    handleSaveDate,
    refTable
  }
}
