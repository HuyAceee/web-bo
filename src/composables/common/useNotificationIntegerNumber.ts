import { isInteger } from '@/common'
import { useModalNotification } from '@/composables'
import { ref } from 'vue'

interface NotificationDatePeriodParams {
  emit: (value: string) => void
}

export function useNotificationInteger({ emit }: NotificationDatePeriodParams) {
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()

  const isReadOnly = ref(false)
  const handleNumberChange = (value: string) => {
    if (!isInteger(value)) {
      openModalNotification?.({
        content: ' - 없이 숫자만 입력 해주세요.',
        onAccept: () => {
          closeModalByPop?.()
          isReadOnly.value = false
        }
      })
      isReadOnly.value = true
    }
    emit(value.slice(0, length))
  }

  return {
    isReadOnly,
    handleNumberChange
  }
}