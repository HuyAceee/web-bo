<script setup lang="ts">
import { WelfareMdButton, DataTablePaginationWithCheckbox } from '@/components'
import Column from 'primevue/column'
import { exportExcel } from '@/common'
import { MemberDataExcelModel } from '@/models/views/members/pointUsageList/MemberPointUsageListModel'
import { memberPUCustomerCompanyTotalHeaderTableConfig } from '@/models/views/members/pointUsageList/MemberPointUsageCustomerListModel'
import { useBaseTableEmptyScroll } from '@/composables/widgets/table/useBaseTableEmptyScroll'
import { ref } from 'vue'

export interface MemberCustomerCompanyTotalTableProps {
  items: any[]
  dataDownload: MemberDataExcelModel
}
const props = defineProps<MemberCustomerCompanyTotalTableProps>()
const parentRef = ref()
useBaseTableEmptyScroll(parentRef)
</script>

<template>
  <div class="wf-w-full wf_flex wf_flex-col wf-space-y-16" ref="parentRef">
    <div class="wf_flex wf_justify-end">
      <WelfareMdButton
        label="엑셀 다운로드"
        class="wf_w-96"
        buttonType="liner"
        @on-click="exportExcel<any>(dataDownload.data, dataDownload.sheetName, dataDownload.customHeader, dataDownload.columnWidth)"
      />
    </div>
    <div class="">
      <!-- Table Here -->
      <DataTablePaginationWithCheckbox
        class="wf-member-customer-company-total-table"
        ref="refTable"
        :value="props.items"
        :loading="false"
        :isSelectInvisible="true"
        :show-selection="false"
      >
        <template #columns>
          <Column
            v-for="item in memberPUCustomerCompanyTotalHeaderTableConfig"
            :key="item.field"
            :column-key="item.field"
            :field="item.field"
            :class="item.class"
            :header="item.header"
          >
            <template #body="slotProps">
              <span>{{ slotProps.data[item.field] }}</span>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
  </div>
</template>
