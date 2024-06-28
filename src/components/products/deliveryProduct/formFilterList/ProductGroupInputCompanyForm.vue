<script setup lang="ts">
import { WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { ProductSearchRecordModel, ProductSearchType, WelfareSelectOptionType } from '@/models'
import { ref } from 'vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
export interface ProductGroupInputCompanyFormProps {
  dataField: {
    title?: string
    field?: string
    type?: ProductSearchType
  }
  companyChild: WelfareSelectOptionType | undefined
  listCompanyChild: WelfareSelectOptionType[]
  disabled: boolean
  currenValueInput: string | undefined
}

interface ProductGroupInputCompanyFormEvents {
  (e: 'input-value', value: ProductSearchRecordModel): void
  (e: 'select-value', value: WelfareSelectOptionType): void
}

defineProps<ProductGroupInputCompanyFormProps>()
defineEmits<ProductGroupInputCompanyFormEvents>()

const componentSearch = ref<InstanceType<typeof ProductSearchModalWithTableWrapper> | null>(null)

const handleReset = () => {
  if (componentSearch.value) {
    componentSearch.value.handleReset()
  }
}

defineExpose({
  handleReset
})
</script>

<template>
  <FormGroup customClass="wf_flex wf-space-x-4 wf_items-center" :label="dataField.title ?? ''">
    <ProductSearchModalWithTableWrapper
      v-if="dataField.type"
      class="wf_w-228"
      :type="dataField.type"
      label-button="조회"
      @select-value="(value) => $emit('input-value', value)"
      :disabled="disabled"
      ref="componentSearch"
    />
    <WelfareSelect
      :disabled="!currenValueInput"
      :model-value="companyChild"
      class="wf_w-180"
      placeholder="하위업체 전체"
      @update:modelValue="(value) => $emit('select-value', value)"
      optionLabel="label"
      :options="listCompanyChild"
      small
    />
  </FormGroup>
</template>
