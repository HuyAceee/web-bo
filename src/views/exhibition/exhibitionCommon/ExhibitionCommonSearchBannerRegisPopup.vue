<!-- BO_I0106_020101_P -->

<script setup lang="ts">
import {
  DATETIME_END_BEFORE_START,
  DATETIME_IN_THE_PAST,
  DATETIME_MESSAGES,
  DATETIME_START_AFTER_END,
  DEFAULT_DATE_FORMAT_DOT,
  TEXT_MAX_NUMBER_30,
  isNotBeforeCurrentDate
} from '@/common'
import ExhibitionGnbLinkTypeGroupChoose from '@/components/exhibition/common/ExhibitionGnbLinkTypeGroupChoose.vue'
import { CommonTable, CommonTableContentCell, CommonTableRow, CommonTableTitleCell, WelfareMdButton } from '@/components'
import ExhibitionCommonExcludeCustomerRegisTable from '@/components/exhibition/exhibitionCommon/ExhibitionCommonExcludeCustomerRegisTable.vue'
import WelfareCheckbox from '@/components/uikit/checkbox/WelfareCheckbox.vue'
import WelfareInputText from '@/components/uikit/input/WelfareInputText.vue'
import WelfareRadioGroup from '@/components/uikit/radio/WelfareRadioGroup.vue'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import HeaderModal from '@/components/widgets/modal/HeaderModal.vue'
import TextInputValidationMaxBytes from '@/components/widgets/textInput/TextInputValidationMaxBytes.vue'
import { useExhibitionCommonSearchBannerPopupCtrl } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonSearchBannerPopup'
import { YnOptions } from '@/models'
import {
  ExhibitionCommonSearchBannerPopupEmits,
  ExhibitionCommonSearchBannerPopupProps
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchBannerModel'

const props = withDefaults(defineProps<ExhibitionCommonSearchBannerPopupProps>(), {
  config: () => ({
    type: 'register'
  })
})
const emit = defineEmits<ExhibitionCommonSearchBannerPopupEmits>()

const {
  exposureOptions,
  displayStatusOptions,
  applyChannelOptions,
  dateRangeStart,
  tableRef,
  values,
  tableComputed,
  setFieldValue,
  validateTime,
  onChangeMaxKeyword,
  acceptMaxKeyWord,
  onGetMember,
  onCheckAllChange,
  onCheckRowChange,
  onChangeImage,
  isDisabledDeleteImgBtn,
  onDeleteImage,
  onDeleteSelected,
  onDeleteRow,
  onSubmit,
  onCancel
} = useExhibitionCommonSearchBannerPopupCtrl(props, emit)
</script>

<template>
  <div class="wf_w-1200 wf_bg-white">
    <HeaderModal title="검색어 배너 등록" @close-modal="onCancel" />
    <div class="wf-px-20 wf-py-20">
      <CommonTable>
        <CommonTableRow>
          <CommonTableTitleCell title="배너 코드" is-first-col />
          <CommonTableContentCell :text="String(values.searchWordBannerKey ?? '')" />
          <CommonTableTitleCell title="노출영역" />
          <CommonTableContentCell>
            <WelfareRadioGroup size="sm" :options="exposureOptions" :model-value="exposureOptions[0].value" disabled />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="키워드" required is-first-col />
          <CommonTableContentCell>
            <WelfareInputText
              class="wf_w-full"
              size="small"
              placeholder=" "
              :model-value="values.searchWordBannerKeyword"
              @keypress="acceptMaxKeyWord"
              @update:model-value="(value) => onChangeMaxKeyword('searchWordBannerKeyword', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>

        <!-- image -->
        <CommonTableRow>
          <CommonTableTitleCell title="배너 이미지" required is-first-col />
          <CommonTableContentCell>
            <div class="wf_flex wf_w-full">
              <div class="wf_flex-1" @click="() => onChangeImage('imagePathName', 'imageName', 'imageAltName')">
                <WelfareInputText size="small" class="wf_flex-1" placeholder=" " readonly :model-value="values.imageName" />
              </div>
              <WelfareMdButton
                button-size="small"
                button-type="liner"
                :disabled="isDisabledDeleteImgBtn('imagePathName', 'imageName')"
                class="wf-ml-6 wf-mr--2"
                label="삭제"
                @on-click="() => onDeleteImage('imagePathName', 'imageName')"
              />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="이미지 alt" required is-first-col />
          <CommonTableContentCell>
            <TextInputValidationMaxBytes
              class="wf_w-full"
              size="small"
              placeholder=" "
              hidden-warning
              :max-bytes="TEXT_MAX_NUMBER_30"
              :model-value="values.imageAltName"
              @update:model-value="(value) => setFieldValue('imageAltName', value)"
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
                  validateTime('displayStartTime', val, values.displayStartDate, {
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
                  validateTime('displayEndTime', val, values.displayEndDate, {
                    type: 'end',
                    compareDate: values.displayStartDate,
                    compareTime: values.displayStartTime
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
