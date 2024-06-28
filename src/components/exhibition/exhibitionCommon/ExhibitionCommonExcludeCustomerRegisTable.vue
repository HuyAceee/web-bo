<script setup lang="ts">
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components/uikit';
import { exhibitionCommonExcludeCustomerRegisTableConfig } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonModel';
import Column from 'primevue/column';
import { ref } from 'vue';

interface ExhibitionCommonExcludeCustomerRegisTableProps {
  data?: any[]
}

interface ExhibitionCommonExcludeCustomerRegisTableEmits {
  (e: 'deleteRow', id: string | number): void
  (e: 'deleteSelected'): void
  (e: 'selectRow', data: any): void
  (e: 'selectAll', value: boolean): void
}

defineProps<ExhibitionCommonExcludeCustomerRegisTableProps>()
defineEmits<ExhibitionCommonExcludeCustomerRegisTableEmits>()

const tableRef = ref()

defineExpose({
  clearCheckAll: () => tableRef.value?.clearCheckAll()
})
</script>

<template>
  <div>
    <DataTablePaginationWithCheckbox
      ref="tableRef"
      is-select-invisible
      hidden-pagination
      :value="$props.data"
      no-data-label="선택된 고객사가 없습니다."
      @row-checked-change="(data) => $emit('selectRow', data)"
      @select-all-change="(value) => $emit('selectAll', value)"
    >
      <template #title><span>&nbsp;</span></template>
      <template #buttons>
        <WelfareMdButton button-size="small" label="선택 삭제" button-type="liner" @on-click="$emit('deleteSelected')" />
      </template>
      <template #columns>
        <Column
          v-for="(col, index) in exhibitionCommonExcludeCustomerRegisTableConfig"
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