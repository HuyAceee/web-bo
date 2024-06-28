<!--BO_I0303_010101-->
<script lang="ts" setup>
import ExhibitionGnbGroupTable from '@/components/exhibition/exhibitionCommon/exhibitionGnbManagement/ExhibitionGnbGroupTable.vue'
import ExhibitionGnbReservationTable from '@/components/exhibition/exhibitionCommon/exhibitionGnbManagement/ExhibitionGnbReservationTable.vue'
import { useExhibitionGnbManagement } from '@/composables/exhibition/exhibitionCommon/useExhibitionGnbManagement'

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
  setHasGnbValue,
  tableRef
} = useExhibitionGnbManagement()
</script>

<template>
  <div class="wf-p-30">
    <ExhibitionGnbGroupTable
      ref='tableRef'
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
      :items-selected='itemsSelected'
    />
    <ExhibitionGnbReservationTable :gnb-group-select="itemsSelected" @setHasGnbValue="setHasGnbValue" />
  </div>
</template>
<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
