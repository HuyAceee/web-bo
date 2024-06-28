<!--BO_I0306_010101 -->
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
  WelfareRadioGroup,
  WelfareSelect
} from '@/components'
import { exhibitionCommonFlagRegistrationDisplayYnOption } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonFlagRegistrationPopupModel'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { useExhibitionCommonFlagManagement } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonFlagManagement'
import { exhibitionSpecialManagementListModelConfig } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialManagementModel'
import { exhibitionCommonBannerSearchWordTypeOptions } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import {
  exhibitionCommonFlagManagementFlagTypeOption,
  ExhibitionCommonFlagManagementFormModel,
  exhibitionCommonFlagManagementTableConfig
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonFlagManagementModel'
import { DEFAULT_TABLE_SELECT_OPTIONS_TWO, FORMAT_DATE_YYYY_MM_DD, TEXT_MAX_NUMBER_3 } from '@/common'
import Column from 'primevue/column'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import { ExhibitionFlagModifyRequestListType } from '@/models/services/requests/exhibition/ExhibitionFlagManagementRequest'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import { useExhibitionFlagRegistrationPopupLogic } from '@/composables/exhibition/exhibitionCommon/useExhibitionFlagRegistrationPopup'

const {
  values,
  setFieldValue,
  refFilterDate,
  handleChangeCountDate,
  items,
  totalItems,
  onPageChange,
  onResetForm,
  handleSearch,
  onSave,
  onDelete,
  onExcelDownload,
  onRegister,
  onShowModal,
  tableRef,
  isLoading,
  handleDateChangeTableForm,
  onSelectAllChange,
  onRowSelected,
  refreshData,
  handleSetTableFormField
} = useExhibitionCommonFlagManagement()
const { displayOrderValidate } = useExhibitionFlagRegistrationPopupLogic()
</script>

<template>
  <div class="wf-p-30">
    <CommonTable>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="플래그명" is-first-col />
        <CommonTableContentCell>
          <WelfareInputText
            class="wf_w-180"
            size="small"
            placeholder="플래그명 입력"
            :model-value="values.flagName"
            @update:model-value="(value) => setFieldValue('flagName', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="구분" is-first-col />
        <CommonTableContentCell>
          <WelfareRadioGroup
            :options="exhibitionCommonFlagManagementFlagTypeOption"
            size="sm"
            :model-value="values.flagType"
            @update:model-value="(value) => setFieldValue('flagType', value)"
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
      <CommonTableRow height="44" is-last-row>
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
          :options-product-type-date="exhibitionSpecialManagementListModelConfig.listSelectDate.options"
        />
      </CommonTableRow>
      <CommonTableRow height="42" is-last-row>
        <ProductGroupControlFilterForm
          :list-filters="exhibitionCommonBannerSearchWordTypeOptions"
          :current-filter="values.searchWordType ?? exhibitionCommonBannerSearchWordTypeOptions[0]"
          @on-change-filter="(value) => setFieldValue('searchWordType', value)"
          disabled
          field-input="searchWord"
          :search-word-model="values.searchWord"
          placeholder="쉼표(,)구분하여 검색어 입력"
          @onchange-text="(field, value) => setFieldValue(field as keyof ExhibitionCommonFlagManagementFormModel, value)"
        />
      </CommonTableRow>
    </CommonTable>
    <div class="wf_flex wf_justify-center wf-space-x-20 wf_product-border-bottom-sub-gray wf-pb-30 wf-mt-30">
      <WelfareBigButton label="초기화" button-type="neatral" @click="onResetForm" />
      <WelfareBigButton label="조회" button-type="default" @click="handleSearch" />
    </div>
    <DataTablePaginationWithCheckbox
      :loading="isLoading"
      ref="tableRef"
      no-data-label="조회 내용이 없습니다."
      class="wf-mt-30"
      :value="items"
      @page-change="onPageChange"
      @select-all-change="onSelectAllChange"
      @row-checked-change="onRowSelected"
      :total-records="totalItems"
      :select-props="{ options: DEFAULT_TABLE_SELECT_OPTIONS_TWO, class: 'wf_w-120' }"
      row-hover
    >
      <template #title>
        <h6>플래그 목록&nbsp;총 {{ totalItems ?? 0 }} 건</h6>
      </template>
      <template #buttons>
        <WelfareMdButton label="등록" button-type="liner" @click="onRegister" />
        <WelfareMdButton label="삭제" button-type="liner" @click="onDelete" />
        <WelfareMdButton label="저장" button-type="liner" @click="onSave" />
        <WelfareMdButton label="엑셀다운로드" button-type="liner" @click="onExcelDownload" />
      </template>
      <template #columns>
        <Column v-for="col in exhibitionCommonFlagManagementTableConfig" :key="col.field" :column-key="col.field" :class="col.class">
          <template #header> {{ col.header }}&nbsp;<span v-if="col?.required" class="wf_text-sub-01">*</span></template>
          <template #body="slotProps">
            <p
              v-if="col.field === 'flagKey'"
              class="wf-text_link wf-cursor-pointer"
              @click="
                onShowModal(slotProps.data.flagKey, () => {
                  refreshData()
                })
              "
            >
              {{ slotProps.data?.[col.field] }}
            </p>
            <WelfareInputText
              v-else-if="col.field === 'flagName'"
              :model-value="slotProps.data?.[col.field]"
              @update:model-value="(value) => handleSetTableFormField(col.field, value, slotProps.index)"
              size="small"
            />
            <WelfareInputText
              v-else-if="col.field === 'flagDisplayOrder'"
              :max-length="TEXT_MAX_NUMBER_3"
              @input="displayOrderValidate"
              :model-value="slotProps.data?.[col.field]"
              @update:model-value="(value) => handleSetTableFormField(col.field, value, slotProps.index)"
              size="small"
            />
            <WelfareSelect
              v-else-if="col.field === 'displayYn'"
              option-label="label"
              option-value="value"
              class="wf_w-100"
              :options="exhibitionCommonFlagRegistrationDisplayYnOption.slice(1)"
              small
              :model-value="slotProps.data?.[col.field]"
              @update:model-value="(value) => handleSetTableFormField(col.field, value, slotProps.index)"
            />
            <DateTimePicker
              v-else-if="col.field === 'displayStartDate' || col.field === 'displayEndDate'"
              type="date"
              size="small"
              :model-value="slotProps.data?.[col.field]"
              @update:model-value="
                (value) => handleDateChangeTableForm(col.field as keyof ExhibitionFlagModifyRequestListType, value, slotProps.index)
              "
              :format="FORMAT_DATE_YYYY_MM_DD"
            />
            <WelfareTimeInput
              v-else-if="col.field === 'displayStartTime' || col.field === 'displayEndTime'"
              :model-value="slotProps.data?.[col.field]"
              @update:model-value="(value: string) => handleDateChangeTableForm(col.field, value, slotProps.index)"
            />
            <WelfareInputText v-else-if="col.field === 'imageFullPathName'" disabled :model-value="slotProps.data.imageFullPathName" size="small" />
            <p v-else>{{ slotProps.data?.[col.field] }}</p>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
