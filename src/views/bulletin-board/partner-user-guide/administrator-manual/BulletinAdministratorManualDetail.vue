<script lang="ts" setup>
import {
  BulletinFilterGroupRadio,
  BulletinInputUpdateValue,
  BulletinUploadFile,
  BulletinWrapDetailCreate,
  WelfareEditor,
  WelfareInputText,
  WelfareSelect
} from '@/components'
import { useAdministratorManualDetail } from '@/composables'
import { handleRedirectLink } from '@/common/html'
import { bulletinAdministratorManualList } from '../../bulletinRouter'

const {
  exhibitionStatus,
  formValues,
  noticeCategory,
  exposureWebs,
  optionsMainExposures,
  mainExposures,
  isReadonlyTitle,
  onRemoveFile,
  getFile,
  changeReadonlyTitle,
  handleChangeValueSelect,
  onSubmit,
  disableOptionsMainExposures
} = useAdministratorManualDetail()
</script>
<template>
  <BulletinWrapDetailCreate :onSubmit="onSubmit" :onBack="() => handleRedirectLink(bulletinAdministratorManualList ?? '')">
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
            <div class="wf-tn-list-body-filter-row-width-66">
              <div class="tn-title-filter-row-center-container">
                <p class="wf-body_02-semi wf_text-n-33">메인 노출 여부</p>
                <p class="wf-tn_red-text">*</p>
              </div>
              <div class="wf_flex wf_items-center tn-filter-row-field-container">
                <div class="tn-customer-designation-widget wf_items-center">
                  <BulletinFilterGroupRadio
                    :options="mainExposures"
                    :model-value="formValues.mainExposure"
                    :on-change="(value) => handleChangeValueSelect('mainExposure', value)"
                  />
                  <div class="select-box wf_w-180">
                    <WelfareSelect
                      :disabled="disableOptionsMainExposures()"
                      @update:model-value="(value) => handleChangeValueSelect('optionsMainExposure', value)"
                      :modelValue="formValues.optionsMainExposure"
                      optionLabel="label"
                      :options="optionsMainExposures"
                      small
                      placeholder="사용자매뉴얼"
                    />
                  </div>
                </div>
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
          <div class="wf-tn-list-body-filter-row">
            <div class="tn-title-filter-row-bottom-container">
              <p class="wf-body_02-semi wf_text-n-33">내용<span class="wf-tn_red-text">*</span></p>
            </div>
            <div class="wf_flex wf_items-center tn-detail-row-field-title-container">
              <WelfareEditor @update:modelValue="(value) => handleChangeValueSelect('editor', value)" :modelValue="formValues.editor" />
            </div>
          </div>
          <div class="wf-tn-list-body-filter-row-last">
            <div class="tn-title-filter-row-bottom-container">
              <p class="wf-body_02-semi wf_text-n-33">첨부파일</p>
            </div>
            <div class="wf_flex wf_items-center tn-detail-row-field-title-container">
              <BulletinUploadFile v-on:get-file="getFile" :documentsList="formValues.documentsList" :on-remove-file="onRemoveFile"/>
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
