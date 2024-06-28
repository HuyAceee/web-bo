<script setup lang="ts">
import { WelfareCheckbox } from '@/components'
type BulletinFilterGroupCheckboxProps = {
  options: {
    id: string
    label: string
    value: string
  }[]
  disabled?: boolean
  getIsCheckBox: (field: string, id: string) => void
  changeCheckBox: (field: string, value: boolean, id: string) => void
  field: string
}

defineProps<BulletinFilterGroupCheckboxProps>()
</script>

<template>
  <div class="wf-approval-body-filter-group-checkbox wf-space-x-20 wf_flex">
    <div v-for="(item, index) in options" :key="index">
      <WelfareCheckbox
        :disabled="disabled"
        size="sm"
        :label="item.label"
        :model-value="getIsCheckBox(field, item.id)"
        @update:model-value="(value) => changeCheckBox(field, value, item.id)"
      />
    </div>
  </div>
</template>
