<script setup lang="ts">
import { WelfareMdButton, DataTablePaginationWithCheckbox } from '@/components'
import {
  exhibitionTemplateManagementTableConfig,
  ExhibitionTemplateManagementTableModel
} from '@/models/views/exhibition/templateManagement/ExhibitionTemplateManagementModel'
import { DataTableRowClickEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { useBaseTable } from '@/composables/widgets/table/useBaseTable'
import { defaultDataTablePropsConfig, WelfareDataTableExpose, WelfareDataTableProps } from '@/models'
import { ref } from 'vue'
import { useBaseTableEmptyScroll } from '@/composables/widgets/table/useBaseTableEmptyScroll'

interface ExhibitionTemplateManagementTableEmits {
  (e: 'row-click', data: ExhibitionTemplateManagementTableModel): void

  (e: 'on-registration'): void

  (e: 'on-page-change'): void
}

const props = withDefaults(defineProps<WelfareDataTableProps>(), defaultDataTablePropsConfig)

const emit = defineEmits<ExhibitionTemplateManagementTableEmits>()

const selectedRow = ref()

const eventEmit = {
  rowClick: (event: DataTableRowClickEvent) => {
    selectedRow.value = event.data
    emit('row-click', event.data)
  },
  onRegistration: () => {
    emit('on-registration')
  },
  onPageChange: () => {
    emit('on-page-change')
  }
}

const params = {
  ...props,
  onPageChange: eventEmit.onPageChange
}

const { scrollToTop, parentRef } = useBaseTable(params)
useBaseTableEmptyScroll(parentRef)

defineExpose<WelfareDataTableExpose>({
  scrollToTop: scrollToTop
})
</script>

<template>
  <div ref="parentRef" class="wf-w-full wf_flex wf_flex-col wf-space-y-16 wf-base-table-wrap">
    <div class="wf_flex wf_justify-between">
      <h6 class="wf_flex wf_items-center">템플릿 목록</h6>
      <WelfareMdButton class="wf_m-w-44" label="등록" button-size="small" button-type="default" @on-click="eventEmit.onRegistration()" />
    </div>
    <div>
      <!-- Table Here -->

      <DataTablePaginationWithCheckbox
        class="wf-display-template-management-table"
        v-bind="props"
        :loading="false"
        @row-click="eventEmit.rowClick"
        is-select-invisible
        :show-selection="false"
        no-data-label="고객사를 선택해주세요."
      >
        <template #columns>
          <Column
            v-for="item in exhibitionTemplateManagementTableConfig"
            :key="item.field"
            :column-key="item.field"
            :field="item.field"
            :header="item.header"
            :class="item.class"
          >
            <template #body="slotProps">
              <p
                :class="{
                  'wf-text_link wf-pointer': item.field === 'templateCode',
                  'wf_table-single-selected-row--content': selectedRow?.templateKey === slotProps.data.templateKey
                }"
              >
                {{ slotProps.data?.[item.field] }}
              </p>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/templateManagement/exhibition-template-management-table.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
