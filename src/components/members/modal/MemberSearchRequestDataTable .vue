<script setup lang="ts">
import { ImgLoader } from '@/assets'
import { WelfareSelect, DataTablePaginationWithCheckbox } from '@/components'
import { useBaseTable } from '@/composables/widgets/table/useBaseTable'
import { useBaseTableEmptyScroll } from '@/composables/widgets/table/useBaseTableEmptyScroll'
import { useDataTableWithCheckboxCachePage } from '@/composables/widgets/table/useDataTableWithCheckboxCachePage'
import { WelfareDataTableProps, WelfareDataTableWithCheckBoxExpose, WelfareDataTableWithCheckboxEmits, defaultDataTablePropsConfig } from '@/models'
import { memberRequestTableHeaderConfig } from '@/models/views/members/modal/MemberRequestModel'
import Column from 'primevue/column'
import { PageState } from 'primevue/paginator'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<WelfareDataTableProps>(), defaultDataTablePropsConfig)

const emit = defineEmits<WelfareDataTableWithCheckboxEmits>()

const selectedRow = ref()

const eventEmit = {
  onSelectAllChange: (checked: boolean) => {
    emit('select-all-change', checked)
  },
  onRowCheckedChanged: (item: any) => {
    emit('row-checked-change', item)
  },
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onDropdownChange: (select: any) => {
    emit('drop-down-change', select)
  }
}

const params = {
  ...props,
  onPageChange: eventEmit.onPageChange,
  onSelectAllChange: eventEmit.onSelectAllChange,
  onRowCheckedChange: eventEmit.onRowCheckedChanged
}

const data = computed(() => {
  return props.value
})

const { selectRows, scrollToTop, parentRef } = useBaseTable(params)
useBaseTableEmptyScroll(parentRef)
const { onSelectAllClick, clearSelectedAll, dataTableCheckBoxList } = useDataTableWithCheckboxCachePage(params, data)

const onSelectChange = (value: any) => {
  eventEmit.onDropdownChange(value)
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop,
  clearCheckAll: clearSelectedAll,
  selectAllItem: onSelectAllClick,
  getListCheckedTable: () => {
    return dataTableCheckBoxList
  }
})
</script>

<template>
  <div ref="parentRef" class="wf-base-table-wrap">
    <div v-if="props.loading" class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
      <img class="wf-loading-table" alt="" :src="ImgLoader" />
    </div>
    <div class="wf_flex wf_items-center wf_justify-between wf-mb-16">
      <p>
        <span class="wf-body_01-semi">조회 결과</span>&nbsp;
        <span class="wf-body_01-mid wf_text-n-8-f">(총 {{ totalRecords ?? 0 }}건)</span>
      </p>
      <div class="wf-space-x-6 wf_flex">
        <slot name="buttons"></slot>
        <WelfareSelect
          v-if="selectRows && !props.isSelectInvisible"
          v-model="selectRows"
          placeholder="개씩"
          optionLabel="label"
          class="wf_w-100"
          small
          v-bind="props.selectProps"
          v-on:update:model-value="onSelectChange"
        />
      </div>
    </div>
    <DataTablePaginationWithCheckbox
      :value="data"
      :total-records="props.totalRecords"
      @pageChange="eventEmit.onPageChange"
      @select-all-change="eventEmit.onSelectAllChange"
      :no-data-label="props.noDataLabel"
      is-select-invisible
      ref="tableRef"
    >
      <template #columns>
        <Column
          v-for="header in memberRequestTableHeaderConfig"
          :key="header.field"
          :column-key="header.field"
          :class="header.class"
          :header="header.header"
          :field="header.field"
        >
          <template #body="slotProps">
            <slot :name="`body-${header.field}`" :props="slotProps">
              <div :class="selectedRow?.id === slotProps.data.id && 'wf_table-single-selected-row--content'">
                {{ slotProps.data?.[header.field] }}
              </div>
            </slot>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
