<script setup lang="ts">
import { ProductContentTableDataModel, ProductTypeRegisterOptionValue } from '@/models'

interface Props {
  row: ProductContentTableDataModel
  selectStep: ProductTypeRegisterOptionValue
}

const { row } = defineProps<Props>()
</script>

<template>
  <div class="wf_modal-popup-table-row wf_flex" :class="row.className">
    <div class="wf_modal-popup-table-title">
      <p v-if="row.label" class="wf-body_02-semi wf_text-n-33">
        {{ row.isProductCode ? (selectStep !== 'optional' ? '상품 코드' : '상품 ID') : row.label
        }}<span v-if="row.required" class="wf_text-sub-01">*</span>
      </p>
      <component v-else :is="row.labelElement" v-bind="row.labelProps || {}" v-on="row.labelEvents || {}" />
    </div>
    <div class="wf_modal-popup-table-content wf_flex-1">
      <p v-if="row.content" class="wf-body_03-reg wf_text-n-33" :class="row.classNameContent">{{ row.content }}</p>
      <component v-else :is="row.element" v-bind="row.props" v-on="row.events || {}" :class="row.classNameContent" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>
