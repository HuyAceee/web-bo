<script setup lang="ts">
import { TextInputNumber } from '@/components'

export interface ProductTableTotalProps {
  disabled: boolean
  totalCount: number | undefined
}

type ProductTableTotalEmits = (e: 'update-value-total', value: number) => void

const emit = defineEmits<ProductTableTotalEmits>()
const props = defineProps<ProductTableTotalProps>()

const showValue = (totalCount: number) => {
  emit('update-value-total', totalCount)
}
</script>

<template>
  <table class="table-row-layout wf-mt-20" aria-hidden="true">
    <caption></caption>
    <tbody>
      <tr>
        <td>재고 수량<span class="wf_text-sub-01"> *</span></td>
        <td class="table-p-6">
          <div class="text-input-right w-input-180">
            <TextInputNumber
              size="small"
              inputType="text"
              :modelValue="totalCount"
              placeholder="0"
              :disabled="props.disabled"
              format-value
              should-check-press-key
              @update:modelValue="showValue"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-delivery-prod-register.css');
</style>
