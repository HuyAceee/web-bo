import { ComputedRef, Ref } from 'vue'

export interface ICheckBoxData {
  isCheckboxAll: ComputedRef<boolean>
  listChecked: Ref<string[]>
  handleChangeCheckBoxItem: (checked: boolean, id: string | number) => void
  getChecked: (id: string | number) => boolean
  handleCheckAll: (checked: boolean) => void
  clearChecked: () => void
  setListChecked: (listId: any[]) => void
}
