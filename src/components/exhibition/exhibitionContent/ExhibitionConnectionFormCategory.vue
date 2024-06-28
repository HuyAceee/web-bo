<script setup lang="ts">
import {
  DATETIME_END_BEFORE_START,
  DATETIME_IN_THE_PAST,
  DATETIME_MESSAGES,
  DATETIME_START_AFTER_END,
  DEFAULT_DATE_FORMAT_DOT,
  isNotBeforeCurrentDate,
  TEXT_MAX_NUMBER_3,
  TEXT_MAX_NUMBER_30
} from '@/common'
import { DataTablePaginationWithCheckbox, WelfareMdButton, WelfareSelect } from '@/components/uikit'
import {
  ExhibitionConnectionFormBasicInfoProps,
  exhibitionConnectionFormCategoryTableConfig,
  exhibitionConnectionFormProductTableConfig,
  ExhibitionCornerTableModel
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import Column from 'primevue/column'
import { useExhibitionConnectionFormCategory } from '@/composables/exhibition/exhibitionContent/useExhibitionConnectionFormCategory'
import { ExhibitionGnbGroupTypeUseYnValue } from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import { TextInputValidationMaxBytes, TextInputWithMaxLengthCharacters } from '@/components'

const props = defineProps<ExhibitionConnectionFormBasicInfoProps<ExhibitionCornerTableModel>>()

const {
  setFieldValue,
  dateRangeStart,
  validateTime,
  onRowSelected,
  onSelectAllChange,
  tableRef,
  tableProductRef,
  onRowSelectedProduct,
  onSelectAllChangeProduct,
  tableComputed,
  tableProductComputed,
  deleteItem,
  deleteProductItem,
  addNewItem,
  addNewItemProduct,
  onSubmit,
  handleReset
} = useExhibitionConnectionFormCategory(props)

defineExpose({ submit: onSubmit, reset: handleReset })
</script>

<template>
  <div>
    <div>
      <DataTablePaginationWithCheckbox
        ref="tableRef"
        is-select-invisible
        hidden-pagination
        no-data-label="등록 내용이 없습니다."
        :value="tableComputed"
        @row-checked-change="onRowSelected"
        @selectAllChange="onSelectAllChange"
      >
        <template #title>
          <p class="wf-body_01-semi">카테고리 그룹 관리</p>
        </template>
        <template #buttons>
          <div class="wf_flex wf-space-x-6">
            <WelfareMdButton button-size="small" button-type="liner" label="추가" @on-click="addNewItem" />
            <WelfareMdButton button-size="small" button-type="liner" label="삭제" @on-click="deleteItem" />
          </div>
        </template>
        <template #columns>
          <Column v-for="(col, index) in exhibitionConnectionFormCategoryTableConfig" :key="index" :class="col?.class" :field="col?.field">
            <template #header>
              <!-- nested header cell -->
              <template v-if="col.children?.length ?? 0 > 1">
                <div class="wf_w-full">
                  <div class="wf_data-table-border-b wf_h-44 wf_flex wf_items-center wf_justify-center">
                    {{ col.header }}<span v-if="col?.required" class="wf_text-sub-01">*</span>
                  </div>
                  <div class="wf_h-44 wf_grid" :class="`wf_grid-cols-${col.children?.length}`">
                    <div
                      v-for="(childCol, childIdx) in col.children"
                      :key="childIdx"
                      class="wf_flex wf_items-center wf_justify-center"
                      :class="{ 'wf_data-table-border-l': childIdx !== 0 }"
                    >
                      {{ childCol?.header }}<span v-if="childCol?.required" class="wf_text-sub-01">*</span>
                    </div>
                  </div>
                </div>
              </template>
              <!-- default header cell -->
              <template v-else> {{ col.header }}<span v-if="col?.required" class="wf_text-sub-01">*</span></template>
            </template>

            <!-- body col -->
            <template #body="slotProps">
              <!-- body custom col -->
              <template v-if="col.field === 'cornerDisplayOrder'">
                <TextInputWithMaxLengthCharacters
                  class="wf_w-full"
                  size="small"
                  :model-value="slotProps.data?.cornerDisplayOrder"
                  @update:model-value="
                    (value) => {
                      setFieldValue(`cornerCreateRequestList.${slotProps.index}.cornerDisplayOrder`, value)
                    }
                  "
                  input-type="text"
                  is-number-input-type
                  :max-length="TEXT_MAX_NUMBER_3"
                  hidden-warning
                />
              </template>
              <template v-else-if="col.field === 'displayYn'">
                <WelfareSelect
                  small
                  class="wf_w-120"
                  option-label="label"
                  :model-value="slotProps.data.displayYn"
                  option-value="value"
                  :options="ExhibitionGnbGroupTypeUseYnValue"
                  @update:model-value="
                    (value) => {
                      setFieldValue(`cornerCreateRequestList.${slotProps.index}.displayYn`, value)
                    }
                  "
                />
              </template>

              <template v-else-if="col.field === 'cornerName'">
                <TextInputValidationMaxBytes
                  class="wf_w-full"
                  size="small"
                  :model-value="slotProps.data.cornerName"
                  @update:model-value="
                    (value) => {
                      setFieldValue(`cornerCreateRequestList.${slotProps.index}.cornerName`, value)
                    }
                  "
                  :max-bytes="TEXT_MAX_NUMBER_30"
                  hidden-warning
                />
              </template>
              <template v-else-if="col.field === 'displayStartDate'">
                <DateTimePicker
                  size="small"
                  :format="DEFAULT_DATE_FORMAT_DOT"
                  :min-date-message="DATETIME_MESSAGES[DATETIME_IN_THE_PAST]"
                  :max-date-message="DATETIME_MESSAGES[DATETIME_START_AFTER_END]"
                  :min-date="dateRangeStart"
                  :max-date="slotProps.data.displayEndDate"
                  :model-value="slotProps.data?.displayStartDate"
                  @update:model-value="(value) => setFieldValue(`cornerCreateRequestList.${slotProps.index}.displayStartDate`, value)"
                />
              </template>
              <template v-else-if="col.field === 'displayStartTime'">
                <WelfareTimeInput
                  :model-value="slotProps.data.displayStartTime"
                  @update:model-value="
                    (val) =>
                      validateTime(`cornerCreateRequestList.${slotProps.index}.displayStartTime`, val, slotProps.data.displayStartDate, {
                        type: 'start',
                        compareDate: slotProps.data.displayEndDate,
                        compareTime: slotProps.data.displayEndTime
                      })
                  "
                />
              </template>
              <template v-else-if="col.field === 'displayEndDate'">
                <DateTimePicker
                  size="small"
                  :format="DEFAULT_DATE_FORMAT_DOT"
                  :min-date-message="
                    slotProps.data.displayStartDate && isNotBeforeCurrentDate(slotProps.data.displayStartDate as string)
                      ? DATETIME_MESSAGES[DATETIME_END_BEFORE_START]
                      : DATETIME_MESSAGES[DATETIME_IN_THE_PAST]
                  "
                  :min-date="
                    slotProps.data.displayStartDate && isNotBeforeCurrentDate(slotProps.data.displayStartDate as string)
                      ? slotProps.data.displayStartDate
                      : dateRangeStart
                  "
                  :model-value="slotProps.data?.displayEndDate"
                  @update:model-value="(value) => setFieldValue(`cornerCreateRequestList.${slotProps.index}.displayEndDate`, value)"
                />
              </template>
              <template v-else-if="col.field === 'displayEndTime'">
                <WelfareTimeInput
                  class="wf-ml-6"
                  :model-value="slotProps.data?.displayEndTime"
                  @update:model-value="
                    (val) =>
                      validateTime(`data.${slotProps.index}.displayEndTime`, val, slotProps.data.displayEndDate, {
                        type: 'end',
                        compareTime: slotProps.data.displayStartTime,
                        compareDate: slotProps.data.displayStartDate
                      })
                  "
                />
              </template>

              <template v-else-if="col.field === 'no'">
                {{ slotProps.index + 1 }}
              </template>

              <!--default col -->
              <template v-else>
                <div :class="true === slotProps.data.id && 'wf_table-single-selected-row--content'">
                  {{ slotProps.data?.[col.field] }}
                </div>
              </template>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>

    <div>
      <DataTablePaginationWithCheckbox
        ref="tableProductRef"
        is-select-invisible
        hidden-pagination
        no-data-label="등록 내용이 없습니다."
        :value="tableProductComputed"
        @row-checked-change="onRowSelectedProduct"
        @selectAllChange="onSelectAllChangeProduct"
      >
        <template #title>
          <p class="wf-body_01-semi">상품 목록</p>
        </template>
        <template #buttons>
          <div class="wf_flex wf-space-x-6">
            <WelfareMdButton button-size="small" button-type="liner" label="등록" @on-click="addNewItemProduct" />
            <WelfareMdButton button-size="small" button-type="liner" label="삭제" @on-click="deleteProductItem" />
          </div>
        </template>
        <template #columns>
          <Column v-for="(col, index) in exhibitionConnectionFormProductTableConfig" :key="index" :class="col?.class" :field="col?.field">
            <template #header>
              <div>{{ col.header }} <span v-if="col?.required" class="wf_text-sub-01">*</span></div>
            </template>
            <template #body="slotProps">
              <!-- body custom col -->

              <template v-if="col.field === 'cornerProductDisplayOrder'">
                <TextInputWithMaxLengthCharacters
                  class="wf_w-full"
                  size="small"
                  :model-value="slotProps.data?.cornerProductDisplayOrder"
                  @update:model-value="
                    (value) => {
                      setFieldValue(`cornerProductCreateRequestList.${slotProps.index}.cornerProductDisplayOrder`, value)
                    }
                  "
                  input-type="text"
                  is-number-input-type
                  :max-length="TEXT_MAX_NUMBER_3"
                  hidden-warning
                />
              </template>

              <template v-else-if="col.field === 'displayYn'">
                <WelfareSelect
                  small
                  class="wf_w-120"
                  option-label="label"
                  :model-value="slotProps.data.displayYn"
                  option-value="value"
                  :options="ExhibitionGnbGroupTypeUseYnValue"
                  @update:model-value="
                    (value) => {
                      setFieldValue(`cornerProductCreateRequestList.${slotProps.index}.displayYn`, value)
                    }
                  "
                />
              </template>
              <template v-else-if="col.field === 'no'">
                {{ slotProps.index + 1 }}
              </template>
              <!--default col -->
              <template v-else>
                <div :class="true === slotProps.data.id && 'wf_table-single-selected-row--content'">
                  {{ slotProps.data?.[col.field] }}
                </div>
              </template>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-merge-col.css');
</style>
