<script setup lang="ts">
import { WelfareMdButton } from '@/components'

interface ProductActionRowEmits {
  (e: 'increase-row'): void
  (e: 'decrease-row'): void
}

interface ProductActionRowProps {
  disabledDecreaseButton?: boolean
  hiddenIncrease?: boolean
  disabled?: boolean
}

const props = defineProps<ProductActionRowProps>()
const emit = defineEmits<ProductActionRowEmits>()

const emitEvents = {
  handleIncrease: () => {
    emit('increase-row')
  },
  handleDecrease: () => {
    emit('decrease-row')
  }
}
</script>

<template>
  <div class="wf-space-x-4 wf_product-action-row-wrapper">
    <WelfareMdButton
      v-if="!props.hiddenIncrease"
      label="추가"
      buttonType="liner"
      :button-size="'small'"
      @on-click="emitEvents.handleIncrease"
      :disabled="disabled"
    />
    <WelfareMdButton
      label="삭제"
      buttonType="liner"
      :button-size="'small'"
      @on-click="emitEvents.handleDecrease"
      :disabled="props.disabledDecreaseButton || disabled"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>
