<script lang="ts" setup>
import { YnOptions } from '@/models/common'
import { ProductSearchType } from '@/models'
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  WelfareSelect,
  WelfareRadioGroup,
  TextInputValidationMaxBytes,
  WelfareMdButton,
  WelfareTag,
  WelfareCheckbox,
  WelfareTextarea
} from '@/components'
import {
  DEFAULT_DATE_FORMAT_DOT,
  TEXT_MAX_NUMBER_20,
  TEXT_MAX_NUMBER_100,
  DATETIME_MESSAGES,
  DATETIME_END_BEFORE_START,
  DATETIME_IN_THE_PAST,
  DATETIME_START_AFTER_END,
  isNotBeforeCurrentDate
} from '@/common'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { useExhibitionSpecialConnectionFormBasicInfo } from '@/composables/exhibition/exhibitionContent/useExhibitionSpecialConnectionFormBasicInfo'
import ExhibitionCommonWindowRegistrationTable from '@/components/exhibition/exhibitionCommon/ExhibitionCommonWindowRegistrationTable.vue'
import { ExhibitionSpecialConnectionFormBasicInfoProps } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionFormBasicInfoModel'
const props = defineProps<ExhibitionSpecialConnectionFormBasicInfoProps>()

const {
  exhibitionStatusTypeOptions,
  displayExhibitionOption,
  exhibitionPeriodOptions,
  applyChannelOptions,
  exposureDisplayOptions,
  exhibitionFormType,
  tableRef,
  exhibitionTypeOptions,
  keyWordInput,
  values,
  setFieldValue,
  onRegisKeyword,
  onDeleteKeyword,
  onSubmit,
  tableComputed,
  getCustomerData,
  onCheckAllChange,
  onCheckRowChange,
  onDeleteSelected,
  onDeleteRow,
  dateRangeStart,
  validateTime
} = useExhibitionSpecialConnectionFormBasicInfo(props)
defineExpose({ submit: onSubmit })
</script>
<template>
  <div>
    <p class="wf-body_01-semi">전시 기본정보</p>
    <CommonTable class="wf-mt-12">
      <CommonTableRow>
        <CommonTableTitleCell title="기획전 코드" is-first-col />
        <CommonTableContentCell>
          <span class="wf_text-n-33 wf-body_03-reg">{{ values.exhibitionKey ?? '' }}</span>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="기획전 구분" is-first-col required />
        <CommonTableContentCell>
          <WelfareSelect
            placeholder="선택"
            small
            class="wf_w-180"
            option-label="label"
            option-value="value"
            :options="exhibitionTypeOptions"
            :modelValue="values.exhibitionType"
            @update:modelValue="(value) => setFieldValue('exhibitionType', value)"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="전시 상태" />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            :options="exhibitionStatusTypeOptions"
            :model-value="values.exhibitionStatusType"
            @update:model-value="(value) => setFieldValue('exhibitionStatusType', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="기획전명" is-first-col required />
        <CommonTableContentCell>
          <TextInputValidationMaxBytes
            class="wf-width-full"
            size="small"
            :max-bytes="TEXT_MAX_NUMBER_100"
            placeholder="기획전명 입력"
            hidden-warning
            :model-value="values.exhibitionName"
            @update:model-value="(value) => setFieldValue('exhibitionName', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="기획전 설명" is-first-col />
        <CommonTableContentCell>
          <TextInputValidationMaxBytes
            class="wf-width-full"
            size="small"
            :max-bytes="TEXT_MAX_NUMBER_100"
            placeholder="기획전 설명 입력"
            hidden-warning
            :model-value="values.exhibitionContents"
            @update:model-value="(value) => setFieldValue('exhibitionContents', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow :height="'auto'">
        <CommonTableTitleCell title="기획전 키워드" is-first-col />
        <CommonTableContentCell>
          <div class="wf_w-full wf-py-7">
            <div class="wf_flex wf-space-x-4">
              <TextInputValidationMaxBytes
                class="wf_w-180"
                size="small"
                :max-bytes="TEXT_MAX_NUMBER_20"
                placeholder="기획전 검색 키워드"
                hidden-warning
                v-model="keyWordInput"
              />
              <WelfareMdButton button-size="small" button-type="liner" label="등록" @on-click="onRegisKeyword" />
            </div>
            <div
              class="wf-mt-10 wf_exhibition-tag-container wf-mx--1"
              v-if="values.keywordCreateRequestList && values.keywordCreateRequestList.length > 0"
            >
              <div class="wf_flex wf_flex-wrap wf-gap-10-10 wf_h-auto">
                <WelfareTag v-for="(tag, index) in values.keywordCreateRequestList" :key="index" @icon-click="onDeleteKeyword(index)">
                  {{ tag.keywordName }}
                </WelfareTag>
              </div>
            </div>
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="담당 MD" is-first-col required />
        <CommonTableContentCell>
          <ProductSearchModalWithTableWrapper
            class="wf_w-228"
            placeholder-input="MD 조회"
            :type="ProductSearchType.MD"
            :default-value="values.chargeMdCode"
            @selectValue="(event) => setFieldValue('chargeMdCode', String(event?.code))"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="전시 여부" required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            :options="displayExhibitionOption"
            :model-value="values.displayYn"
            @update:model-value="(value) => setFieldValue('displayYn', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="전시기간 노출여부" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            :options="exhibitionPeriodOptions"
            :model-value="values.exhibitionPeriodUseYn"
            @update:model-value="(value) => setFieldValue('exhibitionPeriodUseYn', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="전시 기간" is-first-col required />
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
                validateTime('displayStartTime', val, values.displayStartDate, {
                  type: 'start',
                  compareDate: values.displayEndDate,
                  compareTime: values.displayEndTime
                })
            "
          />
          <span class="wf-mx-6">~</span>
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
                validateTime('displayEndTime', val, values.displayEndDate, {
                  type: 'end',
                  compareDate: values.displayStartDate,
                  compareTime: values.displayStartTime
                })
            "
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="적용 채널" is-first-col required />
        <CommonTableContentCell>
          <div class="wf_flex wf-space-x-20">
            <WelfareCheckbox
              v-for="(platform, index) in applyChannelOptions"
              :key="index"
              size="sm"
              :label="platform.label"
              :model-value="values[platform.value] === YnOptions.Y"
              @update:model-value="(value) => setFieldValue(platform.value, value ? YnOptions.Y : YnOptions.N)"
            />
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="카테고리 노출 유형" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            :options="exhibitionFormType"
            :model-value="values.exhibitionFormType"
            @update:model-value="(value) => setFieldValue('exhibitionFormType', value)"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="노출 전체 전시" required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            :options="exposureDisplayOptions"
            :model-value="values.exhibitionFormAllYn"
            @update:model-value="(value) => setFieldValue('exhibitionFormAllYn', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="133">
        <CommonTableTitleCell title="강제종료 사유확인" required is-first-col />
        <CommonTableContentCell>
          <div class="wf_w-full">
            <WelfareTextarea
              class="wf_i-h-120"
              placeholder="강제종료 사유가 출력됩니다."
              :model-value="values.terminateReasonContents"
              @update:model-value="(value) => setFieldValue('terminateReasonContents', value)"
            />
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow is-last-row>
        <CommonTableTitleCell title="제외 고객사" required is-first-col />
        <CommonTableContentCell>
          <WelfareMdButton class="wf-w-80" button-size="small" button-type="liner" label="고객사 선택" @click="getCustomerData" />
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>
    <!-- table options -->
    <ExhibitionCommonWindowRegistrationTable
      ref="tableRef"
      :data="tableComputed"
      @delete-row="onDeleteRow"
      @delete-selected="onDeleteSelected"
      @select-row="onCheckRowChange"
      @select-all="onCheckAllChange"
    />
    <!-- info -->
    <CommonTable class="wf-mt-10">
      <CommonTableRow>
        <CommonTableTitleCell title="등록자" is-first-col />
        <CommonTableContentCell :text="values.createdByName" />
        <CommonTableTitleCell title="등록일시" />
        <CommonTableContentCell :text="values.createdDate" />
      </CommonTableRow>
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="수정자" is-first-col />
        <CommonTableContentCell :text="values.lastModifiedByName" />
        <CommonTableTitleCell title="수정일시" />
        <CommonTableContentCell :text="values.lastModifiedDate" />
      </CommonTableRow>
    </CommonTable>
  </div>
</template>
