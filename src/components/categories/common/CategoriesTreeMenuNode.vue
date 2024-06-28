<script setup lang="ts">
import IconCheckbox from '@/components/icons/IconCheckbox.vue'
import IconExpandedMenu from '@/components/icons/IconExpandedMenu.vue'
import IconListMenu from '@/components/icons/IconListMenu.vue'
import IconMenuOptions from '@/components/icons/IconMenuOptions.vue'
import IconMinimizeMenu from '@/components/icons/IconMinimizeMenu.vue'
import { getCurrentNodeDeepByKey } from '@/composables/categories/common'
import { useCategoriesTreeMenuNode } from '@/composables/categories/useCategoriesTreeMenuNode'
import {
  CategoriesDeep,
  CategoriesTreeMenuNodeEmits,
  CategoriesTreeMenuNodeProps,
  categoriesExpanderActionsEnum
} from '@/models/views/categories/CategoriesDepthManagementModel'
import Tree from 'primevue/tree'
import { computed } from 'vue'
import CategoriesTreeMenuPopup from './CategoriesTreeMenuPopup.vue'

const props = withDefaults(defineProps<CategoriesTreeMenuNodeProps>(), {
  selectable: false,
  hasContextMenu: false,
  tree: [],
  rootName: '전체',
  selectionMode: 'single',
  showHeader: true,
  showProductCount: true,
  hasWrapper: true,
  expandedMode: categoriesExpanderActionsEnum.COLLAPSED
})
const emits = defineEmits<CategoriesTreeMenuNodeEmits>()
const treeProps = computed(() => {
  return props.tree
})
const {
  nodes,
  showMenu,
  contextMenuActions,
  closeContextMenu,
  handleActionMenuClick,
  showContextMenu,
  expandedKeys,
  menuXPosition,
  menuYPosition,
  onNodeSelect,
  onNodeUnselect,
  selectedKey,
  toggleShowMenuTree,
  showMenuTree,
  contextMenuLeafActions,
  isLeaf,
  targetRow,
  expandAll,
  collapseAll,
  handleShowMenuTree,
  expandNode,
  expandNodeWithoutChildren
} = useCategoriesTreeMenuNode(emits, treeProps, undefined, props)

defineExpose({
  expandAll,
  collapseAll,
  expandNode,
  handleShowMenuTree,
  expandNodeWithoutChildren
})
</script>

<template>
  <div class="wf-product-tree-menu--wrapper">
    <div class="wf-product-tree-menu wf-custom-scrollbar" :class="{ 'wf-product-tree-menu--border': hasWrapper }">
      <div
        @click="toggleShowMenuTree"
        class="wf-pointer wf-categories-tree-root-node wf-h-35 wf_flex wf-flex-row wf_items-center wf-space-x-10"
        v-if="props.showHeader"
      >
        <IconListMenu />
        <span class="wf-categories-tree-root-node--label wf-body_03-semi">{{ $props.rootName }}</span>
      </div>
      <Tree
        v-bind="props"
        v-model:expandedKeys="expandedKeys"
        v-model:selectionKeys="selectedKey"
        class="wf-custom-scrollbar wf-categories-tree wf-body_03-reg"
        filterMode="lenient"
        @nodeSelect="onNodeSelect"
        @nodeUnselect="onNodeUnselect"
        :value="nodes"
        :metaKeySelection="false"
        :unstyled="false"
        :pt="{
          // label: ({ props, state, context }) => {
          //   return {
          //     class: context.expanded ? 'wf_text-sub-02' : ''
          //   }
          // },
          root: () => {
            return {
              class: { 'wf-tree-expanded': showMenuTree, 'wf-tree-expander': showHeader }
            }
          },
          // node: ({ props, state, context }) => {
          //   return {
          //     // class: { 'wf-tree-expander-content wf-tree-node-label wf-tree-expander': true, 'wf-tree-expanded': context?.expanded },
          //     // style: { height: `${3 * 36}px` }
          //     // class: { 'wf-expanded': context.expanded, 'wf-tree-expander-content wf-tree-node-label': true }
          //   }
          // },
          // subgroup: ({ props, state, context }) => {
          //   return {
          //     // class: { 'wf-tree-expander-content wf-tree-node-label wf-tree-expander': true, 'wf-tree-expanded': context?.expanded },
          //     style: { height: `${3 * 100}px` }
          //     // class: { 'wf-expanded': context.expanded, 'wf-tree-expander-content wf-tree-node-label': true }
          //   }
          // },
          checkboxContainer: () => {
            return {
              class: { 'p-checkbox p-checkbox-sm wf-mr-8 wf-ml-2': true }
            }
          }
        }"
      >
        <template #togglericon="slotProps">
          <IconMinimizeMenu v-if="slotProps.expanded" />
          <IconExpandedMenu v-else />
        </template>
        <template #checkboxicon>
          <IconCheckbox class="p-checkbox-icon" />
        </template>
        <template #default="slotProps">
          <div
            @contextmenu.prevent="props.hasContextMenu && showContextMenu($event, slotProps)"
            class="wf_flex wf-product-menu--content wf_items-center wf_flex-grow-1"
          >
            <span
              :class="{
                'wf-body_03-semi wf_text-n-33': getCurrentNodeDeepByKey(slotProps.node) === CategoriesDeep.ONE,
                'wf-body_03-mid wf_text-n-33': getCurrentNodeDeepByKey(slotProps.node) === CategoriesDeep.TWO,
                'wf_text-n-52': getCurrentNodeDeepByKey(slotProps.node) === CategoriesDeep.THREE,
                [slotProps.node.class || '']: true
              }"
              >{{ slotProps.node.label }}
              {{
                props.showProductCount && slotProps.node.productCount !== undefined
                  ? `(${slotProps.node.productCount ? slotProps.node.productCount : '0'})`
                  : ''
              }}
            </span>
            <button v-if="props.hasContextMenu" @click.stop="showContextMenu($event, slotProps)">
              <IconMenuOptions class="wf_w-28" />
            </button>
            <div id="wf-overlay-menu" class="overlay" @contextmenu.prevent.stop="closeContextMenu" @click.stop="closeContextMenu" v-if="showMenu" />
          </div>
          <CategoriesTreeMenuPopup
            v-if="showMenu && targetRow?.node?.key == slotProps.node.key"
            :actions="isLeaf(slotProps.node) ? contextMenuLeafActions : contextMenuActions"
            @action-clicked="handleActionMenuClick"
            :xPosition="menuXPosition"
            :yPosition="menuYPosition"
          />
        </template>
      </Tree>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/categoryTreeMenu/categories-tree-menu.css');
</style>
