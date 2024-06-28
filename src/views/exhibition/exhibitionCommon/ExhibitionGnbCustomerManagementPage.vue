<!--BO_I0304_010101-->
<script lang="ts" setup>
import ExhibitionGnbGroupTable from '@/components/exhibition/exhibitionCommon/exhibitionGnbManagement/ExhibitionGnbGroupTable.vue'
import ExhibitionGnbReservationTable from '@/components/exhibition/exhibitionCommon/exhibitionGnbManagement/ExhibitionGnbReservationTable.vue'
import { ProductSearchType } from '@/models'
import { CommonTable, CommonTableContentCell, CommonTableRow, CommonTableTitleCell } from '@/components'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import { useExhibitionGnbCustomerManagement } from '@/composables/exhibition/exhibitionCommon/useExhibitionGnbCustomerManagement'

const {
  gnbGroupList,
  totalItem,
  filterType,
  selectedRow,
  addNewRow,
  submitNewGnbGroup,
  loading,
  deleteGnbGroup,
  setFilterType,
  setValueGnbGroup,
  itemsSelected,
  customerId,
  handleSearch,
  customerRef,
  resetData,
  openModalGnbGroup,
  setHasGnbValue,
  tableRef
} = useExhibitionGnbCustomerManagement()
</script>

<template>
  <div class="wf-p-30">
    <CommonTable class="wf-mb-30">
      <CommonTableRow is-last-row>
        <CommonTableTitleCell title="고객사 조회" required is-first-col />
        <CommonTableContentCell>
          <ProductSearchModalWithTableWrapper
            ref="customerRef"
            class="wf_w-228"
            placeholder-input="고객사 조회"
            :type="ProductSearchType.CUSTOMER"
            reverse-search-text
            @select-value="
              (event) => {
                customerId = String(event?.code)
              }
            "
          />
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>
    <FormButtonHandleForm @on-reset="resetData" @on-submit="handleSearch" />
    <div class="wf-width-full wf-h-1 wf-btn-border--bg-color-line-gray wf-my-30"></div>
    <ExhibitionGnbGroupTable
      ref="tableRef"
      :gnb-group-list="gnbGroupList"
      :total-item="totalItem"
      :filter-type="filterType"
      :loading="loading"
      @selected-row="selectedRow"
      @add-new-row="addNewRow"
      @submit-new-gnb-group="submitNewGnbGroup"
      @delete-gnb-group="deleteGnbGroup"
      @set-filter-type="setFilterType"
      @set-value-gnb-group="setValueGnbGroup"
      type-gnb-customer
      @open-modal-gnb-group="openModalGnbGroup"
      :items-selected="itemsSelected"
    />
    <ExhibitionGnbReservationTable :gnb-group-select="itemsSelected" type-gnb-customer @setHasGnbValue="setHasGnbValue" />
  </div>
</template>
<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
