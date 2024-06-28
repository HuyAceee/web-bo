<!-- BO_I0302_030101_P -->
<script lang="ts" setup>
import { TEXT_MAX_NUMBER_30 } from '@/common'
import {
  HeaderModal,
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  WelfareInputText,
  WelfareSelect,
  WelfareRadioGroup,
  WelfareMdButton,
  WelfareCheckbox,
  TextInputValidationMaxBytes
} from '@/components'
import { YnOptions } from '@/models'
import FormGroupInputColor from '@/components/widgets/form/FormGroupInputColor.vue'
import {
  isNotBeforeCurrentDate,
  DATETIME_MESSAGES,
  DATETIME_END_BEFORE_START,
  DATETIME_IN_THE_PAST,
  DATETIME_START_AFTER_END,
  DEFAULT_DATE_FORMAT_DOT
} from '@/common'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import {
  ExhibitionCommonBannerDisplayCreateRequestModel,
  ExhibitionCommonBannerRegisPopupEmits,
  ExhibitionCommonBannerRegisPopupProps
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerRegisModel'
import { useExhibitionBannerRegisPopup } from '@/composables/exhibition/exhibitionCommon/useExhibitionBannerRegistrationPopup'
import ExhibitionGnbLinkTypeGroupChoose from '@/components/exhibition/common/ExhibitionGnbLinkTypeGroupChoose.vue'

const props = withDefaults(defineProps<ExhibitionCommonBannerRegisPopupProps>(), {
  config: () => ({
    type: 'register'
  })
})

const emit = defineEmits<ExhibitionCommonBannerRegisPopupEmits>()

const {
  exhibitionBannerOrderOption,
  exhibitionBannerStatusOption,
  exhibitionApplyChannelOptions,
  exhibitionTotalPopupOptions,
  values,
  setFieldValue,
  dateRangeStart,
  onCancel,
  onSubmit,
  onChangeImage,
  onDeleteImage,
  isDisabledDeleteImgBtn,
  validateTime,
  handleCommonPopup
} = useExhibitionBannerRegisPopup(props, emit)
</script>
<template>
  <div class="wf_w-1200 wf_bg-white">
    <HeaderModal title="배너 등록" @close-modal="onCancel" />
    <div class="wf-space-y-20 wf-pl-20 wf-py-20 wf-pr-14 wf-modal-wrapper--grow wf-custom-scrollbar">
      <CommonTable>
        <CommonTableRow>
          <CommonTableTitleCell title="배너 영역" is-first-col />
          <CommonTableContentCell>{{ values.bannerGroupName }}</CommonTableContentCell>
          <CommonTableTitleCell title="배너 그룹 코드" required />
          <CommonTableContentCell> {{ values?.bannerGroupKey ?? '' }}</CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="배너명" is-first-col required />
          <CommonTableContentCell>
            <TextInputValidationMaxBytes
              class="wf-width-full"
              size="small"
              placeholder=""
              :max-bytes="TEXT_MAX_NUMBER_30"
              hidden-warning
              :model-value="values.bannerName"
              @update:model-value="(value) => setFieldValue('bannerName', value)"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="배너 코드" />
          <CommonTableContentCell> {{ values.bannerKey }}</CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="배너 노출 순서" is-first-col required />
          <CommonTableContentCell>
            <WelfareRadioGroup
              size="sm"
              gap="18"
              :options="exhibitionBannerOrderOption"
              :model-value="values.bannerOrderType"
              @update:model-value="(value) => setFieldValue('bannerOrderType', value)"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="전시 여부" required />
          <CommonTableContentCell>
            <WelfareRadioGroup
              size="sm"
              gap="18"
              :options="exhibitionBannerStatusOption"
              :model-value="values.displayYn"
              @update:model-value="(value) => setFieldValue('displayYn', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="전시 시작일" is-first-col required />
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
          <CommonTableTitleCell title="전시 종료일" required />
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
        <CommonTableRow>
          <CommonTableTitleCell title="적용 채널" is-first-col required />
          <CommonTableContentCell>
            <WelfareRadioGroup
              size="sm"
              gap="18"
              :options="exhibitionApplyChannelOptions"
              :model-value="values.applyChannelType"
              @update:model-value="(value) => setFieldValue('applyChannelType', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow is-last-row>
          <CommonTableTitleCell title="배너 개수" is-first-col required />
          <CommonTableContentCell>
            <div class="wf_flex wf-space-x-20 wf-body_03-reg wf_text-n-33">
              <div class="wf_flex wf_items-center wf-space-x-8">
                <WelfareSelect
                  small
                  class="wf_w-180"
                  placeholder="선택"
                  optionLabel="label"
                  option-value="value"
                  :options="exhibitionTotalPopupOptions"
                  :model-value="values.commonBannerCount"
                  @update:model-value="handleCommonPopup"
                />
              </div>
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>

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
      <!-- PC -->
      <div class="wf-mt-22" v-if="values.commonBannerCount">
        <div class="wf_flex wf_items-center wf_justify-between wf-mb-2">
          <div class="wf_flex wf_items-center wf-space-x-10">
            <p class="wf-body_01-semi">팝업 내용 입력</p>
            <!-- <p class="wf-body_04-reg wf_text-sub-01">*PC 이미지의 경우 최대 OOOkB, OOO*OOOpx 사이즈를 권장합니다.</p> -->
          </div>
          <WelfareCheckbox size="sm" label="공통" />
        </div>
        <div v-for="(item, index) in values.bannerDisplayCreateRequestList" :key="`pcForm${index}`">
          <div class="wf-mt-10">
            <CommonTable>
              <CommonTableRow>
                <CommonTableTitleCell title="배너 전시 순서" is-first-col required />
                <CommonTableContentCell>
                  <WelfareInputText
                    class="wf_w-180"
                    size="small"
                    placeholder=""
                    :model-value="item.bannerDisplayOrder ?? item.toString()"
                    @update:model-value="(value) => setFieldValue(`bannerDisplayCreateRequestList.${index}.bannerDisplayOrder`, value)"
                  />
                </CommonTableContentCell>
              </CommonTableRow>
              <CommonTableRow>
                <CommonTableTitleCell title="이미지" is-first-col required />
                <CommonTableContentCell>
                  <div class="wf_w-full wf_flex wf_items-center">
                    <WelfareCheckbox
                      class=""
                      size="sm"
                      label="사용 안함"
                      :model-value="item.imageUseYn === YnOptions.Y"
                      @update:model-value="
                        (value) => setFieldValue(`bannerDisplayCreateRequestList.${index}.imageUseYn`, value ? YnOptions.Y : YnOptions.N)
                      "
                    />
                    <div class="wf_flex-1 wf-ml-20" @click="() => onChangeImage(index, 'imagePathName', 'imageName', 'imageAltName')">
                      <WelfareInputText size="small" class="" placeholder=" " readonly :model-value="item.imageName" />
                    </div>
                    <WelfareMdButton
                      button-size="small"
                      button-type="liner"
                      :disabled="isDisabledDeleteImgBtn(index, 'imagePathName', 'imageName')"
                      class="wf-ml-4"
                      label="삭제"
                      @on-click="() => onDeleteImage(index)"
                    />
                  </div>
                </CommonTableContentCell>
                <CommonTableTitleCell title="이미지 alt" required />
                <CommonTableContentCell>
                  <TextInputValidationMaxBytes
                    class="wf-width-full"
                    size="small"
                    :max-bytes="TEXT_MAX_NUMBER_30"
                    placeholder=""
                    hidden-warning
                    :model-value="item.imageAltName"
                    @update:model-value="(value) => setFieldValue(`bannerDisplayCreateRequestList.${index}.imageAltName`, value)"
                  />
                </CommonTableContentCell>
              </CommonTableRow>
              <CommonTableRow>
                <CommonTableTitleCell title="이미지 text" is-first-col required />
                <CommonTableContentCell>
                  <div class="wf_w-full wf_flex wf_items-center">
                    <WelfareCheckbox
                      class=""
                      size="sm"
                      label="사용 안함"
                      :model-value="item.imageTextUseYn === YnOptions.Y"
                      @update:model-value="
                        (value) => setFieldValue(`bannerDisplayCreateRequestList.${index}.imageTextUseYn`, value ? YnOptions.Y : YnOptions.N)
                      "
                    />
                    <div class="wf_flex-1 wf-ml-20">
                      <TextInputValidationMaxBytes
                        class="wf-width-full"
                        size="small"
                        :max-bytes="TEXT_MAX_NUMBER_30"
                        placeholder=""
                        hidden-warning
                        :model-value="item.imageTextName"
                        @update:model-value="(value) => setFieldValue(`bannerDisplayCreateRequestList.${index}.imageTextName`, value)"
                      />
                    </div>
                  </div>
                </CommonTableContentCell>
                <CommonTableTitleCell title="배경색" />
                <CommonTableContentCell>
                  <div class="wf_flex wf_w-full">
                    <WelfareCheckbox
                      size="sm"
                      label="배경색 없음"
                      :model-value="item.colorHexaUseYn === YnOptions.Y"
                      @update:model-value="
                        (value) => setFieldValue(`bannerDisplayCreateRequestList.${index}.colorHexaUseYn`, value ? YnOptions.Y : YnOptions.N)
                      "
                    />
                    <FormGroupInputColor
                      class="wf-ml-20"
                      placeholder=""
                      :model-value="item.colorHexaValue"
                      @update:model-value="(value) => setFieldValue(`bannerDisplayCreateRequestList.${index}.colorHexaValue`, value)"
                    />
                  </div>
                </CommonTableContentCell>
              </CommonTableRow>
              <CommonTableRow height="42" is-last-row>
                <CommonTableTitleCell title="랜딩 url" is-first-col />
                <CommonTableContentCell>
                  <div class="wf_w-full wf_flex">
                    <ExhibitionGnbLinkTypeGroupChoose
                      :data="values.bannerDisplayCreateRequestList[index]"
                      @update:model-value="
                        (field, value) =>
                          setFieldValue(
                            `bannerDisplayCreateRequestList.${index}.${field as keyof ExhibitionCommonBannerDisplayCreateRequestModel}`,
                            value
                          )
                      "
                    />
                  </div>
                </CommonTableContentCell>
              </CommonTableRow>
            </CommonTable>
          </div>
        </div>
      </div>

      <div class="wf_flex wf_items-center wf_justify-center wf-space-x-4">
        <WelfareMdButton class="wf_w-120" label="닫기" button-size="default" button-type="cancel" @onClick="onCancel" />
        <WelfareMdButton class="wf_w-120" label="저장" button-size="default" button-type="default" @onClick="onSubmit" />
      </div>
    </div>
  </div>
</template>
