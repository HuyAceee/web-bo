<!-- BO_I0104_010101 -->
<script lang="ts" setup>
import ExhibitionSpecialManagementFormFilter from '@/components/exhibition/exhibitionContent/exhibitionSpecialManagement/ExhibitionSpecialManagementFormFilter.vue'
import ExhibitionSpecialManagementTable from '@/components/exhibition/exhibitionContent/exhibitionSpecialManagement/ExhibitionSpecialManagementTable.vue'
import { useExhibitionSpecialManagementList } from '@/composables/exhibition/exhibitionContent/useExhibitionSpecialManagementList'
import { exhibitionSpecialManagementListModelConfig } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialManagementModel'

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
  onSubmitForm,
  onRowSelected,
  onSelectAllChange,
  onDownloadExcel,
  exhibitionSpecialFormFilterRef,
  onChangeDataTable,
  copyValueSelect,
  saveValueTable,
  deleteValueExhibition,
  openModalSellerSpecial,
  openModalExhibitionRegister
} = useExhibitionSpecialManagementList(true)
</script>

<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <ExhibitionSpecialManagementFormFilter
        :current-filter-date="currentFilterDate"
        ref="exhibitionSpecialFormFilterRef"
        :input-row1="exhibitionSpecialManagementListModelConfig.inputRow1"
        :select-row2="exhibitionSpecialManagementListModelConfig.selectRow2"
        :select-row3="exhibitionSpecialManagementListModelConfig.selectRow3"
        :list-select-date="exhibitionSpecialManagementListModelConfig.listSelectDate"
        :list-select-search-type="exhibitionSpecialManagementListModelConfig.listSelectSearchType"
        :query-search="exhibitionSpecialManagementListModelConfig.querySearch"
        :values="values"
        @set-field-value="setFieldValue"
        @handle-change-count-date="handleChangeCountDate"
        @handle-reset-form-filter="handleResetFormFilter"
        @handle-submit-form="onSubmitForm"
        :seller-type="true"
      />
      <ExhibitionSpecialManagementTable
        ref="refTable"
        :data="items"
        :total-element="totalItems"
        :seller-type="true"
        @page-change="onPageChange"
        @on-change-data-table="onChangeDataTable"
        :loading="isLoading"
        @onSelectAllChange="onSelectAllChange"
        @on-row-selected="onRowSelected"
        @on-download-excel="onDownloadExcel"
        @copy-value-select="copyValueSelect"
        @save-value-table="saveValueTable"
        @deleteValueExhibition="deleteValueExhibition"
        @open-modal-seller-special="openModalSellerSpecial"
        @open-modal-exhibition-register="openModalExhibitionRegister"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/complaint-order-cancel-list.css');
</style>

<script lang="ts">
export default {
  name: 'ExhibitionSellerSpecialManagementPage'
}
</script>
