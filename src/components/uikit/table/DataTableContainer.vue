<script setup lang="ts">
import { ImgLoader } from '@/assets/images'
import { BaseDataTablePagination } from '@/components'
import { DataTableContainerEmits, DataTableContainerProps, DataTableContainerSlots, WelfareDataTableExpose } from '@/models'
import Column from 'primevue/column'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import { ref } from 'vue'

const props = withDefaults(defineProps<DataTableContainerProps>(), {
  resizableColumns: true,
  reorderableColumns: true
})

const emit = defineEmits<DataTableContainerEmits>()

const tableRef = ref()

const selectedRow = ref()

const eventEmit = {
  rowClick: (event: DataTableRowClickEvent) => {
    selectedRow.value = event.data
    emit('row-click', event)
  },
  pageChange: (params: PageState) => {
    emit('page-change', params)
  }
}

defineSlots<DataTableContainerSlots>()

const resetSelectedRow = () => {
  selectedRow.value = undefined
}

const scrollToTop = () => {
  tableRef?.value?.scrollToTop()
}

defineExpose<WelfareDataTableExpose>({
  scrollToTop,
  resetSelectedRow
})
</script>

<template>
  <div>
    <BaseDataTablePagination ref="tableRef" v-bind="props" :value="value" :totalRecords="totalRecords" v-on="eventEmit">
      <template #loading>
        <div class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
          <img class="wf-loading-table" alt="" :src="ImgLoader" />
        </div>
      </template>
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #buttons>
        <slot name="buttons"></slot>
      </template>
      <template #columns>
        <Column v-for="column in columnConfigs" :key="column.field" :column-key="column.field" class="wf-nowrap" :class="column?.class">
          <template #header>
            <slot :name="`header-${column.field}`" :props="column.header">
              {{ column.header }}
            </slot>
          </template>
          <template #body="slotProps">
            <slot :name="`body-${column.field}`" :props="slotProps">
              <div :class="selectedRow && selectedRow?.id === slotProps.data.id && 'wf_table-single-selected-row--content'">
                {{ column.render ? column.render(slotProps.data?.[column.field]) : slotProps.data?.[column.field] }}
              </div>
            </slot>
          </template>
        </Column>
      </template>
    </BaseDataTablePagination>
  </div>
</template>
