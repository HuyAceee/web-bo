<script setup lang="ts">
import { WelfareCheckbox } from '@/components'
import { ComplaintCheckBoxConfigType } from '@/models/views/complaint/complaintTicketProduct/ComplaintTicketProductListModel'

export interface GroupCheckBoxFormProps {
  data: ComplaintCheckBoxConfigType
  disabled?: boolean
  getIsCheckBox: (field: string, id: string) => void
}

interface ComplaintCheckBoxEmits {
  (e: 'changeCheckBox', field: string, value: boolean, id: string): void
}
defineProps<GroupCheckBoxFormProps>()
const emit = defineEmits<ComplaintCheckBoxEmits>()
const eventEmit = {
  changeCheckBox: (field: string, value: boolean, id: string) => {
    emit('changeCheckBox', field, value, id)
  }
}
</script>

<template>
  <div class="wf_flex wf_items-center">
    <div class="wf-approval-body-filter-group-checkbox wf-space-x-20 wf_flex">
      <div v-for="(_item, _index) in data.list" :key="_index">
        <WelfareCheckbox
          :disabled="disabled"
          :model-value="getIsCheckBox(data.field, _item.id)"
          @update:model-value="(value) => eventEmit.changeCheckBox(data.field, value, _item.id)"
          size="sm"
          :label="_item.label"
        />
      </div>
    </div>
  </div>
</template>
