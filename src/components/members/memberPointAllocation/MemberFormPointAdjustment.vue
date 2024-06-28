<script setup lang="ts">
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { WelfareDateTimePicker, WelfareInputText, WelfareMdButton, WelfareRadio, WelfareSelect } from '@/components'
import { DEFAULT_DATE_TIME_FORMAT, formatNumberDot } from '@/common'
import MemberPointAdjustmentTableTime from './MemberPointAdjustmentTableTime.vue'
import MemberPointAdjustmentTableDelete from './MemberPointAdjustmentTableDelete.vue'
import TextareaMaxLengthBytes from '@/components/widgets/textInput/TextareaMaxLengthBytes.vue'
import { MemberPointAllocationModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAllocationListModel'
import { MemberPointListFormFieldModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

interface MemberFormFilterPointAllocationProps {
  listInputRow1: MemberPointListFormFieldModel[]
  listSelectRow2: MemberPointListFormFieldModel[]
  listInputRow3: MemberPointListFormFieldModel
  listInputRow4: MemberPointListFormFieldModel[]
  inputRow6: MemberPointListFormFieldModel
  inputRow7: MemberPointListFormFieldModel
  listSelectRow8: MemberPointListFormFieldModel
  values: any
  currentFilterDate: number
  dataPointAllocation?: MemberPointAllocationModel
}

interface MemberFormFilterPointAllocationEmits {
  (e: 'setFieldValue', field: string, value: any): void

  (e: 'handleResetFormFilter'): void

  (e: 'handleChangeCountDate', value: number): void
}

defineProps<MemberFormFilterPointAllocationProps>()
const emit = defineEmits<MemberFormFilterPointAllocationEmits>()

const eventEmit = {
  setFieldValue: (field: string, value: any) => {
    emit('setFieldValue', field, value)
  },
  handleResetFormFilter: () => {
    emit('handleResetFormFilter')
  },
  handleChangeCountDate: (value: number) => {
    emit('handleChangeCountDate', value)
  }
}
</script>

<template>
  <div id="wf-group-filer" class="wf-group-filter">
    <div class="wf_flex wf_flex-col wf-mt-0">
      <div class="wf_flex wf_items-center wf_br-b">
        <FormGroup class="wf-w-1-2" is-rounded-top :label="listInputRow1[0].label" :isBorderBottom="false">
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <p class="wf-body_03-reg wf-ml-6">{{ values.pointAdjustmentCode }}</p>
          </div>
        </FormGroup>
        <FormGroup is-border-left class="wf-w-1-2" :isBorderBottom="false" :label="listInputRow1[1].label">
          <p class="wf-body_03-reg wf-ml-6">인당</p>
        </FormGroup>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup :label="listSelectRow2[0].label" required customClass="wf-space-x-20">
            <WelfareRadio
              disabled
              v-for="(radio, index) in listSelectRow2[0].optionsNormal"
              :key="index"
              :model-value="values[listSelectRow2[0].field]"
              @update:model-value="(value) => eventEmit.setFieldValue(listSelectRow2[0].field, value)"
              :value="radio.value"
              :label="radio.label"
              :name="listSelectRow2[0].field"
              size="sm"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_flex-row wf-w-1-2">
          <FormGroup class="wf_flex-1" required is-border-left :label="listSelectRow2[1].label">
            <WelfareSelect
              disabled
              class="wf_w-180"
              optionLabel="label"
              @update:model-value="(value) => eventEmit.setFieldValue(listSelectRow2[1].field, value)"
              :model-value="values[listSelectRow2[1].field]"
              :options="
                values[listSelectRow2[0].field] !== listSelectRow2[0]?.optionsNormal?.[0]?.value
                  ? listSelectRow2[1].optionsSpecial
                  : listSelectRow2[1].optionsNormal
              "
              small
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full">
          <FormGroup :label="listInputRow3.label" required>
            <WelfareInputText
              class="wf_flex wf-width-full"
              size="small"
              :max-length="20"
              :placeholder="listInputRow1[0].placeholder"
              :model-value="values[listInputRow3.field]"
              @update:model-value="(value) => eventEmit.setFieldValue(listInputRow3.field, value)"
              disabled
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup :label="listInputRow4[0].label" required>
            <p class="wf-body_03-reg wf-mr-20">인당</p>
            <WelfareInputText
              size="small"
              :model-value="values[listInputRow4[0].field]"
              @update:model-value="(value) => eventEmit.setFieldValue(listInputRow4[0].field, value)"
              disabled
            />
            <p class="wf-body_03-reg wf-ml-6">인당</p>
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup :label="listInputRow4[1].label" is-border-left>
            <p class="wf-body_03-reg">{{ values[listInputRow4[1].field] && formatNumberDot(values[listInputRow4[1].field]) }} 포인트</p>
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="사용 시작" required>
            <WelfareDateTimePicker
              :format="DEFAULT_DATE_TIME_FORMAT"
              :type="'date-time'"
              size="small"
              :modelValue="values.fromDate"
              @update:model-value="(value) => eventEmit.setFieldValue('fromDate', value)"
              disabled
            />
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="사용 종료" required is-border-left customClass="wf-space-x-20">
            <WelfareDateTimePicker
              :format="DEFAULT_DATE_TIME_FORMAT"
              :type="'date-time'"
              size="small"
              :modelValue="values.toDate"
              @update:model-value="(value) => eventEmit.setFieldValue('toDate', value)"
              disabled
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf_flex wf-width-full wf-height-full">
          <FormGroup :label="inputRow6.label" class="wf_h-152">
            <TextareaMaxLengthBytes
              labelBottomRight="0/50 bytes"
              :max-bytes="100"
              disabled
              class="text-area-h-120 wf-width-full"
              placeholder="직원 복리후생으로 지급됩니다."
              :modelValue="values[inputRow6.field]"
              @update:model-value="(value) => eventEmit.setFieldValue(inputRow6.field, value)"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf_flex wf-width-full wf-height-full">
          <FormGroup :label="inputRow7.label" class="wf_h-152" required>
            <TextareaMaxLengthBytes
              :labelBottomRight="`${values[inputRow7.field]?.length ?? 0}/50 bytes`"
              :max-bytes="100"
              class="text-area-h-120 wf-width-full"
              placeholder="조정등록 사유를 입력해 주세요."
              :modelValue="values[inputRow7.field]"
              @update:model-value="(value) => eventEmit.setFieldValue(inputRow7.field, value)"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full table-title-pr-12">
          <FormGroup :label="listSelectRow8.label" class="" required customClass="wf-space-x-20">
            <WelfareRadio
              v-for="(radio, index) in listSelectRow8.optionsNormal"
              :key="index"
              :model-value="values[listSelectRow8.field]"
              @update:model-value="(value) => eventEmit.setFieldValue(listSelectRow8.field, value)"
              :value="radio.value"
              :label="radio.label"
              :name="listSelectRow8.field"
              size="sm"
              disabled
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full">
          <FormGroup :label="`제외 회원`" is-rounded-bottom :is-border-bottom="false" customClass="wf-space-x-20">
            <WelfareMdButton class="wf_w-66" label="텍스트" buttonType="liner" buttonSize="small" disabled />
          </FormGroup>
        </div>
      </div>
    </div>
  </div>
  <MemberPointAdjustmentTableDelete v-if="values[listSelectRow8.field] === listSelectRow8.optionsNormal?.[0]?.value" />
  <MemberPointAdjustmentTableTime :data-point-allocation="dataPointAllocation" />
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-adjustment-registration.css');
</style>
