<script lang="ts" setup>
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { ClaimTicketDetailTableModel, ComplaintOrderCancelTableTicketConfig } from '@/models/views/complaint/modal/ComplaintOrderCancelDetailModel'
import { ImgLoader } from '@/assets'
import Column from 'primevue/column'
import { DEFAULT_DATE_TIME_FORMAT, formatTime } from '@/common'
import { WelfareDataTableWithCheckBoxExpose } from '@/models'
import { ref } from 'vue'
import { deliveryOrderProcessStatusCommonCodeName } from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'

interface ComplaintOrderCancelDetailTicketTableProps {
  dataTableTicketDetail?: ClaimTicketDetailTableModel[]
}

interface ComplaintOrderCancelDetailTicketTableEmits {
  (e: 'select-all-change', checked: boolean): void

  (e: 'row-checked-change', item: any): void

  (e: 'on-cancel-with-drawal'): void

  (e: 'on-re-request-processing'): void
}

defineProps<ComplaintOrderCancelDetailTicketTableProps>()

const emits = defineEmits<ComplaintOrderCancelDetailTicketTableEmits>()

const tableRef = ref()

const emitEvents = {
  onSelectAllChange: (checked: boolean) => {
    emits('select-all-change', checked)
  },
  onRowSelected: (item: any) => {
    emits('row-checked-change', item)
  },
  onCancelWithDrawal: () => {
    emits('on-cancel-with-drawal')
  },
  onReRequestProcessing: () => {
    emits('on-re-request-processing')
  }
}

const tableListConfig = [
  ComplaintOrderCancelTableTicketConfig[1].field,
  ComplaintOrderCancelTableTicketConfig[3].field,
  ComplaintOrderCancelTableTicketConfig[14].field
]

const scrollToTop = () => {
  tableRef.value?.scrollToTop?.()
}

const clearCheckAll = () => {
  tableRef.value?.clearCheckAll?.()
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  clearCheckAll,
  scrollToTop
})
</script>

<template>
  <DataTablePaginationWithCheckbox
    is-select-invisible
    :value="dataTableTicketDetail"
    :loading="false"
    v-on:select-all-change="emitEvents.onSelectAllChange"
    v-on:row-checked-change="emitEvents.onRowSelected"
    ref="tableRef"
  >
    <template #title>
      <p class="wf-body_01-semi">클레임 티켓 상세</p>
    </template>
    <template #loading>
      <div class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
        <img class="wf-loading-table" :src="ImgLoader" alt="" />
      </div>
    </template>
    <template #buttons>
      <WelfareMdButton label="주문취소 철회" @on-click="emitEvents.onCancelWithDrawal" button-size="small" class="wf_w-91" buttonType="default" />
      <WelfareMdButton label="처리 재요청" @on-click="emitEvents.onReRequestProcessing" button-size="small" class="wf_w-79" buttonType="liner" />
    </template>
    <template #columns>
      <Column
        v-for="column in ComplaintOrderCancelTableTicketConfig"
        :key="column.field"
        :column-key="column.field"
        class="wf-nowrap"
        :class="column?.class"
      >
        <template #header>
          {{ column.header }}
        </template>
        <template #body="slotProps">
          <p v-if="!tableListConfig.includes(column.field)">
            {{ slotProps.data?.[column.field] }}
          </p>
          <p v-if="column.field === ComplaintOrderCancelTableTicketConfig[14].field">
            {{ slotProps.data?.[column.field] && formatTime(slotProps.data?.[column.field], DEFAULT_DATE_TIME_FORMAT) }}
          </p>
          <p v-if="column.field === ComplaintOrderCancelTableTicketConfig[1].field">
            {{ deliveryOrderProcessStatusCommonCodeName?.find((item) => item.value === slotProps.data?.[column?.field])?.label }}
          </p>
          <p v-if="column.field === ComplaintOrderCancelTableTicketConfig[3].field">
            {{ deliveryOrderProcessStatusCommonCodeName?.find((item) => item.value === slotProps.data?.[column?.field])?.label }}
          </p>
        </template>
      </Column>
    </template>
  </DataTablePaginationWithCheckbox>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-order-cancel-modal.css');
</style>
