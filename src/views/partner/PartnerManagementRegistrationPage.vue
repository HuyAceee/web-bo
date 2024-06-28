<!-- BO_N0103_010101 -->
<script setup lang="ts">
import {
  DEFAULT_DATE_FORMAT_DOT,
  TEXTAREA_NUMBER_200,
  TEXT_MAX_NUMBER_20,
  TEXT_MAX_NUMBER_13,
  TEXT_MAX_NUMBER_10,
  TEXT_MAX_NUMBER_8,
  TEXT_MAX_NUMBER_2,
  formatTextLength,
  TEXT_MAX_NUMBER_40
} from '@/common'
import {
  TextInputValidationMaxBytes,
  TextInputWithMaxLengthCharacters,
  TextareaMaxLengthBytes,
  WelfareBigButton,
  WelfareInputMask,
  WelfareInputText,
  WelfareRadioGroup,
  WelfareSelect
} from '@/components'
import BulletinUploadFile from '@/components/bulletin/detail-create/BulletinUploadFile.vue'
import PartnerBankAccountInfo from '@/components/partner/PartnerBankAccountInfo.vue'
import PartnerPermissionToSellProduct from '@/components/partner/PartnerPermissionToSellProduct.vue'
import PartnerSalesCategoryItem from '@/components/partner/PartnerSalesCategoryItem.vue'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import WelfareMdButton from '@/components/uikit/button/WelfareMdButton.vue'
import WelfareDateTimePicker from '@/components/uikit/dateTimePicker/WelfareDateTimePicker.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormGroupAutoHeightLabel from '@/components/widgets/form/FormGroupAutoHeightLabel.vue'
import FormSearchCompanyAddress from '@/components/widgets/form/FormSearchCompanyAddress.vue'
import { usePartnerManagementRegistrationPage } from '@/composables/partner/usePartnerManagementRegistrationPage'

const {
  businessLocationRef,
  businessTypeOptions,
  handleChangeBusinessType,
  sectorOptions,
  businessClassificationOptions,
  contractTypeOptions,
  values,
  setFieldValue,
  companyRegistrationNumberChecked,
  handleCheckCompanyRegistrationNumber,
  getPartnerFile,
  onPartnerRemoveFile,
  handleChangeBankAccount,
  bankToListPartner,
  onSave
} = usePartnerManagementRegistrationPage()
</script>

<template>
  <div class="wf-p-30 wf_flex wf_flex-col wf-space-y-30">
    <div class="">
      <ProductTitle title="기업정보" />
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-20">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="판매사 명" required>
            <TextInputValidationMaxBytes
              class="wf_width-full"
              size="small"
              :max-bytes="TEXT_MAX_NUMBER_40"
              placeholder="20자 이내로 입력해 주세요."
              hidden-warning
              name="sellerName"
              :model-value="values.sellerName"
              @update:model-value="(value) => setFieldValue('sellerName', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12 " is-border-left label="사업자등록번호" required>
            <div class="wf_flex wf-space-x-3 wf_items-center">
              <TextInputWithMaxLengthCharacters
                hidden-warning
                :is-number-input-type="true"
                :max-length="TEXT_MAX_NUMBER_10"
                name="companyRegistrationNumber"
                size="small"
                placeholder='"-" 제외 숫자만 입력'
                class="wf_flex-1 wf_w-180"
                :model-value="values.companyRegistrationNumber"
                @update:model-value="(value) => setFieldValue('companyRegistrationNumber', value)"
              />
              <WelfareMdButton
                :label="values.companyRegistrationNumber === companyRegistrationNumberChecked ? '중복확인완료' : '중복확인'"
                button-size="small"
                :disabled="values.companyRegistrationNumber === companyRegistrationNumberChecked"
                button-type="liner"
                @on-click="handleCheckCompanyRegistrationNumber"
              />
            </div>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="사업자 구분" required>
            <WelfareRadioGroup
              @update:model-value="(value) => setFieldValue('businessClassification', value)"
              :model-value="values.businessClassification"
              :options="businessClassificationOptions"
              name="businessClassification"
              size="sm"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12 wf-pr-10" label="법인등록번호" is-border-left required>
            <TextInputWithMaxLengthCharacters
              hidden-warning
              :is-number-input-type="true"
              :max-length="TEXT_MAX_NUMBER_13"
              class="wf_w-180"
              size="small"
              placeholder='“-” 제외 숫자만 입력 (13자리)'
              :model-value="values.corporationRegistrationNumber"
              @update:model-value="(value) => setFieldValue('corporationRegistrationNumber', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="업태" required>
            <WelfareSelect
              class="wf_m-w-300"
              optionLabel="bizCategoryName"
              small
              placeholder="생활용 포장 및 위생용품, 봉투 및 유사 제품 도매업"
              :options="businessTypeOptions"
              :model-value="values.businessType"
              @update:model-value="handleChangeBusinessType"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-10" label="업종" required is-border-left>
            <WelfareSelect
              class="wf_m-w-300"
              optionLabel="bizItemName"
              option-value="bizItemCode"
              small
              placeholder="업종 선택"
              :options="sectorOptions"
              :disabled="!values.businessType"
              :model-value="values.sectors"
              @update:model-value="(value) => setFieldValue('sectors', value)"
            />
          </FormGroup>
        </div>
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="통신판매업신고번호">
          <TextInputValidationMaxBytes
            :max-bytes="TEXT_MAX_NUMBER_20"
            class="wf_w-180"
            size="small"
            name="mailOrderBusinessReportNumber"
            placeholder="예 : 1111-가나다라-1111호"
            :model-value="values.mailOrderBusinessReportNumber"
            @update:model-value="(value) => setFieldValue('mailOrderBusinessReportNumber', value)"
          />
        </FormGroup>
        <!-- Business location -->
        <FormGroup class="wf_flex-1 wf-tr-match-parent wf_h-154" label="사업장 소재지" required>
          <FormSearchCompanyAddress
            ref="businessLocationRef"
            :model-value="values.businessLocation"
            @update:model-value="(value) => setFieldValue('businessLocation', value)"
          />
        </FormGroup>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="대표자 명" required>
            <TextInputValidationMaxBytes
              :max-bytes="TEXT_MAX_NUMBER_20"
              class="wf_w-180"
              size="small"
              name="representativeName"
              placeholder="10자 이내로 입력해 주세요."
              :model-value="values.representativeName"
              @update:model-value="(value) => setFieldValue('representativeName', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-2 wf-pr-10" label="대표자 생년월일" required is-border-left>
            <TextInputWithMaxLengthCharacters
              hidden-warning
              :is-number-input-type="true"
              :max-length="TEXT_MAX_NUMBER_8"
              class="wf_w-180"
              size="small"
              placeholder="숫자 8자리 예 : 19901102"
              :model-value="values.representativeDateOfBirth"
              @update:model-value="(value) => setFieldValue('representativeDateOfBirth', value)"
            />
          </FormGroup>
        </div>
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="대표 전화번호" required>
          <WelfareInputMask
            class="wf_w-180"
            size="small"
            placeholder="예 : 1588-1111"
            name="mainPhoneNumber"
            mask="9999-9999"
            :model-value="values.mainPhoneNumber"
            @update:model-value="(value) => setFieldValue('mainPhoneNumber', value)"
          />
        </FormGroup>
        <FormGroupAutoHeightLabel title="사업자등록증" required is-border-bottom>
          <div :class="values.businessRegistrationFiles.length > 0 && 'wf-pt-6 wf-pb-6'" class="wf_w-full">
            <BulletinUploadFile
              :is-download="false"
              :documents-list="values.businessRegistrationFiles ?? []"
              @get-file="(value) => getPartnerFile('businessRegistrationFiles', value)"
              :on-remove-file="(value) => onPartnerRemoveFile('businessRegistrationFiles', value)"
              classFile="wf-pr-10"
            />
          </div>
        </FormGroupAutoHeightLabel>
        <FormGroupAutoHeightLabel title="회사소개서" required is-border-bottom>
          <div :class="values.companyProfileFiles.length > 0 && 'wf-pt-8 wf-pb-6'" class="wf_w-full">
            <BulletinUploadFile
              :is-download="false"
              :documents-list="values.companyProfileFiles ?? []"
              @get-file="(value) => getPartnerFile('companyProfileFiles', value)"
              :on-remove-file="(value) => onPartnerRemoveFile('companyProfileFiles', value)"
              classFile="wf-pr-10"
            />
          </div>
        </FormGroupAutoHeightLabel>
        <FormGroup class="wf_flex-1 wf_h-166" custom-class=" wf-pl-11 " label="회사소개문구" required>
          <div class="wf-tr-match-parent wf-textarea-py">
            <TextareaMaxLengthBytes
              size="small"
              placeholder="200자 이내로 입력해 주세요."
              class="wf_set-h-textarea"
              label-bottom-left="&nbsp;"
              :label-bottom-right="formatTextLength('', TEXTAREA_NUMBER_200)"
              :max-bytes="TEXTAREA_NUMBER_200"
              name="companyIntroductionStatement"
              :model-value="values.companyIntroductionStatement"
              @update:model-value="(value) => setFieldValue('companyIntroductionStatement', value)"
            />
          </div>
        </FormGroup>

        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="회사 홈페이지" :isBorderBottom="false" isRoundedBottom>
            <WelfareInputText
              class="wf_w-full"
              size="small"
              placeholder="회사 소개페이지 URL을 입력해 주세요."
              :model-value="values.companyHomepage"
              @update:model-value="(value) => setFieldValue('companyHomepage', value)"
            />
          </FormGroup>
        </div>
      </div>
    </div>

    <div class="">
      <ProductTitle title="기본 계약 정보" />
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-20">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="계약기간" required>
            <div class="wf_flex wf_items-center wf_justify-start wf-body_03-reg wf_text--14">
              <WelfareDateTimePicker
                :type="'date'"
                size="small"
                :format="DEFAULT_DATE_FORMAT_DOT"
                :model-value="values.termFromDate"
                @update:model-value="(value) => setFieldValue('termFromDate', value)"
                :max-date="values.termToDate"
              />&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;
              <WelfareDateTimePicker
                size="small"
                :type="'date'"
                :format="DEFAULT_DATE_FORMAT_DOT"
                :model-value="values.termToDate"
                @update:model-value="(value) => setFieldValue('termToDate', value)"
                :min-date="values.termFromDate"
              />
            </div>
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12 " is-border-left label="계약 유형" required>
            <WelfareSelect
              class="wf_m-w-180"
              optionLabel="label"
              option-value="value"
              small
              placeholder="계약유형 선택"
              :options="contractTypeOptions"
              :model-value="values.contractType"
              @update:model-value="(value) => setFieldValue('contractType', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="정산일" required>
            <TextInputWithMaxLengthCharacters
              hidden-warning
              :is-number-input-type="true"
              :max-length="TEXT_MAX_NUMBER_2"
              labelLeft="매월"
              class="wf-partner-input-title-normal"
              size="small"
              placeholder="숫자입력"
              :model-value="values.settlementDate"
              @update:model-value="(value) => setFieldValue('settlementDate', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-10" label="계약일" is-border-left required>
            <WelfareDateTimePicker
              :model-value="values.contractDate"
              @update:model-value="(value) => setFieldValue('contractDate', value)"
              :format="DEFAULT_DATE_FORMAT_DOT"
              :type="'date'"
              size="small"
            />
          </FormGroup>
        </div>
        <FormGroupAutoHeightLabel title="계약서" required :isBorderBottom="false">
          <div :class="values.contractFiles.length > 0 && 'wf-pt-6 wf-pb-6'" class="wf_w-full">
            <BulletinUploadFile
              :is-download="false"
              :documents-list="values.contractFiles ?? []"
              @get-file="(value) => getPartnerFile('contractFiles', value)"
              :on-remove-file="(value) => onPartnerRemoveFile('contractFiles', value)"
              classFile="wf-pr-4"
            />
          </div>
        </FormGroupAutoHeightLabel>
      </div>
    </div>

    <div class="">
      <ProductTitle title="판매상품정보" />
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-20">
        <FormGroupAutoHeightLabel title="판매 카테고리" required isBorderBottom isRoundedTop>
          <PartnerSalesCategoryItem
            :list-sales-category="values.listSalesCategory"
            @on-change="(value) => setFieldValue('listSalesCategory', value)"
          />
        </FormGroupAutoHeightLabel>
        <FormGroupAutoHeightLabel title="특정 상품 판매권한" required :isBorderBottom="false" isRoundedBottom>
          <PartnerPermissionToSellProduct
            :permissionProduct="values.permissionProduct"
            :list-permission-product="values.listPermissionProduct"
            @on-change="(value) => setFieldValue('listPermissionProduct', value)"
            @update-permission-product="(value) => setFieldValue('permissionProduct', value)"
          />
        </FormGroupAutoHeightLabel>
      </div>
    </div>

    <div class="">
      <ProductTitle title="지불 계좌 정보" />
      <PartnerBankAccountInfo @get-data="handleChangeBankAccount" />
    </div>

    <div class="wf_flex wf_items-center wf_justify-center wf-space-x-20">
      <WelfareBigButton label="목록" buttonType="neatral" @on-click="bankToListPartner" />
      <WelfareBigButton label="저장" buttonType="default" @on-click="onSave" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PartnerManagementRegistrationPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/partner/partner-management-registration-page.css');
</style>
