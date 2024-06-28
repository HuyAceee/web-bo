<!-- BO_I0106_010101 -->

<script setup lang="ts">
import ExhibitionCommonSearchBannerTable from '@/components/exhibition/exhibitionCommon/ExhibitionCommonSearchBannerTable.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  WelfareBigButton,
  WelfareCheckbox,
  WelfareInputText,
  WelfareRadioGroup
} from '@/components/uikit'
import FormGroupSelectInput from '@/components/widgets/form/FormGroupSelectInput.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { useExhibitionCommonSearchBannerMngt } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonSearchBannerMngt'
import { ProductSearchType, YnOptions } from '@/models'

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
} = useExhibitionCommonSearchBannerMngt()
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
              class="wf_w-228"
              placeholder-input="고객사 조회"
              :type="ProductSearchType.CUSTOMER"
              @select-value="(event) => setFieldValue('customerKey', String(event?.code))"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="키워드" />
          <CommonTableContentCell>
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder="키워드 입력"
              :model-value="values.searchWordBannerKeyword"
              @update:model-value="(value) => setFieldValue('searchWordBannerKeyword', value)"
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
            <div class="wf_flex wf-space-x-20">
              <WelfareCheckbox
                v-for="(channel, index) in applyChannelOptions"
                :key="index"
                size="sm"
                :label="channel.label"
                :model-value="values[channel.value] === YnOptions.Y"
                @update:model-value="(value) => setFieldValue(channel.value, value ? YnOptions.Y : YnOptions.N)"
              />
            </div>
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
      <ExhibitionCommonSearchBannerTable
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
  name: 'ExhibitionCommonSearchBannerMngtPage'
}
</script>
