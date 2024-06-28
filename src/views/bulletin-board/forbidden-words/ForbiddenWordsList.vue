<script setup lang="ts">
import Column from 'primevue/column'
import { ImgLoader } from '@/assets'
import { useForbiddenWordsList } from '@/composables'
import { BulletinFilterList, BulletinDateRange, WelfareInputText, WelfareMdButton, DataTablePaginationWithCheckbox } from '@/components'
const {
  currentActiveDate,
  formValues,
  isLoading,
  items,
  totalItems,
  refTable,
  onPageChange,
  onRowClick,
  onSelectAllChange,
  onRowSelected,
  handleChangeValueSelect,
  onChangeFilterDate,
  onSubmit,
  onResetForm,
  handleDelete,
  handleAddWord
} = useForbiddenWordsList()
</script>

<template>
  <div class="wf-frame1000002102">
    <BulletinFilterList :on-submit="onSubmit" :on-reset-form="onResetForm">
      <div class="wf-tn-list-body-filter">
        <div class="wf-tn-list-body-filter-row">
          <div class="tn-title-filter-row-top-container">
            <p class="wf-body_02-semi wf_text-n-33">등록일</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <BulletinDateRange
              :from-date="formValues.fromDate"
              :to-date="formValues.toDate"
              :current-active-date="currentActiveDate"
              :on-change-date-from="(value) => handleChangeValueSelect('fromDate', value)"
              :on-change-date-to="(value) => handleChangeValueSelect('toDate', value)"
              :on-change-filter-date="onChangeFilterDate"
            />
          </div>
        </div>
        <div class="wf-tn-list-body-filter-row-last">
          <div class="tn-title-filter-row-bottom-container">
            <p class="wf-body_02-semi wf_text-n-33">금칙어</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <div class=" wf_w-180">
            <WelfareInputText
              :modelValue="formValues.forbiddenWord"
              @update:modelValue="(value) => handleChangeValueSelect('forbiddenWord', value)"
              size="small"
              inputType="text"
              class="wrap-input"
              placeholder="금칙어 입력"
            />
          </div>
          </div>
          <div class="tn-title-filter-row-center-container">
            <p class="wf-body_02-semi wf_text-n-33">고객사</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <div class="wf_w-180">
              <WelfareInputText
                :modelValue="formValues.registrantName"
                @update:modelValue="(value) => handleChangeValueSelect('registrantName', value)"
                size="small"
                inputType="text"
                class="wrap-input"
                placeholder="등록자명 입력"
              />
            </div>
          </div>
        </div>
      </div>
    </BulletinFilterList>
    <div class="wf-tn-list-body-table" id="bb-review-table">
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
            <WelfareMdButton label="등록" buttonType="default" @click="handleAddWord" />
          </div>
        </template>
        <template #columns>
          <Column field="id" header="NO." class="wf-nowrap"></Column>
          <Column header="금칙어코드" field="goldenAccord" class="wf-nowrap"> </Column>
          <Column field="forbiddenWord" header="금칙어" class="wf-nowrap"></Column>
          <Column field="writtenDateTime" header="등록일시" class="wf-nowrap"></Column>
          <Column field="registrant" header="등록자" class="wf-nowrap"></Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/bulletin/forbidden-words/forbidden-words-list.css');
</style>
