<!-- BO_I0105_020101_P -->

<script setup lang="ts">
import {
  DATETIME_END_BEFORE_START,
  DATETIME_IN_THE_PAST,
  DATETIME_MESSAGES,
  DATETIME_START_AFTER_END,
  DEFAULT_DATE_FORMAT_DOT,
  isNotBeforeCurrentDate
} from '@/common'
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  HeaderModal,
  WelfareCheckbox,
  WelfareMdButton,
  WelfareRadioGroup
} from '@/components'
import ExhibitionGnbLinkTypeGroupChoose from '@/components/exhibition/common/ExhibitionGnbLinkTypeGroupChoose.vue'
import ExhibitionCommonExcludeCustomerRegisTable from '@/components/exhibition/exhibitionCommon/ExhibitionCommonExcludeCustomerRegisTable.vue'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import TextInputWithMaxLengthCharacters from '@/components/widgets/textInput/TextInputWithMaxLengthCharacters.vue'
import { useExhibitionCommonSearchKeywordPopupCtrl } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonSearchKeywordPopup'
import { YnOptions } from '@/models'
import {
  ExhibitionCommonSearchKeywordPopupEmits,
  ExhibitionCommonSearchKeywordPopupProps
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchKeywordModel'

const props = withDefaults(defineProps<ExhibitionCommonSearchKeywordPopupProps>(), {
  config: () => ({
    type: 'register'
  })
})
const emit = defineEmits<ExhibitionCommonSearchKeywordPopupEmits>()

const {
  displayStatusOptions,
  applyChannelOptions,
  dateRangeStart,
  tableRef,
  values,
  tableComputed,
  setFieldValue,
  validateTime,
  onGetMember,
  onCheckAllChange,
  onCheckRowChange,
  onDeleteSelected,
  onDeleteRow,
  onSubmit,
  onCancel
} = useExhibitionCommonSearchKeywordPopupCtrl(props, emit)
</script>

<template>
  <div class="wf_w-1200 wf_bg-white">
    <HeaderModal title="검색창 키워드 등록" @close-modal="onCancel" />
    <div class="wf-px-20 wf-py-20">
      <CommonTable>
        <CommonTableRow>
          <CommonTableTitleCell title="검색창 키워드 코드" is-first-col />
          <CommonTableContentCell :text="String(values.searchBoxKeywordKey ?? '')" />
          <CommonTableTitleCell title="검색창 키워드" required />
          <CommonTableContentCell>
            <TextInputWithMaxLengthCharacters
              class="wf_w-180"
              size="small"
              placeholder=" "
              :max-length="15"
              :model-value="values.searchBoxKeywordName"
              @update:model-value="(value) => setFieldValue('searchBoxKeywordName', value)"
              hidden-warning
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="랜딩 url" required is-first-col />
          <CommonTableContentCell>
            <div class="wf_w-full wf_flex">
              <ExhibitionGnbLinkTypeGroupChoose :data="values" @update:model-value="(field, value) => setFieldValue(field, value)" />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="전시여부" is-first-col />
          <CommonTableContentCell>
            <WelfareRadioGroup
              size="sm"
              :options="displayStatusOptions"
              :model-value="values.displayYn"
              @update:model-value="(value) => setFieldValue('displayYn', value)"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="적용 채널" required />
          <CommonTableContentCell>
            <div class="wf_flex wf-space-x-20">
              <WelfareCheckbox
                v-for="(item, idx) in applyChannelOptions"
                :key="idx"
                size="sm"
                :label="item.label"
                :value="item.value"
                name="channel"
                :model-value="values[item.value] === YnOptions.Y"
                @update:model-value="(value) => setFieldValue(item.value, value ? YnOptions.Y : YnOptions.N)"
              /></div
          ></CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="전시 시작" required is-first-col />
          <CommonTableContentCell>
            <DateTimePicker
              size="small"
              :format="DEFAULT_DATE_FORMAT_DOT"
              :min-date-message="DATETIME_MESSAGES[DATETIME_IN_THE_PAST]"
              :max-date-message="DATETIME_MESSAGES[DATETIME_START_AFTER_END]"
              :min-date="dateRangeStart"
              :max-date="values.displayEndDate"
              :model-value="values.displayStartDate"
              @update:model-value="(val) => setFieldValue(`displayStartDate`, val)"
            />

            <WelfareTimeInput
              class="wf-ml-6"
              :model-value="values.displayStartTime"
              @update:model-value="
                (val) =>
                  validateTime(`displayStartTime`, val, values.displayStartDate, {
                    type: 'start',
                    compareDate: values.displayEndDate,
                    compareTime: values.displayEndTime
                  })
              "
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="전시 종료" required />
          <CommonTableContentCell>
            <DateTimePicker
              size="small"
              :format="DEFAULT_DATE_FORMAT_DOT"
              :min-date-message="
                values.displayStartDate && isNotBeforeCurrentDate(values.displayStartDate as string)
                  ? DATETIME_MESSAGES[DATETIME_END_BEFORE_START]
                  : DATETIME_MESSAGES[DATETIME_IN_THE_PAST]
              "
              :min-date="
                values.displayStartDate && isNotBeforeCurrentDate(values.displayStartDate as string) ? values.displayStartDate : dateRangeStart
              "
              :model-value="values.displayEndDate"
              @update:model-value="(val) => setFieldValue(`displayEndDate`, val)"
            />
            <WelfareTimeInput
              class="wf-ml-6"
              :model-value="values.displayEndTime"
              @update:model-value="
                (val) =>
                  validateTime(`displayEndTime`, val, values.displayEndDate, {
                    type: 'end',
                    compareTime: values.displayStartTime,
                    compareDate: values.displayStartDate
                  })
              "
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="제외 고객사" is-first-col />
          <CommonTableContentCell>
            <WelfareMdButton button-size="small" button-type="liner" label="고객사 선택" @on-click="onGetMember" />
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>

      <div class="wf-mt-20">
        <ExhibitionCommonExcludeCustomerRegisTable
          ref="tableRef"
          :data="tableComputed"
          @delete-row="onDeleteRow"
          @delete-selected="onDeleteSelected"
          @select-row="onCheckRowChange"
          @select-all="onCheckAllChange"
        />
      </div>

      <CommonTable class="wf-mt-16">
        <CommonTableRow>
          <CommonTableTitleCell title="등록자" is-first-col />
          <CommonTableContentCell :text="values.createdByName" />
          <CommonTableTitleCell title="등록일" />
          <CommonTableContentCell :text="values.createdDate" />
        </CommonTableRow>
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="수정자" is-first-col />
          <CommonTableContentCell :text="values.lastModifiedByName" />
          <CommonTableTitleCell title="수정일" />
          <CommonTableContentCell :text="values.lastModifiedDate" />
        </CommonTableRow>
      </CommonTable>

      <div class="wf-mt-20 wf_flex wf_justify-center">
        <WelfareMdButton class="wf_w-120" label="닫기" button-size="default" button-type="cancel" @onClick="onCancel" />
        <WelfareMdButton class="wf_w-120 wf-ml-4" label="저장" button-size="default" button-type="default" @onClick="onSubmit" />
      </div>
    </div>
  </div>
</template>
