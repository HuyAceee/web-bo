<script setup lang="ts">
import { ImgLoader } from '@/assets'
import { formatNumberDot } from '@/common'
import { WelfareSelect, DataTablePaginationWithCheckbox } from '@/components'
import { useBaseTable } from '@/composables/widgets/table/useBaseTable'
import { useBaseTableEmptyScroll } from '@/composables/widgets/table/useBaseTableEmptyScroll'
import { WelfareDataTableEmits, WelfareDataTableExpose, WelfareDataTableProps, WelfareDataTableSlots, defaultDataTablePropsConfig } from '@/models'
import Column from 'primevue/column'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'

export interface MemberPointUsageCustomerProps extends WelfareDataTableProps {
  headerTable: any[]
  totalItem: number | undefined
}

const props = withDefaults(defineProps<MemberPointUsageCustomerProps>(), defaultDataTablePropsConfig)

const emit = defineEmits<WelfareDataTableEmits>()

defineSlots<WelfareDataTableSlots>()

const eventEmit = {
  rowClick: (event: DataTableRowClickEvent) => {
    emit('row-click', event)
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
  onPageChange: eventEmit.onPageChange
}

const { selectRows, scrollToTop, parentRef } = useBaseTable(params)
useBaseTableEmptyScroll(parentRef)

defineExpose<WelfareDataTableExpose>({
  scrollToTop: scrollToTop
})

const onSelectChange = (value: any) => {
  eventEmit.onDropdownChange(value)
}
</script>

<template>
  <div ref="parentRef" class="wf-base-table-wrap">
    <div v-if="props.loading" class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
      <img class="wf-loading-table" alt="" :src="ImgLoader" />
    </div>
    <div class="wf_flex wf_items-center wf_justify-between wf-mb-16">
      <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ formatNumberDot(totalItem) }} 건</h6>
      <div class="wf-space-x-6 wf_flex">
        <slot name="buttons"></slot>
        <WelfareSelect
          v-if="selectRows && !props.isSelectInvisible"
          v-model="selectRows"
          placeholder="개씩"
          optionLabel="label"
          class="wf_w-100"
          v-bind="props.selectProps"
          v-on:update:model-value="onSelectChange"
        />
      </div>
    </div>
    <DataTablePaginationWithCheckbox
      ref="tableRef"
      :value="props.value"
      lazy
      :dataKey="props.dataKey"
      :loading="false"
      @row-click="eventEmit.rowClick"
      :isSelectInvisible="true"
      :show-selection="false"
      :no-data-label="props.noDataLabel"
      :total-records="props.totalRecords"
      @pageChange="eventEmit.onPageChange"
    >
      <template #columns>
        <Column v-for="item in headerTable" :key="item.field" :column-key="item.field" :field="item.field" :class="item.class" :header="item.header">
          <template #body="slotProps">
            <span>{{ slotProps.data[item.field] }}</span>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
