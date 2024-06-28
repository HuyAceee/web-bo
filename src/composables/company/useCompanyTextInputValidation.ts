import { WelfareInputEmits, WelfareInputMaxLengthValidationProps } from '@/models'
import { computed, watch } from 'vue'
import { useModalNotification } from '@/composables'

export const useCompanyTextInputValidation = (props: WelfareInputMaxLengthValidationProps, emits: WelfareInputEmits) => {
  const { openModal, closeModalByPop } = useModalNotification()
  watch(
    () => props.modelValue,
    (n, o) => {
      if (
        (n || '')?.replace(props.notCountCharacterRegExp || '', '').length > Number(props?.maxLength) &&
        (n as string).length > (o as string).length
      ) {
        if (!props.hiddenWarning) {
          openModal({
            content: `한글 기준 ${props.maxLength}자 이내로 입력 해주세요.`,
            onAccept() {
              closeModalByPop?.()
            }
          })
        }
        ;(document.activeElement as HTMLInputElement).blur()
      }
      emits('update:modelValue', n)
    }
  )

  const acceptMaxLength = (event: Event, addStr?: string) => {
    const currentSelection = (event.target as any).selectionStart
    const finalStr = `${props?.modelValue || ''}`.slice(0, currentSelection) + (addStr || '') + `${props?.modelValue || ''}`.slice(currentSelection)
    if (finalStr.replace(props.notCountCharacterRegExp || '', '')?.length > Number(props?.maxLength)) {
      event.preventDefault()
    }
    if (props.onValidateContent && !props.onValidateContent(finalStr, props.maxLength)) {
      event.preventDefault()
    }
  }

  const maxLengthInput = computed(() => {
    return !props?.maxLength ? undefined : props.maxLength + 1
  })

  return { acceptMaxLength, maxLengthInput }
}
