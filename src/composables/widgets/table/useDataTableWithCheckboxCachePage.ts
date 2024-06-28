import { DataTableWithCheckboxParamsModel } from '@/models'
import { ComputedRef, ref, watch } from 'vue'

export const useDataTableWithCheckboxCachePage = (props: DataTableWithCheckboxParamsModel, data: ComputedRef<any>) => {
  const isSelectAll = ref(false)
  const dataTableRef = ref()
  let dataTableCheckBoxList: any = props.defaultCheckedData
    ? props.defaultCheckedData.reduce((currentData, item) => {
        return {
          ...currentData,
          [`${item?.id}`]: item
        }
      }, {})
    : {}

  const onCheckboxValueChange = (item: any) => {
    const itemsNotSelected = data.value?.filter((item: any) => !item.isSelected && !item.isDisabled)
    if (itemsNotSelected.length === 0) {
      isSelectAll.value = true
    } else {
      isSelectAll.value = false
    }
    if (item.isSelected) {
      dataTableCheckBoxList[`${item.id}`] = item
    } else {
      delete dataTableCheckBoxList?.[`${item.id}`]
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

    data?.value?.forEach((item: any) => {
      if (`${item.id}` in dataTableCheckBoxList && isSelectAll.value) {
        delete dataTableCheckBoxList[`${item.id}`]
      } else {
        dataTableCheckBoxList[`${item.id}`] = item
      }
    })
    isSelectAll.value = !isSelectAll.value
    props.onSelectAllChange(isSelectAll.value)
  }

  const clearSelectedAll = () => {
    isSelectAll.value = false
    changeRestCheckbox(false)
    dataTableCheckBoxList = {}
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

  watch(
    () => data.value,
    () => {
      if (data?.value && data.value.length) {
        data?.value?.forEach((item: any) => {
          item.isSelected = Boolean(dataTableCheckBoxList?.[`${item.id}`])
        })
        const itemsNotSelected = data.value?.filter((item: any) => !item.isSelected)

        isSelectAll.value = itemsNotSelected.length === 0
      }
    }
  )

  return {
    isSelectAll,
    onSelectAllClick,
    onCheckboxValueChange,
    clearSelectedAll,
    dataTableRef,
    scrollToTop,
    forceCheckAll,
    dataTableCheckBoxList
  }
}
