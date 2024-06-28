<!-- BO_I0101_020101_P -->
<script setup lang="ts">
import { BaseDataTablePagination, HeaderModal, WelfareInputText, WelfareMdButton, WelfareRadioGroup, WelfareSelect } from '@/components'
import DeliveryHint from '@/components/delivery/modal/DeliveryHint.vue'
import { DeliveryHintModel } from '@/models/views/delivery/modal/DeliveryHintModel'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import {
  exhibitionCornerManagementAreaAddYnOptions,
  ExhibitionCornerManagementDetailsProps,
  exhibitionCornerManagementDetailsTableConfig
} from '@/models/views/exhibition/modal/ExhibtionCornerManagementDetailsModel'
import Column from 'primevue/column'
import { useExhibitionCornerManagementDetailsModalLogic } from '@/composables/exhibition/modal/useExhibitionCornerManagementDetailsModalLogic'
import { ProductSearchType } from '@/models'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { AppConfig } from '@/common'

const props = defineProps<ExhibitionCornerManagementDetailsProps>()

const hint: DeliveryHintModel[] = [{ content: '코너목록을 추가하거나 기본정보를 관리할 수 있습니다.' }]
const { setFieldValue, values, exhibitionHallCategoryOptions, addToCornerList, cornerListTableData, onSave, onClose, defaultImageBg, onErrorImage } =
  useExhibitionCornerManagementDetailsModalLogic(props)
</script>

<template>
  <div class="corner-management-details-modal">
    <HeaderModal title="코너 관리 상세" @close-modal="onClose" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col">
      <DeliveryHint :data="hint" />
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-20">
        <FormGroup class="wf-h-42" is-rounded-top is-rounded-bottom label="고객사 선택" :is-border-bottom="false">
          <ProductSearchModalWithTableWrapper
            @selectValue="(value) => setFieldValue('customerId', value.code.toString())"
            class="wf-product-base-info-search"
            :type="ProductSearchType.CUSTOMER"
            placeholder-input="고객사 조회"
            :reverse-search-text="true"
            label-button="조회"
          />
        </FormGroup>
      </div>
      <div class="wf-body_01-semi wf-mt-22 wf-mb-12">코너 기본정보</div>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup label="전시관 카테고리" required is-rounded-top>
            <WelfareSelect
              class="wf_m-w-180"
              small
              placeholder="선택"
              :options="exhibitionHallCategoryOptions"
              option-label="label"
              option-value="value"
              :model-value="values.lclassCode"
              @update:model-value="(value) => setFieldValue('lclassCode', value)"
            />
          </FormGroup>
          <FormGroup label="영역 추가 여부" is-border-left>
            <WelfareRadioGroup
              :model-value="values.areaAddYn"
              @update:model-value="(value) => setFieldValue('areaAddYn', value)"
              :options="exhibitionCornerManagementAreaAddYnOptions"
              size="sm"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf-h-42" label="코너명" required is-rounded-top is-rounded-bottom :is-border-bottom="false">
            <WelfareInputText
              size="small"
              class="wf_w-180"
              small
              placeholder="입력"
              :max-length="30"
              :model-value="values.cornerName"
              @update:model-value="(value) => setFieldValue('cornerName', value)"
            />
          </FormGroup>
          <FormGroup class="wf-h-42" label="코너번호" is-border-left :is-border-bottom="false" custom-class="wf-body_03-reg">
            {{ values.cornerKey }}
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf_product-border-bottom-sub-gray wf-pb-20 wf-mt-22">
        <WelfareMdButton class="wf_w-120" label="목록 추가" button-type="default" @click="addToCornerList" />
      </div>
      <div class="wf-body_01-semi wf-mt-20 wf-mb-11">템플릿 미리보기</div>
      <div class="wf_flex">
        <div>
          <img
            v-if="props.fileName && props.filePathName"
            :src="`${AppConfig.imageHost}/${props.filePathName}/${props.fileName}`"
            class="img-bg"
            @error="onErrorImage"
            :class="defaultImageBg"
            alt="image"
          />
          <div v-else class="wf_bg-nf-ncc img-bg"></div>
          <div class="wf-mt-8 wf-body_03-reg">템플릿 코드 : {{ props.templateKey }}</div>
        </div>
        <div class="wf-ml-20 wf-width-full">
          <p>
            <span class="wf-body_01-semi">조회 결과</span>&nbsp;
            <span class="wf-body_01-mid wf_text-n-8-f">(총 {{ 3 ?? 0 }}건)</span>
          </p>
          <BaseDataTablePagination :value="cornerListTableData" no-data-label="코너목록이 없습니다." :select-props="{ small: true, options: [] }">
            <template #columns>
              <Column
                v-for="(header, index) in exhibitionCornerManagementDetailsTableConfig"
                :key="index"
                :column-key="header.field"
                :field="header.field"
                :header="header.header"
                :class="header.class"
              />
            </template>
          </BaseDataTablePagination>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf-mt-20">
        <WelfareMdButton class="wf_w-120" label="닫기" button-type="cancel" @on-click="onClose" />
        <WelfareMdButton class="wf_w-120" label="저장" button-type="default" @on-click="onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/modal/exhibition-corner-management-details-modal.css');
</style>
