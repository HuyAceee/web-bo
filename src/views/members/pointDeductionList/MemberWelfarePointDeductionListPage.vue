<!-- BO_B0202_010101 -->
<script lang="ts" setup>
import MemberPointAllocationTable from '@/components/members/memberPointAllocation/MemberPointAllocationTable.vue'
import MemberFormFilterPointAllocation from '@/components/members/memberPointAllocation/MemberFormFilterPointAllocation.vue'
import { useMemberWelfarePointAllocationList } from '@/composables/members/welfarePointAllocation/useMemberWelfarePointAllocationList'
import { MemberPointAllocationListType } from '@/models/views/members/pointAllocationList/MemberPointAllocationListModel'
import { memberPointAllocationListModelConfig } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAllocationListModel'

const {
  values,
  setFieldValue,
  handleChangeCountDate,
  currentFilterDate,
  handleResetFormFilter,
  items,
  isLoading,
  onPageChange,
  totalItems,
  refTable,
  onRowSelect,
  selectedMember,
  submitRegistration,
  onSubmitForm,
  goToEditPage,
  formFilterRef,
  downloadExcel
} = useMemberWelfarePointAllocationList(MemberPointAllocationListType.deduction)
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
        @set-field-value="setFieldValue"
        @handle-change-count-date="handleChangeCountDate"
        @handle-reset-form-filter="handleResetFormFilter"
        @handle-submit-form="onSubmitForm"
        :typePointAllocation="MemberPointAllocationListType.deduction"
      />
      <MemberPointAllocationTable
        ref="refTable"
        :data="items"
        @download-excel="downloadExcel"
        :total-element="totalItems"
        @page-change="onPageChange"
        :loading="isLoading"
        :typePointAllocation="MemberPointAllocationListType.deduction"
        @row-click="onRowSelect"
        :selected-member="selectedMember"
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
  name: 'MemberWelfarePointDeductionListPage'
}
</script>
