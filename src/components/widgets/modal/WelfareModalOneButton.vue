<script setup lang="ts">
import { WelfareMdButton } from '@/components/uikit'


export interface WelfareModalOneButtonProps {
  title: string
  textButton?: string
  onConfirm: () => void
}

const props = defineProps<WelfareModalOneButtonProps>()

const buttonLabel = props.textButton ?? '확인'

</script>
<template>
  <div class="wf_w-300 wf_bg-white wf-px-35 wf-py-30 wf-space-y-20 wf_border-radius-4">
    <div class="wf_flex wf_justify-center">
      <slot name="title">
        <p class="wf-body_02-reg wf_text-n-52">{{ props.title }}</p>
      </slot>
    </div>
    <div>
      <slot name="button">
        <WelfareMdButton :label="buttonLabel" buttonType="default" class="wf_w-full wf_h-40" @click="props.onConfirm" />
      </slot>
    </div>
  </div>
</template>
