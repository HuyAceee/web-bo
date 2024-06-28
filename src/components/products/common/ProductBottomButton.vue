<script setup lang="ts">
import { WelfareBigButton } from '@/components/uikit'
export interface WelfareProductBottomButtonEmits {
  (e: 'on-preview-click'): void
  (e: 'on-cancel-click'): void
  (e: 'on-temporary-click'): void
  (e: 'on-save-click'): void
  (e: 'on-approval-click'): void
  (e: 'on-approval-reject-click'): void
  (e: 'on-approval-finished-click'): void
}

export interface WelfareProductBottomButtonProps {
  previewDisabled?: boolean
  cancelDisabled?: boolean
  temporaryDisabled?: boolean
  temporaryVisible?: boolean
  saveDisabled?: boolean
  approvalDisabled?: boolean
  approvalRejectDisabled?: boolean
  approvalFinishedDisabled?: boolean
  approvalFinished?: boolean
  previewVisible?: boolean
  approvalVisible?: boolean
  cancelLabel?: string
  temporaryLabel?: string
  saveLabel?: string
}

const props = withDefaults(defineProps<WelfareProductBottomButtonProps>(), {
  cancelLabel: '취소',
  temporaryLabel: '임시저장',
  saveLabel: '저장',
  temporaryVisible: true
})

const emit = defineEmits<WelfareProductBottomButtonEmits>()

const eventEmit = {
  onPreviewClick: () => emit('on-preview-click'),
  onCancelClick: () => emit('on-cancel-click'),
  onTemporaryClick: () => emit('on-temporary-click'),
  onSaveClick: () => emit('on-save-click'),
  onApprovalClick: () => emit('on-approval-click'),
  onApprovalRejectClick: () => emit('on-approval-reject-click'),
  onApprovalFinishedClick: () => emit('on-approval-finished-click')
}
</script>

<template>
  <div class="wf_flex wf-width-full wf_justify-between wf-mt-30">
    <div class="wf_flex wf-space-x-10">
      <WelfareBigButton
        v-if="!previewVisible"
        @click="eventEmit.onPreviewClick"
        :disabled="props.previewDisabled"
        label="미리보기"
        buttonType="neatral"
        class="wf_button--ml wf_w-120"
      />
      <div v-if="props.approvalFinished" class="wf_w-120"></div>
    </div>

    <div class="wf_flex wf-space-x-20">
      <WelfareBigButton @click="eventEmit.onCancelClick" :disabled="props.cancelDisabled" :label="cancelLabel" buttonType="cancel" />
      <WelfareBigButton
        v-if="temporaryVisible"
        @click="eventEmit.onTemporaryClick"
        :disabled="props.temporaryDisabled"
        :label="temporaryLabel"
        buttonType="neatral"
        class="wf_button--ml"
      />
      <WelfareBigButton @click="eventEmit.onSaveClick" :disabled="props.saveDisabled" :label="saveLabel" buttonType="default" />
    </div>

    <div class="wf_flex wf-space-x-10">
      <WelfareBigButton
        v-if="!approvalVisible && !props.approvalFinished"
        @click="eventEmit.onApprovalClick"
        :disabled="props.approvalDisabled"
        label="승인요청"
        buttonType="neatral"
        class="wf_button--ml wf_w-120"
      />
      <WelfareBigButton
        v-if="!approvalVisible && props.approvalFinished"
        @click="eventEmit.onApprovalRejectClick"
        :disabled="props.approvalRejectDisabled"
        label="승인반려"
        buttonType="neatral"
        class="wf_button--ml wf_w-120"
      />
      <WelfareBigButton
        v-if="!approvalVisible && props.approvalFinished"
        @click="eventEmit.onApprovalFinishedClick"
        :disabled="props.approvalFinishedDisabled"
        label="승인"
        buttonType="default"
        class="wf_w-120"
      />
    </div>
  </div>
</template>
