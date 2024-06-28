<!-- BO_N0101_020303 -->
<script lang="ts" setup>
import { DEFAULT_DATE_FORMAT_DOT, TEXT_MAX_NUMBER_2, TEXT_MAX_NUMBER_20 } from '@/common'
import {
  TextInputValidationMaxBytes,
  TextInputWithMaxLengthCharacters,
  WelfareBigButton,
  WelfareDateTimePicker,
  WelfareMdButton,
  WelfareRadioGroup,
  WelfareSelect
} from '@/components'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import {
  PartnerBankCodeOptions,
  PartnerContractStatusOptions,
  partnerSelectProductGroupOptions
} from '@/models/views/partner/PartnerSellerContractDetailModel'
import { usePartnerSellerContractPeriod } from '@/composables/partner/usePartnerSellerContractPeriod'
import { ProductSelectDefinitionType, YnOptions } from '@/models'
import PartnerUploadFile from '@/components/partner/PartnerUploadFile.vue'
import FormGroupAutoHeightLabel from '@/components/widgets/form/FormGroupAutoHeightLabel.vue'
import PartnerSalesCategoryItem from '@/components/partner/PartnerSalesCategoryItem.vue'

const {
  values,
  setFieldValue,
  handleDeleteFile,
  contractFile,
  bankAccountFile,
  uploadBankAccountFile,
  uploadContractFile,
  onSaveData,
  checkBankAccount,
  isCheckValidate,
  partnerPermissionOptions,
  handleAddNew,
  isDisableAddNew,
  handleDelete,
  handleSetProductGroup,
  uploadPermissionFile,
  linkToContractInfo,
  verifiedAccount,
  listCategoryRef
} = usePartnerSellerContractPeriod()
</script>

<template>
  <div class="wf-p-30">
    <ProductTitle title="기본 계약정보" />
    <div class="wf-mt-20 wf-btn-border--bg-color-line-gray wf_br-6">
      <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-rounded-top label="판매사명" required>
        <span class="wf-body_03-reg wf_text-n-33">{{ `${values.sellerName} (${values.sellerKey})` }}</span>
      </FormGroup>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="계약기간" required>
          <div class="wf_flex wf_items-center wf-space-x-6">
            <WelfareDateTimePicker
              :format="DEFAULT_DATE_FORMAT_DOT"
              :type="'date'"
              size="small"
              :model-value="values.contractStartDate"
              @update:model-value="(value) => setFieldValue('contractStartDate', value)"
            />
            <span class="wf-body_03-reg wf_text-n-33">~</span>
            <WelfareDateTimePicker
              :format="DEFAULT_DATE_FORMAT_DOT"
              :type="'date'"
              size="small"
              :model-value="values.contractEndDate"
              @update:model-value="(value) => setFieldValue('contractEndDate', value)"
            />
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="계약 유형" required>
          <WelfareSelect
            :model-value="values.contractStatus"
            class="wf_w-180"
            option-label="label"
            option-value="value"
            :options="PartnerContractStatusOptions"
            placeholder="건강기능식품 관련"
            small
            @update:model-value="(value) => setFieldValue('contractStatus', value)"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="정산일" required>
          <div class="wf_flex wf_items-center wf-space-x-10">
            <span class="wf-body_03-reg wf_text-n-33">매월</span>
            <TextInputWithMaxLengthCharacters
              size="small"
              placeholder="현 계약 정산일"
              :max-length="TEXT_MAX_NUMBER_2"
              hidden-warning
              class="wf_w-180"
              :is-number-input-type="true"
              :model-value="values.settlementDate"
              @update:model-value="(value) => setFieldValue('settlementDate', value)"
            />
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="계약일" required>
          <WelfareDateTimePicker
            :format="DEFAULT_DATE_FORMAT_DOT"
            :type="'date'"
            size="small"
            :model-value="values.contractRegDate"
            @update:model-value="(value) => setFieldValue('contractRegDate', value)"
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
          <div class="wf-pt-7 wf-pb-6 wf_w-full">
            <PartnerUploadFile
              :is-download="true"
              :definition-type="ProductSelectDefinitionType.PARTNER_CONTRACT"
              :document="contractFile"
              @call-api="uploadContractFile"
              @remove-file="handleDeleteFile"
            />
          </div>
        </FormGroup>
      </div>
    </div>
    <div class="wf-mt-30">
      <ProductTitle title="판매상품정보" />
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-20">
        <FormGroupAutoHeightLabel title="판매 카테고리" required isBorderBottom isRoundedTop>
          <PartnerSalesCategoryItem
            ref=listCategoryRef
            :list-sales-category="values.listSalesCategory"
            @on-change="(value) => setFieldValue('listSalesCategory', value)"
          />
        </FormGroupAutoHeightLabel>
        <FormGroupAutoHeightLabel title="특정 상품 판매권한" required :isBorderBottom="false" isRoundedBottom>
          <div class="wf_flex wf_flex-col wf-space-y-12 wf-pt-4 wf-pb-6 wf_w-full">
            <div class="wf_flex wf-space-x-10 wf_items-center">
              <WelfareRadioGroup
                :model-value="values.permissionProduct"
                :options="partnerPermissionOptions"
                name="permissionToSellProduct"
                size="sm"
              />
              <span class="wf-body_04-reg wf_text-sub-01"
                >※ 하기 상품 판매사는 판매권한 신청 후 서류 제출을 완료해야 상품 판매가 가능합니다. (미신청 시 관련 카테고리 비노출)</span
              >
            </div>
            <div class="wf_flex-col wf-space-y-10 wf_w-full" v-for="(item, index) in values.listPermissionProduct" :key="index + item.id">
              <div class="wf_flex wf-space-x-10 wf_items-center">
                <WelfareSelect
                  :disabled="values.permissionProduct === YnOptions.N"
                  class="wf_m-w-180"
                  optionLabel="label"
                  option-value="value"
                  small
                  placeholder="판매 카테고리 선택"
                  :options="partnerSelectProductGroupOptions"
                  :model-value="item.productGroup"
                  @update:modelValue="(value) => handleSetProductGroup(index, value)"
                />
                <div class="wf_flex wf_items-center wf-space-x-4" v-if="values.permissionProduct === YnOptions.Y">
                  <WelfareMdButton
                    :disabled="values.listPermissionProduct.length === 1"
                    @on-click="() => handleDelete(index)"
                    class=""
                    label="삭제"
                    buttonType="liner"
                    buttonSize="small"
                  />
                  <WelfareMdButton
                    class=""
                    :disabled="index === values.listPermissionProduct.length - 1 ? !isDisableAddNew : true"
                    label="추가"
                    buttonType="default"
                    buttonSize="small"
                    @on-click="handleAddNew"
                  />
                </div>
              </div>
              <PartnerUploadFile
                v-if="values.permissionProduct === YnOptions.Y && item.productGroup"
                :definition-type="ProductSelectDefinitionType.PARTNER_PERMISSION"
                :document="item.document"
                @call-api="uploadPermissionFile"
                @remove-file="handleDeleteFile"
                :type="item.productGroup"
                :index="index"
                :is-hide-button-upload="!!item.file"
              />
            </div>
          </div>
        </FormGroupAutoHeightLabel>
      </div>
    </div>
    <div class="wf-mt-30">
      <ProductTitle title="지불 계좌 정보" />
      <div class="wf-mt-20 wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="거래은행" required>
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
              placeholder="현 계약 정산일"
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
                :label="verifiedAccount ? '계좌확인완료' : '계좌확인'"
                buttonType="default"
                buttonSize="small"
                class="wf_w-68 wf-ml-4"
              />
            </div>
          </FormGroup>
        </div>
        <div class="wf_flex">
          <FormGroup
            :is-border-bottom="false"
            is-rounded-bottom
            label="계좌 사본"
            class="wf_flex-1"
            custom-class="wf-body_03-reg wf_text-n-33 wf-py-7--i  wf_items-start wf_flex-col"
            required
          >
            <div class="wf-pt-7 wf-pb-6 wf_w-full">
              <PartnerUploadFile
                :definition-type="ProductSelectDefinitionType.PARTNER_BANK_ACCOUNT"
                :document="bankAccountFile"
                @call-api="uploadBankAccountFile"
                @remove-file="handleDeleteFile"
              />
            </div>
          </FormGroup>
        </div>
      </div>
    </div>
    <div class="wf_flex wf_items-center wf_justify-center wf-space-x-20 wf-mt-106">
      <WelfareBigButton label="목록" buttonType="neatral" @on-click="linkToContractInfo" />
      <WelfareBigButton label="저장" buttonType="default" @on-click="onSaveData" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PartnerSellerContractPeriodPage'
}
</script>
