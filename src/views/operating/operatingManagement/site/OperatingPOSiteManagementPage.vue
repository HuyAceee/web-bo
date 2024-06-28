<!-- BO_M0101_010101/BO_M0101_020101/BO_M0101_030101/BO_M0101_040101 -->
<script setup lang="ts">
import OperatingSiteManagementForm from '@/components/operating/OperatingSiteManagementForm.vue'
import OperatingTreeMenu from '@/components/operating/common/OperatingTreeMenu.vue'
import { useOperatingSiteManagement } from '@/composables/operating/operatingManagement/site/useOperatingSiteManagement'
import { operatingExpanderActionsEnum } from '@/models/views/operating/OperatingDepthManagementModel'
const { handleActionMenuClick, nodes, handleSaveMenuData, handleMenuItemSelected, wfTreeMenu, handleChangeMenuData } = useOperatingSiteManagement()
</script>
<template>
  <div class="wf_flex wf-flex-row wf-space-x-20">
    <div class="wf_w-406">
      <OperatingTreeMenu
        ref="wfTreeMenu"
        :tree="nodes"
        :expandedMode="operatingExpanderActionsEnum.ALL"
        disable-logic-header
        @save-menu-data="(nodes) => handleSaveMenuData(nodes)"
        @menu-item-selected="(val) => handleMenuItemSelected(val)"
        @action-menu-clicked="handleActionMenuClick"
      />
    </div>
    <div class="wf_w-full">
      <OperatingSiteManagementForm @on-save-site="handleChangeMenuData" />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'OperatingPOSiteManagementPage'
}
</script>