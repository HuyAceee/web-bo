<script lang="ts" setup>
import {
  BulletinDateRange,
  BulletinFilterGroupCheckbox,
  BulletinFilterGroupRadio,
  BulletinInputUpdateValue,
  BulletinWrapDetailCreate,
  WelfareEditor,
  WelfareInputText,
  WelfareSelect
} from '@/components'
import { useAdminPopupDetail } from '@/composables'
import { handleRedirectLink } from '@/common/html'
import { bulletinAdminPopupList } from '../../bulletinRouter'

const {
  exhibitionStatus,
  formValues,
  exposureSites,
  optionsWidthType,
  isReadOnlyHeight,
  isReadOnlyTitle,
  changeReadOnlyHeight,
  changeReadOnlyTitle,
  handleChangeValueSelect,
  onSubmit,
} = useAdminPopupDetail()
</script>
<template>
  <BulletinWrapDetailCreate :onSubmit="onSubmit" :onBack="() => handleRedirectLink(bulletinAdminPopupList ?? '')">
    <div>
      <div class="tn-nm-detail-info-widget">
        <div class="wf-tn-list-body-filter">
          <div class="wf-tn-list-body-filter-row">
            <div class="tn-title-filter-row-top-container">
              <p class="wf-body_02-semi wf_text-n-33">팝업 코드</p>
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
              <p class="wf-body_02-semi wf_text-n-33">전시여부<span class="wf-tn_red-text">*</span></p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <BulletinFilterGroupRadio
                :options="exhibitionStatus"
                :model-value="formValues.exhibition"
                :on-change="(value) => handleChangeValueSelect('exhibition', value)"
              />
            </div>
            <div class="tn-title-filter-row-center-container">
              <p class="wf-body_02-semi wf_text-n-33">노출 사이트<span class="wf-tn_red-text">*</span></p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <BulletinFilterGroupRadio
                :options="exposureSites"
                :model-value="formValues.exposureSite"
                :on-change="(value) => handleChangeValueSelect('exposureSite', value)"
              />
            </div>
          </div>
          <div class="wf-tn-list-body-filter-row">
            <div class="tn-title-filter-row-container">
              <p class="wf-body_02-semi wf_text-n-33">전시 기간 <span class="wf-tn_red-text">*</span></p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container">
              <BulletinDateRange
                :onChangeFilterDate="() => {}"
                :from-date="formValues.fromDate"
                :to-date="formValues.toDate"
                :on-change-date-from="(value) => handleChangeValueSelect('fromDate', value)"
                :on-change-date-to="(value) => handleChangeValueSelect('toDate', value)"
              />
            </div>
          </div>
          <div class="wf-tn-list-body-filter-row-last">
            <div class="tn-title-filter-row-bottom-container">
              <p class="wf-body_02-semi wf_text-n-33">팝업 크기(px)<span class="wf-tn_red-text">*</span></p>
            </div>
            <div class="wf_flex wf_items-center tn-filter-row-field-container tn-popular-question-widget">
              <div class="tn-bb-size-container">
                <p class="wf-body_03-reg">가로</p>
                <div class="select-box wf_w-180">
                  <WelfareSelect
                    @update:model-value="(value) => handleChangeValueSelect('width', value)"
                    :modelValue="formValues.width"
                    optionLabel="label"
                    :options="optionsWidthType"
                    small
                  />
                </div>
              </div>
              <div class="tn-bb-size-container">
                <p class="wf-body_03-reg">세로</p>
                <div class="select-box wf_w-180">
                  <WelfareInputText
                    :readonly="isReadOnlyHeight"
                    @update:modelValue="(value) => handleChangeValueSelect('height', value)"
                    inputType="number"
                    :modelValue="formValues.height"
                    class=""
                    size="small"
                    @click="() => changeReadOnlyHeight(false)"
                  />
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
                :readonly="isReadOnlyTitle"
                :modelValue="formValues.title"
                placeholder="30자 이내로 입력해 주세요."
                @update:model-value="(value) => handleChangeValueSelect('title', value)"
                class="wf_tn-flex-1 tn-bb-input-h_30"
                @click="() => changeReadOnlyTitle(false)"
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
