<script lang="ts" setup>
import {
  BulletinFilterList,
  BulletinDateRange,
  BulletinFilterGroupRadio,
  BulletinSearchOption,
  WelfareSelect,
  DataTablePaginationWithCheckbox,
  WelfareMdButton,
  BulletinInputTable
} from '@/components'
import { ImgLoader } from '@/assets/images'
import Column from 'primevue/column'
import { useFaqMngtList } from '@/composables'
import { handleRedirectLink } from '@/common/html'
import { bulletinFaqMngtCreate, bulletinFaqMngtDetail } from '../bulletinRouter'

const {
  refTable,
  formValues,
  currentActiveDate,
  optionsPeriodType,
  optionsQuestionType,
  popularQuestions,
  exhibitionStatus,
  optionsText,
  isLoading,
  items,
  totalItems,
  disableField,
  isReadOnlySearchWord,
  handleReadOnlySearchWord,
  onPageChange,
  onRowClick,
  onRowSelected,
  onSelectAllChange,
  handleChangeValueSelect,
  onChangeFilterDate,
  onSubmit,
  onResetForm,
  handleDelete,
  handleHide,
  onSubmitTable
} = useFaqMngtList()
</script>
<template>
  <div class="wf-frame1000002102">
    <BulletinFilterList :on-submit="onSubmit" :on-reset-form="onResetForm">
      <div class="wf-tn-list-body-filter">
        <div class="wf-tn-list-body-filter-row">
          <div class="tn-title-filter-row-top-container">
            <p class="wf-body_02-semi wf_text-n-33">기간</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container wf-space-x-6">
            <div class="select-box wf_w-180">
              <WelfareSelect
                :disabled="disableField"
                @update:model-value="(value) => handleChangeValueSelect('periodType', value)"
                :modelValue="formValues.periodType"
                optionLabel="label"
                :options="optionsPeriodType"
                small
              />
            </div>
            <BulletinDateRange
              :disabled="disableField"
              :from-date="formValues.fromDate"
              :to-date="formValues.toDate"
              :current-active-date="currentActiveDate"
              :on-change-date-from="(value) => handleChangeValueSelect('fromDate', value)"
              :on-change-date-to="(value) => handleChangeValueSelect('toDate', value)"
              :on-change-filter-date="onChangeFilterDate"
            />
          </div>
        </div>
        <div class="wf-tn-list-body-filter-row">
          <div class="tn-title-filter-row-container">
            <p class="wf-body_02-semi wf_text-n-33">질문 유형</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <div class="select-box wf_w-180">
              <WelfareSelect
                :disabled="disableField"
                @update:model-value="(value) => handleChangeValueSelect('questionType', value)"
                :modelValue="formValues.questionType"
                optionLabel="label"
                :options="optionsQuestionType"
                small
              />
            </div>
          </div>
        </div>
        <div class="wf-tn-list-body-filter-row">
          <div class="tn-title-filter-row-container">
            <p class="wf-body_02-semi wf_text-n-33">전시여부</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <BulletinFilterGroupRadio
              :disabled="disableField"
              :options="exhibitionStatus"
              :model-value="formValues.exhibition"
              :on-change="(value) => handleChangeValueSelect('exhibition', value)"
            />
          </div>
          <div class="tn-title-filter-row-center-container">
            <p class="wf-body_02-semi wf_text-n-33">인기 질문</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <BulletinFilterGroupRadio
              :disabled="disableField"
              :options="popularQuestions"
              :model-value="formValues.popularQuestion"
              :on-change="(value) => handleChangeValueSelect('popularQuestion', value)"
            />
          </div>
        </div>
        <div class="wf-tn-list-body-filter-row-last">
          <div class="tn-title-filter-row-bottom-container">
            <p class="wf-body_02-semi wf_text-n-33">검색어</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <BulletinSearchOption
              :isReadOnlySearchWord="isReadOnlySearchWord"
              :handle-read-only-search-word="handleReadOnlySearchWord"
              :options="optionsText"
              :model-value-input="formValues.searchWord"
              :model-value-select="formValues.selectWord"
              :on-change-input="(value) => handleChangeValueSelect('searchWord', value)"
              :on-change-select="(value) => handleChangeValueSelect('selectWord', value)"
            />
          </div>
        </div>
      </div>
    </BulletinFilterList>
    <div class="wf-tn-list-body-table" id="bb-review-table">
      <form @submit="onSubmitTable">
        <DataTablePaginationWithCheckbox
          :value="items"
          :loading="isLoading"
          :total-records="totalItems"
          v-on:row-click="onRowClick"
          @page-change="onPageChange"
          @row-checked-change="onRowSelected"
          @select-all-change="onSelectAllChange"
          ref="refTable"
        >
          <template #loading>
            <div class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
              <img class="wf-loading-table" :src="ImgLoader" />
            </div>
          </template>
          <template #title>
            <div class="wf_flex-1 wf_flex wf_text-n-33">
              <h6>조회 결과 (총 {{ totalItems }}건)</h6>
            </div>
          </template>
          <template #buttons>
            <div class="wf-space-x-6 wf_flex">
              <WelfareMdButton label="삭제" buttonType="liner" @click="handleDelete" />
              <WelfareMdButton label="비전시처리" buttonType="liner" @click="handleHide" />
              <WelfareMdButton label="순서저장" buttonType="liner" type="submit" />
              <WelfareMdButton label="등록" buttonType="default" @click="handleRedirectLink(bulletinFaqMngtCreate ?? '')" />
            </div>
          </template>
          <template #columns>
            <Column field="id" header="NO." class="wf-nowrap"></Column>
            <Column header="게시글코드">
              <template #body="slotProps">
                <a target="_blank" :href="`${bulletinFaqMngtDetail}/${slotProps.data.zipCode}`"> FAQ{{ slotProps.data.id }} </a>
              </template>
            </Column>
            <Column field="popularQuestion" header="인기질문" class="wf-nowrap"></Column>
            <Column field="ExhibitionOrder" header="전시순서" class="wf-nowrap">
              <template #body="slotProps">
                <BulletinInputTable
                  :disabled="slotProps.data?.popularQuestion === '비해당'"
                  inputType="number"
                  class="wrap-input text-input-center"
                  size="small"
                  :id="slotProps.data?.id"
                  :model-value="slotProps.data?.ExhibitionOrder"
                />
              </template>
            </Column>
            <Column field="questionType" header="질문유형" class="wf-nowrap"></Column>
            <Column field="question" header="질문" class="wf-nowrap"></Column>
            <Column field="ExhibitionStatus" header="전시여부" class="wf-nowrap"></Column>
            <Column field="modifier" header="수정자" class="wf-nowrap"></Column>
            <Column field="modification" header="수정일시" class="wf-nowrap"></Column>
            <Column field="registrant" header="등록자" class="wf-nowrap"></Column>
            <Column field="writtenDateTime" header="등록일시" class="wf-nowrap"></Column>
          </template>
        </DataTablePaginationWithCheckbox>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/bulletin/faqMngt/FaqMngtList.css');
</style>
