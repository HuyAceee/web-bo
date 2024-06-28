<!-- BO_D0201_010101 -->
<script lang="ts" setup>
import { WelfareMdButton } from '@/components'
import CategoriesExhibitionFormsInDepth1Category from '@/components/categories/exhibition/CategoriesExhibitionFormsInDepth1Category.vue'
import CategoriesExhibitionInDepth1CategoryTable from '@/components/categories/exhibition/CategoriesExhibitionInDepth1CategoryTable.vue'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import { useCategoriesExhibitionDepth1Management } from '@/composables/categories/exhibition/useCategoriesExhibitionDepth1Management'
import { CategoriesStandardManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'

const emits = defineEmits<CategoriesStandardManagementEmits>()
const props = defineProps({
  disableCallApiOnMount: Boolean
})
const {
  value,
  valueCategoryList,
  handleUpdateImage,
  handleUpdateExposureOption,
  handleRemoveImage,
  handleRemoveDspCategory,
  onSaveDspCategoryManage,
  isLoading
} = useCategoriesExhibitionDepth1Management(emits, props.disableCallApiOnMount)
</script>

<template>
  <div class="wf_flex wf_flex-row">
    <div class="wf_flex-1">
      <ProductTitle title="카테고리 등록/수정" />
      <CategoriesExhibitionFormsInDepth1Category
        :valueData="value"
        @update-image="handleUpdateImage"
        @update-value-option="handleUpdateExposureOption"
        @remove-image="handleRemoveImage"
      />
      <CategoriesExhibitionInDepth1CategoryTable :value-data-table="valueCategoryList" :is-loading="isLoading" />
      <div class="wf_exhibition-in-depth-action wf-mt-30">
        <WelfareMdButton label="삭제" buttonType="cancel" class="wf_w-200" @on-click="handleRemoveDspCategory" />
        <WelfareMdButton label="저장" buttonType="default" class="wf_w-200" @on-click="onSaveDspCategoryManage" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/categories/exhibition/categories-exhibition-in-depth-category.css');
</style>
<script lang="ts">
export default {
  name: 'CategoriesExhibitionInDepth1ManagementPage'
}
</script>
