<script lang="ts" setup>
import { WelfareMdButton } from '@/components'
export interface MemberListAcceptInformationTableWrapperProps {
  title: string
  class?: string
  classGroup?: string
}

interface MemberListAcceptInformationTableWrapperEmits {
  (e: 'reset'): void
  (e: 'save'): void
}

defineProps<MemberListAcceptInformationTableWrapperProps>()
defineEmits<MemberListAcceptInformationTableWrapperEmits>()
</script>

<template>
  <div :class="$props?.classGroup ?? ''">
    <div :class="['wf_flex wf_items-center wf_justify-between', $props?.class ?? '']">
      <p class="wf-body_01-semi wf_text-n-33">| {{ title }}</p>
      <div class="wf_flex wf_items-center wf-space-x-4">
        <WelfareMdButton @click="$emit('reset')" label="초기화" class="wf_w-55" buttonType="liner" buttonSize="small" />
        <WelfareMdButton @click="$emit('save')" label="저장" class="wf_w-44" buttonType="default" buttonSize="small" />
      </div>
    </div>
    <div class="wf-mt-10">
      <slot></slot>
    </div>
  </div>
</template>
