<script lang="ts" setup>
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { ref } from 'vue'
import Column from 'primevue/column'
import { exhibitionCommonWindowRegistrationTableConfig } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonWindowRegistrationModel'

interface ExhibitionCommonWindowRegistrationTableProps {
  data?: any[]
}

interface ExhibitionCommonWindowRegistrationTableEmits {
  (e: 'deleteRow', id: string | number): void
  (e: 'deleteSelected'): void
  (e: 'selectRow', data: any): void
  (e: 'selectAll', value: boolean): void
}

defineProps<ExhibitionCommonWindowRegistrationTableProps>()
defineEmits<ExhibitionCommonWindowRegistrationTableEmits>()

const tableRef = ref()

defineExpose({
  clearCheckAll: () => tableRef.value?.clearCheckAll()
})
</script>
<template>
  <div class="wf-mt-20">
    <DataTablePaginationWithCheckbox
      :value="$props.data"
      is-select-invisible
      @row-checked-change="(data) => $emit('selectRow', data)"
      @select-all-change="(value) => $emit('selectAll', value)"
      ref="tableRef"
      no-data-label="선택된 고객사가 없습니다."
    >
      <template #title><span>&nbsp;</span></template>
      <template #buttons>
        <WelfareMdButton button-size="small" label="선택 삭제" button-type="liner" @on-click="$emit('deleteSelected')" />
      </template>
      <template #columns>
        <Column
          v-for="(col, index) in exhibitionCommonWindowRegistrationTableConfig"
          :key="index"
          :class="[col?.class, { 'wf_custom-col': col.children?.length ?? 0 > 1 }]"
          :field="col?.field"
        >
          <template #header> {{ col.header }}<span v-if="col?.required" class="wf_text-sub-01">*</span> </template>
          <template v-if="col.field === 'delete'" #body="slotProps">
            <WelfareMdButton button-size="small" button-type="liner" label="삭제" @on-click="() => $emit('deleteRow', slotProps.data.customerKey)" />
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
