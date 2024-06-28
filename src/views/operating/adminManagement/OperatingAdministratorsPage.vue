<!-- BO_M0201_010101 -->

<script setup lang="ts">
import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, TEXT_MAX_NUMBER_50, formatNumberDot, formatTime, renderLabelEnum } from '@/common'
import { DataTablePaginationWithCheckbox, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import ComplaintGroupCheckBoxForm from '@/components/complaint/formFilterList/ComplaintGroupCheckBoxForm.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { useAdministratorsListOfAdministrators } from '@/composables/operating/administratorsListOfAdministrators/useOperatingAdministratorsListOfAdministrators'
import {
OperatingPermissionUseStatusModel,
operatingActiveTypeOptions,
operatingListSelectDateOrderDetailOptions,
operatingManagerSearchTypeOptions,
operatingPermisstionOptions
} from '@/models/views/operating/adminManagement/OperatingAdministratorsListOfAdministratorsModel'
import Column from 'primevue/column'

const {
  items,
  totalItems,
  statusOfUse,
  listButtonDateFilter,
  dataHeaderAdministratorsTableModalConfig,
  values,
  setFieldValue,
  handleCheckBoxChange,
  getIsCheckBox,
  currentFilterDate,
  handleChangeCountDate,
  handleResetFilter,
  handleSubmitAndValidate,
  isDisableForm,
  isLoading,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  refTable,
  onClickManagerKey,
  onUpdateGroupStatus,
  authorityGroupsNames,
  handleChangeFilterForm
} = useAdministratorsListOfAdministrators()

const tableListConfig = [
  dataHeaderAdministratorsTableModalConfig[2].field,
  dataHeaderAdministratorsTableModalConfig[3].field,
  dataHeaderAdministratorsTableModalConfig[9].field
]

</script>
<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" label="권한 그룹명" :isRoundedTop="true">
                  <WelfareSelect
                    :disabled="isDisableForm"
                    :modelValue="values?.authorityGroupKey"
                    @update:modelValue="(value) => setFieldValue('authorityGroupKey', value)"
                    class="wf_w-180"
                    placeholder="전체"
                    optionLabel="label"
                    option-value="value"
                    :options="operatingPermisstionOptions.concat(authorityGroupsNames)"
                    small
                  />
                </FormGroup>
                <FormGroup class="wf_flex-1" is-border-left label="사용 상태">
                  <ComplaintGroupCheckBoxForm
                    :data="statusOfUse"
                    field="statusOfUse"
                    :get-is-check-box="getIsCheckBox"
                    @change-check-box="handleCheckBoxChange"
                    :disabled="isDisableForm"
                  />
                </FormGroup>
              </div>
              <FormGroupTimeLinesFilterForm
                :optionDateButton="listButtonDateFilter"
                label="기간"
                :current-active-date="currentFilterDate"
                @on-change-filter-date="handleChangeCountDate"
                :from-date="values.fromDate"
                :to-date="values.toDate"
                @on-change-date-from="(value) => setFieldValue('fromDate', value)"
                @on-change-date-to="(value) => setFieldValue('toDate', value)"
                :current-type-date-product-select="values.dateSelect"
                @on-select-type="(value) => setFieldValue('dateSelect', value)"
                :options-product-type-date="operatingListSelectDateOrderDetailOptions"
                :disabled="isDisableForm"
              />
            </form>
            <div class="wf_flex wf_items-center">
              <FormGroup
                class="wf_flex-1 wf_h-42"
                custom-class="wf-pb-1 wf-pl-11"
                is-rounded-top
                label="검색어"
                :isBorderBottom="false"
                isRoundedBottom
              >
                <WelfareSelect
                  class="wf_w-180 wf-mr-6"
                  optionLabel="label"
                  option-value="value"
                  small
                  placeholder="사용안함"
                  :options="operatingManagerSearchTypeOptions"
                  :model-value="values.searchType"
                  @update:model-value="(value) => handleChangeFilterForm(value)"
                />
                <WelfareInputText
                  class="w-full"
                  size="small"
                  placeholder=""
                  :disabled="!isDisableForm"
                  :model-value="values.searchWord"
                  :max-length="TEXT_MAX_NUMBER_50"
                  @update:model-value="(value) => setFieldValue('searchWord', value)"
                />
              </FormGroup>
            </div>
          </div>
          <FormButtonHandleForm @on-reset="handleResetFilter" @on-submit="handleSubmitAndValidate" />
        </div>
      </div>
      <!-- table -->

      <div class="wf-pt-30 wf-form-filter">
        <DataTablePaginationWithCheckbox
          ref="refTable"
          :value="items"
          :loading="isLoading"
          :total-records="totalItems"
          no-data-label="조회된 내역이 없습니다."
          @page-change="onPageChange"
          @row-checked-change="onRowSelected"
          @select-all-change="onSelectAllChange"
        >
          <template #title>
            <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ formatNumberDot(totalItems) }} 건</h6>
          </template>
          <template #buttons>
            <div class="wf-space-x-6 wf_flex">
              <WelfareMdButton
                label="미사용"
                class="wf_w-57"
                buttonType="liner"
                @on-click="() => onUpdateGroupStatus(OperatingPermissionUseStatusModel.UNUSED)"
              />
              <WelfareMdButton
                label="사용"
                class="wf_w-45"
                buttonType="liner"
                @on-click="() => onUpdateGroupStatus(OperatingPermissionUseStatusModel.USED)"
              />
              <WelfareMdButton label="등록" class="wf_w-45" buttonType="default" @on-click="() => onClickManagerKey()" />
            </div>
          </template>
          <template #columns>
            <Column
              v-for="(item, index) in dataHeaderAdministratorsTableModalConfig"
              :key="index"
              :column-key="item.field"
              :field="item.field"
              :header="item.header"
              :class="item.class"
            >
              <template #body="slotProps">
                <span v-if="!tableListConfig.includes(item.field)">{{ slotProps.data[item.field] }}</span>
                <span
                  v-if="item.field === dataHeaderAdministratorsTableModalConfig[2].field"
                  class="wf-text_link wf-pointer"
                  @click="() => onClickManagerKey(slotProps.data)"
                  >{{ slotProps.data[item.field] }}</span
                >
                <span
                  v-if="item.field === dataHeaderAdministratorsTableModalConfig[3].field"
                  class="wf-text_link wf-pointer"
                  @click="() => onClickManagerKey(slotProps.data)"
                  >{{ slotProps.data[item.field] }}</span
                >
                <span v-if="item.field === dataHeaderAdministratorsTableModalConfig[6].field">{{
                  slotProps.data.auditing?.registerName + (slotProps.data.auditing?.registerName ? `( ${slotProps.data.auditing?.registerKey} )` : '')
                }}</span>
                <span v-if="item.field === dataHeaderAdministratorsTableModalConfig[7].field">{{ formatTime(slotProps.data.auditing?.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}</span>
                <span v-if="item.field === dataHeaderAdministratorsTableModalConfig[8].field">{{
                  renderLabelEnum(operatingActiveTypeOptions, slotProps.data?.isActive)
                }}</span>
                <WelfareMdButton
                  label="수정"
                  @click="() => onClickManagerKey(slotProps.data)"
                  v-if="item.field === dataHeaderAdministratorsTableModalConfig[9].field"
                  class="wf_md-button--liner undefined wf_button wf_md-button wf_button--icon wf_small-buttonalign-items wf-height-30"
                ></WelfareMdButton>
              </template>
            </Column>
          </template>
        </DataTablePaginationWithCheckbox>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/operate/operating/operating-adminitrator-table.css');
</style>

<script lang="ts">
export default {
  name: 'OperatingAdministratorsPage'
}
</script>
