import { DataTableWithCheckboxParamsModel } from '@/models'
import { ComputedRef, ref } from 'vue'

export const useDataTableWithCheckbox = (props: DataTableWithCheckboxParamsModel, data: ComputedRef<any>) => {
  const isSelectAll = ref(false)
  const dataTableRef = ref()

  const onCheckboxValueChange = (item: any) => {
    const itemsNotSelected = data.value?.filter((item: any) => !item.isSelected && !item.isDisabled)
    if (itemsNotSelected.length === 0) {
      isSelectAll.value = true
    } else {
      isSelectAll.value = false
    }
    props.onRowCheckedChange(item)
  }

  const changeRestCheckbox = (isChecked: boolean) => {
    data?.value?.forEach((item: any) => {
      if (!item.isDisabled) {
        item.isSelected = isChecked
      }
    })
  }

  const onSelectAllClick = () => {
    if (isSelectAll.value) {
      changeRestCheckbox(false)
    } else {
      changeRestCheckbox(true)
    }
    isSelectAll.value = !isSelectAll.value
    props.onSelectAllChange(isSelectAll.value)
  }

  const clearSelectedAll = () => {
    isSelectAll.value = false
    changeRestCheckbox(false)
  }

  const scrollToTop = () => {
    dataTableRef?.value?.scrollToTop()
  }

  const forceCheckAll = () => {
    data?.value?.forEach((item: any) => {
      if (!item.isDisabled) {
        item.isSelected = true
      }
    })
    isSelectAll.value = true
  }

  return {
    isSelectAll,
    onSelectAllClick,
    onCheckboxValueChange,
    clearSelectedAll,
    dataTableRef,
    scrollToTop,
    forceCheckAll
  }
}
