<!-- BO_D0103_010101 -->
<script setup lang="ts">
import { TEXT_MAX_NUMBER_60 } from '@/common'
import { TextInputValidationMaxBytes } from '@/components'
import { DataTableContainer, WelfareBigButton, WelfareMdButton } from '@/components/uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useCategoriesStandardDepth3Management } from '@/composables/categories/standard/useCategoriesStandardDepth3Management'
import { DataTableContainerConfigModel, YnOptions, productDisplayYnOptions } from '@/models'
import { CategoriesStandardManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'

const emits = defineEmits<CategoriesStandardManagementEmits>()
const { exhibitionMapData, handleAddStdCat, detailStdCat, handleDeleteCat, handleChangeCategoryName, categoryName, openMappingExhibitionModal } =
  useCategoriesStandardDepth3Management(emits)
const columnConfigs: DataTableContainerConfigModel[] = [
  { header: '전시 카테고리', field: 'displayCategoryPathName', class: 'wf_m-w-614' },
  { header: '대표 여부', field: 'representativeDisplayCategoryYn', class: 'wf_m-w-120' },
  { header: '상품수', field: 'productCount', class: 'wf_m-w-200' }
]
</script>

<template>
  <div class="wf_text-n-33">
    <div class="wf_flex wf-flex-row wf-space-x-20">
      <div class="wf_flex wf_flex-col wf_flex-grow-1">
        <div class="wf-sub_tit_01 wf-category-menu--header">카테고리 등록/수정</div>
        <div class="wf-mt-14">
          <div><span class="wf-body_01-mid">| 카테고리 정보 / </span><span class="wf-body_01-reg">(3) Depth</span></div>

          <div class="wf_flex wf_flex-col wf-mt-10 wf-category-form-wrapper">
            <div class="wf_flex wf-flex-row">
              <FormGroup class="wf_flex-1" label="분류" is-rounded-top>
                <div class="wf_flex wf-space-x-3 wf_items-center wf-body_03-reg">
                  {{ detailStdCat?.standardCategoryDepthName ? detailStdCat?.standardCategoryDepthName : '소분류' }}
                </div>
              </FormGroup>
              <FormGroup class="wf_flex-1" label="위치" is-border-left>
                <div class="wf_flex wf-space-x-3 wf_items-center wf-body_03-reg">{{ detailStdCat?.upperStandardCategoryName }}</div>
              </FormGroup>
            </div>
            <FormGroup class="wf_flex-1" label="카테고리 명" required :is-border-bottom="false" is-rounded-bottom>
              <TextInputValidationMaxBytes
                size="small"
                @update:model-value="(categoryName) => handleChangeCategoryName(categoryName)"
                :model-value="categoryName"
                placeholder="한글 기준 30자 이내로 입력하세요."
                class="wf_flex-grow-1"
                :max-bytes="TEXT_MAX_NUMBER_60"
              />
            </FormGroup>
          </div>
        </div>

        <div class="wf-mt-26">
          <div class="wf_flex wf-flex-row wf_items-center wf_justify-between">
            <span class="wf-body_01-mid">| 전시 카테고리 맵핑 현황</span>
            <WelfareMdButton label="등록" buttonType="default" buttonSize="small" class="wf_w-44" @click="openMappingExhibitionModal" />
          </div>

          <div class="wf_flex wf_flex-col wf-mt--4">
            <DataTableContainer
              :columnConfigs="columnConfigs"
              :value="exhibitionMapData"
              hiddenPagination
              isSelectInvisible
              no-data-label="조회 리스트가 없습니다."
            >
              <template #body-representativeDisplayCategoryYn="{ props }">
                {{ props.data.representativeDisplayCategoryYn === YnOptions.Y ? productDisplayYnOptions[0].label : productDisplayYnOptions[1].label }}
              </template>
            </DataTableContainer>
          </div>
        </div>

        <div class="wf_flex wf-flex-row wf-space-x-20 wf_items-center wf_justify-center wf-mt-30">
          <WelfareBigButton label="삭제" class="wf_w-200" button-type="cancel" @click="handleDeleteCat" />
          <WelfareBigButton label="저장" class="wf_w-200" button-type="default" @click="handleAddStdCat" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ProductStandardCategoriesD3'
}
</script>

<style scoped>
@import url('@/assets/css/view/categories/standard/standard-categories-depth3-management.css');
</style>
