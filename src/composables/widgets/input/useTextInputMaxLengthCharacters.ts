import { WelfareInputEmits, WelfareInputMaxLengthValidationProps } from '@/models'
import { ref, watch } from 'vue'
import { useModalNotification } from '../modal'

export const useTextInputMaxLengthCharacters = (props: WelfareInputMaxLengthValidationProps, emits: WelfareInputEmits) => {
  const { openModal, closeModalByPop } = useModalNotification()
  const currentText = ref<string | undefined>()
  let isShowModalNotification = false
  const onTextChange = (value: any) => {
    const content = value as string
    if ((props.maxLength ?? 0) > 0) {
      if (content.length > (props.maxLength ?? 0)) {
        if (!isShowModalNotification && !props.hiddenWarning) {
          isShowModalNotification = true
          openModal({
            content: `한글 기준 ${props.maxLength}자 이내로 입력 해주세요.`,
            onAccept() {
              closeModalByPop?.()
              isShowModalNotification = false
            }
          })
        }
        currentText.value = currentText.value?.slice(0, props.maxLength ?? 0 - 2)
        emits('update:modelValue', currentText.value)
        return
      } else {
        currentText.value = value
        emits('update:modelValue', value)
      }
    } else {
      currentText.value = value
      emits('update:modelValue', value)
    }
  }
  watch(
    () => props.modelValue,
    (v) => {
      currentText.value = v ?? ''
    },
    { immediate: true }
  )
  return { onTextChange, currentText }
}
