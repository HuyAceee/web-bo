import { BACKSPACE_KEY_CODE, isInteger, regexReplaceWhiteSpace } from '@/common'
import { useModalNotification } from '@/composables'
import { WelfareTimeInputProps } from '@/models'
import { ref, watch } from 'vue'

const errorMessage = {
  specialCharacter: '특수문자 또는 텍스트는 입력할 수 없습니다.',
  hourRange: '0~23 사이의 숫자를 입력 해주세요.',
  minuteRange: '0~59 사이의 숫자를 입력 해주세요.'
}

export const useTimeInput = (
  props: WelfareTimeInputProps,
  emitsEvent: {
    updateModelValue: (value: any, resetValue: () => void) => void
  }
) => {
  const modelValue = ref(props.modelValue)
  const { openModal, closeModalByPop } = useModalNotification()
  const hasModal = ref(false)

  watch(
    () => props.modelValue,
    (newValue) => {
      modelValue.value = newValue
    },
    {
      deep: true
    }
  )

  const pressTimeKey = (event: KeyboardEvent) => {
    if (!isInteger(event?.key) && event?.keyCode !== BACKSPACE_KEY_CODE) {
      if (hasModal.value) return
      ;(event?.target as HTMLElement)?.blur()
      updateModelValue()
      openModal({
        content: errorMessage.specialCharacter,
        onAccept() {
          hasModal.value = false
          closeModalByPop?.()
        }
      })
      hasModal.value = true
      return
    }
    const value = modelValue.value ?? ''
    const [hour, minute] = value.split(' : ')
    if (Number(hour) > 23) {
      openModal({
        content: errorMessage.hourRange
      })
      ;(event?.target as HTMLElement)?.blur()
      updateModelValue()
      return
    }
    if (Number(minute) > 59) {
      openModal({
        content: errorMessage.minuteRange
      })
      ;(event?.target as HTMLElement)?.blur()
      updateModelValue()
    }
  }

  const resetValue = () => {
    modelValue.value = undefined
  }

  const updateModelValue = (value?: string) => {
    modelValue.value = value
    if (value?.includes('_')) return
    emitsEvent.updateModelValue(value?.replace(regexReplaceWhiteSpace, ''), resetValue)
  }

  const handleKeyBackspace = (event: KeyboardEvent) => {
    if (event?.keyCode === BACKSPACE_KEY_CODE) {
      pressTimeKey(event)
    }
  }

  return {
    pressTimeKey,
    modelValue,
    updateModelValue,
    handleKeyBackspace
  }
}
