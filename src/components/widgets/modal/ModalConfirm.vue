<script setup lang="ts">
import { WelfareMdButton } from '@/components/uikit'
import { ConfirmModalProps } from '@/models/widgets'

withDefaults(defineProps<ConfirmModalProps>(), {
  content: '',
  type: 'default',
  buttonCancelLabel: '취소',
  buttonConfirmLabel: '확인',
  onCancel: () => {},
  onConfirm: () => {}
})
</script>

<template>
  <div class="wf_modal-confirm wf-space-y-20">
    <div
      class="wf_modal-confirm-content wf-space-y-5"
      :class="{
        'wf_modal-confirm-content--warning': $props.type === 'warning'
      }"
      v-html="$props.content"
    ></div>
    <div class="wf_flex wf-space-x-4">
      <WelfareMdButton class="wf_modal-confirm-button" :label="$props.buttonCancelLabel" buttonType="cancel" @onClick="$props.onCancel" />
      <WelfareMdButton class="wf_modal-confirm-button" :label="$props.buttonConfirmLabel" buttonType="default" @onClick="$props.onConfirm" />
    </div>
  </div>
</template>
