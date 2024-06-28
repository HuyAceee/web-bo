<script lang="ts" setup>
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { TextInputValidationMaxBytes, WelfareCheckbox, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import {
  exhibitionCornerConnectionModalModelConfig,
  ExhibitionCornerConnectionModalValueModel
} from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'
import { computed } from 'vue'

interface ExhibitionCornerExhibitionInfoModalProps {
  typePc?: boolean
  values: ExhibitionCornerConnectionModalValueModel
  commonOption?: boolean
}

interface ExhibitionCornerExhibitionInfoModalEmits {
  (e: 'setFieldValue', field: any, value: any): void

  (e: 'setCommonOption', value: boolean): void
}

const emits = defineEmits<ExhibitionCornerExhibitionInfoModalEmits>()
const props = defineProps<ExhibitionCornerExhibitionInfoModalProps>()

const exhibitionCornerMobileConfig = exhibitionCornerConnectionModalModelConfig.cornerExhibitionMobileInformation

const exhibitionCornerConfig = props.typePc ? exhibitionCornerConnectionModalModelConfig.cornerExhibitionPcInformation : exhibitionCornerMobileConfig

const emitEvent = {
  setFieldValue: (field: string, value: any) => {
    emits('setFieldValue', field, value)
  },
  setCommonOption: (value: boolean) => {
    emits('setCommonOption', value)
  }
}

const disableValue = computed(() => {
  return !props.typePc && props.commonOption
})

const setValueMobile = computed(() => {
  return props.typePc && props.commonOption
})
</script>

<template>
  <div class="wf_flex wf_items-center wf_justify-between wf-mt-20">
    <p class="wf-body_01-semi wf-mb-12">{{ typePc ? 'PC 코너 전시 정보' : '모바일 코너 전시 정보' }}</p>
    <div class="wf_flex wf_items-center wf-mb-12 wf-mr-2" v-if="typePc">
      <WelfareCheckbox size="sm" :model-value="commonOption" @update:model-value="emitEvent.setCommonOption" />
      <p class="wf-ml-8 wf-body_03-reg">공통</p>
    </div>
  </div>
  <div class="wf-group-filter">
    <div class="wf_flex wf_flex-col">
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full">
          <FormGroup label="메인 타이틀" is-rounded-top>
            <WelfareInputText
              size="small"
              :model-value="values[exhibitionCornerConfig.row1.field]"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConfig.row1.field, value)
                  if (setValueMobile) {
                    emitEvent.setFieldValue(exhibitionCornerMobileConfig.row1.field, value)
                  }
                }
              "
              :disabled="disableValue"
              placeholder=""
              class="wf-width-full"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full">
          <FormGroup label="서브 타이틀">
            <WelfareInputText
              size="small"
              :model-value="values[exhibitionCornerConfig.row2.field]"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConfig.row2.field, value)
                  if (setValueMobile) {
                    emitEvent.setFieldValue(exhibitionCornerMobileConfig.row2.field, value)
                  }
                }
              "
              :disabled="disableValue"
              placeholder=""
              class="wf-width-full"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full">
          <FormGroup label="이미지 Text">
            <TextInputValidationMaxBytes
              size="small"
              :model-value="values[exhibitionCornerConfig.row3.field]"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConfig.row3.field, value)
                  if (setValueMobile) {
                    emitEvent.setFieldValue(exhibitionCornerMobileConfig.row3.field, value)
                  }
                }
              "
              :disabled="disableValue"
              :max-bytes="40"
              hidden-warning
              placeholder=""
              class="wf-width-full"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full">
          <FormGroup label="이미지">
            <WelfareInputText
              size="small"
              :model-value="values[exhibitionCornerConfig.row4.field]"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConfig.row4.field, value)
                  if (setValueMobile) {
                    emitEvent.setFieldValue(exhibitionCornerMobileConfig.row4.field, value)
                  }
                }
              "
              :disabled="disableValue"
              placeholder=""
              class="wf-width-full wf-pr-6"
            />
            <WelfareMdButton label="삭제" class="wf_w-44" disabled buttonType="liner" button-size="small" />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full">
          <FormGroup label="이미지 alt" required>
            <TextInputValidationMaxBytes
              size="small"
              :model-value="values[exhibitionCornerConfig.row5.field]"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConfig.row5.field, value)
                  if (setValueMobile) {
                    emitEvent.setFieldValue(exhibitionCornerMobileConfig.row5.field, value)
                  }
                }
              "
              :disabled="disableValue"
              :max-bytes="30"
              hidden-warning
              :placeholder="exhibitionCornerConfig.row5.placeholder"
              class="wf-width-full"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full">
          <FormGroup label="랜딩 URL" required is-rounded-bottom :is-border-bottom="false">
            <WelfareSelect
              placeholder="링크 사용"
              small
              option-label="label"
              option-value="value"
              class="wf_w-180 wf-mr-6"
              :disabled="disableValue"
              :options="exhibitionCornerConfig.row6?.[0]?.options"
              :modelValue="values[exhibitionCornerConfig.row6?.[0]?.field]"
              @update:modelValue="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConfig.row6?.[0]?.field, value)
                  if (setValueMobile) {
                    emitEvent.setFieldValue(exhibitionCornerMobileConfig.row6?.[0]?.field, value)
                  }
                }
              "
            />
            <WelfareInputText
              size="small"
              :model-value="values[exhibitionCornerConfig.row6?.[1]?.field]"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConfig.row6?.[1]?.field, value)
                  if (setValueMobile) {
                    emitEvent.setFieldValue(exhibitionCornerMobileConfig.row6?.[1]?.field, value)
                  }
                }
              "
              :disabled="disableValue"
              placeholder=""
              :class="typePc ? 'wf-width-full' : 'wf_w-180'"
            />
            <WelfareInputText
              v-if="!typePc"
              size="small"
              :model-value="values[exhibitionCornerConfig.row6?.[2]?.field]"
              @update:model-value="
                (value) => {
                  emitEvent.setFieldValue(exhibitionCornerConfig.row6?.[2]?.field, value)
                  if (setValueMobile) {
                    emitEvent.setFieldValue(exhibitionCornerMobileConfig.row6?.[2]?.field, value)
                  }
                }
              "
              :disabled="disableValue"
              placeholder=""
              class="wf_w-128 wf-ml-4"
            />
            <WelfareMdButton label="조회" class="wf_w-44 wf-ml-4" buttonType="liner" :disabled="disableValue" button-size="small" />
          </FormGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/modal/exhibition-corner-connection-modal.css');
</style>
