<script setup lang="ts">
interface ProductTitleProps {
  title: string
  required?: boolean
  note?: string
}

const props = defineProps<ProductTitleProps>()
</script>

<template>
  <div class="wf-product-title">
    {{ props.title }}
    <span class="wf-product-title-required" v-if="props.required">*</span>
    <span v-if="!!props.note" class="wf-ml-auto wf-body_04-reg wf_text-sub-01">{{ props.note }}</span>
  </div>
</template>