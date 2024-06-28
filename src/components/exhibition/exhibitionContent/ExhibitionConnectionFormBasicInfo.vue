<script setup lang="ts">
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  TextInputValidationMaxBytes,
  WelfareCheckbox,
  WelfareMdButton,
  WelfareRadioGroup,
  WelfareSelect,
  WelfareTag,
  WelfareTextarea
} from '@/components'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { useExhibitionConnectionFormBasicInfo } from '@/composables/exhibition/exhibitionContent/useExhibitionConnectionFormBasicInfo'
import { ProductSearchType, YnOptions } from '@/models'
import {
  ExhibitionConnectionFormBasicInfoProps,
  ExhibitionSellerSpecialConnectionMngtAllFormPopupModel
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import {
  DATETIME_END_BEFORE_START,
  DATETIME_IN_THE_PAST,
  DATETIME_MESSAGES,
  DATETIME_START_AFTER_END,
  DEFAULT_DATE_FORMAT_DOT,
  formatTime,
  isNotBeforeCurrentDate,
  TEXT_MAX_NUMBER_100
} from '@/common'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import { exhibitionFullExposureDisplayOption } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionFormBasicInfoModel'

const props = defineProps<ExhibitionConnectionFormBasicInfoProps<ExhibitionSellerSpecialConnectionMngtAllFormPopupModel>>()

const {
  exhibitionStatusOptions,
  exhibitionDisplayOptions,
  exposurePeriodOptions,
  flatformOptions,
  exhibitionFormTypeOptions,
  keyWordInput,
  values,
  setFieldValue,
  onRegisKeyword,
  onDeleteKeyword,
  onSubmit,
  handleReset,
  exhibitionCategoryOptions,
  dateRangeStart,
  validateTime
} = useExhibitionConnectionFormBasicInfo(props)

defineExpose({ submit: onSubmit, reset: handleReset })
</script>

<template>
  <div>
    <p class="wf-body_01-semi">전시 기본정보</p>

    <CommonTable class="wf-mt-12">
      <CommonTableRow>
        <CommonTableTitleCell title="기획전 코드" is-first-col />
        <CommonTableContentCell>
          <p class="wf-body_03-reg text-default">
            {{ values.exhibitionKey }}
          </p></CommonTableContentCell
        >
        <CommonTableTitleCell title="판매사" required />
        <CommonTableContentCell>
          <ProductSearchModalWithTableWrapper
            class="wf_w-228"
            placeholder-input="판매사 조회"
            :type="ProductSearchType.SELLER"
            :default-value="values.sellerKey"
            @selectValue="(event) => setFieldValue('sellerKey', String(event?.code))"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="기획전 구분" required is-first-col />

        <CommonTableContentCell>
          <WelfareSelect
            placeholder="선택"
            small
            class="wf_w-180"
            option-label="label"
            option-value="value"
            :options="exhibitionCategoryOptions"
            :modelValue="values.exhibitionType"
            @update:modelValue="(value) => setFieldValue('exhibitionType', value)"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="전시 상태" />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            :options="exhibitionStatusOptions"
            :model-value="values.exhibitionStatusType"
            @update:model-value="(value) => setFieldValue('exhibitionStatusType', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="기획전명" required is-first-col />
        <CommonTableContentCell>
          <TextInputValidationMaxBytes
            class="wf_w-180"
            size="small"
            placeholder="기획전명 입력"
            :model-value="values.exhibitionName"
            @update:model-value="(value) => setFieldValue('exhibitionName', value)"
            :max-bytes="TEXT_MAX_NUMBER_100"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="기획전 설명" />
        <CommonTableContentCell>
          <TextInputValidationMaxBytes
            class="wf_w-180"
            size="small"
            placeholder="기획전 설명 입력"
            :model-value="values.exhibitionContents"
            :max-bytes="TEXT_MAX_NUMBER_100"
            @update:model-value="(value) => setFieldValue('exhibitionContents', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="106">
        <CommonTableTitleCell title="기획전 키워드" is-first-col />
        <CommonTableContentCell>
          <div class="wf_w-full">
            <div class="wf_flex wf-space-x-4">
              <TextInputValidationMaxBytes
                class="wf_w-180"
                size="small"
                :max-bytes="20"
                placeholder="기획전 검색 키워드"
                hidden-warning
                v-model="keyWordInput"
              />
              <WelfareMdButton button-size="small" button-type="liner" label="등록" @on-click="onRegisKeyword" />
            </div>
            <div class="wf-mt-10 wf_flex wf-space-x-10 wf_exhibition-tag-container wf_h-55 wf-mx--1">
              <WelfareTag v-for="(tag, index) in values.keywordCreateRequestList" :key="index" @icon-click="onDeleteKeyword(index)"
                >{{ tag.keywordName }}
              </WelfareTag>
            </div>
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="담당 MD" required is-first-col />
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
            :options="exhibitionDisplayOptions"
            :model-value="values.displayYn"
            @update:model-value="(value) => setFieldValue('displayYn', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="전시기간 노출여부" required is-first-col />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            name="exhibitionPeriodUseYn"
            :options="exposurePeriodOptions"
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
            :model-value="values.displayStartDate && formatTime(values.displayStartDate, DEFAULT_DATE_FORMAT_DOT)"
            @update:model-value="(value) => setFieldValue(`displayStartDate`, value)"
          />
          <WelfareTimeInput
            class="wf-mx-6"
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
          <span class="wf-mr-6">~</span>
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
            :model-value="values.displayEndDate && formatTime(values.displayEndDate, DEFAULT_DATE_FORMAT_DOT)"
            @update:model-value="(value) => setFieldValue(`displayEndDate`, value)"
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

      <CommonTableRow>
        <CommonTableTitleCell title="적용 채널" required is-first-col />
        <CommonTableContentCell>
          <div class="wf_flex wf-space-x-20">
            <WelfareCheckbox
              v-for="(flatform, index) in flatformOptions"
              :key="index"
              size="sm"
              :label="flatform.label"
              :model-value="values[flatform.value] === YnOptions.Y"
              @update:model-value="(value) => setFieldValue(flatform.value, value ? YnOptions.Y : YnOptions.N)"
            />
          </div>
        </CommonTableContentCell>
        <CommonTableTitleCell title="노출 구분" required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            name="exhibitionFormType"
            :options="exhibitionFormTypeOptions"
            :model-value="values.exhibitionFormType"
            @update:model-value="(value) => setFieldValue('exhibitionFormType', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="노출 전체 전시" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            :options="exhibitionFullExposureDisplayOption"
            :model-value="values.exhibitionFormAllYn"
            @update:model-value="(value) => setFieldValue('exhibitionFormAllYn', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="133" is-last-row>
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
    </CommonTable>

    <CommonTable class="wf-mt-12">
      <CommonTableRow>
        <CommonTableTitleCell title="등록자" is-first-col />
        <CommonTableContentCell>
          <p class="wf-body_03-reg text-default">{{ values.createdByName }}</p>
        </CommonTableContentCell>
        <CommonTableTitleCell title="등록일시" />
        <CommonTableContentCell>
          <p class="wf-body_03-reg text-default">
            {{ values.createdDate }}
          </p>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="수정자" is-first-col />
        <CommonTableContentCell>
          <p class="wf-body_03-reg text-default">{{ values.lastModifiedByName }}</p></CommonTableContentCell
        >
        <CommonTableTitleCell title="수정일시" />
        <CommonTableContentCell>
          <p class="wf-body_03-reg text-default">
            {{ values.lastModifiedDate }}
          </p>
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>
  </div>
</template>
