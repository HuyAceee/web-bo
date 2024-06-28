<script setup lang="ts">
import { WelfareRadio } from '@/components'
import { ProductSelectOptionModel, ProductTypeRegisterOptionValue } from '@/models'
import { ref } from 'vue'

interface Props {
  selectOptions: ProductSelectOptionModel[]
  selectStep: number
  type?: ProductTypeRegisterOptionValue
}
const props = defineProps<Props>()
const selectStepRef = ref(props.selectStep)
const disabledOption = (value: string) => {
  if (props.type === undefined || value === props.type) return false
  return true
}
</script>

<template>
  <div class="wf_flex wf_items-center wf_h-40 wf-space-x-20">
    <WelfareRadio
      size="sm"
      v-for="{ label, value } in props.selectOptions"
      :key="label"
      :value="value"
      v-model="selectStepRef"
      :label="label"
      :disabled="disabledOption(value || 'single')"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>
