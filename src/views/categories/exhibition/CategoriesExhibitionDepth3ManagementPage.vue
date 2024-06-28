<!-- BO_D0102_010101 -->
<script setup lang="ts">
import { DataTableContainer, TextInputWithMaxLengthCharacters, WelfareBigButton, WelfareMdButton, WelfareRadioGroup, WelfareTag } from '@/components'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useCategoriesExhibitionDepth3Management } from '@/composables/categories/exhibition/useCategoriesExhibitionDepth3Management'
import { ProductSearchType } from '@/models'
import { CategoriesDspManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'
import {
  categoriesExhibitionDepth3ManagementModelHeaderConfig,
  categoriesExhibitionRegisterStatusOptions,
  categoriesExhibitionStatusOptions
} from '@/models/views/categories/exhibition/CategoriesExhibitionDepth3ManagementModel'

const emits = defineEmits<CategoriesDspManagementEmits>()
const {
  values,
  setFieldValue,
  handleSubmitForm,
  changeKeywordCustomer,
  handleAddTagKeywordCustomer,
  searchCustomerRef,
  handleRemoveTagKeywordCustomer,
  lowDspCategoryList,
  handleDeleteCategory,
  categoryDetail,
  isDisabled
} = useCategoriesExhibitionDepth3Management(emits)
</script>

<template>
  <div class="wf-mb-20">
    <div class="wf_w-full wf-register-category-depth">
      <div>
        <div class="wf-sub_tit_01 wf-category-depth--header">카테고리 등록/수정</div>
        <div class="wf-mt-24">
          <span class="wf-body_01-semi">| 카테고리 정보</span><span class="wf-body_01-mid"> / </span><span class="wf-body_01-reg">(3) Depth</span>
          <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
            <div class="wf_flex wf_items-center">
              <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="분류">
                <span class="wf-body_03-reg wf_text-n-33">{{ categoryDetail.displayCategoryDepthName ?? '소분류' }}</span>
              </FormGroup>
              <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="위치">
                <span class="wf-body_03-reg wf_text-n-33">{{ categoryDetail.upperDisplayCategoryName }}</span>
              </FormGroup>
            </div>
            <div class="wf_flex wf_items-center">
              <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-bottom label="카테고리 명" required>
                <TextInputWithMaxLengthCharacters
                  class="wf_w-full"
                  :model-value="values.displayCategoryName"
                  @update:model-value="(value: string) => setFieldValue('displayCategoryName', value)"
                  size="small"
                  inputType="text"
                  placeholder="한글 기준 30자 이내로 입력하세요"
                  :max-length="30"
                  hidden-warning
                  :disabled="isDisabled"
                />
              </FormGroup>
            </div>
            <div class="wf_flex wf_items-center">
              <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-bottom label="전시 여부" required>
                <div class="wf_flex wf_flex-row wf_justify-between wf_w-full wf_items-center">
                  <WelfareRadioGroup
                    :options="categoriesExhibitionStatusOptions"
                    size="sm"
                    :model-value="values.displayCategoryExposureYn"
                    @update:model-value="(value) => setFieldValue('displayCategoryExposureYn', value)"
                  />
                  <span class="wf-body_04-reg wf_text-sub-01">*수정은 비전시 상태로 변경 후 가능합니다.</span>
                </div>
              </FormGroup>
            </div>
            <div class="wf_flex wf_items-center">
              <FormGroup
                class="wf_flex-1 wf_h-147"
                custom-class="wf-pb-1 wf-pl-11"
                is-rounded-bottom
                label="노출 제외 기업"
                :is-border-bottom="false"
              >
                <div class="wf_w-full">
                  <WelfareRadioGroup
                    :options="categoriesExhibitionRegisterStatusOptions"
                    size="sm"
                    :disabled="isDisabled"
                    :model-value="values.displayExcludedCompanyYn"
                    @update:model-value="(value) => setFieldValue('displayExcludedCompanyYn', value)"
                  />
                  <div class="wf_flex wf_items-center wf-space-x-3 wf-mt-13 wf-mb-7 wf-form-group-small">
                    <ProductSearchModalWithTableWrapper
                      ref="searchCustomerRef"
                      class="wf-product-base-info-search"
                      :type="ProductSearchType.CUSTOMER"
                      placeholder-input="고객사 조회"
                      label-button="조회"
                      :disabled="isDisabled"
                      @select-value="(value) => changeKeywordCustomer(value)"
                    />
                    <WelfareMdButton
                      label="등록"
                      :disabled="isDisabled"
                      buttonType="liner"
                      buttonSize="small"
                      @on-click="handleAddTagKeywordCustomer"
                    />
                  </div>
                  <div
                    class="wf-btn-border--ncc wf_flex wf_items-center wf-product-base-tag-wrap wf_flex-wrap wf-pr-7 wf-pl-6 wf-py-5 wf_br-4 wf_min-h-53 wf_w-full"
                  >
                    <WelfareTag
                      :disabled="isDisabled"
                      v-for="(keyword, idx) in values.boDspCatExpsrExclEntInsertList"
                      v-bind:key="idx + keyword"
                      @click="() => !isDisabled && handleRemoveTagKeywordCustomer(idx)"
                      >{{ keyword }}</WelfareTag
                    >
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>
        </div>
        <div class="wf-mt-24">
          <span class="wf-body_01-semi">| 표준 카테고리 맵핑 현황</span>
          <div class="wf-register-category-depth-table wf_exhibition-table-container-hotfix">
            <DataTableContainer
              :value="lowDspCategoryList"
              is-select-invisible
              :column-configs="categoriesExhibitionDepth3ManagementModelHeaderConfig"
            />
          </div>
        </div>
      </div>
      <div class="wf-register-category-depth-actions wf-gap-20">
        <WelfareBigButton button-type="cancel" label="삭제" class="wf_w-200" @on-click="handleDeleteCategory" />
        <WelfareBigButton button-type="default" label="저장" class="wf_w-200" @on-click="handleSubmitForm" />
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
