<script setup lang="ts">
import ProductRegisterNote from './ProductRegisterNote.vue';


interface ProductTableLabelProps {
  label: string
  noteLabel: string
  contentList?: string[]
}

const props = defineProps<ProductTableLabelProps>()

</script>

<template>
  <div class="wf_flex wf-space-x-8 wf-mb-7 wf_items-center">
    <p v-if="props.label" class="wf-body_01-semi wf_text-n-33 wf_title-table">{{ props.label }}</p>
    <ProductRegisterNote :label="props.noteLabel" :content-list="props.contentList || []" />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>
