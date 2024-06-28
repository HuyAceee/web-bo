<script setup lang="ts">
import { MockDataTableModel } from '@/assets/mockData'
import { DATA_TABLE_TOTAL_ITEMS } from '@/common'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { useDataTablePagination } from '@/composables'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import Column from 'primevue/column'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import { ref } from 'vue'

const useDataTableView = () => {
  const tableRef = ref()
  const fetchData = (page: number, size: number) => {
    // mock api return data with delay time
    return new Promise<DataTablePaginationResponseModel<any>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = page * size + size
        for (let i = page * size; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataTableModel,
            id: index,
            code: MockDataTableModel.code + index
          })
        }
        resolve({
          totalItems: DATA_TABLE_TOTAL_ITEMS,
          data: items
        })
      })
    })
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<any>(fetchData)
  const onPageChange = (pageState: PageState) => {
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tableRef.value.scrollToTop()
      })
      .catch(() => {})
  }
  /* Call when click one row */
  const onRowClick = (event: DataTableRowClickEvent) => {
    console.log('rowClick', event)
    // alert('rowClick' + event.index + event.data.code)
  }

  const onButtonOneClick = (data: any) => {
    console.log('buttonOneClick', data)
    // alert("buttonOneClick" + data.code)
    items.value = items.value?.slice(1)
  }

  const onButtonSecondClick = (data: any) => {
    console.log('buttonSecondClick', data)
  }

  const onRowCheckedChange = (item: any) => {
    console.log(item)
  }

  const onSelectAllChange = (checked: boolean) => {
    console.log(checked)
  }

  return {
    tableRef,
    items,
    isLoading,
    totalItems,
    onPageChange,
    onRowClick,
    onButtonOneClick,
    onButtonSecondClick,
    onRowCheckedChange,
    onSelectAllChange
  }
}

const {
  tableRef,
  isLoading,
  items,
  totalItems,
  onPageChange,
  onRowClick,
  onButtonOneClick,
  onSelectAllChange,
  onButtonSecondClick,
  onRowCheckedChange
} = useDataTableView()
</script>

<template>
  <div class="wrap-table">
    <DataTablePaginationWithCheckbox
      :value="items"
      :loading="isLoading"
      :totalRecords="totalItems"
      v-on:row-click="onRowClick"
      v-on:page-change="onPageChange"
      v-on:select-all-change="onSelectAllChange"
      v-on:row-checked-change="onRowCheckedChange"
      ref="tableRef"
      :reorderable-columns="true"
    >
      <template #title>
        <h2 class="">조회 결과 총 3,128 건</h2>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton label="승인반려" buttonType="liner" />
          <WelfareMdButton label="승인" buttonType="default" />
        </div>
      </template>
      <template #columns>
        <Column key="code" columnKey="code" header="code" class="code-column">
          <template #body="slotProps">
            <a target="_blank" href="#">
              {{ slotProps.data.code }}
            </a>
          </template>
        </Column>
        <Column key="name" columnKey="name" header="name" class="name-column">
          <template #body="slotProps">
            <a target="_blank" href="#">
              {{ slotProps.data.name }}
            </a>
          </template>
        </Column>
        <Column key="batters" columnKey="batters" field="batters" header="batters" class="batters-column" />
        <Column key="color" columnKey="color" field="color" header="color" class="color-column"></Column>
        <Column key="height" columnKey="height" field="height" header="height" class="height-column"></Column>
        <Column key="width" columnKey="width" field="width" header="width" class="width-column"></Column>
        <Column key="ppu" columnKey="ppu" field="ppu" header="ppu" class="ppu-column"></Column>
        <Column key="topping" columnKey="topping" field="topping" header="topping" class="topping-column"></Column>
        <Column key="url" columnKey="url" field="url" header="url" class="url-column"></Column>
        <Column key="startDate" columnKey="startDate" field="startDate" header="startDate" class="startDate-column"></Column>
        <Column key="endDate" columnKey="endDate" field="endDate" header="endDate" class="endDate-column"></Column>
        <Column key="patternName" columnKey="patternName" field="patternName" header="patternName" class="patternName-column"></Column>
        <Column key="tax" columnKey="tax" field="tax" header="tax" class="tax-column"></Column>
        <Column key="typeTax" columnKey="typeTax" field="typeTax" header="typeTax" class="typeTax-column"></Column>
        <Column key="category" columnKey="category" field="category" header="category" class="category-column"></Column>
        <Column key="reviewer" columnKey="reviewer" field="reviewer" header="reviewer" class="reviewer-column"></Column>
        <Column key="status" columnKey="status" field="status" header="status" class="status-column"></Column>
        <Column key="action-buttons" columnKey="action-buttons" header="승인 관리" class="action-column">
          <template #body="slotProps">
            <div class="wf_flex wf-space-x-4">
              <WelfareMdButton label="동반자" buttonType="liner" buttonSize="small" @click="() => onButtonOneClick(slotProps.data)" />
              <WelfareMdButton label="승인됨" buttonType="liner" buttonSize="small" @click="() => onButtonSecondClick(slotProps.data)" />
            </div>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-data-table-view.css');
</style>
