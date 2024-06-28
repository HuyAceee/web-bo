<script setup lang="ts">
import { WelfareBigButton } from '@/components'
interface FormButtonHandleFormEmits {
  (e: 'on-reset'): void
  (e: 'on-submit'): void
}
const emits = defineEmits<FormButtonHandleFormEmits>()
</script>

<template>
  <div class="wf_flex wf_items-center wf_justify-center wf-space-x-20">
    <WelfareBigButton @click="emits('on-reset')" label="초기화" buttonType="neatral" />
    <WelfareBigButton @click="emits('on-submit')" label="조회" buttonType="default" />
  </div>
</template>
