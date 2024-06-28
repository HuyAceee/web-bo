<!-- BO_D0102_010101 -->
<script setup lang="ts">
import { formatNumberDot, renderLabelEnum } from '@/common'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import CategoriesTreeMenu from '@/components/categories/common/CategoriesTreeMenu.vue'
import { useCategoriesExhibitionDepth3ManagementTable } from '@/composables/categories/exhibition/useCategoriesExhibitionDepth3ManagementTable'
import { useCategoriesExhibitionInDepthManagement } from '@/composables/categories/exhibition/useCategoriesExhibitionInDeptManagement'
import { CategoriesDeep, CategoriesDspManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'
import Column from 'primevue/column'
import { ref } from 'vue'
import CategoriesExhibitionDepth1ManagementPage from './CategoriesExhibitionDepth1ManagementPage.vue'
import CategoriesExhibitionDepth2ManagementPage from './CategoriesExhibitionDepth2ManagementPage.vue'
import CategoriesExhibitionDepth3ManagementPage from './CategoriesExhibitionDepth3ManagementPage.vue'
import { YnOptions } from '@/models'
const emits = defineEmits<CategoriesDspManagementEmits>()

const { nodes, handleSaveMenuData, handleMenuItemSelected, handleMenuItemUnSelected, handleDeleteCatMenu, wfTreeMenu, depth, handleChangeMenuData } =
  useCategoriesExhibitionInDepthManagement()

const disableTableBtn = ref<boolean>(true)

const handleToggleActiveTableBtn = (val: string) => {
  disableTableBtn.value = val === YnOptions.Y
}

const {
  items,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  tableConfigs,
  refTable,
  handleOpenModalAddProduct,
  onSaveProductCategory,
  onDeleteRecord,
  onDeleteRecords,
  pageItems,
  isLoading,
  onClickSellerKey
} = useCategoriesExhibitionDepth3ManagementTable(emits)
</script>

<template>
  <div class="wf-body-wrap-content wf_flex wf_flex-col">
    <div class="wf_flex wf-flex-row">
      <div class="wf-register-category-depth--container wf-mb-20">
        <CategoriesTreeMenu
          :tree="nodes"
          ref="wfTreeMenu"
          @save-menu-data="(nodes) => handleSaveMenuData(nodes)"
          @menu-item-selected="(node) => handleMenuItemSelected(node)"
          @menu-item-unselected="(node) => handleMenuItemUnSelected(node)"
          @action-menu-clicked="(action, node) => handleDeleteCatMenu(node)"
        />
      </div>
      <div class="wf_w-full wf-ml-20">
        <CategoriesExhibitionDepth1ManagementPage @on-save-category="handleChangeMenuData" v-if="depth === CategoriesDeep.ONE.toString()" />
        <CategoriesExhibitionDepth2ManagementPage @on-save-category="handleChangeMenuData" v-else-if="depth === CategoriesDeep.TWO.toString()" />
        <CategoriesExhibitionDepth3ManagementPage
          @on-save-category="handleChangeMenuData"
          @on-change-dsp-select="(e: string) => handleToggleActiveTableBtn(e)"
          v-else-if="depth === CategoriesDeep.THREE.toString()"
        />
        <CategoriesExhibitionDepth1ManagementPage @on-save-category="handleChangeMenuData" v-else disableCallApiOnMount />
      </div>
    </div>
    <div v-if="depth === CategoriesDeep.THREE.toString()">
      <div class="wf-mt-20 wf-category-depth-table">
        <DataTablePaginationWithCheckbox
          :value="pageItems"
          :total-records="items.length"
          :loading="isLoading"
          ref="refTable"
          @page-change="onPageChange"
          @row-checked-change="onRowSelected"
          @select-all-change="onSelectAllChange"
          :disabled-all-checkbox="disableTableBtn"
        >
          <template #title>
            <h6 class="wf_text-n-33">전시상품 목록 &nbsp;(총 {{ formatNumberDot(items.length) }} 건)</h6>
          </template>
          <template #buttons>
            <div class="wf-space-x-6 wf_flex">
              <WelfareMdButton label="삭제" class="wf_w-45" buttonType="liner" :disabled="disableTableBtn" @on-click="() => onDeleteRecords()" />
              <WelfareMdButton
                label="상품 추가"
                class="wf_w-72"
                buttonType="liner"
                :disabled="disableTableBtn"
                @on-click="handleOpenModalAddProduct"
              />
              <WelfareMdButton
                label="저장"
                class="wf_w-45"
                buttonType="default"
                :disabled="disableTableBtn"
                @on-click="() => onSaveProductCategory()"
              />
            </div>
          </template>
          <template #columns>
            <Column
              v-for="item in tableConfigs"
              :key="item.field"
              :column-key="item.field"
              :field="item.field"
              :header="item.header"
              :class="item.class"
            >
              <template #body="slotProps">
                <span
                  class="wf-underline wf-pointer wf_text-sub-02"
                  @click="() => onClickSellerKey(slotProps.data)"
                  v-if="slotProps.field === 'sellerKey'"
                  >{{ slotProps.data.sellerKey }} ({{ slotProps.data.sellerName }})</span
                >
                <span v-else-if="slotProps.field === 'lowSellerKey'"
                  >{{ slotProps.data.lowSellerKey }} {{ slotProps.data.lowSellerName ? `(${slotProps.data.lowSellerName})` : '' }}</span
                >
                <span v-else-if="slotProps.field === 'brandId'"
                  >{{ slotProps.data.brandId }} {{ slotProps.data.brandName ? `(${slotProps.data.brandName})` : '' }}</span
                >
                <span v-else-if="slotProps.field === 'chargeMdKey'"
                  >{{ slotProps.data.chargeMdKey }} {{ slotProps.data.chargeMdName ? `(${slotProps.data.chargeMdName})` : '' }}</span
                >
                <span v-else-if="slotProps.field === 'createdBy'"
                  >{{ slotProps.data.createdBy }} {{ slotProps.data.createdByName ? `(${slotProps.data.createdByName})` : '' }}</span
                >
                <span v-else-if="slotProps.field === 'lastModifiedBy'"
                  >{{ slotProps.data.lastModifiedBy }} {{ slotProps.data.lastModifiedByName ? `(${slotProps.data.lastModifiedByName})` : '' }}</span
                >
                <span v-else-if="slotProps.field === 'lastProductApprovedBy'"
                  >{{ slotProps.data.lastProductApprovedBy }}
                  {{ slotProps.data.lastProductApprovedByName ? `(${slotProps.data.lastProductApprovedByName})` : '' }}</span
                >
                <span v-else-if="slotProps.field === 'salePrice'"
                  >{{ formatNumberDot(slotProps.data.salePrice) }}</span
                >
                <span v-else-if="item?.convertEnumValue">{{ renderLabelEnum(item?.convertEnumValue ?? [], slotProps.data?.[item.field]) }}</span>
                <span v-else-if="!item?.onClick">{{ slotProps.data[item.field] }}</span>
                <span v-else class="wf-underline wf-pointer wf_text-sub-02" @click="() => item.onClick && item.onClick(slotProps.data)">{{
                  slotProps.data[item.field]
                }}</span>
              </template>
            </Column>
            <Column key="actions" column-key="actions" header="관리" class="wf_w-200">
              <template #body="slotProps">
                <WelfareMdButton
                  label="삭제"
                  buttonType="neutral"
                  button-size="small"
                  :disabled="disableTableBtn"
                  @click="() => onDeleteRecord(slotProps.data)"
                />
              </template>
            </Column>
          </template>
          <template #body=""></template>
        </DataTablePaginationWithCheckbox>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/categories/standard/standard-categories-depth1-management.css');
@import url('@/assets/css/view/categories/exhibition/categories-exhibition-depth3-management.css');
</style>

<script lang="ts">
export default {
  name: 'CategoriesExhibitionDepth3ManagementPage'
}
</script>
