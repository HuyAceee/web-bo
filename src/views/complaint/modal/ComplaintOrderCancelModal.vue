<!-- BO_F0301_010101_P -->
<script setup lang="ts">
import { HeaderModal } from '@/components'
import ComplaintBaseWrapperModal from '@/components/complaint/modal/ComplaintBaseWrapperModal.vue'
import { useComplaintOrderCancelModal } from '@/composables/complaint/modal/useComplaintOrderCancelModal'
import { ConfirmModalProps } from '@/models'
interface ComplaintOrderCancelModalModel extends Omit<ConfirmModalProps, 'onConfirm'> {
  onConfirm?: (withdrawalReason: string) => Promise<any>
}
const props = defineProps<ComplaintOrderCancelModalModel>()
const { orderCancelWithdrawalReason, handleConfirm, updateValueReason } = useComplaintOrderCancelModal(props)
</script>

<template>
  <div class="wf-modal-wrapper--content wf-modal-wrapper--grow wf_complaint-modal-address">
    <HeaderModal title="주문취소철회" @close-modal="onCancel" />
    <ComplaintBaseWrapperModal
      :field-input="orderCancelWithdrawalReason"
      @on-change-input="updateValueReason"
      title="선택하신 클레임을 철회 처리하시겠습니까?"
      sub-title="사유를 입력해 주세요."
      placeholder="주문취소 철회 사유 입력"
      close-label="닫기"
      submit-label="주문취소철회"
      @on-close="onCancel"
      @on-submit="handleConfirm"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-modal.css');
</style>
