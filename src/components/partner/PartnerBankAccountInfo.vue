<script lang="ts" setup>
import { WelfareMdButton, WelfareSelect } from '../uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { TextInputValidationMaxBytes, TextInputWithMaxLengthCharacters } from '../widgets'
import PartnerUploadFile from './PartnerUploadFile.vue'
import { usePartnerBankAccountInfo } from '@/composables/partner/usePartnerBankAccountInfo'
import { ProductSelectDefinitionType } from '@/models'
import { PartnerBankAccountEmits, PartnerBankCodeOptions } from '@/models/views/partner/PartnerSellerContractDetailModel'
import { TEXT_MAX_NUMBER_20 } from '@/common'

const emits = defineEmits<PartnerBankAccountEmits>()
const {
  values,
  setFieldValue,
  bankAccountFile,
  handleDeleteFile,
  uploadBankAccountFile,
  checkBankAccount,
  isCheckValidate,
  labelButtonCheckValidate
} = usePartnerBankAccountInfo(emits)
</script>
<template>
  <div class="wf-mt-20 wf-btn-border--bg-color-line-gray wf_br-6">
    <div class="wf_flex wf_items-center">
      <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="래은행" required>
        <WelfareSelect
          class="wf_w-180"
          option-label="label"
          option-value="value"
          :options="PartnerBankCodeOptions"
          placeholder="건강기능식품 관련"
          small
          :model-value="values.bankCode"
          @update:model-value="(value) => setFieldValue('bankCode', value)"
        />
      </FormGroup>
      <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="거래은행지점" required>
        <TextInputValidationMaxBytes
          size="small"
          placeholder="상동지점"
          :max-bytes="TEXT_MAX_NUMBER_20"
          hidden-warning
          class="wf_w-180"
          :model-value="values.bankBranchName"
          @update:model-value="(value) => setFieldValue('bankBranchName', value)"
        />
      </FormGroup>
    </div>
    <div class="wf_flex wf_items-center">
      <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="거래은행계좌번호" required>
        <TextInputWithMaxLengthCharacters
          size="small"
          placeholder="12345678890"
          :max-length="TEXT_MAX_NUMBER_20"
          hidden-warning
          class="wf_w-180"
          :is-number-input-type="true"
          :model-value="values.accountNumber"
          @update:model-value="(value) => setFieldValue('accountNumber', value)"
        />
      </FormGroup>
      <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="거래계좌예금주" required>
        <div class="wf_flex wf_flex-1 wf_items-center">
          <TextInputValidationMaxBytes
            size="small"
            placeholder="쿠프마케팅"
            :max-bytes="TEXT_MAX_NUMBER_20"
            hidden-warning
            class="wf_w-180"
            :model-value="values.accountHolderName"
            @update:model-value="(value) => setFieldValue('accountHolderName', value)"
          />
          <WelfareMdButton
            :disabled="isCheckValidate"
            @on-click="checkBankAccount"
            :label="labelButtonCheckValidate"
            buttonType="default"
            buttonSize="small"
            class="wf-ml-4"
          />
        </div>
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
        <PartnerUploadFile
          :definition-type="ProductSelectDefinitionType.PARTNER_BANK_ACCOUNT"
          :document="bankAccountFile"
          @call-api="uploadBankAccountFile"
          @remove-file="handleDeleteFile"
        />
      </FormGroup>
    </div>
  </div>
</template>
