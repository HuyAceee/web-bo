<script setup lang="ts">
import { WelfareMdButton, DataTablePaginationWithCheckbox } from '@/components'
import Column from 'primevue/column'
import {
  MemberPointUsageCustomerDataTableModel,
  memberPointUsageCustomerHeaderTableConfig
} from '@/models/views/members/pointUsageList/MemberPointUsageListModel'

interface MemberCustomerInfoTableProps {
  items: MemberPointUsageCustomerDataTableModel[]
  loading: boolean
}
import { formatNumberDot } from '@/common'

interface MemberCustomerInfoTableEmits {
  (e: 'on-download-excel'): void
}

const props = defineProps<MemberCustomerInfoTableProps>()
const emits = defineEmits<MemberCustomerInfoTableEmits>()
</script>

<template>
  <div class="wf-w-full wf_flex wf_flex-col wf-space-y-16">
    <div class="wf_flex wf_justify-end">
      <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" @on-click="emits('on-download-excel')" />
    </div>
    <div class="">
      <!-- Table Here -->
      <DataTablePaginationWithCheckbox
        class="wf-member-customer-info-table"
        :value="props.items"
        no-data-label="고객사를 선택해주세요."
        :show-selection="false"
        is-select-invisible
        ref="tableRef"
        :loading="props.loading"
      >
        <template #columns>
          <Column
            v-for="item in memberPointUsageCustomerHeaderTableConfig"
            :key="item.field"
            :column-key="item.field"
            :field="item.field"
            :header="item.header"
            :class="item.class"
          >
            <template #body="slotProps">
              <span v-if="item.field === 'totalAdjustmentPointAddition'">{{
                slotProps.data?.totalAdjustmentPointAddition && formatNumberDot(slotProps.data?.totalAdjustmentPointAddition)
              }}</span>
              <span v-else-if="item.field === 'totalAdjustmentPointDeduction'">{{
                slotProps.data?.totalAdjustmentPointDeduction && formatNumberDot(slotProps.data?.totalAdjustmentPointDeduction)
              }}</span>
              <p v-else :class="{ 'wf-text_link wf-pointer': item.field === 'customerCompanyCode' }">
                {{ slotProps.data?.[item.field] }}
              </p>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
  </div>
</template>
