<script lang="ts" setup>
import { DataTableContainer } from '@/components/uikit'
import {
  CategoriesExhibitionDataHeaderExhibitionInDepthCategoryOneTableConfig,
  CategoriesExhibitionLowDspCategoryListModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth1CategoryModel'

interface CategoriesExhibitionInDepthCategoryOneTableProps {
  valueDataTable: CategoriesExhibitionLowDspCategoryListModel[]
  isLoading: boolean
}

const props = defineProps<CategoriesExhibitionInDepthCategoryOneTableProps>()
</script>

<template>
  <div class="wf-mt-24">
    <span class="wf-body_01-semi">| 하위 카테고리 정보</span><span class="wf-body_01-mid"> / </span><span class="wf-body_01-reg">(2) Depth</span>
    <div class="wf-register-category-depth-table">
      <DataTableContainer
        is-select-invisible
        :column-configs="CategoriesExhibitionDataHeaderExhibitionInDepthCategoryOneTableConfig"
        :value="props.valueDataTable"
        :loading="isLoading"
      />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/categories/standard/standard-categories-depth1-management.css');
@import url('@/assets/css/view/categories/exhibition/categories-exhibition-in-depth-category.css');
</style>
