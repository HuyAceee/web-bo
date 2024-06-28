<script setup lang="ts">
import { WelfareBigButton } from '@/components/uikit'

interface MemberSpecifyInBulkActionprops {
  isAdjust?: boolean
}

interface MemberSpecifyInBulkActionEmits {
  (e: 'reset'): void
  (e: 'save'): void
  (e: 'submit'): void
}

defineEmits<MemberSpecifyInBulkActionEmits>()
defineProps<MemberSpecifyInBulkActionprops>()
</script>

<template>
  <div class="wf-footer">
    <WelfareBigButton label="초기화" button-type="neatral" @on-click="$emit('reset')" />
    <WelfareBigButton :label="$props?.isAdjust ? '조정등록' : '배정등록'" button-type="default" @on-click="$emit('submit')" />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-registration-in-bulk-action');
</style>
