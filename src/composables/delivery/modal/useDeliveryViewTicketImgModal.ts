import { useModal } from '@/composables'
import DeliveryViewTicketImgModal from '@/views/delivery/modal/DeliveryViewTicketImgModal.vue'
import { ref } from 'vue'

export const useDeliveryViewTicketImgModal = () => {
  const { showModal, closeModalByPop } = useModal()
  const DEFAULT_IMG = 'image-default'
  const errorImg = ref<string>()
  const onErrorImage = () => {
    errorImg.value = DEFAULT_IMG
  }
  const onShowModal = (ticketImgLink?: string) => {
    showModal?.({
      component: DeliveryViewTicketImgModal,
      props: {
        ticketImgLink: ticketImgLink
      }
    })
  }

  return { onShowModal, closeModalByPop, onErrorImage, DEFAULT_IMG, errorImg }
}
