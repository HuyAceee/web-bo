<!-- BO_I0306_020101_P -->
<script setup lang="ts">
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  DataTablePaginationWithCheckbox,
  HeaderModal,
  WelfareInputText,
  WelfareMdButton,
  WelfareRadioGroup,
  WelfareSelect
} from '@/components'
import {
  exhibitionCommonFlagRegistrationDisplayYnOption,
  exhibitionCommonFlagRegistrationExhibitionManagementTableConfig,
  exhibitionCommonFlagRegistrationFlagTypeOption,
  ExhibitionCommonFlagRegistrationPopupProps,
  exhibitionCommonFlagRegistrationTargetProductTypeOptions
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonFlagRegistrationPopupModel'
import { DEFAULT_DATE_TIME_FORMAT, TEXT_MAX_NUMBER_3 } from '@/common'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import Column from 'primevue/column'
import { useExhibitionFlagRegistrationPopupLogic } from '@/composables/exhibition/exhibitionCommon/useExhibitionFlagRegistrationPopup'

const props = defineProps<ExhibitionCommonFlagRegistrationPopupProps>()
const {
  values,
  setFieldValue,
  onRegistration,
  categoryDepth1,
  categoryDepth2,
  categoryDepth3,
  onImageUpload,
  onClosePopup,
  onDeleteImage,
  productData,
  removeFromTable,
  onSelectAllChange,
  onRowSelected,
  tableRef,
  onSave,
  displayOrderValidate
} = useExhibitionFlagRegistrationPopupLogic(props)
</script>

<template>
  <div class="flag-registration wf_text-n-33">
    <HeaderModal title="플래그 등록" @close-modal="onClosePopup" />
    <div class="wf-p-20 wf-width-full">
      <CommonTable>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="플래그 명" is-first-col required />
          <CommonTableContentCell>
            <WelfareInputText
              class="wf-width-full"
              size="small"
              :model-value="values.flagName"
              @update:model-value="(value) => setFieldValue('flagName', value)"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="플래그 코드" />
          <CommonTableContentCell class="wf-body_03-reg">{{ values.flagKey }}</CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="구분" is-first-col required />
          <CommonTableContentCell>
            <WelfareRadioGroup
              :options="exhibitionCommonFlagRegistrationFlagTypeOption"
              size="sm"
              :model-value="values.flagType"
              @update:model-value="(value) => setFieldValue('flagType', value)"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="대상 상품" />
          <CommonTableContentCell>
            <WelfareRadioGroup
              :options="exhibitionCommonFlagRegistrationTargetProductTypeOptions"
              size="sm"
              :model-value="values.targetProductType"
              @update:model-value="(value) => setFieldValue('targetProductType', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="전시 카테고리" is-first-col />
          <CommonTableContentCell class="wf-space-x-6">
            <WelfareSelect
              placeholder="1차 분류"
              required
              :options="categoryDepth1"
              small
              class="wf_w-180"
              :model-value="values.categoryDepthId1"
              @update:model-value="(value) => setFieldValue('categoryDepthId1', value)"
              option-label="label"
              option-value="value"
            />
            <WelfareSelect
              placeholder="2차 분류"
              required
              :options="categoryDepth2"
              small
              class="wf_w-180"
              :model-value="values.categoryDepthId2"
              @update:model-value="(value) => setFieldValue('categoryDepthId2', value)"
              option-label="label"
              option-value="value"
            />
            <WelfareSelect
              placeholder="3차 분류"
              :options="categoryDepth3"
              small
              class="wf_w-180"
              :model-value="values.categoryDepthId3"
              @update:model-value="(value) => setFieldValue('categoryDepthId3', value)"
              option-label="label"
              option-value="value"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="전시 여부" is-first-col required />
          <CommonTableContentCell>
            <WelfareRadioGroup
              :options="exhibitionCommonFlagRegistrationDisplayYnOption.slice(1)"
              size="sm"
              :model-value="values.displayYn"
              @update:model-value="(value) => setFieldValue('displayYn', value)"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="전시 순서" required />
          <CommonTableContentCell>
            <WelfareInputText
              :max-length="TEXT_MAX_NUMBER_3"
              @input="displayOrderValidate"
              size="small"
              class="wf_w-180"
              :model-value="values.flagDisplayOrder"
              @update:model-value="(value) => setFieldValue('flagDisplayOrder', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="전시 시작일시" is-first-col required />
          <CommonTableContentCell>
            <DateTimePicker
              size="small"
              type="date-time"
              :format="DEFAULT_DATE_TIME_FORMAT"
              :max-date="values.displayEndDate"
              :model-value="values.displayStartDate"
              @update:model-value="(value) => setFieldValue('displayStartDate', value)"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="전시 종료일시" required />
          <CommonTableContentCell>
            <DateTimePicker
              size="small"
              type="date-time"
              :format="DEFAULT_DATE_TIME_FORMAT"
              :min-date="values.displayStartDate"
              :model-value="values.displayEndDate"
              @update:model-value="(value) => setFieldValue('displayEndDate', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="플래그 이미지" is-first-col required />
          <CommonTableContentCell class="wf-space-x-4">
            <WelfareInputText size="small" class="wf_width-full" readonly @click="onImageUpload" :model-value="values.imageName" />
            <WelfareMdButton button-type="liner" button-size="small" label="삭제" @click="onDeleteImage" />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="이미지 alt" is-first-col required />
          <CommonTableContentCell>
            <WelfareInputText
              class="wf-width-full"
              size="small"
              :model-value="values.imageAltName"
              @update:model-value="(value) => setFieldValue('imageAltName', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>
      <CommonTable class="wf-mt-10">
        <CommonTableRow height="44">
          <CommonTableTitleCell title="등록자" is-first-col />
          <CommonTableContentCell class="wf-body_03-reg">{{ values.createdByName }}</CommonTableContentCell>
          <CommonTableTitleCell title="등록일시" />
          <CommonTableContentCell class="wf-body_03-reg">{{ values.createdDate }}</CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="수정자" is-first-col />
          <CommonTableContentCell class="wf-body_03-reg">{{ values.lastModifiedByName }}</CommonTableContentCell>
          <CommonTableTitleCell title="수정일시" />
          <CommonTableContentCell class="wf-body_03-reg">{{ values.lastModifiedDate }}</CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>
      <DataTablePaginationWithCheckbox
        ref="tableRef"
        @select-all-change="onSelectAllChange"
        @row-checked-change="onRowSelected"
        no-data-label="전시 목록이 없습니다."
        :select-props="{ options: [] }"
        class="wf-mt-20"
        :value="productData"
      >
        <template #title>
          <p class="wf-body_01-semi">전시 목록 관리&nbsp;&nbsp;총 {{ productData.length ?? 0 }} 건</p>
        </template>
        <template #buttons>
          <div class="wf-space-x-4 wf_flex">
            <WelfareMdButton label="등록" button-type="liner" button-size="small" @click="onRegistration" />
            <WelfareMdButton label="선택삭제" button-type="liner" button-size="small" @click="removeFromTable" />
          </div>
        </template>
        <template #columns>
          <Column
            v-for="(col, index) in exhibitionCommonFlagRegistrationExhibitionManagementTableConfig"
            :key="index"
            :header="col.header"
            :class="col.class"
            :column-key="col.header"
          >
            <template #body="slotProps">
              <p :class="{ 'wf-text_link': col.field === 'productKey' }">{{ slotProps.data?.[col.field] }}</p>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf-mt-20">
        <WelfareMdButton class="wf_w-120" label="닫기" button-type="cancel" @click="onClosePopup" />
        <WelfareMdButton class="wf_w-120" label="저장" button-type="default" @click="onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/common/exhibition-common-flag-registration-popup.css');
</style>
