<!-- BO_F0202_010101 -->
<script lang="ts" setup>
import ComplaintFormFilterOrderCancel from '@/components/complaint/complaintOrderCancel/ComplaintFormFilterOrderCancel.vue'
import ComplaintOrderCancelTable from '@/components/complaint/complaintOrderCancel/ComplaintOrderCancelTable.vue'
import { useComplaintOrderCancelList } from '@/composables/complaint/useComplaintOrderCancelList'
import { MemberPointAllocationListType } from '@/models/views/members/pointAllocationList/MemberPointAllocationListModel'

const {
  values,
  setFieldValue,
  handleChangeCountDate,
  currentFilterDate,
  inputRow1,
  selectRow1,
  listInputRow2,
  listInputRow3,
  listInputRow4,
  inputRow4,
  selectRow4,
  listSelectDate,
  listSelectSearchType,
  querySearch,
  handleResetFormFilter,
  items,
  isLoading,
  onPageChange,
  totalItems,
  refTable,
  onSubmitForm,
  selectedMember,
  submitRegistration,
  goToEditPage,
  sellerCompanies,
  onRowSelected,
  onSelectAllChange,
  openModalOrderCancel,
  onShowModalOrderCancelDetail,
  onShowModalOrderDetail,
  onDownloadExcel,
  complaintFormFilterRef
} = useComplaintOrderCancelList()
</script>

<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <ComplaintFormFilterOrderCancel
        :current-filter-date="currentFilterDate"
        ref="complaintFormFilterRef"
        :input-row1="inputRow1"
        :select-row1="selectRow1"
        :list-input-row2="listInputRow2"
        :list-input-row3="listInputRow3"
        :list-input-row4="listInputRow4"
        :input-row4="inputRow4"
        :select-row4="selectRow4"
        :list-select-date="listSelectDate"
        :list-select-search-type="listSelectSearchType"
        :query-search="querySearch"
        :values="values"
        :typePointAllocation="MemberPointAllocationListType.allocation"
        :sellerCompanies="sellerCompanies"
        @set-field-value="setFieldValue"
        @handle-change-count-date="handleChangeCountDate"
        @handle-reset-form-filter="handleResetFormFilter"
        @handle-submit-form="onSubmitForm"
      />
      <ComplaintOrderCancelTable
        ref="refTable"
        :data="items"
        :total-element="totalItems"
        @page-change="onPageChange"
        :loading="isLoading"
        :typePointAllocation="MemberPointAllocationListType.allocation"
        :selected-member="selectedMember"
        @submit-registration="submitRegistration"
        @on-edit-page="goToEditPage"
        @onSelectAllChange="onSelectAllChange"
        @on-row-selected="onRowSelected"
        @open-modal-order-cancel="openModalOrderCancel"
        @on-show-modal-order-cancel-detail="onShowModalOrderCancelDetail"
        @onShowModalOrderDetail="onShowModalOrderDetail"
        @on-download-excel="onDownloadExcel"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/complaint-order-cancel-list.css');
</style>

<script lang="ts">
export default {
  name: 'ComplaintOrderCancelList'
}
</script>
