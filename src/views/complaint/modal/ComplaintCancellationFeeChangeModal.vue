<!-- BO_F0306_010101_P -->
<script setup lang="ts">
import { acceptNumberKey, formatNumberDot } from '@/common'
import { HeaderModal, TextInputWithMaxLengthCharacters, WelfareMdButton } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useComplaintCancellationFeeChangeModal } from '@/composables/complaint/modal/useComplaintCancellationFeeChangeModal'
import { ConfirmModalProps } from '@/models'

interface ComplaintCancellationFeeModalModel extends Omit<ConfirmModalProps, 'onConfirm'> {
  lastPayAmount: number
  onConfirm?: (cancellationFee: string) => Promise<any>
}

const props = defineProps<ComplaintCancellationFeeModalModel>()

const { newCancellationFee, handleConfirm } = useComplaintCancellationFeeChangeModal(props)
</script>

<template>
  <div class="wf-modal-wrapper--content wf-modal-wrapper--grow">
    <HeaderModal title="취소 수수료 변경" @close-modal="onCancel" />
    <div class="wf-modal-body wf-body_04-mid">
      <div class="wf-search-tips wf-mb-20 wf-space-y-6">
        <p class="wf-list-style wf_text-n-33">해당 티켓의 변경 수수료를 입력해 주세요.</p>
        <p class="wf-list-style wf_text-sub-01">취소수수료는 최종결제금액을 초과할 수 없습니다</p>
      </div>

      <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6">
        <FormGroup class="wf_flex-1" is-rounded-top label="취소 수수료" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <span class="wf-body_03-reg wf-mt--2">{{ formatNumberDot(props.lastPayAmount) }}&nbsp;원</span>
          </div>
        </FormGroup>
        <FormGroup
          class="wf_flex-1 wf_complaint-request-collection-input"
          label="변경 취소수수료"
          required
          is-rounded-bottom
          :is-border-bottom="false"
        >
          <div class="wf_flex wf-space-x-6 wf_items-center wf_complaint-request-collection-input">
            <TextInputWithMaxLengthCharacters
              v-model="newCancellationFee"
              @keypress="acceptNumberKey"
              class="wf_flex-1 wf_w-180"
              size="small"
              placeholder="숫자만 입력해 주세요."
              :max-length="7"
              :hidden-warning="true"
            />
          </div>
        </FormGroup>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf-mt-20 wf_flex-grow wf_w-full">
        <WelfareMdButton class="wf_w-120" :label="'취소'" buttonType="cancel" @onClick="onCancel" />
        <WelfareMdButton class="wf_w-120" :label="'변경'" buttonType="default" @onClick="handleConfirm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-modal.css');
</style>
