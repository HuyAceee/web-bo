<script setup lang="ts">
import { DeliveryHintModel } from '@/models/views/delivery/modal/DeliveryHintModel'

interface Props {
  data?: DeliveryHintModel[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="wf-info-hint wf-body_04-mid wf_flex wf_flex-col">
    <div
      v-for="(prop, index) in props.data"
      v-bind:key="index"
      class="wf_rep-notification--content-row wf_text-n-33"
      :class="{ 'wf_text-sub-01': prop.isEmphasize }"
    >
      <div class="wf_dot" :class="`${prop.isEmphasize ? 'wf_bg-f9' : 'wf_bg-black'}`"></div>
      {{ prop.content }}
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/delivery/modal/delivery-hint.css');
</style>
