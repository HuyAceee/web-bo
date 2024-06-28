<script setup lang="ts">
import { WelfareCheckbox } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
export interface ProductGroupCheckBoxFormProps {
  listGroupCheckBox: {
    title: string
    field: string
    list: {
      id: string
      label: string
      class?: string
    }[]
  }[]
  isBorderLeft?: boolean
  disabled: boolean
  getIsCheckBox: (field: string, id: string) => void
  changeCheckBox: (field: string, value: boolean, id: string) => void
}

defineProps<ProductGroupCheckBoxFormProps>()
</script>

<template>
  <div class="wf_flex wf_items-center">
    <FormGroup v-for="(item, index) in listGroupCheckBox" :key="index" :label="item.title" :isBorderLeft="isBorderLeft || index !== 0">
      <div class="wf-approval-body-filter-group-checkbox wf-space-x-20 wf_flex">
        <div v-for="(_item, _index) in item.list" :key="_index">
          <WelfareCheckbox
            :disabled="disabled"
            :model-value="getIsCheckBox(item.field, _item.id)"
            @update:model-value="(value) => changeCheckBox(item.field, value, _item.id)"
            size="sm"
            :label="_item.label"
          />
        </div>
      </div>
    </FormGroup>
  </div>
</template>
