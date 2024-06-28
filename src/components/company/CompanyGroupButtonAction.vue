<script setup lang="ts">
import { WelfareBigButton } from '../uikit'
interface CompanyCustomerRegistrationButtonEmits {
  (e: 'pageChange'): void,
  (e: 'onSaveData'): void
}
defineEmits<CompanyCustomerRegistrationButtonEmits>()
</script>
<template>
  <div class="wf_flex wf-space-x-20 wf-tr-match-parent wf_company_action-btn wf_justify-center">
    <WelfareBigButton label="목록" button-type="neatral" @click="$emit('pageChange')"/>
    <WelfareBigButton label="저장" button-type="default" @click="$emit('onSaveData')"/>
  </div>
</template>
