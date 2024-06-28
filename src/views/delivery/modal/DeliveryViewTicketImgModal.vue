<script setup lang="ts">
import { HeaderModal } from '@/components'
import { useDeliveryViewTicketImgModal } from '@/composables/delivery/modal/useDeliveryViewTicketImgModal'
interface Props {
  ticketImgLink?: string
}
const props = defineProps<Props>()
const { closeModalByPop, onErrorImage, DEFAULT_IMG, errorImg } = useDeliveryViewTicketImgModal()
</script>

<template>
  <div class="view-ticket-img">
    <HeaderModal title="티켓 이미지 보기" @close-modal="closeModalByPop" />
    <div class="wf-p-30-20 wf-width-full wf_flex wf_flex-col">
      <div v-if="props.ticketImgLink" class="image-container scrollbar-custom">
        <img :src="props.ticketImgLink" alt="" @error="onErrorImage" :class="errorImg" />
      </div>
      <div v-else>
        <div :class="DEFAULT_IMG"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/delivery/modal/delivery-view-ticket-img.css');
</style>
