<!-- BO_I0107_010101 -->
<script lang="ts" setup>
import CategoriesTreeMenuNode from '@/components/categories/common/CategoriesTreeMenuNode.vue'
import ExhibitionCategoryList from '@/components/exhibition/ExhibitionCategoryList.vue'
import ExhibitionSubCategoryDetail from '@/components/exhibition/ExhibitionSubCategoryDetail.vue'
import ExhibitionSubCategoryList from '@/components/exhibition/ExhibitionSubCategoryList.vue'
import ExhibitionTopCategoryDetail from '@/components/exhibition/ExhibitionTopCategoryDetail.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useExhibitionHallCategoryManagement } from '@/composables/exhibition/exhibitionContent/useExhibitionHallCategoryManagement'
import { ProductSearchType, YnOptions } from '@/models'

const {
  customerData,
  customerSearchRef,
  exhibitionHallCategoryTreeComputed,
  exhibitionHallCategoryDetail,
  categoryDetailFormValues,
  exhibitionSubHallCategoryRegistered,
  exhibitionSubHallCategoryDetail,
  showComputed,
  onSelectCompany,
  onSelectTreeItem,
  setCategoryDetailFormFieldValue,
  onReset,
  onSaveCategoryDetail,
  onSaveSubCategoryList,
  onSaveSubCategoryDetail,
  handleDeleteSubCategory
} = useExhibitionHallCategoryManagement()
</script>

<template>
  <div class="wf_border-page">
    <div class="exhibition-container-form">
      <div class="wf_flex wf-space-x-20">
        <div class="wf_w-406 wf_flex-shrink-0 wf-space-y-10">
          <ProductTitle title="카테고리 목록" />
          <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf_flex wf_items-center">
            <FormGroup label="고객사 조회" is-rounded-top is-rounded-bottom :is-border-bottom="false">
              <ProductSearchModalWithTableWrapper
                ref="customerSearchRef"
                class="wf_m-w-228"
                placeholder-input="고객사 (고객사 코드)"
                :type="ProductSearchType.CUSTOMER"
                reverse-search-text
                @select-value="onSelectCompany"
              />
            </FormGroup>
          </div>
          <div class="wf-product-tree-menu wf-product-tree-menu--border">
            <div>
              <CategoriesTreeMenuNode
                root-name="전시관 카테고리"
                :tree="exhibitionHallCategoryTreeComputed"
                @menu-item-selected="(event) => onSelectTreeItem(event)"
                :has-wrapper="false"
              />
            </div>
          </div>
        </div>
        <div class="wf_w-full wf_exhibition-table-container-hotfix">
          <div>
            <ExhibitionCategoryList :customer="customerData" :data="[exhibitionHallCategoryDetail]" @reset="onReset" />
            <div v-if="showComputed.hallCategoryDetail" class="wf-mt-20">
              <ExhibitionTopCategoryDetail
                :data="categoryDetailFormValues"
                @set-field-value="setCategoryDetailFormFieldValue"
                @save="onSaveCategoryDetail"
              />
            </div>
            <div v-if="showComputed.hallCategoryDetail && categoryDetailFormValues?.sclassUseYn === YnOptions.Y" class="wf-mt-20">
              <ExhibitionSubCategoryList
                :registered-data="exhibitionSubHallCategoryRegistered"
                :exhibition-status="categoryDetailFormValues.sclassUseYn"
                @save="(data) => onSaveSubCategoryList(data)"
                @delete="(data) => handleDeleteSubCategory(data)"
              />
              <div v-if="showComputed.hallSubCategoryDetail" class="wf-mt-20">
                <ExhibitionSubCategoryDetail :data="exhibitionSubHallCategoryDetail" @save="onSaveSubCategoryDetail" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ExhibitionHallCategoryManagementPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/exhibition/exhibition-hall-category-management.css');
@import url('@/assets/css/view/exhibition/common/exhibition-common.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
@import url('@/assets/css/widgets/categoryTreeMenu/categories-tree-menu.css');
</style>
