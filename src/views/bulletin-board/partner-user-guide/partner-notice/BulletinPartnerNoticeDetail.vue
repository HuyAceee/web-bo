<script lang="ts" setup>
import { BulletinFilterGroupRadio, BulletinInputUpdateValue, BulletinWrapDetailCreate, WelfareEditor, WelfareInputText } from '@/components'
import { usePartnerNoticeDetail } from '@/composables'
import { handleRedirectLink } from '@/common/html'
import { bulletinPartnerNoticeList } from '../../bulletinRouter'

const { exhibitionStatus, formValues, noticeCategory, exposureWebs, isReadonlyTitle, changeReadonlyTitle, handleChangeValueSelect, onSubmit } =
  usePartnerNoticeDetail()
</script>
<template>
  <BulletinWrapDetailCreate :onSubmit="onSubmit" :onBack="() => handleRedirectLink(bulletinPartnerNoticeList ?? '')">
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
                placeholder="게시글 코드는 등록 완료시 생성됩니다."
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
              <p class="wf-body_02-semi wf_text-n-33">노출 사이트<span class="wf-tn_red-text">*</span></p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <BulletinFilterGroupRadio
                :options="exposureWebs"
                :model-value="formValues.exposureWeb"
                :on-change="(value) => handleChangeValueSelect('exposureWeb', value)"
              />
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
              <p class="wf-body_02-semi wf_text-n-33">내용<span class="wf-tn_red-text">*</span></p>
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
