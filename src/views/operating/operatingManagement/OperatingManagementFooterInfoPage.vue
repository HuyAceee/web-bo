<!-- BO_M0102_010101 -->
<script setup lang="ts">
import { WelfareInputText, WelfareMdButton, TextInputValidationMaxBytes, TextInputWithMaxLengthCharacters, WelfareBigButton } from '@/components'
import IconCloseCircle from '@/components/icons/IconCloseCircle.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useOperatingManagementFooterInfo } from '@/composables/operating/operatingManagement/useOperatingManagementFooterInfo'
import FormSearchCompanyAddress from '@/components/widgets/form/FormSearchCompanyAddress.vue'
import { onMounted } from 'vue'
import { TEXT_MAX_NUMBER_10, TEXT_MAX_NUMBER_20, TEXT_MAX_NUMBER_30, TEXT_MAX_NUMBER_12, TEXT_MAX_NUMBER_13, TEXT_MAX_NUMBER_15 } from '@/common'

const {
  values,
  setFieldValue,
  customerAddressRef,
  onShowModalImageMedical,
  onShowModalImageOgTag,
  onLoad,
  onSave,
  inputEndHyphensValidation,
  inputStartAndConsecutiveHyphensValidation,
  inputNumbersKoreansHyphensValidation,
  inputNumbersHyphensValidation,
  inputEmailValidation,
  handleClearImage
} = useOperatingManagementFooterInfo()

export interface OperatingManagementTextInputProps {
  value: number | undefined
  type?: 'mask' | 'text' | 'date'
}

type OperatingManagementToggleTextInputEmits = (e: 'update:value', value: string) => void
defineEmits<OperatingManagementToggleTextInputEmits>()

withDefaults(defineProps<OperatingManagementTextInputProps>(), {
  type: 'mask'
})
onMounted(() => {
  onLoad()
})
</script>
<template>
  <div class="footer-container-form">
    <div class="title-operating-info">
      <div class="wf-frame1000002147">
        <span class="wf-frame1000002147-title wf-sub_tit_01">기본정보</span>
      </div>
    </div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-18">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf-administrator-notes company-form-group-padding" is-rounded-top is-rounded-bottom label="기업명" required>
          <TextInputWithMaxLengthCharacters
            :modelValue="values.enterpriseName"
            @update:modelValue="(value) => setFieldValue('enterpriseName', value)"
            placeholder="한글 기준 30자 이내로 입력 해주세요"
            size="small"
            class="wf_w-526"
            :max-length="TEXT_MAX_NUMBER_30"
          />
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="팩스번호" required>
          <TextInputWithMaxLengthCharacters
            @change="
              (event) => {
                const value = event.target.value
                inputEndHyphensValidation(event, 'faxTelNumber')
              }
            "
            @input="
              (event) => {
                const value = event.target.value
                if (inputNumbersHyphensValidation(event)) {
                  inputStartAndConsecutiveHyphensValidation(event, 'faxTelNumber')
                }
              }
            "
            :modelValue="values.faxTelNumber.toString()"
            class="wf_w-180"
            size="small"
            :max-length="TEXT_MAX_NUMBER_20"
            :hidden-warning="true"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf-administrator-notes company-form-group-padding" is-rounded-top is-rounded-bottom label="대표자명" required>
          <TextInputWithMaxLengthCharacters
            :modelValue="values.representativeName"
            @update:modelValue="(value) => setFieldValue('representativeName', value)"
            class="wf_w-180"
            size="small"
            placeholder="한글 기준 10자 이내로 입력 해주세요"
            :max-length="TEXT_MAX_NUMBER_10"
          />
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="사업자등록번호" required>
          <TextInputWithMaxLengthCharacters
            @change="
              (event) => {
                const value = event.target.value
                inputEndHyphensValidation(event, 'taxpayerIdentificationNumber')
              }
            "
            @input="
              (event) => {
                const value = event.target.value
                if (inputNumbersHyphensValidation(event)) {
                  inputStartAndConsecutiveHyphensValidation(event, 'taxpayerIdentificationNumber')
                }
              }
            "
            :modelValue="values.taxpayerIdentificationNumber.toString()"
            class="wf_w-180"
            size="small"
            :max-length="TEXT_MAX_NUMBER_12"
            :hidden-warning="true"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf-administrator-notes company-form-group-padding" is-rounded-top is-rounded-bottom label="대표전화" required>
          <TextInputWithMaxLengthCharacters
            @change="
              (event) => {
                const value = event.target.value
                inputEndHyphensValidation(event, 'representativeTelNumber')
              }
            "
            @input="
              (event) => {
                const value = event.target.value
                if (inputNumbersHyphensValidation(event)) {
                  inputStartAndConsecutiveHyphensValidation(event, 'representativeTelNumber')
                }
              }
            "
            :modelValue="values.representativeTelNumber.toString()"
            class="wf_w-180"
            size="small"
            :max-length="TEXT_MAX_NUMBER_13"
            :hidden-warning="true"
          />
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="통신판매업신고" required>
          <TextInputWithMaxLengthCharacters
            @change="
              (event) => {
                const value = event.target.value
                inputEndHyphensValidation(event, 'mailOrderSalesCode')
              }
            "
            @input="
              (event) => {
                const value = event.target.value
                if (inputNumbersKoreansHyphensValidation(event)) {
                  inputStartAndConsecutiveHyphensValidation(event, 'mailOrderSalesCode')
                }
              }
            "
            :modelValue="values.mailOrderSalesCode.toString()"
            class="wf_w-180"
            size="small"
            :max-length="TEXT_MAX_NUMBER_15"
            :hidden-warning="true"
          />
        </FormGroup>
      </div>
      <!-- add image -->
      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf-administrator-notes form-image-space" is-rounded-top is-rounded-bottom label="의료기기판매업신고" required>
          <div class="wf_w-full wf_h-120">
            <div class="wf_flex wf_items-center wf-mt-2">
              <WelfareMdButton button-type="liner" button-size="small" label="파일선택" @click="onShowModalImageMedical" />
              <span class="wf-ml-10 wf_text-sub-01 font-size-12 wf_spacing--1">이미지 형식: jpg, gif, png / 용량: 5MB 이하</span>
            </div>
            <div class="image-wrapper wf-mt-10">
              <img
                v-if="values.medicalDeviceSalesDeclarationFilePath"
                class="image-size"
                alt=""
                :src="values.medicalDeviceSalesDeclarationFilePath"
              />
              <IconCloseCircle
                v-if="values.medicalDeviceSalesDeclarationFilePath"
                class="image-icon-remove wf-pointer"
                @click="handleClearImage('medicalDeviceSalesDeclarationFilePath')"
              ></IconCloseCircle>
            </div>
          </div>
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf-administrator-notes form-group-padding" is-rounded-top is-rounded-bottom label="사업장 주소" required>
          <FormSearchCompanyAddress
            ref="customerAddressRef"
            :model-value="values.customerAddress"
            @update:model-value="(value) => setFieldValue('customerAddress', value)"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup
          class="wf_flex-1 wf-administrator-notes company-form-group-padding"
          is-rounded-top
          is-rounded-bottom
          label="개인정보보호책임자"
          required
        >
          <TextInputWithMaxLengthCharacters
            :modelValue="values.securityManagerName"
            @update:modelValue="(value) => setFieldValue('securityManagerName', value)"
            placeholder="한글 기준 10자 이내로 입력 해주세요"
            size="small"
            class="wf_w-180"
            :max-length="TEXT_MAX_NUMBER_10"
          />
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="이메일" required>
          <TextInputValidationMaxBytes
            :modelValue="values.siteEmail?.toString()"
            @change="
              (event: InputEvent) => {
                inputEmailValidation(event)
              }
            "
            class="wf_w-full"
            size="small"
            :max-bytes="TEXT_MAX_NUMBER_30"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup
          class="wf_flex-1 wf-administrator-notes border-bottom-none company-form-group-padding"
          is-rounded-top
          is-rounded-bottom
          label="고객센터"
          required
        >
          <TextInputWithMaxLengthCharacters
            @change="
              (event) => {
                const value = event.target.value
                inputEndHyphensValidation(event, 'customerServiceCenterTelNumber')
              }
            "
            @input="
              (event) => {
                const value = event.target.value
                if (inputNumbersHyphensValidation(event)) {
                  inputStartAndConsecutiveHyphensValidation(event, 'customerServiceCenterTelNumber')
                }
              }
            "
            :modelValue="values.customerServiceCenterTelNumber.toString()"
            class="wf_w-180"
            size="small"
            :max-length="TEXT_MAX_NUMBER_13"
            :hidden-warning="true"
          />
        </FormGroup>
      </div>
    </div>
    <div class="title-operating-info wf-mt-30 wf-mb-20">
      <div class="wf-frame1000002147">
        <span class="wf-frame1000002147-title wf-sub_tit_01">사이트 정보</span>
      </div>
    </div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-18">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf-administrator-notes company-form-group-padding" is-rounded-top is-rounded-bottom label="타이틀 정보" required>
          <TextInputWithMaxLengthCharacters
            :modelValue="values.siteInformationTitle"
            @update:modelValue="(value) => setFieldValue('siteInformationTitle', value)"
            placeholder="한글 기준 30자 이내로 입력 해주세요"
            size="small"
            class="wf_w-526"
            :max-length="TEXT_MAX_NUMBER_30"
          />
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="페이지 설명" required>
          <TextInputWithMaxLengthCharacters
            placeholder="한글 기준 30자 이내로 입력 해주세요"
            size="small"
            class="wf_w-full"
            :modelValue="values.siteInformationPageDescription"
            @update:modelValue="(value) => setFieldValue('siteInformationPageDescription', value)"
            :max-length="TEXT_MAX_NUMBER_30"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf-administrator-notes company-form-group-padding" is-rounded-top is-rounded-bottom label="사이트명" required>
          <TextInputWithMaxLengthCharacters
            placeholder="한글 기준 30자 이내로 입력 해주세요"
            size="small"
            class="wf_w-full"
            :modelValue="values.siteInformationName"
            @update:modelValue="(value) => setFieldValue('siteInformationName', value)"
            :max-length="TEXT_MAX_NUMBER_30"
          />
        </FormGroup>
      </div>
      <!-- image -->
      <div class="wf_flex">
        <FormGroup
          class="wf_flex-1 wf-administrator-notes web-form-group-padding wf_spacing--1"
          is-rounded-top
          is-rounded-bottom
          label="OG 태그 이미지"
          required
        >
          <div class="wf_w-full wf_h-120">
            <div class="wf_flex wf_items-center">
              <WelfareMdButton button-type="liner" button-size="small" label="파일선택" @click="onShowModalImageOgTag" />
              <span class="wf-ml-10 wf_text-sub-01 font-size-12">이미지 형식: jpg, gif, png / 사이즈: 000x000px / 용량: 5MB 이하</span>
            </div>
            <div class="wf-mt-10 image-wrapper">
              <img v-if="values.siteInformationOgTagFilePath" class="image-size" alt="" :src="values.siteInformationOgTagFilePath" />
              <IconCloseCircle
                v-if="values.siteInformationOgTagFilePath"
                class="image-icon-remove wf-pointer"
                @click="handleClearImage('siteInformationOgTagFilePath')"
              ></IconCloseCircle>
            </div>
          </div>
        </FormGroup>
      </div>
    </div>
    <div class="title-operating-info wf-mt-30 wf-mb-5">
      <div class="wf-frame1000002147">
        <span class="wf-frame1000002147-title wf-sub_tit_01">등록 정보</span>
      </div>
    </div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-18">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="등록자">
          <WelfareInputText
            size="small"
            :model-value="values.registrationAdmin && values.registrationKey ? values.registrationAdmin + ' (' + values.registrationKey + ')' : ''"
            class="wf_w-full"
            :disabled="true"
          />
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="등록 일시">
          <WelfareInputText size="small" :modelValue="values.registrationDate" class="wf_w-full" :disabled="true" />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf-administrator-notes border-bottom-none" is-rounded-top is-rounded-bottom label="수정자">
          <WelfareInputText
            size="small"
            :model-value="values.modificationAdmin && values.modificationKey ? values.modificationAdmin + ' (' + values.modificationKey + ')' : ''"
            class="wf_w-full"
            :disabled="true"
          />
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-administrator-notes border-bottom-none" is-border-left label="수정 일시">
          <WelfareInputText size="small" :modelValue="values.modificationDate" class="wf_w-full" :disabled="true" />
        </FormGroup>
      </div>
    </div>
    <div class="wf_flex wf_justify-center wf_items-center wf-mt-30 wf-space-x-20">
      <WelfareBigButton @click="onSave" buttonType="default" label="저장" class="wf_w-150" />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'OperatingManagementFooterInfoPage'
}
</script>
<style scoped>
@import url('@/assets/css/view/operating/operating-management/operating-footer-info.css');
</style>
