<script setup lang="ts">
import { DEFAULT_TABLE_SELECT_OPTIONS, formatNumberDot } from '@/common'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import {
  DataTablePointUsageContainerConfigModel,
  memberPointAllocationSpecifyInBulkHeaderTableConfig
} from '@/models/views/members/pointUsageList/MemberPointAllocationSpecifyInBulkModel'
import Column from 'primevue/column'
import { PageState } from 'primevue/paginator'
import { ref } from 'vue'

export interface MemberRegistrationBulkProps {
  onlyDownload?: boolean
  hiddenTitle?: boolean
  hiddenPagination?: boolean
  isSelectInvisible?: boolean
  items: any[]
  isLoading: boolean
  totalItems: number
  totalSuccessItems: number
  totalFailItems: number
  listChecked: string[]
  currentActive: number
  showSelection?: boolean
  columnConfigs?: DataTablePointUsageContainerConfigModel[]
}

interface MemberRegistrationBulkEmits {
  (e: 'page-change', params: PageState): void
  (e: 'row-selected', item: any): void
  (e: 'select-all-change', checked: boolean): void
  (e: 'delete-records'): void
  (e: 'register-records'): void
  (e: 'download-file'): void
}

const emit = defineEmits<MemberRegistrationBulkEmits>()

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
  },
  onRegisterRecords: () => {
    emit('register-records')
  },
  onDownload: () => {
    emit('download-file')
  }
}

withDefaults(defineProps<MemberRegistrationBulkProps>(), {
  hiddenTitle: false,
  onlyDownload: false,
  hiddenPagination: false,
  isSelectInvisible: false,
  isLoading: false,
  totalItems: 0,
  items: () => [],
  totalSuccessItems: 0,
  totalFailItems: 0,
  listChecked: () => [],
  currentActive: 0,
  showSelection: true,
  columnConfigs: () => memberPointAllocationSpecifyInBulkHeaderTableConfig.slice(0, 9)
})

const refTable = ref()

const clearSelectedAll = () => {
  refTable.value?.clearCheckAll()
}

defineExpose({
  clearCheckAll: clearSelectedAll
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
      :selectProps="{ small: !hiddenTitle, options: DEFAULT_TABLE_SELECT_OPTIONS }"
      :hidden-pagination="hiddenPagination"
      :is-select-invisible="isSelectInvisible"
      :show-selection="showSelection"
      no-data-label="일괄등록 리스트가 없습니다"
    >
      <template #title>
        <slot name="title">
          <div>
            <div v-if="!hiddenTitle">
              <span class="wf-body_01-semi wf-mr-4">총 {{ formatNumberDot(totalSuccessItems + totalFailItems) }} 건</span>
              <span class="wf-body_01-mid wf_text-n-8-f">( 성공 {{ totalSuccessItems }}건, 실패 {{ totalFailItems }} 건)</span>
            </div>
          </div></slot
        >
      </template>
      <template #columns>
        <Column v-for="item in columnConfigs" :key="item.field" :field="item.field" :column-key="item.field" :class="item.class">
          <template #header> {{ item.header }}<span v-if="item?.required" class="wf_text-sub-01">*</span> </template>
          <template #body="slotProps">
            <span v-if="item.header === memberPointAllocationSpecifyInBulkHeaderTableConfig[0].header">{{ slotProps.index + 1 }}</span>
            <span v-if="item.field === memberPointAllocationSpecifyInBulkHeaderTableConfig[5].field">{{ formatNumberDot(slotProps.data.pointBalance) ?? 0 }}</span>
            <WelfareMdButton
              v-if="slotProps.data[item.field]?.label"
              @on-click="slotProps.data[item.field]?.onClick?.()"
              :label="slotProps.data[item.field]?.label"
              button-size="small"
              button-type="liner"
            />
            <span v-else>{{ slotProps.data[item.field] }}</span>
          </template>
        </Column>
        <Column column-key="reasonRefused" key="reasonRefused" class="wf_col-grow" v-if="currentActive">
          <template #header>실패 사유</template>
          <template #body="slotProps">
            <p class="wf_w-full line-clamp wf-pointer wf_text-sub-01 wf_text-center wf-whitespace-prewrap wf-word-break">
              {{ slotProps.data.reasonRefused }}
            </p>
          </template>
        </Column>
      </template>
      <template #buttons>
        <slot name="buttons">
          <div class="wf-space-x-6 wf_flex">
            <WelfareMdButton
              v-if="!onlyDownload && !currentActive"
              label="선택삭제"
              class="wf_w-55"
              button-size="small"
              buttonType="liner"
              :disabled="!listChecked.length"
              @on-click="eventEmit.onDeleteRecords"
            />
            <WelfareMdButton label="엑셀 다운로드" class="wf_w-91" button-size="small" buttonType="liner" @on-click="eventEmit.onDownload" /></div
        ></slot>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
