<script setup lang="ts">
import { WelfareMdButton } from '@/components/uikit'
import { NotificationModalProps } from '@/models/widgets'

withDefaults(defineProps<NotificationModalProps>(), {
  content: '',
  type: 'default',
  buttonLabel: '확인',
  onAccept: () => {}
})
</script>

<template>
  <div class="wf_modal-notification wf-space-y-20">
    <div
      class="wf_modal-notification-content wf-space-y-5"
      :class="{
        'wf_modal-notification-content--warning': $props.type === 'warning'
      }"
      v-html="$props.content"
    ></div>
    <WelfareMdButton class="wf_modal-notification-button" :label="$props.buttonLabel" buttonType="default" @onClick="$props.onAccept" />
  </div>
</template>
