<script setup lang="ts">
import { formatNumberDot, renderLabelEnum } from '@/common'
import { DataTablePaginationWithCheckbox } from '@/components'
import { WelfareDataTableWithCheckBoxExpose } from '@/models'
import { DataTableContaineDeliveryConfigModel } from '@/models/views/delivery/common'
import { deliveryOrderProcessStatusCommonCodeName } from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'
import { deliveryOrderChannelOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import { DeliveryProductTypeOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import Column from 'primevue/column'
import { PageState } from 'primevue/paginator'
import { ref } from 'vue'

export interface DeliveryBaseTableProps {
  hiddenTitle?: boolean
  hiddenPagination?: boolean
  isSelectInvisible?: boolean
  items: any[]
  isLoading: boolean
  totalItems: number
  listChecked: string[]
  columnConfigs?: DataTableContaineDeliveryConfigModel[]
  showSelection?: boolean
  title?: string
}

interface DeliveryBaseTableEmits {
  (e: 'page-change', params: PageState): void
  (e: 'row-selected', item: any): void
  (e: 'select-all-change', checked: boolean): void
  (e: 'delete-records'): void
}

const emit = defineEmits<DeliveryBaseTableEmits>()
const refTable = ref()

const eventEmit = {
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onSelectAllChange: (checked: boolean) => {
    emit('select-all-change', checked)
  },
  onRowCheckedChanged: (item: any) => {
    emit('row-selected', item)
  },
  onDeleteRecords: () => {
    emit('delete-records')
  }
}

withDefaults(defineProps<DeliveryBaseTableProps>(), {
  hiddenTitle: false,
  hiddenPagination: false,
  isSelectInvisible: false,
  isLoading: false,
  totalItems: 0,
  items: () => [],
  listChecked: () => [],
  columnConfigs: () => [],
  showSelection: true,
  title: '조회 결과'
})

const clearCheckAll = () => {
  refTable?.value?.clearCheckAll()
}

const scrollToTop = () => {
  refTable?.value?.scrollToTop()
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  clearCheckAll,
  scrollToTop
})
</script>

<template>
  <div>
    <DataTablePaginationWithCheckbox
      :value="items"
      :loading="isLoading"
      :total-records="totalItems"
      @page-change="eventEmit.onPageChange"
      @row-checked-change="eventEmit.onRowCheckedChanged"
      @select-all-change="eventEmit.onSelectAllChange"
      ref="refTable"
      :hidden-pagination="hiddenPagination"
      :is-select-invisible="isSelectInvisible"
      :show-selection="showSelection"
      :title="title"
    >
      <template #title>
        <slot name="title">
          <div>
            <div v-if="!hiddenTitle">
              <h6 class="wf-mr-4">{{ title }}&nbsp; 총 {{ formatNumberDot(totalItems) }} 건</h6>
            </div>
          </div></slot
        >
      </template>
      <template #columns>
        <slot name="columns"
          ><Column
            v-for="item in columnConfigs"
            :key="item.field"
            :column-key="item.field"
            :field="item.field"
            :header="item.header"
            :class="item.class"
          >
            <template #body="slotProps">
              <span v-if="item.field === 'orderChannel'">{{ renderLabelEnum(deliveryOrderChannelOptions, slotProps.data[item.field]) }}</span>
              <span
                v-if="
                  [
                    'salesPrice',
                    'quantity',
                    'totalProductAmount',
                    'immediateDiscountAmount',
                    'couponDiscountAmount',
                    'lastOrderAmount',
                    'cancelQuantity',
                    'cancelAmount',
                    'netOrderQuantity',
                    'netOrderAmount'
                  ].includes(item.field)
                "
                >{{ formatNumberDot(slotProps.data[item.field]) ?? 0 }}</span
              >
              <span v-else-if="item.field === 'paymentStatus'">{{
                renderLabelEnum(deliveryOrderProcessStatusCommonCodeName, slotProps.data[item.field])
              }}</span>
              <span v-else-if="item.field === 'productType'">{{
                renderLabelEnum(DeliveryProductTypeOptions, slotProps.data[item.field])
              }}</span>
              <span v-else-if="!item?.onClick">{{ slotProps.data[item.field] }}</span>
              <span v-else class="wf-underline wf-pointer wf_text-sub-02" @click="() => item.onClick && item.onClick(slotProps.data)">{{
                slotProps.data[item.field]
              }}</span>
            </template>
          </Column>
        </slot>
      </template>
      <template #buttons>
        <slot name="buttons"></slot>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
