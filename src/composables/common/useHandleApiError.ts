import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useModalNotification } from '../widgets'

export const useHandleApiError = () => {
  const route = useRoute()

  watch(
    () => route.path,
    () => {
      isShowed.value = false
    }
  )
  const { openModal, closeModalByPop } = useModalNotification()
  const isShowed = ref(false)
  const handleError = (error?: BaseModelErrorResponse, message?: string) => {
    if (!isShowed.value) {
      isShowed.value = true
      let errorMessage = error?.message
      if (errorMessage === undefined || errorMessage === null) {
        errorMessage = message ?? ''
      }
      openModal?.({
        content: errorMessage,
        onAccept: () => {
          closeModalByPop?.()
          isShowed.value = false
        }
      })
    }
  }

  return { handleError }
}
