<script setup lang="ts">
import { WelfareInputText, WelfareMdButton } from '@/components';
interface ProductSearchProps {
  placeholderInput?: string
  labelButton?: string
}

const props = defineProps<ProductSearchProps>()

</script>

<template>
  <div class=" wf_flex wf_items-center wf-space-x-4">
    <WelfareInputText size="small" inputType="text" class="wrap-input wf_w-128" :placeholder="props.placeholderInput" />
    <WelfareMdButton :label="props.labelButton" buttonType="liner" buttonSize="small" />
  </div>
</template>
