<script setup lang="ts">
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { MemberPointAllocationModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAllocationListModel'

interface MemberPointAdjustmentTableTimeProps {
  dataPointAllocation?: MemberPointAllocationModel
}

defineProps<MemberPointAdjustmentTableTimeProps>()
</script>

<template>
  <div class="wf-group-filter">
    <div class="wf_flex wf_flex-col">
      <div class="wf_flex wf_items-center wf_br-b">
        <FormGroup class="wf-w-1-2" is-rounded-top label="등록자" :isBorderBottom="false">
          <p class="wf-body_03-reg wf-ml-6">{{ dataPointAllocation?.auditing?.registerName }}</p>
        </FormGroup>
        <FormGroup is-border-left class="wf-w-1-2" :isBorderBottom="false" label="등록 일시">
          <p class="wf-body_03-reg wf-ml-6">{{ dataPointAllocation?.auditing?.registeredDate }}</p>
        </FormGroup>
      </div>
    </div>
    <div class="wf_flex wf_flex-col">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf-w-1-2" is-rounded-bottom label="조정자" :isBorderBottom="false">
          <p class="wf-body_03-reg wf-ml-6">{{ dataPointAllocation?.auditing?.registerName }}</p>
        </FormGroup>
        <FormGroup is-border-left class="wf-w-1-2" is-rounded-bottom :isBorderBottom="false" label="조정 일시">
          <p class="wf-body_03-reg wf-ml-6">{{ dataPointAllocation?.auditing?.modifiedDate }}</p>
        </FormGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-adjustment-registration.css');
</style>
