<script setup lang="ts">
import { ImgLoader } from '@/assets'
import { BaseDataTablePagination, WelfareCheckbox } from '@/components'
import { useDataTableWithCheckbox } from '@/composables/widgets/table/useDataTableWithCheckbox'
import {
  WelfareDataTableSlots,
  WelfareDataTableWithCheckboxEmits,
  WelfareDataTableWithCheckBoxExpose,
  WelfareDataTableWithCheckboxProps
} from '@/models'
import Column from 'primevue/column'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import { computed } from 'vue'

const props = withDefaults(defineProps<WelfareDataTableWithCheckboxProps>(), {
  clearSelectedAllOnPageChange: true,
  showSelection: true,
  resizableColumns: true,
  reorderableColumns: true,
  disabledAllCheckbox: false
})

const emit = defineEmits<WelfareDataTableWithCheckboxEmits>()

const slots = defineSlots<WelfareDataTableSlots>()

const eventEmit = {
  rowClick: (event: DataTableRowClickEvent) => {
    emit('row-click', event)
  },
  onPageChange: (params: PageState) => {
    props.clearSelectedAllOnPageChange && clearSelectedAll()
    emit('page-change', params)
  },
  onSelectAllChange: (checked: boolean) => {
    emit('select-all-change', checked)
  },
  onRowCheckedChanged: (item: any) => {
    emit('row-checked-change', item)
  },
  onDropdownChange: (select: any) => {
    clearSelectedAll()
    emit('drop-down-change', select)
  }
}

const params = {
  ...props,
  onSelectAllChange: eventEmit.onSelectAllChange,
  onPageChange: eventEmit.onPageChange,
  onRowCheckedChange: eventEmit.onRowCheckedChanged
}

const data = computed(() => {
  return props.value
})

const { isSelectAll, onCheckboxValueChange, onSelectAllClick, clearSelectedAll, scrollToTop, dataTableRef, forceCheckAll } = useDataTableWithCheckbox(
  params,
  data
)

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop,
  clearCheckAll: clearSelectedAll,
  selectAllItem: forceCheckAll
})
</script>

<template>
  <BaseDataTablePagination
    ref="dataTableRef"
    v-bind="props"
    v-on:page-change="eventEmit.onPageChange"
    v-on:drop-down-change="eventEmit.onDropdownChange"
    @row-click="eventEmit.rowClick"
  >
    <template #columns>
      <Column columnKey="id-checkbox" key="id-checkbox" class="wf_m-w-44" v-if="showSelection">
        <template #header>
          <WelfareCheckbox id="select-all" v-model="isSelectAll" :disabled="props.disabledAllCheckbox" size="sm" v-on:click="onSelectAllClick" />
        </template>
        <template #body="slotProps">
          <WelfareCheckbox
            v-model="slotProps.data.isSelected"
            id="{{ slotProps.data.code }}"
            :key="slotProps.data.code"
            @update:modelValue="onCheckboxValueChange(slotProps.data)"
            size="sm"
            v-if="slotProps.data.id || typeof slotProps.data.id === 'number'"
            :disabled="slotProps.data.isDisabled || props.disabledAllCheckbox"
          />
        </template>
      </Column>
      <slot name="columns"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #buttons>
      <slot name="buttons"></slot>
    </template>
    <template #loading>
      <div v-if="!slots.loading" class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
        <img class="wf-loading-table" :src="ImgLoader" alt="loading of table" />
      </div>
      <slot v-else name="loading"></slot>
    </template>
  </BaseDataTablePagination>
</template>
