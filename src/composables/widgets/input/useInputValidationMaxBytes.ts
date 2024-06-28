import { formatTextLength, getStringWithLimitBytes, lengthInUtf8Bytes } from '@/common'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { InputValidationMaxBytesProps, WelfareInputMaxBytesValidationProps } from '@/models/uikit/WelfareInputProps'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

export const useInputValidationMaxBytes = (props: InputValidationMaxBytesProps | WelfareInputMaxBytesValidationProps) => {
  const inputElement = ref()
  const maxLengthRef = ref<number | undefined>()
  let timeout: NodeJS.Timeout | undefined
  const { openModal, closeModalByPop } = useModalNotification()
  const currentText = ref<string>('')
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
      if (currentLength <= maxLength) {
        clearTimeout(timeout)
      }
    }
  })

  const clearMaxLength = () => {
    maxLengthRef.value = undefined
  }

  const controlShowModal = (isShow: boolean, immediate: boolean = false) => {
    if (isShow) {
      const maxLength = props.maxBytes ?? 0
      const showInformModal = (hasModal: boolean) => {
        if (!hasModal) {
          hasModalError = true
          openModal({
            content: props.messageWarning ?? `한글 기준 ${Math.floor(maxLength / 2)}자 이내로 입력 해주세요.`,
            onAccept() {
              closeModalByPop?.()
              hasModalError = false
              clearMaxLength()
            }
          })
          setTimeout(() => {
            ;(document.activeElement as HTMLInputElement).blur()
          }, 50)
        }
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

  const validateContentAfterInsert = (selectionStart: number, selectionEnd: number, insertContent: string) => {
    const currentContent = currentText.value
    const maxBytesLength = props.maxBytes ?? 0
    const contentStart = currentContent.substring(0, selectionStart)
    const contentEnd = currentContent.substring(selectionEnd)
    const contentAfterPaste = `${contentStart}${insertContent}${contentEnd}`
    const contentBytesAfterPaste = lengthInUtf8Bytes(contentAfterPaste)
    const isOverLimit = contentBytesAfterPaste > maxBytesLength
    if (isOverLimit) {
      const validContent = getStringWithLimitBytes(contentAfterPaste, maxBytesLength)
      maxLengthRef.value = validContent.length
    }
    controlShowModal(isOverLimit && !props.hiddenWarning, true)
  }

  const pasteListener = (event: Event) => {
    const clipboardEvent = event as ClipboardEvent
    const pasteContent = clipboardEvent?.clipboardData?.getData('text')
    if (pasteContent) {
      const pasteContentBytesLength = lengthInUtf8Bytes(pasteContent)
      const currentBytesLength = lengthInUtf8Bytes(currentText.value ?? '')
      const maxBytesLength = props.maxBytes ?? 0
      if (currentBytesLength === 0) {
        const isOverLimit = currentBytesLength + pasteContentBytesLength > maxBytesLength
        if (isOverLimit) {
          const validContent = getStringWithLimitBytes(pasteContent, maxBytesLength)
          maxLengthRef.value = validContent.length
        }
        controlShowModal(isOverLimit && !props.hiddenWarning, true)
      } else {
        const selectionStart = (event?.target as HTMLInputElement | HTMLTextAreaElement)?.selectionStart ?? 0
        const selectionEnd = (event?.target as HTMLInputElement | HTMLTextAreaElement)?.selectionEnd ?? 0
        validateContentAfterInsert(selectionStart, selectionEnd, pasteContent)
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
    const selectionStart = (event?.target as HTMLInputElement | HTMLTextAreaElement)?.selectionStart ?? 0
    const selectionEnd = (event?.target as HTMLInputElement | HTMLTextAreaElement)?.selectionEnd ?? 0
    const newByteText = lengthInUtf8Bytes(event.key)
    if (selectionStart === selectionEnd) {
      const currentBytesValue = lengthInUtf8Bytes(currentText.value ?? '')
      const maxBytes = props.maxBytes ?? 0
      if (currentBytesValue + newByteText > maxBytes) {
        maxLengthRef.value = currentText.value.length
      } else {
        const numberTextCanType = maxBytes - currentBytesValue > 0 ? maxBytes - currentBytesValue : 0
        maxLengthRef.value = currentText.value.length + numberTextCanType
      }
      controlShowModal(currentBytesValue + newByteText > maxBytes && !props.hiddenWarning)
    } else {
      validateContentAfterInsert(selectionStart, selectionEnd, `${event.key}`)
    }
  }

  const countLabelRight = computed(() => {
    return props?.hiddenLablelRight ? '' : formatTextLength(currentText.value, props.maxBytes, props.hiddenLablelTextBytes)
  })

  return { countLabelRight, currentText, inputElement, maxLengthRef, onKeyPress }
}
