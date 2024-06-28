import { ID_CHECKBOX_ALL } from '@/common'
import { useCheckbox } from '@/composables/common'
import { ProductDataFieldFormDeliveryProductListModel } from '@/models'
import { computed, watch } from 'vue'

export const useProductExhibitionDevices = (defaultValues: string[], onChangeDevices: any) => {
  const listCheckBoxDevices = ProductDataFieldFormDeliveryProductListModel.listCheckBoxDevices[1]
  const exposureIdChannelCheckBox = computed(() => {
    return listCheckBoxDevices.list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })
  const exposureChannelCheckBox = useCheckbox(exposureIdChannelCheckBox, [...defaultValues])

  const listActionCheckBox = computed(() => {
    return {
      exposureChannelCheckBox
    }
  })
  const getIsCheckBox = (fieldKey: string, id: string) => {
    const newField = fieldKey as 'exposureChannelCheckBox'
    return listActionCheckBox.value?.[newField].getChecked(id)
  }

  const handleCheckBoxChange = (fieldKey: string, value: boolean, id: string) => {
    const newField = fieldKey as 'exposureChannelCheckBox'
    listActionCheckBox.value?.[newField].handleChangeCheckBoxItem(value, id)
  }

  watch(exposureChannelCheckBox.listChecked, (newChecked) => {
    onChangeDevices(newChecked)
  })

  return {
    listCheckBoxDevices,
    getIsCheckBox,
    handleCheckBoxChange,
    setListChecked: exposureChannelCheckBox.setListChecked
  }
}
