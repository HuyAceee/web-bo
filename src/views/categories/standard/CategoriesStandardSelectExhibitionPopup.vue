<!-- BO_D0103_020201_P -->
<script setup lang="ts">
import { WelfareMdButton } from '@/components'
import CategoriesTreeMenuNode from '@/components/categories/common/CategoriesTreeMenuNode.vue'
import IconCloseRounded from '@/components/icons/IconCloseRounded.vue'
import { ProductDspCategoryListResponseConverter } from '@/models/services/responses/products/category/ProductCategoryResponse'
import { CategoriesTreeMenuNodeEmits, CategoriesTreeMenuNodeProps } from '@/models/views/categories/CategoriesDepthManagementModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { TreeNode } from 'primevue/tree'
import { onMounted, ref } from 'vue'
const props = withDefaults(defineProps<CategoriesTreeMenuNodeProps>(), {
  selectable: false,
  hasContextMenu: true,
  title: '카테고리 목록',
  selectionMode: 'single',
  onSelect: () => {}
})

defineEmits<CategoriesTreeMenuNodeEmits>()

const nodes = ref()
const selectedNode = ref<TreeNode[]>([])
const handleGetDspCat = async () => {
  const { data } = await productCategoryApi.getDisplayCategoryList()
  const tree = ProductDspCategoryListResponseConverter.buildTreesFromDspCategoriesArray(data)
  nodes.value = tree
}

const handleSelectMenu = (val: TreeNode) => {
  selectedNode.value = [...selectedNode.value, val]
}

const handleUnselectMenu = (val: TreeNode) => {
  selectedNode.value = selectedNode.value.filter((it) => it.key !== val.key)
}
onMounted(async () => {
  try {
    await handleGetDspCat()
  } catch (error) {
    // empty
  }
})
</script>

<template>
  <div class="wf-categories-popup-wrapper--content wf_bg-white">
    <div class="wf-modal-header">
      <p class="wf-sub_tit_01 wf_text-n-33">전시 카테고리 선택</p>
      <IconCloseRounded @click="props.closeModal?.()" />
    </div>
    <div class="wf-popup-tree--wrapper wf-custom-scrollbar">
      <CategoriesTreeMenuNode
        :tree="nodes"
        selectionMode="checkbox"
        :selected-key="selectedKey"
        :showHeader="false"
        @menu-item-selected="(val) => handleSelectMenu(val)"
        @menu-item-unselected="(val) => handleUnselectMenu(val)"
      />
    </div>
    <div class="wf_flex wf-flex-row wf-space-x-4 wf_items-center wf_justify-center wf-pb-20">
      <WelfareMdButton label="취소" class="wf_w-120" button-type="cancel" @click="props.closeModal?.()" />
      <WelfareMdButton label="추가" class="wf_w-120" button-type="default" @click="props.onSelect?.(selectedNode)" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/categoryTreeMenu/categories-tree-popup.css');
</style>
