import { ID_CHECKBOX_ALL } from '@/common'
import { useCheckbox } from '@/composables/common'
import { Ref } from 'vue'

export const useCheckBoxTable = (listId: Ref<string[]>) => {
  const { listChecked, handleChangeCheckBoxItem, getChecked, clearChecked, setListChecked } = useCheckbox(listId)

  const onRowSelected = (event: any) => {
    const id = event.id
    const checked = getChecked(id)
    handleChangeCheckBoxItem(!checked, id)
  }

  const onSelectAllChange = (checked: boolean) => {
    handleChangeCheckBoxItem(checked, ID_CHECKBOX_ALL)
  }

  return {
    listChecked,
    onRowSelected,
    onSelectAllChange,
    clearChecked,
    setListChecked
  }
}
