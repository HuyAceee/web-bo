<script setup lang="ts">
import { TextInputMaxLengthValidation, TextInputNumber } from '@/components/widgets'
import { ProductOptionsDeliveryInfo } from '@/models'
import ProductActionRow from '../ProductActionRow.vue'
import { useProductRegisterSingleOptionModal } from '@/composables/products/modal/register/useProductRegisterSingleOptionModal'

interface Props {
  data: ProductOptionsDeliveryInfo[]
  disabled?: boolean
}
const props = defineProps<Props>()
const { dataSingle, decreaseRow, increaseRow } = useProductRegisterSingleOptionModal(() => {}, props.data)
</script>

<template>
  <div class="wf-list-option-wrapper wf-custom-scrollbar" :class="{ 'wf-pr-4': dataSingle.length > 5 }">
    <div class="wf-list-option-row" v-for="(item, index) in props.data" :key="index">
      <TextInputNumber
        name=""
        :disabled="props.disabled"
        class="wf-text-no"
        size="small"
        placeholder="00"
        v-model="item.no"
        should-check-press-key
        format-value
      />
      <TextInputMaxLengthValidation
        class="wf-text-option wf_flex-1"
        :max-length="50"
        name=""
        size="small"
        placeholder="옵션을 입력해 주세요."
        v-model="item.option"
        :disabled="props.disabled"
      />
      <ProductActionRow @increase-row="() => increaseRow(index)" @decrease-row="() => decreaseRow(index)" :disabled="props.disabled" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/register/product-option-list.css');
</style>
