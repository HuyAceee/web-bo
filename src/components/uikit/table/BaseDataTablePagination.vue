<script setup lang="ts">
import { DEFAULT_TABLE_SELECT_OPTIONS } from '@/common'
import { WelfarePagination, WelfareSelect } from '@/components'
import { useBaseTable } from '@/composables/widgets/table/useBaseTable'
import { useBaseDataTablePaginationEmit } from '@/composables/widgets/table/useTableEmit'
import { WelfareDataTableEmits, WelfareDataTableExpose, WelfareDataTableProps, WelfareDataTableSlots, defaultDataTablePropsConfig } from '@/models'
import DataTable from 'primevue/datatable'
import { computed } from 'vue'
import { useBaseTableEmptyScroll } from '@/composables/widgets/table/useBaseTableEmptyScroll'

const props = withDefaults(defineProps<WelfareDataTableProps>(), defaultDataTablePropsConfig)

const emit = defineEmits<WelfareDataTableEmits>()

defineSlots<WelfareDataTableSlots>()

const { event: eventEmit } = useBaseDataTablePaginationEmit(emit)

const params = {
  ...props,
  onPageChange: eventEmit.pageChange
}

const { selectRows, eventFirst, scrollToTop, parentRef } = useBaseTable(params)

useBaseTableEmptyScroll(parentRef)

defineExpose<WelfareDataTableExpose>({
  scrollToTop: scrollToTop
})

const rowsComputed = computed(() => {
  return selectRows?.value ? selectRows.value.value : props.rows
})

const onSelectChange = (value: any) => {
  eventEmit.dropDownChange(value)
}
</script>

<template>
  <div ref="parentRef" class="wf-base-table-wrap">
    <slot v-if="props.loading" name="loading"></slot>
    <div class="wf_flex wf_items-center wf_justify-between wf-mb-16">
      <slot name="title"></slot>
      <div class="wf-space-x-6 wf_flex">
        <slot name="buttons"></slot>
        <WelfareSelect
          v-if="selectRows && !props.isSelectInvisible"
          v-model="selectRows"
          placeholder="개씩"
          optionLabel="label"
          class="wf_w-100"
          :options="DEFAULT_TABLE_SELECT_OPTIONS"
          v-bind="props.selectProps"
          v-on:update:model-value="onSelectChange"
        />
      </div>
    </div>
    <DataTable
      ref="tableRef"
      v-bind="props"
      lazy
      :dataKey="props.dataKey"
      :loading="false"
      @row-click="eventEmit.rowClick"
      :resizable-columns="props.resizableColumns === undefined ? true : props.resizableColumns"
    >
      <slot name="columns"></slot>
      <template #empty>
        <p v-if="!props.loading" class="wf-data-table-empty-data wf_text-n-33 wf-body_02-reg">{{ props.noDataLabel }}</p>
      </template>
    </DataTable>
    <WelfarePagination
      v-if="!hiddenPagination"
      :rows="rowsComputed"
      :pageLinkSize="props.pageLinkSize"
      :totalRecords="props.totalRecords"
      @page="eventEmit.pageChange"
      @update:first="eventFirst"
    />
  </div>
</template>
