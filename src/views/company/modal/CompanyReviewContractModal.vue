<!-- BO_O0102_020201_P -->

<script setup lang="ts">
import { formatFileNameSize } from '@/common/data'
import { HeaderModal, WelfareCloseIcon, WelfareDateTimePicker, WelfareInputNumber, WelfareMdButton } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useCompanyReviewContractModal } from '@/composables/company/customerManagement/useCompanyReviewContractModal'
import {
  CompanyReviewContractModalEmits,
  CompanyReviewContractModalProps,
  companyCustomerStatusText
} from '@/models/views/company/customerManagement/CompanyCustomerRegistrationModel'

const props = defineProps<CompanyReviewContractModalProps>()
const emits = defineEmits<CompanyReviewContractModalEmits>()

const { getContractDateString, handleSave, handleKeyPressNumber, handleDeleteFile, download, values, setFieldValue, handleChooseFile } =
  useCompanyReviewContractModal(props, emits)
</script>
<template>
  <div class="wf_bg-white wf-company-review-contact-modal">
    <HeaderModal title="계약 기간 연장" @close-modal="emits('close')" />
    <div class="wf-p-20">
      <div class="">
        <p class="wf-body_01-semi wf_text-n-33 wf-mb-10">현재 계약 정보</p>
        <div class="wf-company-group-form">
          <div class="wf_flex">
            <FormGroup
              is-border-top
              is-rounded-top
              label="계약 기간"
              class="wf_flex-1"
              custom-class="wf-body_03-reg wf_text-n-33 wf-space-x-3"
              required
            >
              <span>{{ getContractDateString(props.data.contractStartDate) }}</span>
              <span>~</span>
              <span>{{ getContractDateString(props.data.contractEndDate) }}</span>
            </FormGroup>
            <FormGroup is-border-left label="계약 상태" class="wf_flex-1" custom-class="wf-body_03-reg wf_text-n-33 wf-space-x-4" required>
              <span>{{ companyCustomerStatusText?.[props.data.contractStatus] ?? '' }}</span>
            </FormGroup>
          </div>
          <div class="wf_flex">
            <FormGroup label="계약일" class="wf_flex-1" custom-class="wf-body_03-reg wf_text-n-33 wf-space-x-4" required>
              <span>{{ getContractDateString(props.data.contractRegDate) }}</span>
            </FormGroup>
            <FormGroup is-border-left label="정산일" class="wf_flex-1" custom-class="wf-body_03-reg wf_text-n-33 wf-space-x-4" required>
              <span>매월 {{ props.data?.settlementDate ? +props.data?.settlementDate : 0 }}일</span>
            </FormGroup>
          </div>
          <div class="wf_flex">
            <FormGroup
              :is-border-bottom="false"
              is-rounded-bottom
              label="계약서"
              class="wf_flex-1"
              custom-class="wf-body_03-reg wf_text-n-33 wf_justify-between wf-space-x-4"
              required
            >
              <span>{{
                props.data.contractFileOriginName
                  ? formatFileNameSize(props.data.contractFileOriginName ?? '', +props.data?.contractFileSize ?? 0, 1)
                  : ''
              }}</span>
              <WelfareMdButton @on-click="download" button-type="liner" button-size="small" label="다운로드" />
            </FormGroup>
          </div>
        </div>
      </div>
      <div class="wf-mt-20">
        <p class="wf-body_01-semi wf_text-n-33 wf-mb-12">변경 계약 정보</p>
        <div class="wf-company-group-form">
          <div class="wf_flex">
            <FormGroup
              is-border-top
              is-rounded-top
              label="계약 기간"
              class="wf_flex-1"
              custom-class="wf-body_03-reg wf_text-n-33 wf-space-x-7"
              required
            >
              <WelfareDateTimePicker
                :max-date="values.contractEndDate"
                :model-value="values.contractStartDate"
                @update:model-value="(value) => setFieldValue('contractStartDate', value)"
                size="small"
              />
              <span>~</span>
              <WelfareDateTimePicker
                :min-date="values.contractStartDate"
                :model-value="values.contractEndDate"
                @update:model-value="(value) => setFieldValue('contractEndDate', value)"
                size="small"
              />
            </FormGroup>
          </div>
          <div class="wf_flex">
            <FormGroup label="계약일" class="wf_flex-1" custom-class="wf-body_03-reg wf_text-n-33 wf-space-x-4" required>
              <WelfareDateTimePicker
                size="small"
                :model-value="values.contractRegDate"
                @update:model-value="(value) => setFieldValue('contractRegDate', value)"
              />
            </FormGroup>
            <FormGroup
              is-border-left
              label="정산일"
              class="wf_flex-1 wf-company-group-settle"
              custom-class="wf-body_03-reg wf_text-n-33 wf-space-x-10"
              required
            >
              <span class="wf_m-w-24 wf_block">매월</span>
              <WelfareInputNumber
                size="small"
                class="wf_w-input--180"
                @keypress="handleKeyPressNumber"
                @update:model-value="(value) => setFieldValue('settlementDate', value)"
                :model-value="values?.settlementDate"
                placeholder="숫자입력"
              />
            </FormGroup>
          </div>
          <div class="wf_flex">
            <FormGroup
              :is-border-bottom="false"
              is-rounded-bottom
              label="계약서"
              class="wf_flex-1"
              custom-class="wf-body_03-reg wf_text-n-33 wf-py-7--i  wf_items-start wf_flex-col"
              required
            >
              <WelfareMdButton @on-click="handleChooseFile" button-type="liner" button-size="small" label="파일선택" />
              <div
                v-if="values.contractAltName"
                class="wf-mt-10 wf_flex wf_items-center wf-company-file-ticket wf-pl-12 wf_w-full wf_justify-between"
              >
                <span>{{ values.contractAltName }}</span>
                <WelfareCloseIcon @click="handleDeleteFile" :width="10" :height="10" />
              </div>
            </FormGroup>
          </div>
        </div>
        <div class="wf_flex wf_justify-center wf-space-x-4 wf-mt-20">
          <WelfareMdButton label="목록" @on-click="emits('close')" class="wf_w-120" button-type="liner" />
          <WelfareMdButton label="계약연장" class="wf_w-120" @on-click="handleSave" button-type="default" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/company/customerManagement/company-customer-contract-modal.css');
</style>
