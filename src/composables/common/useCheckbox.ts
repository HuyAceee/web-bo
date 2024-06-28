import { ID_CHECKBOX_ALL } from '@/common'
import { ICheckBoxData } from '@/models/widgets'
import { Ref, computed, ref } from 'vue'

export const useCheckbox = (listID: Ref<string[]>, defaultCheckedList: any[] = []): ICheckBoxData => {
  const listChecked = ref<any[]>(defaultCheckedList)

  const handleChangeCheckBoxItem = (checked: boolean, id: string | number) => {
    if (id === ID_CHECKBOX_ALL) {
      handleCheckAll(checked)
      return
    }
    const index = listChecked.value.findIndex((item) => item === id)
    if (checked) {
      if (index === -1) {
        listChecked.value = [...listChecked.value, id as never]
      }
    } else {
      const listCheckedNew = listChecked.value.filter((item) => item !== id)
      listChecked.value = [...listCheckedNew]
    }
  }

  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      listChecked.value = [...listID.value] as never
    } else {
      listChecked.value = []
    }
  }

  const getChecked = (id: string | number) => {
    return id === 'all' ? isCheckboxAll.value : listChecked.value.includes(id)
  }

  const isCheckboxAll = computed(() => {
    return listChecked.value.length === listID.value?.length
  })

  const setListChecked = (listId: any[]) => {
    listChecked.value = listId
  }

  const clearChecked = () => {
    listChecked.value = []
  }

  return {
    isCheckboxAll,
    listChecked,
    handleChangeCheckBoxItem,
    getChecked,
    handleCheckAll,
    clearChecked,
    setListChecked
  }
}
