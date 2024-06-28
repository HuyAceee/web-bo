import { isInteger } from '@/common'
import { useModalNotification } from '@/composables'
import { InputValidationMaxLengthProps, WelfareInputMaxLengthValidationProps } from '@/models/uikit/WelfareInputProps'
import { onMounted, onUnmounted, ref, watch } from 'vue'

export const useInputValidationMaxLength = (props: InputValidationMaxLengthProps | WelfareInputMaxLengthValidationProps) => {
  const inputElement = ref()
  let timeout: NodeJS.Timeout | undefined
  const { openModal, closeModalByPop } = useModalNotification()
  const currentText = ref<string>(props.modelValue ?? '')
  let hasModalError = false

  watch(
    () => props.modelValue,
    (v) => {
      currentText.value = v ?? ''
    },
    { immediate: true }
  )

  watch(currentText, (value) => {
    if (timeout) {
      const currentLength = (value ?? '').length
      const maxLength = props.maxLength ?? 0
      const isContentValid = props?.onValidateContent?.(value) ?? true
      if (currentLength <= maxLength && isContentValid) {
        clearTimeout(timeout)
      }
    }
  })

  const controlShowModal = (isShow: boolean, immediate: boolean = false) => {
    if (isShow) {
      const maxLength = props.maxLength ?? 0
      const showInformModal = (hasModal: boolean) => {
        if (!hasModal) {
          hasModalError = true
          openModal({
            content: props?.messageWarning ?? `한글 기준 ${maxLength}자 이내로 입력 해주세요.`,
            onAccept() {
              closeModalByPop?.()
              hasModalError = false
            }
          })
        }
        setTimeout(() => {
          ;(document.activeElement as HTMLInputElement).blur()
        }, 50)
      }
      if (immediate) {
        showInformModal(hasModalError)
      } else {
        timeout = setTimeout(
          () => {
            showInformModal(hasModalError)
          },
          immediate ? 0 : 50
        )
      }
    }
  }

  const filterOnlyNumberFrom = (input?: string) => {
    let result = ''
    if (!input) return result
    const maxLength = props.maxLength
    for (const element of input) {
      if (isInteger(element)) {
        result += element
      }
      if (maxLength !== undefined && maxLength !== null && result.length >= maxLength) {
        break
      }
    }
    return result
  }

  const validatePasteContent = (
    input?: string
  ): {
    hasInvalid: boolean
    validContent: string
  } => {
    let result = ''
    let hasInvalid = false
    if (!input)
      return {
        hasInvalid,
        validContent: result
      }
    const maxLength = props.maxLength
    for (const element of input) {
      if (props.onValidateContent?.(element) !== false) {
        result += element
      }
      if (props.onValidateContent?.(element) === false) {
        hasInvalid = true
      }
      if (maxLength !== undefined && maxLength !== null && result.length >= maxLength) {
        break
      }
    }
    return {
      hasInvalid,
      validContent: result
    }
  }

  const pasteListener = (event: Event) => {
    const clipboardEvent = event as ClipboardEvent
    let pasteContent = clipboardEvent?.clipboardData?.getData('text')
    let invalidPasteContent = false
    if (props.isNumberInputType) {
      pasteContent = filterOnlyNumberFrom(pasteContent)
      setTimeout(() => {
        currentText.value = pasteContent ?? ''
      }, 0)
    }
    if (typeof props.onValidateContent === 'function') {
      const result = validatePasteContent(pasteContent)
      pasteContent = result.validContent
      invalidPasteContent = result.hasInvalid
      setTimeout(() => {
        currentText.value = pasteContent ?? ''
      }, 0)
    }
    if (pasteContent) {
      const pasteContentLength = pasteContent.length
      const currentLength = (currentText.value ?? '').length
      const maxLength = props.maxLength ?? 0
      if (currentLength === 0) {
        controlShowModal((currentLength + pasteContentLength > maxLength || invalidPasteContent) && !props.hiddenWarning, true)
      } else {
        const selectionStart = (event?.target as HTMLInputElement | HTMLTextAreaElement)?.selectionStart ?? 0
        const selectionEnd = (event?.target as HTMLInputElement | HTMLTextAreaElement)?.selectionEnd ?? 0
        const contentLengthReplace = currentLength - (selectionEnd - selectionStart)
        controlShowModal((contentLengthReplace + pasteContentLength > maxLength || invalidPasteContent) && !props.hiddenWarning, true)
      }
    }
  }

  onMounted(() => {
    inputElement.value?.addEventListener('paste', pasteListener)
  })

  onUnmounted(() => {
    inputElement.value?.removeEventListener('paste', pasteListener)
  })

  const onKeyPress = (event: KeyboardEvent) => {
    const key = event.key
    if (props.isNumberInputType) {
      if (!isInteger(key)) {
        event.preventDefault()
        return
      }
    } else {
      const isValid = props?.onValidateContent?.(key) ?? true
      if (!isValid) {
        controlShowModal(!props.hiddenWarning)
        event.preventDefault()
        return
      }
    }
    validateMaxLength()
  }

  const validateMaxLength = () => {
    const currentValue = currentText.value ?? ''
    const maxLength = props.maxLength ?? 0
    controlShowModal(currentValue.length === maxLength && !props.hiddenWarning)
  }

  return {
    inputElement,
    currentText,
    onKeyPress
  }
}
