<!-- BO_I0301_010101 -->

<script setup lang="ts">
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  WelfareBigButton,
  WelfareInputText,
  WelfareRadioGroup
} from '@/components'
import ExhibitionCommonWindowTable from '@/components/exhibition/exhibitionCommon/ExhibitionCommonWindowTable.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import FormGroupSelectInput from '@/components/widgets/form/FormGroupSelectInput.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { useExhibitionCommonWindowMngt } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonWindowMngt'
import { ProductSearchType } from '@/models'

const {
  exhibitionStatusOptions,
  applyChannelOptions,
  periodOptions,
  searchOptions,
  searchCustomerRef,
  values,
  setFieldValue,
  acceptMaxKeyWordsQuery,
  handleAcceptMaxKeyWords,
  currentFilterDate,
  handleChangeCountDate,
  items,
  isLoading,
  onPageChange,
  totalItems,
  refTable,
  refreshData,
  onSubmit,
  onReset
} = useExhibitionCommonWindowMngt()
</script>

<template>
  <div class="wf_border-page">
    <div class="wf-px-30 wf-py-30">
      <CommonTable>
        <CommonTableRow>
          <CommonTableTitleCell title="고객사(고객사 코드)" is-first-col />
          <CommonTableContentCell>
            <ProductSearchModalWithTableWrapper
              ref="searchCustomerRef"
              class="wf_w-176"
              placeholder-input="고객사 조회"
              :type="ProductSearchType.CUSTOMER"
              @select-value="(event) => setFieldValue('customerKey', String(event?.code))"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="팝업명" />
          <CommonTableContentCell>
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder="팝업명 입력"
              :model-value="values.popupName"
              @update:model-value="(value) => setFieldValue('popupName', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="전시 여부" is-first-col />
          <CommonTableContentCell>
            <WelfareRadioGroup
              size="sm"
              name="exhibitionStatus"
              :options="exhibitionStatusOptions"
              :model-value="values.displayYn"
              @update:model-value="(value: any) => setFieldValue('displayYn', value)"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="적용 채널" />
          <CommonTableContentCell>
            <WelfareRadioGroup
              size="sm"
              name="applyChannelType"
              :options="applyChannelOptions"
              :model-value="values.applyChannelType"
              @update:model-value="(value: any) => setFieldValue('applyChannelType', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <FormGroupTimeLinesFilterForm
          label="기간"
          class="wf_h-44"
          :is-border-bottom="true"
          :current-active-date="currentFilterDate"
          :options-product-type-date="periodOptions"
          selectPlaceholder="전시 시작일"
          :from-date="values.fromDate"
          :to-date="values.toDate"
          :current-type-date-product-select="values.searchPeriodType"
          @on-change-date-from="(value) => setFieldValue('fromDate', value)"
          @on-change-date-to="(value) => setFieldValue('toDate', value)"
          @on-select-type="(value) => setFieldValue('searchPeriodType', value)"
          @on-change-filter-date="handleChangeCountDate"
        />
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="검색어" is-first-col />
          <CommonTableContentCell>
            <div class="wf-mx--1 wf_w-full">
              <FormGroupSelectInput
                option-label="label"
                option-value="value"
                select-placeholder="검색창 키워드 코드"
                :select-options="searchOptions"
                input-placeholder="쉼표(,)구분하여 검색어 입력"
                :select="values.searchWordType"
                :input="values.searchWord"
                @update:select="(value) => setFieldValue('searchWordType', value)"
                @keypress="acceptMaxKeyWordsQuery"
                @update:input="(value) => handleAcceptMaxKeyWords(value)"
              />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>
      <div class="wf-mt-30 wf_flex wf_justify-center wf-space-x-20">
        <WelfareBigButton button-type="neatral" label="초기화" @on-click="onReset" />
        <WelfareBigButton button-type="default" label="조회" @on-click="onSubmit" />
      </div>
    </div>
    <hr class="wf_break-line-ncc" />
    <div class="wf-px-30 wf-py-30">
      <ExhibitionCommonWindowTable
        ref="refTable"
        :data="items"
        :total-items="totalItems"
        :isLoading="isLoading"
        @refresh="refreshData"
        @page-change="onPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ExhibitionCommonWindowMngtPage'
}
</script>
