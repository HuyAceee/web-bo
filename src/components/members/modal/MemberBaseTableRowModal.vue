<script setup lang="ts">
import { MemberRowTableSideContentType } from '@/models/views/members/deliveryManagement/MemberBaseTableWrapperPopupModel'

export interface MemberRowTableWrapperPopupProps {
  label: string | undefined
  required?: boolean
  sideContent?: MemberRowTableSideContentType
}

const props = defineProps<MemberRowTableWrapperPopupProps>()
</script>
<template>
  <div class="content-table-row-child wf_flex" :class="sideContent && sideContent === 'left' ? 'content-table-row-child--left' : ''">
    <div class="child-label wf-body_02-semi">{{ props.label }} <span v-if="required" class="wf-body_04-reg">*</span></div>
    <div class="child-content wf-body_03-reg">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/member/member-base-table-popup.css');
</style>
