import { FormGroupTimeLinesFilterFormProps } from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { WelfareSelectOptionType } from '@/models'
import { useModalNotification } from '@/composables'
import { datePickerNotification, isValidDate } from '@/common'
import dayjs from 'dayjs'
import { ref } from 'vue'

export const useFormGroupTimeLinesFilterForm = (
  props: FormGroupTimeLinesFilterFormProps,
  emits: {
    onSelectType: (value: WelfareSelectOptionType) => void
    onChangeDateFrom: (value: string) => void
    onChangeDateTo: (value: string) => void
    onChangeFilterDate: (value: number) => void
  }
) => {
  const { openModal } = useModalNotification()
  const isSelectSimple = ref(false)
  const handleChooseStartDate = (value: string) => {
    if (props.toDate && props.fromDate && !isSelectSimple.value) {
      emits.onChangeDateTo('')
      emits.onChangeDateFrom(value)
      isSelectSimple.value = true
      return
    }
    if (props?.toDate && props?.toDate < value) {
      openModal({
        content: datePickerNotification.startDate.date
      })
      return
    }
    const subOneYear = dayjs(props.toDate).subtract(1, 'years')
    if (isValidDate(value) && subOneYear.isAfter(value)) return openModal({ content: datePickerNotification.maxLimit?.date })
    emits.onChangeDateFrom(value)
  }

  const handleChooseEndDate = (value: string) => {
    if (props.toDate && props.fromDate && !isSelectSimple.value) {
      emits.onChangeDateFrom('')
      emits.onChangeDateTo(value)
      isSelectSimple.value = true
      return
    }
    if (props?.fromDate && props?.fromDate > value) {
      openModal({
        content: datePickerNotification.endDate.date
      })
      return
    }
    const addOneYear = dayjs(props.fromDate).add(1, 'years')
    if (isValidDate(value) && addOneYear.isBefore(value)) return openModal({ content: datePickerNotification.maxLimit?.date })
    emits.onChangeDateTo(value)
  }

  const resetSelectSimple = () => {
    isSelectSimple.value = false
  }
  return {
    handleChooseStartDate,
    handleChooseEndDate,
    resetSelectSimple
  }
}
