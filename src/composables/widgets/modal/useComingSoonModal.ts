import { useModalNotification } from './useModalNotification'

export const useComingSoonModal = () => {
  const { openModal } = useModalNotification()

  const openComingSoonModal = () => {
    openModal({ content: '곧 온다' })
  }

  return {
    openComingSoonModal
  }
}
