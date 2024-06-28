import { WelfareInputEmits, WelfareInputMaxLengthValidationProps } from '@/models'
import { computed, watch } from 'vue'
import { useModalNotification } from '../modal'

export const useTextInputMaxLengthValidation = (props: WelfareInputMaxLengthValidationProps, emits: WelfareInputEmits) => {
  const { openModal, closeModalByPop } = useModalNotification()
  watch(
    () => props.modelValue,
    (n, o) => {
      if ((n || '')?.length > Number(props?.maxLength) && (n as string).length > (o as string).length) {
        if (!props.hiddenWarning) {
          openModal({
            content: `한글 기준 ${props.maxLength}자 이내로 입력 해주세요.`,
            onAccept() {
              closeModalByPop?.()
            }
          })
        }
        ; (document.activeElement as HTMLInputElement).blur()
      }
      emits('update:modelValue', n)
    }
  )

  const acceptMaxLength = (event: KeyboardEvent) => {
    if ((props?.modelValue || '')?.length > Number(props?.maxLength)) {
      event.preventDefault()
    }
  }

  const maxLengthInput = computed(() => {
    return !props?.maxLength ? undefined : props.maxLength + 1
  })

  return { acceptMaxLength, maxLengthInput }
}
