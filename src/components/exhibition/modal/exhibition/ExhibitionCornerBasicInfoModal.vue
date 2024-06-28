<script lang="ts" setup>
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { TextInputValidationMaxBytes, WelfareDateTimePicker, WelfareInputText, WelfareRadioGroup } from '@/components'
import { DEFAULT_DATE_FORMAT_DOT, TEXT_MAX_NUMBER_3, TEXT_MAX_NUMBER_30 } from '@/common'
import { useModalNotification } from '@/composables'
import {
  exhibitionCornerConnectionModalModelConfig,
  ExhibitionCornerConnectionModalValueModel
} from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'

interface ExhibitionCornerBasicInfoModalProps {
  values: ExhibitionCornerConnectionModalValueModel
}

interface ExhibitionCornerBasicInfoModalEmits {
  (e: 'setFieldValue', field: any, value: any): void
}

const emits = defineEmits<ExhibitionCornerBasicInfoModalEmits>()
const props = defineProps<ExhibitionCornerBasicInfoModalProps>()

const emitEvent = {
  setFieldValue: (field: string, value: any) => {
    emits('setFieldValue', field, value)
  }
}

const { openModal } = useModalNotification()

const handleChooseStartDate = (value: string) => {
  if (props?.values.toDate && props.values?.toDate < value) {
    openModal({
      content: '시작일은 종료일보다 뒤로 설정할 수 없습니다.'
    })
    return
  }
  emitEvent.setFieldValue(exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row5[0].field, value)
}

const handleChooseEndDate = (value: string) => {
  if (props?.values?.fromDate && props?.values.fromDate > value) {
    openModal({
      content: '종료일은 시작일보다 앞으로 설정할 수 없습니다.'
    })
    return
  }
  emitEvent.setFieldValue(exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row5[1].field, value)
}

const eventInputMaxLength = (value: InputEvent) => {
  const target = value?.target as HTMLInputElement
  if (target?.value?.length > TEXT_MAX_NUMBER_3) {
    target.value = target.value?.slice(0, TEXT_MAX_NUMBER_3)
  }
}
</script>

<template>
  <p class="wf-body_01-semi wf-mb-12">코너 기본정보</p>
  <div class="wf-group-filter">
    <div class="wf_flex wf_flex-col">
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="코너번호" is-rounded-top>
            <p class="wf-body_03-reg">{{ values.cornerNumber }}</p>
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="코너명" is-border-left>
            <p class="wf-body_03-reg">{{ values.cornerName }}</p>
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="전시관 카테고리 코드">
            <p class="wf-body_03-reg">{{ values.exhibitionHallCategoryCode }}</p>
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="전시관 카테고리명" is-border-left>
            <p class="wf-body_03-reg">{{ values.exhibitionHallCategoryName }}</p>
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="코너명" required>
            <TextInputValidationMaxBytes
              size="small"
              placeholder=""
              :model-value="values.cornerNameInput"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row3[0].field, value)
                }
              "
              hiddenWarning
              :max-bytes="TEXT_MAX_NUMBER_30"
              class="w-input-180"
            />
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="전시여부" is-border-left>
            <WelfareRadioGroup
              size="sm"
              name="targetKind"
              :model-value="values.exhibitionStatus"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row3[1].field, value)
                }
              "
              :options="exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row3[1].options"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="전시 순서" required>
            <WelfareInputText
              size="small"
              placeholder=""
              :model-value="values.displayOrder"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(
                    exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row4[0].field,
                    value?.slice(0, TEXT_MAX_NUMBER_3)
                  )
                }
              "
              input-type="number"
              @input="eventInputMaxLength"
              hiddenWarning
              class="w-input-180"
            />
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="적용 채널" is-border-left>
            <WelfareRadioGroup
              size="sm"
              name="targetKind"
              :model-value="values.ApplicableChannel"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row4[1].field, value)
                }
              "
              :options="exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row4[1].options"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="전시 시작" required class="wf_h-42" is-rounded-bottom :is-border-bottom="false">
            <WelfareDateTimePicker
              :modelValue="values.fromDate"
              @update:model-value="handleChooseStartDate"
              :format="DEFAULT_DATE_FORMAT_DOT"
              type="date"
              size="small"
            />
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="전시 종료" required class="wf_h-42" is-border-left :is-border-bottom="false">
            <WelfareDateTimePicker
              :modelValue="values.toDate"
              @update:model-value="handleChooseEndDate"
              :format="DEFAULT_DATE_FORMAT_DOT"
              type="date"
              size="small"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/modal/exhibition-corner-connection-modal.css');
</style>
