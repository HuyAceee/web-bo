<!-- BO_M0101_020102_P -->
<script setup lang="ts">
import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, TEXT_MAX_NUMBER_20, formatTime } from '@/common'
import {
  TextInputValidationMaxBytes,
  TextInputMaxLengthValidation,
  WelfareMdButton,
  WelfareRadioGroup,
  WelfareSelect,
  HeaderModal,
  WelfareInputMask
} from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { usePartnerRegisterEditPersonInChangeLogic } from '@/composables/partner/partnerManagementDetail/companyInformation/usePartnerRegisterEditPersonInChangeLogic'
import { PartnerRegisterEditPersonInChangeRequest } from '@/models/services/requests/partner/partnerManagementDetail/companyInformation/PartnerRegisterEditPersonInChangeRequest'
import { PartnerRegisterEditPersonInChangeModel } from '@/models/services/responses/partner/partnerManagementDetail/companyInformation/PartnerRegisterEditPersonInChangeResponse'
import {
  PartnerCompanyChargerTypeOptions,
  PartnerDisplayYnOptions
} from '@/models/views/partner/partnerManagementDetail/companyInformation/PartnerRegisterEditPersonInChangeModel'

export interface PartnerRegisterEditPersonInChargeModalProps {
  onCancel: () => void
  chargerKey: string | number | undefined,
  onSave: (data: PartnerRegisterEditPersonInChangeRequest) => void
}

export type PartnerRegisterEditPersonInChargeModalEmits = (e: 'save', data: PartnerRegisterEditPersonInChangeModel) => void
const props = defineProps<PartnerRegisterEditPersonInChargeModalProps>()

const { values, onSubmitAndValidate, setFieldValue, personInChargeDetail, handleChangeValueValidate, personName, onKeyPressName } =
  usePartnerRegisterEditPersonInChangeLogic(props)
</script>

<template>
  <div class="wf_text-n-33 wf_bg-white wf_w-800">
    <div class="wf-register-site-menu--container">
      <div class="wf-register-site-menu">
        <HeaderModal title="업무담당자 등록/수정" @close-modal="$props.onCancel" />
        <div class="wf_p-20">
          <div class="wf-mt-23">
            <span class="wf-body_01-semi">업무담당자 정보</span>
            <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-9">
              <div class="wf_flex wf_items-center" ref="personName">
                <FormGroup class="wf_flex-1 wf_w-180" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="담당자 명" required>
                  <TextInputValidationMaxBytes
                    size="small"
                    @update:model-value="(value) => handleChangeValueValidate('chargerName', value)"
                    :model-value="values.chargerName"
                    placeholder="한글 기준 10자 이내로 입력해 주세요."
                    class="wf_w-180"
                    :max-bytes="TEXT_MAX_NUMBER_20"
                    @keydown="onKeyPressName"
                    @keypress="onKeyPressName"
                  />
                </FormGroup>
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="메인 노출" required>
                  <WelfareRadioGroup
                    size="sm"
                    :gap="20"
                    :options="PartnerDisplayYnOptions"
                    :model-value="values.isMainExposure"
                    @update:model-value="(value) => setFieldValue('isMainExposure', value)"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="직무" required>
                  <WelfareSelect
                    small
                    class="wf_w-180"
                    option-label="label"
                    option-value="value"
                    placeholder="직무선택 "
                    :options="PartnerCompanyChargerTypeOptions"
                    :model-value="values.chargerType"
                    @update:model-value="(value) => handleChangeValueValidate('chargerType', value)"
                  />
                </FormGroup>
                <FormGroup class="wf_flex-1 custom-class" custom-class="wf-pb-1 wf-pl-12 wf-pr-37 custom-class" is-border-left label="직급" required>
                  <TextInputValidationMaxBytes
                    :max-bytes="TEXT_MAX_NUMBER_20"
                    name=""
                    size="small"
                    placeholder="한글 기준 10자 이내로 입력해 주세요."
                    class="wf_flex-1"
                    :model-value="values.chargerPosition"
                    @update:model-value="(value) => setFieldValue('chargerPosition', value)"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup
                  class="wf_flex-1 wf_h-42"
                  custom-class="wf-pb-1 wf-pl-11 wf-pt-1 wf-pr-37"
                  is-rounded-top
                  label="휴대폰번호"
                  :isBorderBottom="false"
                  isRoundedBottom
                  required
                >
                  <WelfareInputMask
                    @update:model-value="(value) => setFieldValue('chargerPhone', value)"
                    placeholder="‘-’ 없이 숫자만 입력해 주세요."
                    :model-value="values.chargerPhone"
                    mask="999-9999-9999"
                    size="small"
                    :autoClear="false"
                  />
                </FormGroup>
                <FormGroup
                  class="wf_flex-1 wf_h-42"
                  custom-class="wf-pb-1 wf-pl-12 wf-pr-11 wf-pt-1"
                  is-border-left
                  label="이메일 주소"
                  required
                  :isBorderBottom="false"
                >
                  <TextInputMaxLengthValidation
                    name=""
                    size="small"
                    placeholder="이메일 주소 (예 : email@email.com)"
                    class="wf_flex-1"
                    @update:model-value="(value) => setFieldValue('chargerEmail', value)"
                    :model-value="values.chargerEmail"
                  />
                </FormGroup>
              </div>
            </div>
          </div>
          <div class="wf-mt-19" v-if="props.chargerKey">
            <span class="wf-body_01-semi">등록/수정 정보</span>
            <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1 wf_w-180" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="수정 일시">
                  <span class="wf-body_03-reg">{{
                    personInChargeDetail?.auditing?.modifiedDate
                      ? formatTime(personInChargeDetail?.auditing?.modifiedDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss)
                      : ''
                  }}</span>
                </FormGroup>
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="수정자">
                  <span class="wf-body_03-reg">{{
                    personInChargeDetail?.auditing?.modifierName +
                    (personInChargeDetail?.auditing?.modifierKey ? `(${personInChargeDetail?.auditing?.modifierKey})` : '')
                  }}</span>
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup
                  class="wf_flex-1 wf_w-180 wf_h-42"
                  custom-class="wf-pb-1 wf-pl-11"
                  is-rounded-top
                  label="등록 일시"
                  :isBorderBottom="false"
                  isRoundedBottom
                >
                  <span class="wf-body_03-reg">{{
                    personInChargeDetail?.auditing?.registeredDate
                      ? formatTime(personInChargeDetail?.auditing?.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss)
                      : ''
                  }}</span>
                </FormGroup>
                <FormGroup class="wf_flex-1 wf_h-42" custom-class="wf-pb-1 wf-pl-12" is-border-left label="등록자" :isBorderBottom="false">
                  <span class="wf-body_03-reg">{{
                    personInChargeDetail?.auditing?.registerName +
                    (personInChargeDetail?.auditing?.registerKey ? `(${personInChargeDetail?.auditing?.registerKey})` : '')
                  }}</span>
                </FormGroup>
              </div>
            </div>
          </div>
          <div class="wf-site-menu-depth-actions wf-gap-20 wf-mt-20">
            <WelfareMdButton button-type="default" label="저장" class="wf_w-120" @on-click="onSubmitAndValidate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/partner/partner-detail/partner-detail.css');
</style>

<script lang="ts">
export default {
  name: 'PartnerRegisterEditPersonInChargeModal'
}
</script>
