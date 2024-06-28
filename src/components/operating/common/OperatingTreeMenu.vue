<script setup lang="ts">
import { WelfareMdButton, WelfareSelect } from '@/components/uikit'
import OperatingTreeMenuNode from './OperatingTreeMenuNode.vue'
import { computed } from 'vue'
import {
  OperatingTreeMenuNodeEmits,
  OperatingTreeMenuNodeProps,
  operatingExpanderActionsEnum
} from '@/models/views/operating/OperatingDepthManagementModel'
import { useOperatingTreeMenu } from '@/composables/operating/useOperatingTreeMenu'
const props = withDefaults(defineProps<OperatingTreeMenuNodeProps>(), {
  selectable: false,
  hasContextMenu: true,
  tree: [],
  title: '| 사이트 메뉴 목록',
  selectionMode: 'single',
  expandedMode: operatingExpanderActionsEnum.COLLAPSED
})
const emits = defineEmits<OperatingTreeMenuNodeEmits>()

const treeProps = computed(() => {
  return props.tree
})
const { selectedExpand, options, handleChangeModelValue, addTopNode, saveData, wfTreeMenuNode, nodes, handleMenuItemClick, handleActionMenuClick } =
  useOperatingTreeMenu(emits, treeProps)
</script>

<template>
  <div class="wf-product-tree-menu--wrapper wf_w-406--important wf-custom-scrollbar">
    <div class="wf-sub_tit_01 wf-category-tree-menu--header">{{ title }}</div>
    <div class="wf_h-50 wf_bg-primary-0 wf_flex wf_flex-row wf_items-center wf_justify-between wf-px-20">
      <WelfareSelect
        placeholder="전체 펼침"
        :model-value="selectedExpand"
        optionLabel="label"
        small
        :options="options"
        class="wf-product-selected-tree-expander"
        @update:model-value="(val) => handleChangeModelValue(val)"
      />
      <div class="wf_flex wf_flex-row wf_items-center wf-space-x-4">
        <WelfareMdButton button-size="small" label="1depth 추가" buttonType="neutral" @click="() => addTopNode()" />
        <WelfareMdButton button-size="small" label="순서저장" buttonType="neutral" @click="saveData" />
      </div>
    </div>
    <OperatingTreeMenuNode
      :selection-mode="selectionMode"
      :selectable="selectable"
      :hasContextMenu="hasContextMenu"
      :expandedMode="expandedMode"
      :tree="nodes"
      ref="wfTreeMenuNode"
      @action-menu-clicked="(action, targetRow) => handleActionMenuClick(action, targetRow)"
      @menu-item-selected="(targetRow) => handleMenuItemClick(targetRow)"
      @save-menu-data="saveData"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/categoryTreeMenu/categories-tree-menu.css');
</style>