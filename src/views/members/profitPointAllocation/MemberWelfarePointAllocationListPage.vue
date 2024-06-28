<!-- BO_B0201_010101 -->
<script lang="ts" setup>
import MemberFormFilterPointAllocation from '@/components/members/memberPointAllocation/MemberFormFilterPointAllocation.vue'
import MemberPointAllocationTable from '@/components/members/memberPointAllocation/MemberPointAllocationTable.vue'
import { useMemberWelfarePointAllocationList } from '@/composables/members/welfarePointAllocation/useMemberWelfarePointAllocationList'
import { memberPointAllocationListModelConfig } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAllocationListModel'
import { MemberPointAllocationListType } from '@/models/views/members/pointAllocationList/MemberPointAllocationListModel'

const {
  values,
  setFieldValue,
  handleChangeCountDate,
  currentFilterDate,
  // listInputRow1,
  // listRadioLevelMember,
  // listSelectDate,
  // listSelectRow2,
  handleResetFormFilter,
  items,
  isLoading,
  onPageChange,
  totalItems,
  refTable,
  onSubmitForm,
  onRowSelect,
  selectedMember,
  submitRegistration,
  goToEditPage,
  downloadExcel,
  formFilterRef
} = useMemberWelfarePointAllocationList(MemberPointAllocationListType.allocation)
</script>

<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <MemberFormFilterPointAllocation
        ref="formFilterRef"
        :current-filter-date="currentFilterDate"
        :list-input-row1="memberPointAllocationListModelConfig.listInputRow1"
        :list-radio-level-member="memberPointAllocationListModelConfig.listRadioLevelMember"
        :list-select-date="memberPointAllocationListModelConfig.listSelectDate"
        :list-select-row2="memberPointAllocationListModelConfig.listSelectRow2"
        :values="values"
        :typePointAllocation="MemberPointAllocationListType.allocation"
        @set-field-value="setFieldValue"
        @handle-change-count-date="handleChangeCountDate"
        @handle-reset-form-filter="handleResetFormFilter"
        @handle-submit-form="onSubmitForm"
      />
      <MemberPointAllocationTable
        ref="refTable"
        :data="items"
        :total-element="totalItems"
        @page-change="onPageChange"
        :loading="isLoading"
        :typePointAllocation="MemberPointAllocationListType.allocation"
        :selected-member="selectedMember"
        @row-click="onRowSelect"
        @download-excel="downloadExcel"
        @submit-registration="submitRegistration"
        @on-edit-page="goToEditPage"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-list.css');
</style>

<script lang="ts">
export default {
  name: 'MemberWelfarePointAllocationListPage'
}
</script>
