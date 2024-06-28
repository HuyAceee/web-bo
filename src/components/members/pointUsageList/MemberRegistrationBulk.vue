<!-- BO_B0203_020101 -->

<script setup lang="ts">
import { ref } from 'vue'
import { WelfareTabOutline } from '@/components'
import { PageState } from 'primevue/paginator'
import { TabViewChangeEvent } from 'primevue/tabview'
import MemberSpecifyInBulkTable from './MemberSpecifyInBulkTable.vue'
import MemberSpecifyInBulkAction from './MemberSpecifyInBulkAction.vue'

interface MemberRegistrationBulkProps {
  onlyDownload?: boolean
  isNotContainer?: boolean
  hiddenAction?: boolean
  isSelectInvisible?: boolean
  items?: any[]
  isLoading: boolean
  totalItems?: number
  totalSuccessItems?: number
  totalFailItems?: number
  listChecked: string[]
  tabPanelProps: {
    header: string
  }[]
  currentActive: number
}

interface MemberRegistrationBulkEmits {
  (e: 'page-change', params: PageState): void
  (e: 'row-selected', item: any): void
  (e: 'select-all-change', checked: boolean): void
  (e: 'delete-records'): void
  (e: 'register-records'): void
  (e: 'tab-change', event: TabViewChangeEvent): void
  (e: 'download-file'): void
}

defineProps<MemberRegistrationBulkProps>()
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
  onTabChange: (event: TabViewChangeEvent) => {
    emit('tab-change', event)
  },
  onDownload: () => {
    emit('download-file')
  }
}

const refTable = ref()

const clearSelectedAll = () => {
  refTable.value?.clearCheckAll()
}

defineExpose({
  clearCheckAll: clearSelectedAll
})
</script>

<template>
  <div class="wf-container" :class="{ 'wf-p-0 wf-mt-0': isNotContainer }">
    <div class="wf-body">
      <WelfareTabOutline :wfTabPanelProps="tabPanelProps" lazy :activeIndex="currentActive" @tab-change="eventEmit.onTabChange">
        <template #wf-tab-text-content>
          <MemberSpecifyInBulkTable
            :onlyDownload="onlyDownload"
            :is-loading="isLoading"
            :list-checked="listChecked"
            :items="items"
            ref="refTable"
            :total-items="totalItems"
            :total-fail-items="totalFailItems"
            :total-success-items="totalSuccessItems"
            @page-change="eventEmit.onPageChange"
            @row-selected="eventEmit.onRowCheckedChanged"
            @select-all-change="eventEmit.onSelectAllChange"
            @delete-records="eventEmit.onDeleteRecords"
            @register-records="eventEmit.onRegisterRecords"
            @downloadFile="eventEmit.onDownload"
            :current-active="currentActive"
          />
        </template>
      </WelfareTabOutline>
    </div>
    <MemberSpecifyInBulkAction v-if="!hiddenAction" />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-specify-in-bulk');
</style>
