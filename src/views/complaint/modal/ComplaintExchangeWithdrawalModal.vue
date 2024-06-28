<!-- BO_F0303_010101_P -->
<script setup lang="ts">
import { HeaderModal } from '@/components'
import ComplaintBaseWrapperModal from '@/components/complaint/modal/ComplaintBaseWrapperModal.vue'
import { useComplaintExchangeWithdrawalModal } from '@/composables/complaint/modal/useComplaintExchangeWithdrawalModal'
import { ConfirmModalProps } from '@/models'
const props = defineProps<ConfirmModalProps>()
const { reasonRefuse } = useComplaintExchangeWithdrawalModal()
</script>

<template>
  <div class="wf-modal-wrapper--content wf-modal-wrapper--grow wf_complaint-modal-address">
    <HeaderModal title="반품철회" @close-modal="props.onCancel" />
    <ComplaintBaseWrapperModal
      :field-input="reasonRefuse"
      title="선택하신 클레임을 ’반품철회’로 처리하시겠습니까?"
      sub-title="사유를 입력해 주세요."
      placeholder="반품철회 사유를 입력해 주세요."
      close-label="취소"
      submit-label="반품철회"
      @on-close="props.onCancel"
      @on-submit="props.onCancel"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-modal.css');
</style>
