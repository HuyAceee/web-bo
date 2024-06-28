import { ref } from 'vue'
export const useModalHandle = () => {
  const isOpen = ref(false)

  const showModal = () => {
    isOpen.value = true
  }

  const hideModal = () => {
    isOpen.value = false
  }

  const toggleModal = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    showModal,
    toggleModal,
    hideModal
  }
}
