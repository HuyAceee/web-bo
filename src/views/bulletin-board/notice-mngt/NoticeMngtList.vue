<script setup lang="ts">
import Column from 'primevue/column'
import { ImgLoader } from '@/assets'
import { useNoticeMngtList } from '@/composables'
import { handleRedirectLink } from '@/common/html'
import {
  BulletinFilterList,
  BulletinDateRange,
  BulletinFilterGroupRadio,
  WelfareInputText,
  WelfareMdButton,
  BulletinSearchOption,
  DataTablePaginationWithCheckbox
} from '@/components'
import { bulletinNoticeMngtCreate, bulletinNoticeMngtDetail } from '../bulletinRouter'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { ProductSearchType } from '@/models'
const {
  exhibitionStatus,
  noticeCategory,
  customerDesignation,
  optionsText,
  currentActiveDate,
  formValues,
  isLoading,
  items,
  totalItems,
  disableField,
  refTable,
  isReadOnlySearchWord,
  searchCustomerRef,
  changeKeywordCustomer,
  handleReadOnlySearchWord,
  onPageChange,
  onRowClick,
  onSelectAllChange,
  onRowSelected,
  handleChangeValueSelect,
  onChangeFilterDate,
  onSubmit,
  onResetForm,
  handleDelete,
  handleHide
} = useNoticeMngtList()
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
            <p class="wf-body_02-semi wf_text-n-33">공지 구분</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <BulletinFilterGroupRadio
              :disabled="disableField"
              :options="noticeCategory"
              :model-value="formValues.classification"
              :on-change="(value) => handleChangeValueSelect('classification', value)"
            />
          </div>
          <div class="tn-title-filter-row-center-container">
            <p class="wf-body_02-semi wf_text-n-33">전시 여부</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <BulletinFilterGroupRadio
              :disabled="disableField"
              :options="exhibitionStatus"
              :model-value="formValues.exhibition"
              :on-change="(value) => handleChangeValueSelect('exhibition', value)"
            />
          </div>
        </div>
        <div class="wf-tn-list-body-filter-row">
          <div class="tn-title-filter-row-container">
            <p class="wf-body_02-semi wf_text-n-33">고객사 지정</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <BulletinFilterGroupRadio
              :disabled="disableField"
              :options="customerDesignation"
              :model-value="formValues.designation"
              :on-change="(value) => handleChangeValueSelect('designation', value)"
            />
          </div>
          <div class="tn-title-filter-row-center-container">
            <p class="wf-body_02-semi wf_text-n-33">고객사</p>
          </div>
          <div class="wf_flex wf_items-center tn-filter-row-field-container">
            <div class="wf-tn-176 wf_flex wf-space-x-4">
              <ProductSearchModalWithTableWrapper
                :disabled="disableField"
                ref="searchCustomerRef"
                @selectValue="changeKeywordCustomer"
                class="wf-product-base-info-search"
                :type="ProductSearchType.CUSTOMER"
                placeholder-input="고객사 조회"
                label-button="조회"
              />
            </div>
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
            <WelfareMdButton label="등록" buttonType="default" @click="handleRedirectLink(bulletinNoticeMngtCreate ?? '')" />
          </div>
        </template>
        <template #columns>
          <Column field="id" header="NO." class="wf-nowrap"></Column>
          <Column header="게시글코드">
            <template #body="slotProps">
              <a target="_blank" :href="`${bulletinNoticeMngtDetail}/${slotProps.data.zipCode}`"> NO{{ slotProps.data.id }} </a>
            </template>
          </Column>
          <Column field="classification" header="공지구분" class="wf-nowrap"></Column>
          <Column field="CustomereSignation" header="고객사지정" class="wf-nowrap"></Column>
          <Column field="title" header="제목" class="wf-nowrap"></Column>
          <Column field="status" header="전시여부" class="wf-nowrap"></Column>
          <Column field="modifier" header="수정자" class="wf-nowrap"></Column>
          <Column field="modification" header="수정일시" class="wf-nowrap"></Column>
          <Column field="registrant" header="등록자" class="wf-nowrap"></Column>
          <Column field="writtenDateTime" header="등록일시" class="wf-nowrap"></Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/bulletin/notice_mgnt/NoticeMngtList.css');
</style>
