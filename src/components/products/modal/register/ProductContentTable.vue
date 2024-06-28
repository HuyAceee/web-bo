<script setup lang="ts">
import { ProductContentTableDataModel, ProductTypeRegisterOptionValue } from '@/models'
import ProductContentRow from './ProductContentRow.vue'

interface Props {
  contentTableData: ProductContentTableDataModel[]
  selectStep: ProductTypeRegisterOptionValue
}
const props = defineProps<Props>()
</script>

<template>
  <div class="wf_modal-popup-table-horizontal wf-mb-20">
    <ProductContentRow v-for="content in props.contentTableData" :key="content.content" :row="content" :select-step="selectStep" />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>
