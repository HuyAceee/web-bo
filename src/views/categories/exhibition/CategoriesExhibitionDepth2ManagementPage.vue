<!-- BO_D0202_010101 -->
<script lang="ts" setup>
import { DataTableContainer, TextInputValidationMaxBytes, WelfareBigButton, WelfareMdButton, WelfareRadioGroup, WelfareTag } from '@/components'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useCategoriesExhibitionDepth2Management } from '@/composables/categories/exhibition/useCategoriesExhibitionDepth2Management'
import { ProductSearchRecordModel, ProductSearchType } from '@/models'
import { CategoriesStandardManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'
import { CategoriesExhibitionStatusModel } from '@/models/views/categories/exhibition/CategoriesExhibitionDepth3ManagementModel'
import {
  CategoriesExhibitionDataHeaderExhibitionInDepth2CategoryTableConfig,
  categoriesExhibitionCompanyYnOptions,
  categoriesExhibitionExposureYnOptions
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth2CategoryModel'

const emits = defineEmits<CategoriesStandardManagementEmits>()
const {
  values,
  valueCategoryList,
  valueCompany,
  isLoading,
  handleSelectedCompany,
  handlePushCompany,
  handleRemoveItemCompany,
  handleSetFieldCompanyYn,
  handleSetFieldExposureYn,
  onSaveDspCategoryManage,
  handleRemoveDspCategory,
  searchCustomerRef
} = useCategoriesExhibitionDepth2Management(emits)
</script>

<template>
  <div class="">
    <div class="wf-register-category-depth--container wf-mb-20">
      <div class="wf-register-category-depth">
        <div>
          <div class="wf-sub_tit_01 wf-category-depth--header">카테고리 등록/수정</div>
          <div class="wf-mt-24">
            <span class="wf-body_01-semi">| 카테고리 정보</span><span class="wf-body_01-mid"> / </span><span class="wf-body_01-reg">(2) Depth</span>
            <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="분류">
                  <span class="wf-body_03-reg wf_text--14 wf_text-n-33">
                    {{ values.displayCategoryDepthName !== '' ? values.displayCategoryDepthName : `중분류` }}</span
                  >
                </FormGroup>
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="위치">
                  <span class="wf-body_03-reg wf_text--14 wf_text-n-33">{{ values.upperDisplayCategoryName }}</span>
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-bottom label="카테고리명" required>
                  <TextInputValidationMaxBytes
                    v-model="values.displayCategoryName"
                    size="small"
                    placeholder="한글 기준 30자 이내로 입력하세요."
                    class="wf_flex-1"
                    :max-bytes="60"
                    :disabled="values.displayCategoryExposureYn === CategoriesExhibitionStatusModel.DISPLAY"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-bottom label="전시 여부" required>
                  <div class="wf_flex wf_flex-row wf_justify-between wf_w-full wf_items-center">
                    <WelfareRadioGroup
                      size="sm"
                      :options="categoriesExhibitionExposureYnOptions"
                      :model-value="values.displayCategoryExposureYn"
                      @update:model-value="(value) => handleSetFieldExposureYn(value)"
                    />
                    <span class="wf-body_04-reg wf_text-sub-01">*수정은 비전시 상태로 변경 후 가능합니다.</span>
                  </div>
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup
                  class="wf_flex-1 wf_h-149"
                  custom-class="wf-pb-1 wf-pl-11"
                  is-rounded-bottom
                  label="노출 제외 고객사"
                  :is-border-bottom="false"
                >
                  <div class="wf_w-full">
                    <WelfareRadioGroup
                      size="sm"
                      :options="categoriesExhibitionCompanyYnOptions"
                      :model-value="values.displayExcludedCompanyYn"
                      @update:model-value="(value) => handleSetFieldCompanyYn(value)"
                      :disabled="values.displayCategoryExposureYn === CategoriesExhibitionStatusModel.DISPLAY"
                    />
                    <div class="wf_flex wf_items-center wf-space-x-3 wf-mt-11 wf-mb-6 wf-form-group-small">
                      <ProductSearchModalWithTableWrapper
                        ref="searchCustomerRef"
                        class="wf-product-base-info-search"
                        :type="ProductSearchType.CUSTOMER"
                        placeholder-input="고객사 조회"
                        label-button="검색"
                        @selectValue="(value: ProductSearchRecordModel) => handleSelectedCompany(value)"
                        :disabled="values.displayCategoryExposureYn === CategoriesExhibitionStatusModel.DISPLAY"
                      />
                      <WelfareMdButton
                        label="등록"
                        buttonType="liner"
                        buttonSize="small"
                        @on-click="handlePushCompany"
                        :disabled="values.displayCategoryExposureYn === CategoriesExhibitionStatusModel.DISPLAY"
                      />
                    </div>
                    <div
                      class="wf-btn-border--ncc wf_flex wf_items-center wf-product-base-tag-wrap wf_flex-wrap wf-pr-7 wf-pl-6 wf-py-5 wf_br-4 wf_w-full wf_h-53"
                    >
                      <WelfareTag
                        v-for="(keyword, idx) in valueCompany"
                        v-bind:key="idx + keyword.customerKey"
                        @icon-click="() => handleRemoveItemCompany(idx)"
                        :disabled="values.displayCategoryExposureYn === CategoriesExhibitionStatusModel.DISPLAY"
                        >{{ `(${keyword.customerKey}) ${keyword.customerName}` }}</WelfareTag
                      >
                    </div>
                  </div>
                </FormGroup>
              </div>
            </div>
          </div>
          <div class="wf-mt-24">
            <span class="wf-body_01-semi">| 하위 카테고리 정보</span><span class="wf-body_01-mid"> / </span
            ><span class="wf-body_01-reg">(3) Depth</span>
            <div class="wf-register-category-depth-table">
              <DataTableContainer
                is-select-invisible
                :column-configs="CategoriesExhibitionDataHeaderExhibitionInDepth2CategoryTableConfig"
                :value="valueCategoryList"
                :loading="isLoading"
              />
            </div>
          </div>
        </div>
        <div class="wf-register-category-depth-actions wf-gap-20">
          <WelfareBigButton button-type="cancel" label="삭제" class="wf_w-200" @on-click="handleRemoveDspCategory" />
          <WelfareBigButton button-type="default" label="저장" class="wf_w-200" @on-click="onSaveDspCategoryManage" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/categories/standard/standard-categories-depth1-management.css');
@import url('@/assets/css/view/categories/exhibition/categories-exhibition-in-depth-category.css');
</style>
<script lang="ts">
export default {
  name: 'CategoriesExhibitionInDepth2ManagementPage'
}
</script>
