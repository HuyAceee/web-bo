<script lang="ts" setup>
import {
  BulletinCustomerDesignation,
  BulletinFilterGroupRadio,
  BulletinInputUpdateValue,
  BulletinWrapDetailCreate,
  WelfareEditor,
  WelfareInputText
} from '@/components'
import { useNoticeMngtDetail } from '@/composables'
import { handleRedirectLink } from '@/common/html'
import { bulletinNoticeMngtList } from '../bulletinRouter'
import { ProductSearchType } from '@/models'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'

const {
  exhibitionStatus,
  formValues,
  isReadonlyTitle,
  noticeCategory,
  customerDesignation,
  searchCustomerRef,
  changeKeywordCustomer,
  handleChangeValueSelect,
  onSubmit,
  changeReadonlyTitle,
  onOpenSearchCustomer,
  handleRemoveTag
} = useNoticeMngtDetail()
</script>
<template>
  <BulletinWrapDetailCreate :onSubmit="onSubmit" :onBack="() => handleRedirectLink(bulletinNoticeMngtList ?? '')">
    <div>
      <div class="tn-nm-detail-info-widget">
        <div class="wf-tn-list-body-filter">
          <div class="wf-tn-list-body-filter-row">
            <div class="tn-title-filter-row-top-container">
              <p class="wf-body_02-semi wf_text-n-33">게시글 코드</p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <WelfareInputText
                :modelValue="formValues.zipCode"
                @update:modelValue="(value) => handleChangeValueSelect('zipCode', value)"
                inputType="text"
                class="tn-input-box-no-border"
                placeholder="게시글코드는 등록 완료 시 생성됩니다."
              />
            </div>
            <div class="tn-title-filter-row-center-container">
              <p class="wf-body_02-semi wf_text-n-33">전시여부</p>
              <p class="wf-tn_red-text">*</p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <BulletinFilterGroupRadio
                :options="exhibitionStatus"
                :model-value="formValues.exhibition"
                :on-change="(value) => handleChangeValueSelect('exhibition', value)"
              />
            </div>
            <div class="tn-title-filter-row-center-container">
              <p class="wf-body_02-semi wf_text-n-33">공지구분</p>
              <p class="wf-tn_red-text">*</p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <BulletinFilterGroupRadio
                :options="noticeCategory"
                :model-value="formValues.category"
                :on-change="(value) => handleChangeValueSelect('category', value)"
              />
            </div>
          </div>
          <div class="wf-tn-list-body-filter-row-last">
            <div class="tn-title-filter-row-bottom-container">
              <p class="wf-body_02-semi wf_text-n-33">고객사 지정<span class="wf-tn_red-text">*</span></p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-customer-designation">
              <BulletinCustomerDesignation
                :on-open-search-customer="onOpenSearchCustomer"
                :model-value="formValues.designation"
                :on-change="(value) => handleChangeValueSelect('designation', value)"
                :options="customerDesignation"
                :customer-list="formValues.keywordCustomerList"
                :handle-remove-tag="handleRemoveTag"
              />
              <div class="wf-tab-ink-hidden">
                <ProductSearchModalWithTableWrapper
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
        </div>
        <div class="wf-tn-list-body-filter">
          <div class="wf-tn-list-body-filter-row">
            <div class="tn-title-filter-row-top-container">
              <p class="wf-body_02-semi wf_text-n-33">제목</p>
              <p class="wf-tn_red-text">*</p>
            </div>
            <div class="wf_flex wf_items-center tn-detail-row-field-title-container">
              <WelfareInputText
                :readonly="isReadonlyTitle"
                :modelValue="formValues.title"
                placeholder="30자 이내로 입력해 주세요."
                @update:model-value="(value) => handleChangeValueSelect('title', value)"
                class="wf_tn-flex-1 tn-bb-input-h_30"
                @click="() => changeReadonlyTitle(false)"
              />
            </div>
          </div>
          <div class="wf-tn-list-body-filter-row-last">
            <div class="tn-title-filter-row-bottom-container">
              <p class="wf-body_02-semi wf_text-n-33">내용 <span class="wf-tn_red-text">*</span></p>
            </div>
            <div class="wf_flex wf_items-center tn-detail-row-field-title-container">
              <WelfareEditor @update:modelValue="(value) => handleChangeValueSelect('editor', value)" :modelValue="formValues.editor" />
            </div>
          </div>
        </div>
      </div>
      <div class="tn-nm-detail-info-widget-2">
        <div class="wf-tn-list-body-filter">
          <div class="wf-tn-list-body-filter-row">
            <div class="tn-title-filter-row-top-container">
              <p class="wf-body_02-semi wf_text-n-33">수정일시</p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <p class="wf-body_03-reg wf_text-n-33">2023. 06. 14 00:00:00</p>
            </div>
            <div class="tn-title-filter-row-center-container">
              <p class="wf-body_02-semi wf_text-n-33">수정자</p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <p class="wf-body_03-reg wf_text-n-33">김메가 (13483)</p>
            </div>
          </div>
          <div class="wf-tn-list-body-filter-row-last">
            <div class="tn-title-filter-row-bottom-container">
              <p class="wf-body_02-semi wf_text-n-33">등록일시</p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <p class="wf-body_03-reg wf_text-n-33">2023. 06. 14 00:00:00</p>
            </div>
            <div class="tn-title-filter-row-center-container">
              <p class="wf-body_02-semi wf_text-n-33">등록자</p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <p class="wf-body_03-reg wf_text-n-33">김메가 (13483)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BulletinWrapDetailCreate>
</template>

<script lang="ts">
export default {
  name: 'NoticeMngtDetail'
}
</script>
../bulletinRouter
