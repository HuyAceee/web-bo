import { useFormFilterTable } from '@/composables/widgets'
import { onMounted } from 'vue'
import { defaultPageState } from '@/models'
import { memberPointAdjustmentApi } from '@/services/api/members/MemberPointAdjustmentApi'
import { MemberPointAdjustmentDeleteListFormModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

export const useMemberPointAdjustmentTableDelete = () => {
  const fetchDataCallback = () => {
    return memberPointAdjustmentApi.getMemberPointAdjustmentDeleteList()
  }

  const {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onRowSelected,
    onSelectAllChange,
    listChecked
  } = useFormFilterTable<MemberPointAdjustmentDeleteListFormModel, any>({
    initialValuesForm: {},
    fetchDataCallback
  })

  onMounted(() => {
    onPageChange(defaultPageState)
  })

  const removeItem = (ids: number[]) => {
    if (items.value && ids.length > 0) {
      listChecked.value = listChecked.value.filter((item) => !ids.includes(Number(item)))
      items.value = items.value.filter((item) => !ids.includes(item.id))
    }
  }

  return {
    values,
    onRowSelected,
    onSelectAllChange,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    removeItem,
    listChecked
  }
}
