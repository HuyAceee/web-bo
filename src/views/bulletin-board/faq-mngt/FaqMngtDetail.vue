<script lang="ts" setup>
import { BulletinFilterGroupRadio, BulletinTextareaUpdateValue, BulletinWrapDetailCreate, WelfareInputText } from '@/components'
import { useFaqMngtDetail } from '@/composables'
import { TEXTAREA_NUMBER_1000, TEXTAREA_NUMBER_200 } from '@/common'

import { bulletinFaqMngtList } from '../bulletinRouter'
import { handleRedirectLink } from '@/common/html'

const { formValues, exhibitionStatuses, popularQuestions, inquiryTypes, isReadonly, onSubmit, handleChangeValueSelect, changeReadonly } =
  useFaqMngtDetail()
</script>

<template>
  <BulletinWrapDetailCreate :onSubmit="onSubmit" :onBack="() => handleRedirectLink(bulletinFaqMngtList ?? '')">
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
                :options="exhibitionStatuses"
                :model-value="formValues.exhibition"
                :on-change="(value) => handleChangeValueSelect('exhibition', value)"
              />
            </div>
            <div class="tn-title-filter-row-center-container">
              <p class="wf-body_02-semi wf_text-n-33">인기 질문</p>
              <p class="wf-tn_red-text">*</p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container tn-popular-question-widget">
              <BulletinFilterGroupRadio
                :options="popularQuestions"
                :model-value="formValues.popularQuestion"
                :on-change="(value) => handleChangeValueSelect('popularQuestion', value)"
              />
              <p class="wf-tn_red-text wf-body_04-reg">*최대 10개까지만 설정 가능</p>
            </div>
          </div>
          <div class="wf-tn-list-body-filter-row-last">
            <div class="tn-title-filter-row-bottom-container">
              <p class="wf-body_02-semi wf_text-n-33">문의 유형</p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <p class="wf-body_03-reg wf_text-n-33">회원</p>
              <!-- <div class="select-box wf_w-180">
              <WelfareSelect
                @update:model-value="(value) => handleChangeValueSelect('inquiryType', value)"
                :modelValue="formValues.inquiryType"
                optionLabel="label"
                :options="inquiryTypes"
                small
              />
            </div> -->
            </div>
          </div>
        </div>
        <div class="wf-tn-list-body-filter">
          <div class="wf-tn-list-body-filter-row">
            <div class="tn-title-filter-row-top-container">
              <p class="wf-body_02-semi wf_text-n-33">질문</p>
              <p class="wf-tn_red-text">*</p>
            </div>
            <div class="wf_flex wf_items-center tn-detail-row-field-title-container">
              <BulletinTextareaUpdateValue
                :readonly="isReadonly.question"
                @click="() => changeReadonly('question', false)"
                :modelValue="formValues.question"
                placeholder="100자 이내로 입력해 주세요"
                @update:model-value="(value) => handleChangeValueSelect('question', value)"
                class="wf_tn-flex-1 tn-textarea-h_120"
                :maxlength="TEXTAREA_NUMBER_200"
              />
            </div>
          </div>
          <div class="wf-tn-list-body-filter-row-last">
            <div class="tn-title-filter-row-bottom-container">
              <p class="wf-body_02-semi wf_text-n-33">답변<span class="wf-tn_red-text">*</span></p>
            </div>
            <div class="wf_flex wf_items-center tn-detail-row-field-title-container">
              <BulletinTextareaUpdateValue
                :readonly="isReadonly.answer"
                @click="() => changeReadonly('answer', false)"
                :modelValue="formValues.answer"
                placeholder="500자 이내로 읿력해 주세요."
                @update:model-value="(value) => handleChangeValueSelect('answer', value)"
                class="wf_tn-flex-1 tn-textarea-h_200"
                :maxlength="TEXTAREA_NUMBER_1000"
              />
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
