<script setup lang="ts">
import { ProductHeaderTableOptionModel } from '@/models'
import { ref, watch } from 'vue'
import ProductTableLabel from './ProductTableLabel.vue'

interface Props {
  headers: ProductHeaderTableOptionModel[]
  tableLabel?: string
  noteLabel?: string
  noteWarningNote?: string[]
  checkOption?: boolean
}

interface Emits {
  (e: 'update-check-modal', value: boolean): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const { checkOption } = props
const checkbox = ref(checkOption)

watch(checkbox, (newValue: boolean) => {
  emits('update-check-modal', newValue)
})
</script>

<template>
  <div class="wf_group-container wf-mb-20">
    <ProductTableLabel v-if="props.tableLabel" :label="props.tableLabel" :note-label="props.noteLabel || ''" :content-list="props.noteWarningNote" />
    <div class="wf_modal-popup-table-vertical active toggle-active-element">
      <div class="wf_modal-popup-table-row wf_modal-popup-table-row--header wf_flex">
        <div v-for="(header, index) in props.headers" :key="index" :class="{ 'wf_flex-1 wf_flex wf_justify-center': header.flex }">
          <p v-if="header.label" class="wf-body_02-semi wf_text-center wf_text-n-33">
            {{ header.label }}<span v-if="header.required" class="wf_text-sub-01">*</span>
          </p>
          <component v-else :is="header.element" v-model="checkbox" v-bind="header.props" v-on="header.events" />
        </div>
      </div>
      <slot name="table-body"></slot>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>
