<!-- BO_D0103_010101 -->
<script setup lang="ts">
import CategoriesTreeMenu from '@/components/categories/common/CategoriesTreeMenu.vue'
import { useCategoriesStandardManagement } from '@/composables/categories/standard/useCategoriesStandardManagement'
import { CategoriesDeep, categoriesExpanderActionsEnum } from '@/models/views/categories/CategoriesDepthManagementModel'
import CategoriesStandardDepth1ManagementPage from './CategoriesStandardDepth1ManagementPage.vue'
import CategoriesStandardDepth2ManagementPage from './CategoriesStandardDepth2ManagementPage.vue'
import CategoriesStandardDepth3ManagementPage from './CategoriesStandardDepth3ManagementPage.vue'
const { nodes, handleSaveMenuData, handleMenuItemSelected, handleDeleteCatMenu, wfTreeMenu, depth, handleChangeMenuData } =
  useCategoriesStandardManagement()

</script>

<template>
  <div class="wf-body-wrap-content wf_text-n-33">
    <div class="wf_flex wf-flex-row wf-space-x-20">
      <div class="wf_w-406">
        <CategoriesTreeMenu
          ref="wfTreeMenu"
          :tree="nodes"
          :expandedMode="categoriesExpanderActionsEnum.ALL"
          @save-menu-data="(nodes) => handleSaveMenuData(nodes)"
          @menu-item-selected="(val) => handleMenuItemSelected(val)"
          @action-menu-clicked="(action, node) => handleDeleteCatMenu(node)"
        />
      </div>
      <div class="wf_w-full">
        <CategoriesStandardDepth1ManagementPage @on-save-category="handleChangeMenuData" v-if="depth === CategoriesDeep.ONE.toString()" />
        <CategoriesStandardDepth2ManagementPage @on-save-category="handleChangeMenuData" v-else-if="depth === CategoriesDeep.TWO.toString()" />
        <CategoriesStandardDepth3ManagementPage @on-save-category="handleChangeMenuData" v-else-if="depth === CategoriesDeep.THREE.toString()" />
        <CategoriesStandardDepth1ManagementPage @on-save-category="handleChangeMenuData" v-else disableCallApiOnMount />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ProductStandardCategoriesD3'
}
</script>

<style scoped>
@import url('@/assets/css/view/categories/standard/standard-categories-depth3-management.css');
</style>
