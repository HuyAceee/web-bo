<script setup lang="ts">
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  DataTablePaginationWithCheckbox,
  WelfareBigButton,
  WelfareInputText,
  WelfareMdButton,
  WelfareRadioGroup
} from '@/components'
import {
  exhibitionCommonBannerSearchPeriodTypeOptions,
  exhibitionCommonBannerSearchWordTypeOptions
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import { useExhibitionCommonExtensibleImageManagementPage } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonExtensibleImageManagementPage'
import {
  ExhibitionCommonExtensibleImageManagementFormModel,
  exhibitionCommonExtensibleImageManagementProductClassificationOptions,
  exhibitionCommonExtensibleImageManagementTableConfig
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonExtensibleImageManagementModel'
import { exhibitionCommonFlagRegistrationDisplayYnOption } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonFlagRegistrationPopupModel'
import { ProductSearchType } from '@/models'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import Column from 'primevue/column'
import { DEFAULT_TABLE_SELECT_OPTIONS_TWO } from '@/common'
import ExhibitionSearchProductModalWrapper from '@/components/exhibition/modal/ExhibitionSearchProductModalWrapper.vue'

const {
  setFieldValue,
  values,
  handleChangeCountDate,
  refFilterDate,
  sellerWrapperRef,
  onResetForm,
  handleSearch,
  onDelete,
  onSave,
  onAddition,
  onExcelDownload,
  totalItems,
  onPageChange,
  items,
  productWrapperRef,
  brandWrapperRef,
  tableFormValues,
  isLoading,
  onRowSelected,
  onSelectAllChange,
  onImageUpload
} = useExhibitionCommonExtensibleImageManagementPage()
</script>

<template>
  <div class="wf-p-30">
    <CommonTable>
      <CommonTableRow height="44">
        <div class="wf_w-50pc wf_flex">
          <CommonTableTitleCell title="상품명 (상품코드)" is-first-col />
          <CommonTableContentCell>
            <ExhibitionSearchProductModalWrapper
              ref="productWrapperRef"
              @select-value="
                (value) => {
                  setFieldValue('productKey', value.productKey)
                }
              "
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="판매사(판매사코드)" />
          <CommonTableContentCell>
            <ProductSearchModalWithTableWrapper
              ref="sellerWrapperRef"
              :type="ProductSearchType.SELLER"
              :reverse-search-text="true"
              @select-value="
                (value) => {
                  setFieldValue('sellerKey', value.code.toString())
                }
              "
              placeholder-input="판매사 조회"
            />
          </CommonTableContentCell>
        </div>
        <CommonTableTitleCell title="브랜드 (브랜드 코드)" />
        <CommonTableContentCell>
          <ProductSearchModalWrapper
            :reverse-search-text="true"
            ref="brandWrapperRef"
            :type="ProductSearchType.BRAND"
            @select-value="
              (value) => {
                setFieldValue('brandKey', value.code.toString())
              }
            "
            placeholder-input="브랜드 조회"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="상품 구분" is-first-col />
        <CommonTableContentCell>
          <WelfareRadioGroup
            :options="exhibitionCommonExtensibleImageManagementProductClassificationOptions"
            size="sm"
            :model-value="values.productClassification"
            @update:model-value="(value) => setFieldValue('productClassification', value)"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="전시 여부" />
        <CommonTableContentCell>
          <WelfareRadioGroup
            :options="exhibitionCommonFlagRegistrationDisplayYnOption"
            size="sm"
            :model-value="values.displayYn"
            @update:model-value="(value) => setFieldValue('displayYn', value)"
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
        @onchange-text="(field, value) => setFieldValue(field as keyof ExhibitionCommonExtensibleImageManagementFormModel, value)"
      />
    </CommonTable>
    <div class="wf_flex wf_justify-center wf-space-x-20 wf_product-border-bottom-sub-gray wf-pb-30 wf-mt-30">
      <WelfareBigButton label="초기화" button-type="neatral" @on-click="onResetForm" />
      <WelfareBigButton label="조회" button-type="default" @on-click="handleSearch" />
    </div>
    <DataTablePaginationWithCheckbox
      :loading="isLoading"
      row-hover
      :value="items"
      class="wf-mt-30"
      :select-props="{ options: DEFAULT_TABLE_SELECT_OPTIONS_TWO, class: 'wf_w-120' }"
      @page-change="onPageChange"
      @row-checked-change="onRowSelected"
      @select-all-change="onSelectAllChange"
      :total-records="totalItems"
      no-data-label="조회 내용이 없습니다."
    >
      <template #title>
        <h6>확장형 이미지 목록&nbsp;&nbsp;총 {{ totalItems ?? 0 }} 건</h6>
      </template>
      <template #buttons>
        <WelfareMdButton label="추가" button-type="liner" @click="onAddition" />
        <WelfareMdButton label="삭제" button-type="liner" @click="onDelete" />
        <WelfareMdButton label="저장" button-type="liner" @click="onSave" />
        <WelfareMdButton label="엑셀다운로드" button-type="liner" @click="onExcelDownload" />
      </template>
      <template #columns>
        <Column v-for="(col, index) in exhibitionCommonExtensibleImageManagementTableConfig" :key="index" :column-key="col.field" :class="col.class">
          <template #header>
            <p>{{ col.header }}&nbsp;<span class="wf_text-sub-01" v-if="col.required">*</span></p>
          </template>
          <template #body="slotProps">
            <p v-if="['productKey', 'sellerKey', 'brandKey'].includes(col.field)" class="wf-text_link wf-pointer">
              {{ slotProps.data?.[col.field] }}
            </p>
            <WelfareInputText
              v-else-if="col.field === 'imageFullPathName'"
              class="wf_m-w-290"
              size="small"
              readonly
              :model-value="tableFormValues.modifyRequestList[slotProps.index]?.filePathName"
              @click="onImageUpload(slotProps.index)"
            />
            <p v-else>{{ slotProps.data?.[col.field] }}</p>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
