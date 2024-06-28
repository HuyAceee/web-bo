<!-- BO_D0101_010101 -->
<script setup lang="ts">
import { DataTableContainer, TextInputValidationMaxBytes, WelfareBigButton } from '@/components'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useCategoriesStandardDepth1Management } from '@/composables/categories/standard/useCategoriesStandardDepth1Management'
import { ProductSearchRecordModel, ProductSearchType } from '@/models'
import { CategoriesStandardManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'
import { CategoriesStandardDepth1ManagementHeaderConfig } from '@/models/views/categories/standard/CategoriesStandardDepth1ManagementModel'

const props = defineProps({
  disableCallApiOnMount: Boolean
})
const emits = defineEmits<CategoriesStandardManagementEmits>()
const {
  dataStdDetail,
  exhibitionMapData,
  handleGetValueProduct,
  handleChangeCategoryName,
  handleAddStdCat,
  handleDeleteCat,
  categoryName,
  mdText,
  searchMDKeyRef
} = useCategoriesStandardDepth1Management(emits, props.disableCallApiOnMount)
</script>

<template>
  <div class="wf_text-n-33">
    <div class="wf_flex wf-flex-row wf-space-x-20">
      <div class="wf_flex wf_flex-col wf_flex-grow-1">
        <div class="wf-sub_tit_01 wf-category-depth--header">카테고리 등록/수정</div>
        <div class="wf-mt-14">
          <span class="wf-body_01-semi">| 카테고리 정보</span><span class="wf-body_01-mid"> / </span><span class="wf-body_01-reg">(1) Depth</span>
          <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
            <div class="wf_flex wf_items-center">
              <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="분류">
                <span class="wf-body_03-reg">대분류</span>
              </FormGroup>
              <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="위치">
                <span class="wf-body_03-reg">{{ dataStdDetail?.upperStandardCategoryName }}</span>
              </FormGroup>
            </div>
            <div class="wf_flex wf_items-center">
              <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-bottom label="카테고리 명" required :is-border-bottom="false">
                <TextInputValidationMaxBytes
                  size="small"
                  @update:model-value="(categoryName) => handleChangeCategoryName(categoryName)"
                  :model-value="categoryName"
                  placeholder="한글 기준 30자 이내로 입력하세요."
                  class="wf_w-full"
                  :max-bytes="60"
                />
              </FormGroup>
              <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="담당 MD" required :is-border-bottom="false">
                <ProductSearchModalWrapper
                  class="wf-product-base-info-search"
                  :type="ProductSearchType.MD"
                  placeholder-input="MD 조회"
                  label-button="조회"
                  ref="searchMDKeyRef"
                  is-disabled-on-empty-search-text
                  :defaultValue="mdText ?? ''"
                  @selectValue="(value: ProductSearchRecordModel) => handleGetValueProduct(value)"
              /></FormGroup>
            </div>
          </div>
        </div>
        <div class="wf-mt-24">
          <span class="wf-body_01-semi">| 하위 카테고리 정보</span><span class="wf-body_01-mid"> / </span
          ><span class="wf-body_01-reg">(2) Depth</span>
          <div class="wf-register-category-depth-table">
            <DataTableContainer is-select-invisible :value="exhibitionMapData" :column-configs="CategoriesStandardDepth1ManagementHeaderConfig" />
          </div>
        </div>
        <div class="wf_flex wf-flex-row wf-space-x-20 wf_items-center wf_justify-center wf-mt-30">
          <WelfareBigButton button-type="cancel" label="삭제" class="wf_w-200" @click="handleDeleteCat" />
          <WelfareBigButton button-type="default" label="저장" class="wf_w-200" @click="handleAddStdCat" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/categories/standard/standard-categories-depth1-management.css');
</style>

<script lang="ts">
export default {
  name: 'CategoriesStandardDepth1ManagementPage'
}
</script>
