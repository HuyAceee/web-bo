<!-- BO_I0302_010101 -->
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
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { ProductSearchType } from '@/models'
import { exhibitionTemplateManagementAppChannelOptions } from '@/models/views/exhibition/templateManagement/ExhibitionTemplateManagementModel'
import {
  exhibitionBannerGroupUseYnOptions,
  ExhibitionCommonBannerFormModel,
  exhibitionCommonBannerSearchPeriodTypeOptions,
  exhibitionCommonBannerSearchWordTypeOptions
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import { useExhibitionCommonBannerManagement } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonBannerManagement'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import ExhibitionCommonBannerGroupListTable from '@/components/exhibition/exhibitionCommon/ExhibitionCommonBannerGroupListTable.vue'
import ExhibitionCommonBannerListTable from '@/components/exhibition/exhibitionCommon/ExhibitionCommonBannerListTable.vue'

const {
  values,
  onResetForm,
  setFieldValue,
  handleChangeCountDate,
  refFilterDate,
  bannerGroupListTotalItems,
  bannerGroupListTableData,
  isBannerGroupListTableLoading,
  onPageChangeOfBannerGroupListTable,
  handleSearchBannerGroupList,
  productCustomerSearchWrapper,
  onBannerGroupListTableRowClick,
  selectedRowBannerGroupListTable,
  getBannerGroupListExcelDownload,
  bannerListTotalItems,
  bannerListTableData,
  isBannerListTableLoading,
  onPageChangeOfBannerListTable,
  selectedRowBannerListTable,
  onBannerListTableRowClick,
  refreshBannerGroupListTableData,
  getBannerListExcelDownload,
  bannerTableRef,
  bannerGroupTableRef,
  refreshBannerListTableData
} = useExhibitionCommonBannerManagement()
</script>

<template>
  <div class="wf-p-30 wf-space-y-30">
    <CommonTable>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="고객사(고객사코드)" is-first-col />
        <CommonTableContentCell>
          <ProductSearchModalWithTableWrapper
            ref="productCustomerSearchWrapper"
            :type="ProductSearchType.CUSTOMER"
            @select-value="(value) => setFieldValue('customerKey', value.code.toString())"
            :reverse-search-text="false"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="배너 그룹명" />
        <CommonTableContentCell>
          <WelfareInputText
            :model-value="values.bannerGroupName"
            @update:model-value="(value) => setFieldValue('bannerGroupName', value)"
            placeholder="배너그룹명 입력"
            size="small"
            class="wf_w-180"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="사용 여부" is-first-col />
        <CommonTableContentCell>
          <WelfareRadioGroup
            :model-value="values.bannerGroupUseYn"
            @update:model-value="(value) => setFieldValue('bannerGroupUseYn', value)"
            :options="exhibitionBannerGroupUseYnOptions"
            size="sm"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="적용 채널" />
        <CommonTableContentCell>
          <WelfareRadioGroup
            :model-value="values.applyChannelType"
            @update:model-value="(value) => setFieldValue('applyChannelType', value)"
            :options="exhibitionTemplateManagementAppChannelOptions"
            size="sm"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <FormGroupTimeLinesFilterForm
        label="기간"
        :current-active-date="refFilterDate"
        @on-change-filter-date="handleChangeCountDate"
        :from-date="values.fromDate"
        :to-date="values.toDate"
        @on-change-date-from="(value) => setFieldValue('fromDate', value)"
        @on-change-date-to="(value) => setFieldValue('toDate', value)"
        :current-type-date-product-select="values.searchPeriodType"
        @on-select-type="(value) => setFieldValue('searchPeriodType', value)"
        :options-product-type-date="exhibitionCommonBannerSearchPeriodTypeOptions"
      />
      <ProductGroupControlFilterForm
        :list-filters="exhibitionCommonBannerSearchWordTypeOptions"
        :current-filter="values.searchWordType"
        @on-change-filter="(value) => setFieldValue('searchWordType', value)"
        disabled
        field-input="searchWord"
        :search-word-model="values.searchWord"
        placeholder="쉼표(,)구분하여 검색어 입력"
        @onchange-text="(field, value) => setFieldValue(field as keyof ExhibitionCommonBannerFormModel, value)"
      />
    </CommonTable>
    <div class="wf_flex wf_justify-center wf-gap-x-20 wf_product-border-bottom-sub-gray wf-pb-30">
      <WelfareBigButton label="초기화" button-type="neatral" @on-click="onResetForm" />
      <WelfareBigButton label="조회" button-type="default" @on-click="handleSearchBannerGroupList" />
    </div>
    <ExhibitionCommonBannerGroupListTable
      ref="bannerGroupTableRef"
      :is-loading="isBannerGroupListTableLoading"
      :data="bannerGroupListTableData"
      :total-items="bannerGroupListTotalItems"
      :selected-row="selectedRowBannerGroupListTable"
      @page-change="onPageChangeOfBannerGroupListTable"
      @row-click="onBannerGroupListTableRowClick"
      @excel-download="getBannerGroupListExcelDownload"
      @refresh="refreshBannerGroupListTableData"
    />
    <ExhibitionCommonBannerListTable
      :banner-group-key="selectedRowBannerGroupListTable?.bannerGroupKey"
      ref="bannerTableRef"
      :is-loading="isBannerListTableLoading"
      :data="bannerListTableData"
      :total-items="bannerListTotalItems"
      :selected-row="selectedRowBannerListTable"
      @page-change="onPageChangeOfBannerListTable"
      @row-click="onBannerListTableRowClick"
      @excel-download="getBannerListExcelDownload"
      @refresh="refreshBannerListTableData"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/exhibition-common-banner-management.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
