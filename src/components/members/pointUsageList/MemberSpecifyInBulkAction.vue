<script setup lang="ts">
import { WelfareBigButton } from '@/components/uikit'

interface MemberSpecifyInBulkActionProps {
  isSaved?: boolean
}

interface MemberSpecifyInBulkActionEmits {
  (e: 'reset'): void
  (e: 'save'): void
  (e: 'submit'): void
}

defineEmits<MemberSpecifyInBulkActionEmits>()
defineProps<MemberSpecifyInBulkActionProps>()
</script>

<template>
  <div class="wf-footer">
    <WelfareBigButton label="초기화" button-type="neatral" class="wf_w-120" @on-click="$emit('reset')" />
    <WelfareBigButton label="저장" button-type="default" @on-click="$emit('save')" />
    <WelfareBigButton label="배정등록" button-type="neatral" :disabled="!isSaved" class="wf_w-120" @on-click="$emit('submit')" />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-specify-in-bulk');
</style>
