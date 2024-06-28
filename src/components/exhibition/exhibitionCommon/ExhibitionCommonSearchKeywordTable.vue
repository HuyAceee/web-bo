<script setup lang="ts">
import {
  DATETIME_END_BEFORE_START,
  DATETIME_IN_THE_PAST,
  DATETIME_MESSAGES,
  DATETIME_START_AFTER_END,
  DEFAULT_DATE_FORMAT_DOT,
  isNotBeforeCurrentDate
} from '@/common'
import ExhibitionGnbLinkTypeGroupChoose from '@/components/exhibition/common/ExhibitionGnbLinkTypeGroupChoose.vue'
import { DataTablePaginationWithCheckbox, WelfareMdButton, WelfareSelect } from '@/components/uikit'
import { TextInputWithMaxLengthCharacters } from '@/components/widgets'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import { useExhibitionCommonSearchKeywordTable } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonSearchKeywordTable'
import {
  ExhibitionCommonSearchKeywordTableEmits,
  ExhibitionCommonSearchKeywordTableProps,
  exhibitionCommonSearchKeywordTableConfig
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchKeywordModel'
import Column from 'primevue/column'

const props = defineProps<ExhibitionCommonSearchKeywordTableProps>()
const emit = defineEmits<ExhibitionCommonSearchKeywordTableEmits>()

const {
  displayStatusOptions,
  tableRef,
  values,
  tableComputed,
  dateRangeStart,
  onChangeField,
  validateTime,
  onCheckAllChange,
  onCheckeRowChange,
  onSave,
  onDelete,
  onRegis,
  onUpdate,
  onExport
} = useExhibitionCommonSearchKeywordTable(props, emit)

defineExpose({
  scrollToTop: () => {
    tableRef?.value?.scrollToTop()
  }
})
</script>

<template>
  <div class="wf-mx--1">
    <DataTablePaginationWithCheckbox
      :value="tableComputed"
      ref="tableRef"
      lazy
      :loading="$props.isLoading"
      no-data-label="조회 내용이 없습니다."
      :total-items="$props.totalItems"
      @page-change="(params) => $emit('pageChange', params)"
      @row-checked-change="onCheckeRowChange"
      @select-all-change="onCheckAllChange"
    >
      <template #title>
        <h6 class="wf_text-n-33">{{ `조회 결과  총 ${$props.totalItems ?? 0} 건` }}</h6>
      </template>
      <template #buttons>
        <div class="wf_flex wf-space-x-5">
          <WelfareMdButton label="저장" @on-click="onSave" button-size="default" buttonType="liner" />
          <WelfareMdButton label="삭제" @on-click="onDelete" button-size="default" buttonType="liner" />
          <WelfareMdButton label="등록" @on-click="onRegis" button-size="default" buttonType="liner" />
          <WelfareMdButton label="엑셀다운로드" @on-click="onExport" button-size="default" buttonType="liner" />
        </div>
      </template>
      <template #columns>
        <Column v-for="(col, index) in exhibitionCommonSearchKeywordTableConfig" :key="index" :class="col?.class" :field="col?.field">
          <template #header>
            <div>{{ col.header }}<span v-if="col?.required" class="wf_text-sub-01">*</span></div>
          </template>

          <!-- body col -->
          <template #body="slotProps">
            <!-- custom col -->
            <template v-if="col.field === 'displayStartDate'">
              <DateTimePicker
                size="small"
                :format="DEFAULT_DATE_FORMAT_DOT"
                :min-date-message="DATETIME_MESSAGES[DATETIME_IN_THE_PAST]"
                :max-date-message="DATETIME_MESSAGES[DATETIME_START_AFTER_END]"
                :min-date="dateRangeStart"
                :max-date="values.data[slotProps.index].displayEndDate"
                :model-value="values.data[slotProps.index].displayStartDate"
                @update:model-value="(val) => onChangeField(`data.${slotProps.index}.displayStartDate`, val)"
              />
            </template>

            <template v-else-if="col.field === 'displayStartTime'">
              <WelfareTimeInput
                :model-value="values.data[slotProps.index].displayStartTime"
                @update:model-value="
                  (val) =>
                    validateTime(`data.${slotProps.index}.displayStartTime`, val, values.data[slotProps.index].displayStartDate, {
                      type: 'start',
                      compareDate: values.data[slotProps.index].displayEndDate,
                      compareTime: values.data[slotProps.index].displayEndTime
                    })
                "
              />
            </template>

            <template v-else-if="col.field === 'displayEndDate'">
              <DateTimePicker
                size="small"
                :min-date-message="
                  values.data[slotProps.index].displayStartDate && isNotBeforeCurrentDate(values.data[slotProps.index].displayStartDate as string)
                    ? DATETIME_MESSAGES[DATETIME_END_BEFORE_START]
                    : DATETIME_MESSAGES[DATETIME_IN_THE_PAST]
                "
                :min-date="
                  values.data[slotProps.index].displayStartDate && isNotBeforeCurrentDate(values.data[slotProps.index].displayStartDate as string)
                    ? values.data[slotProps.index].displayStartDate
                    : dateRangeStart
                "
                :format="DEFAULT_DATE_FORMAT_DOT"
                :model-value="values.data[slotProps.index].displayEndDate"
                @update:model-value="(val) => onChangeField(`data.${slotProps.index}.displayEndDate`, val)"
              />
            </template>

            <template v-else-if="col.field === 'displayEndTime'">
              <WelfareTimeInput
                :model-value="values.data[slotProps.index].displayEndTime"
                @update:model-value="
                  (val) =>
                    validateTime(`data.${slotProps.index}.displayEndTime`, val, values.data[slotProps.index].displayEndDate, {
                      type: 'end',
                      compareTime: values.data[slotProps.index].displayStartTime,
                      compareDate: values.data[slotProps.index].displayStartDate
                    })
                "
              />
            </template>

            <template v-else-if="col.field == 'searchBoxKeywordKey'">
              <span class="wf-text_link wf-pointer" @click="() => onUpdate(slotProps.data)">{{ slotProps.data?.searchBoxKeywordKey }}</span>
            </template>

            <template v-else-if="col.field == 'searchKeyword'">
              <div class="wf_w-full">
                <TextInputWithMaxLengthCharacters
                  size="small"
                  placeholder="최대 15자 이내 입력"
                  :max-length="15"
                  hidden-warning
                  :model-value="values?.data[slotProps.index]?.searchBoxKeywordName"
                  @update:model-value="(val) => onChangeField(`data.${slotProps.index}.searchBoxKeywordName`, val)"
                />
              </div>
            </template>

            <template v-else-if="col.field === 'exhibitionStatus'">
              <div class="wf_w-full">
                <WelfareSelect
                  small
                  option-label="label"
                  option-value="value"
                  :options="displayStatusOptions"
                  :model-value="values?.data[slotProps.index]?.displayYn"
                  @update:model-value="(val) => onChangeField(`data.${slotProps.index}.displayYn`, val)"
                />
              </div>
            </template>

            <template v-else-if="col.field === 'url'">
              <div class="wf_w-full wf_flex">
                <ExhibitionGnbLinkTypeGroupChoose
                  :data="values.data[slotProps.index]"
                  @update:model-value="(field, value) => onChangeField(`data.${slotProps.index}.${field}`, value)"
                />
              </div>
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
</template>
