<script setup lang="ts">
import { DEFAULT_DATE_FORMAT, TEXT_MAX_NUMBER_13, TEXTAREA_NUMBER_200 } from '@/common'
import { WelfareRadioGroup, WelfareSelect, TextareaMaxLengthBytes, WelfareMdButton, WelfareDateTimePicker } from '@/components'
import ProductBorderBottomTitle from '@/components/products/deliveryProduct/registerAndEdit/ProductBorderBottomTitle.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import {
  CompanyCustomFormRegistrationProps,
  customerRegistrationRadioOption,
  CompanyCheckExistsType
} from '@/models/views/company/customerManagement/CompanyCustomerRegistrationModel'
import FormSearchAddressEdit from '@/components/widgets/form/FormSearchAddressEdit.vue'
import CompanyUploadFile from '@/components/company/CompanyUploadFile.vue'
import CompanyTextInputValidation from '@/components/company/CompanyTextInputValidation.vue'
import { ref } from 'vue'
import { createCustomerUrlSite } from '@/common/html'

type CompanyBasicInformationEmit = {
  (e: 'setDataValue', field: string, value: any): void
  (e: 'checkExists', type: CompanyCheckExistsType): void
}
const props = defineProps<CompanyCustomFormRegistrationProps>()
const emit = defineEmits<CompanyBasicInformationEmit>()

const eventEmit = {
  setFieldValues: (field: string, value: any) => {
    emit('setDataValue', field, value)
  },
  checkExist: (type: CompanyCheckExistsType) => {
    emit('checkExists', type)
  }
}
const lastSearchCustomerId = ref()
const lastSearchBizRegNum = ref()
const numberRegex = /^[0-9 -]+$/
const alphabetRegex = /^[a-zA-Z0-9_]*$/
const notCountCharacterRegex = /-/gi
const onlyNumberAccepted = function (evt?: string, maxCharacter?: number) {
  if (!evt) return true
  if (maxCharacter && evt.length >= maxCharacter) {
    return !evt.endsWith('-')
  }
  return numberRegex.test(evt)
}
const onlyAlphabetAccepted = function (evt?: string) {
  if (!evt) return true
  return alphabetRegex.test(evt)
}
</script>

<template>
  <div>
    <ProductBorderBottomTitle class="wf-mb-20 wf-pb-10">기업 기본정보</ProductBorderBottomTitle>
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf-mb-20 wf_br-6">
      <div class="wf_flex wf_h-44">
        <FormGroup class="wf_flex-1" is-rounded-top label="기업명" required>
          <div class="wf_flex wf-space-x-6 wf_items-center wf-tr-match-parent">
            <CompanyTextInputValidation
              :max-length="20"
              name=""
              size="small"
              placeholder="20자 이내로 입력해 주세요."
              class="wf_flex-1"
              :model-value="props.valueProps.company.customerName"
              @update:model-value="(value) => eventEmit.setFieldValues('company.customerName', value)"
            />
          </div>
        </FormGroup>

        <FormGroup class="wf_flex-1" label="사업자등록번호" required is-border-left>
          <div class="wf_flex wf-space-x-3 wf_items-center">
            <CompanyTextInputValidation
              :max-length="10"
              name=""
              size="small"
              placeholder="'-' 제외 숫자만 입력 (숫자 10자리)"
              class="wf_flex-1 wf_w-180"
              :not-count-character-reg-exp="notCountCharacterRegex"
              :model-value="props.valueProps.company.bizRegNum"
              @update:model-value="
                (value) => {
                  eventEmit.setFieldValues('company.bizRegNum', value)
                }
              "
              @validate-content="onlyNumberAccepted"
            />
            <WelfareMdButton
              :label="(props.valueProps.tempValidBizRegNumber && lastSearchBizRegNum == props.valueProps.company.bizRegNum) ? '중복확인완료' : '중복확인'"
              button-size="small"
              button-type="liner"
              :disabled="lastSearchBizRegNum && lastSearchBizRegNum == props.valueProps.company.bizRegNum"
              @on-click="
                () => {
                  eventEmit.checkExist('registration-number')
                  lastSearchBizRegNum = props.valueProps.company.bizRegNum
                }
              "
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1" label="사업자 구분" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareRadioGroup
              size="sm"
              :gap="20"
              :options="customerRegistrationRadioOption"
              :model-value="props.valueProps.company.bizType"
              @update:model-value="(value) => eventEmit.setFieldValues('company.bizType', value)"
            />
          </div>
        </FormGroup>

        <FormGroup class="wf_flex-1" label="법인등록번호" required is-border-left>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <CompanyTextInputValidation
              :max-length="TEXT_MAX_NUMBER_13"
              name=""
              size="small"
              placeholder="'-' 제외 숫자만 입력 (숫자 13자리)"
              class="wf_flex-1 wf_w-180"
              :not-count-character-reg-exp="notCountCharacterRegex"
              :model-value="props.valueProps.company.corpRegNum"
              @update:model-value="(value) => eventEmit.setFieldValues('company.corpRegNum', value)"
              @validate-content="onlyNumberAccepted"
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1" label="업태" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareSelect
              placeholder="업태 선택"
              optionLabel="label"
              class="wf_m-w-300 height_30 select_custom"
              :model-value="props.mapObjectCategories[props.valueProps.company.businessTypeTemp]"
              :options="props.bizCategories"
              :not-count-character-reg-exp="notCountCharacterRegex"
              @update:modelValue="
                (value) => {
                  eventEmit.setFieldValues('company.businessTypeTemp', value.value)
                  eventEmit.setFieldValues('company.bizItemCode', '')
                }
              "
            />
          </div>
        </FormGroup>

        <FormGroup class="wf_flex-1" label="업종" required is-border-left>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareSelect
              placeholder="업종 선택"
              :model-value="props.mapObjectBusinessTypes[props.valueProps.company.bizItemCode]"
              optionLabel="label"
              :options="props.mapCategoryToBusinessTypes[props.valueProps.company.businessTypeTemp]"
              :disabled="!props.valueProps.company.businessTypeTemp"
              class="wf_m-w-300 height_30 select_custom"
              @update:modelValue="(value) => eventEmit.setFieldValues('company.bizItemCode', value.value)"
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf-tr-match-parent" label="사업장 소재지" required>
          <div class="wf-tr-match-parent">
            <div class="wf_flex flex-col wf_justify-center wf-body_03-reg wf_text--14 wf-w-550 custom_py_7 wf-tr-match-parent wf-space-y-10">
              <FormSearchAddressEdit
                class="wf_w-full wf_mt--2 company--form-search-address"
                ref="customerAddressRef"
                post-code-placeholder="우편주소"
                load-name-address-placeholder="우편번호 찾기를 이용해 주세요."
                detail-address-placeholder="상세 주소를 입력해 주세요."
                :model-value="{
                  zipCode: props.valueProps.company.zipCode,
                  loadNameAddress: props.valueProps.company.address,
                  loadLotBasedAddress: props.valueProps.company.streetAddress,
                  detailedAddress: props.valueProps.company.addressDetail
                }"
                :revert-detail-address="true"
                @update:model-value="
                  (value) => {
                    eventEmit.setFieldValues('company.zipCode', value.zipCode)
                    eventEmit.setFieldValues('company.address', value.loadNameAddress)
                    eventEmit.setFieldValues('company.streetAddress', value.loadLotBasedAddress)
                    eventEmit.setFieldValues('company.addressDetail', value.detailedAddress)
                  }
                "
              />
            </div>
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex wf_h-43">
        <FormGroup class="wf_flex-1" label="대표자 명" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <CompanyTextInputValidation
              :max-length="10"
              name=""
              size="small"
              placeholder="10자 이내로 입력해 주세요."
              class="wf_flex-1 wf_w-180"
              :model-value="props.valueProps.company.representativeName"
              @update:model-value="(value) => eventEmit.setFieldValues('company.representativeName', value)"
            />
          </div>
        </FormGroup>

        <FormGroup class="wf_flex-1" label="대표 전화번호" required is-border-left>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <CompanyTextInputValidation
              name=""
              size="small"
              placeholder='"-" 제외 숫자만 입력'
              class="wf_flex-1 wf_w-180"
              :model-value="props.valueProps.company.representativeTelNum"
              :max-length="13"
              :on-validate-content="onlyNumberAccepted"
              :not-count-character-reg-exp="notCountCharacterRegex"
              @update:model-value="(value) => eventEmit.setFieldValues('company.representativeTelNum', value)"
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf_custom-form-group-label" label="사업자등록증" required>
          <div class="wf_py-14 wf-tr-match-parent">
            <div class="wf_flex wf_justify-between">
              <CompanyUploadFile
                class="wf_company-upload-container"
                v-on:get-file="
                  ({ file, url }) => {
                    eventEmit.setFieldValues('tempRegistrationFile', {
                      uploaded: false,
                      file,
                      url,
                      name: file?.name,
                      size: file?.size
                    })
                    eventEmit.setFieldValues('company.registrationFileId', url)
                    eventEmit.setFieldValues('company.registrationDelYn', file?.name)
                  }
                "
                :hide-download-btn="true"
                :single-file="true"
                :documentsList="props.valueProps.tempRegistrationFile ? [props.valueProps.tempRegistrationFile] : []"
                :on-remove-file="
                  () => {
                    eventEmit.setFieldValues('tempRegistrationFile', undefined)
                    eventEmit.setFieldValues('company.registrationFileId', undefined)
                    eventEmit.setFieldValues('company.registrationDelYn', undefined)
                  }
                "
              />
            </div>
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf_custom-form-group-label" label="회사소개서" required>
          <div class="wf_py-7 wf-tr-match-parent">
            <div class="wf_flex wf_justify-between">
              <CompanyUploadFile
                class="wf_company-upload-container"
                v-on:get-file="
                  ({ file, url }) => {
                    emit('setDataValue', 'tempIntroductionFile', {
                      uploaded: false,
                      file,
                      url,
                      name: file?.name,
                      size: file?.size
                    })
                    eventEmit.setFieldValues('company.introductionFileId', url)
                    eventEmit.setFieldValues('company.introductionDelYn', file?.name)
                  }
                "
                :hide-download-btn="true"
                :single-file="true"
                :documentsList="props.valueProps.tempIntroductionFile ? [props.valueProps.tempIntroductionFile] : []"
                :on-remove-file="
                  () => {
                    eventEmit.setFieldValues('tempIntroductionFile', undefined)
                    eventEmit.setFieldValues('company.introductionFileId', undefined)
                    eventEmit.setFieldValues('company.introductionDelYn', undefined)
                  }
                "
              />
            </div>
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1" label="회사소개문구" required>
          <div class="wf-tr-match-parent wf-textarea-py">
            <TextareaMaxLengthBytes
              :model-value="props.valueProps.company.introductionContent"
              @update:model-value="(value) => eventEmit.setFieldValues('company.introductionContent', value)"
              class="wf_set-h-textarea wf_company-introduction"
              placeholder="200자 이내로 입력해 주세요."
              :max-bytes="TEXTAREA_NUMBER_200"
              :hidden-warning="true"
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf_border-b-rm" label="회사 홈페이지">
          <div class="wf-tr-match-parent">
            <CompanyTextInputValidation
              name=""
              size="small"
              placeholder="회사 소개페이지 URL을 입력해 주세요."
              class="wf_flex-1"
              :model-value="props.valueProps.company.companyHomePageUrl"
              @update:model-value="(value) => eventEmit.setFieldValues('company.companyHomePageUrl', value)"
            />
          </div>
        </FormGroup>
      </div>
    </div>
  </div>

  <div>
    <ProductBorderBottomTitle class="wf-mb-20 wf-pb-10 wf-tr-match-parent company-regis-main-title_w-full">
      <div class="wf_flex wf_flex-custom">
        사이트 정보
        <span class="wf_text-sub-01 wf-body_04-reg">※ 복지몰 아이디는 복지몰 URL에 사용되므로, 신중히 입력 부탁드립니다.</span>
      </div>
    </ProductBorderBottomTitle>
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf-mb-20 wf_br-6">
      <div class="wf_flex">
        <FormGroup class="wf_border-b-rm" label="복지몰 아이디" required>
          <div class="wf_items-center wf_justify-between wf_flex wf-tr-match-parent">
            <div class="wf_flex wf-space-x-4">
              <CompanyTextInputValidation
                name=""
                size="small"
                placeholder="아이디 입력"
                class="wf_flex-1 wf_w-180"
                :max-length="10"
                :model-value="props.valueProps.company.customerId"
                @update:model-value="
                  (value) => {
                    eventEmit.setFieldValues('company.customerId', value)
                  }
                "
                @validate-content="onlyAlphabetAccepted"
              />
              <WelfareMdButton
                :disabled="lastSearchCustomerId && lastSearchCustomerId == props.valueProps.company.customerId"
                @on-click="
                  () => {
                    // TODO: check duplicated customerId
                    eventEmit.checkExist('customer-id')
                    lastSearchCustomerId = props.valueProps.company.customerId
                  }
                "
                :label="(props.valueProps.tempValidCustomerId && lastSearchCustomerId == props.valueProps.company.customerId) ? '중복확인완료' : '중복확인'"
                button-size="small"
                button-type="liner"
              />
            </div>
            <span class="wf_text-sub-01 wf-body_04-reg wf-pr-1"> ※ 10자 이내 영문으로 입력해 주세요. </span>
          </div>
        </FormGroup>
        <FormGroup class="wf_border-b-rm" label="복지몰 URL" required is-border-left>
          <div class="wf-body_03-reg text-default">
            <span>{{ createCustomerUrlSite(props.valueProps?.company?.customerId) }}</span>
          </div>
        </FormGroup>
      </div>
    </div>
  </div>

  <div>
    <ProductBorderBottomTitle class="wf-mb-20 wf-pb-9 wf-tr-match-parent company-regis-main-title_w-full">
      <div class="wf_flex wf_flex-custom">
        계약 정보
        <span class="wf_text-sub-01 wf-body_04-reg wf-pr-1">※ 사이트명은 복지몰 URL에 사용되므로, 신중히 입력 부탁드립니다.</span>
      </div>
    </ProductBorderBottomTitle>
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6">
      <div class="wf_flex wf_h-44">
        <FormGroup label="계약기간" required>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pb-2 wf-body_03-reg wf_text--14">
            <WelfareDateTimePicker
              :model-value="props.valueProps.contract.contractStartDate"
              size="small"
              :format="DEFAULT_DATE_FORMAT"
              @update:model-value="
                (value) => {
                  eventEmit.setFieldValues('contract.contractStartDate', value)
                }
              "
            />
            <span class="wf-w-11 wf-h-16 wf-px-4">~</span>
            <WelfareDateTimePicker
              class="wf-pl-1"
              :model-value="props.valueProps.contract.contractEndDate"
              size="small"
              :format="DEFAULT_DATE_FORMAT"
              @update:model-value="
                (value) => {
                  eventEmit.setFieldValues('contract.contractEndDate', value)
                }
              "
            />
          </div>
        </FormGroup>
        <FormGroup label="계약일" required is-border-left>
          <div class="">
            <WelfareDateTimePicker
              :model-value="props.valueProps.contract.contractRegDate"
              size="small"
              :format="DEFAULT_DATE_FORMAT"
              @update:model-value="
                (value) => {
                  eventEmit.setFieldValues('contract.contractRegDate', value)
                }
              "
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup label="정산일" required>
          <div class="wf_flex wf-tr-match-parent wf-settlement_container">
            <div class="wf-text-box wf-text-box wf_w-input-180 wf-tr-match-parent">
              <label class="wf-text-box-label wf-text-box-label-vertical">
                <div class="wf-text-box-label-horizontal-group">
                  <span class="wf-w-24 wf-text-box-label-text wf-text-box-label-text-sm">매월</span>
                  <CompanyTextInputValidation
                    name=""
                    size="small"
                    placeholder="텍스트"
                    :model-value="(props.valueProps.contract.settlementDate || '').toString()"
                    :max-length="2"
                    :on-validate-content="onlyNumberAccepted"
                    :not-count-character-reg-exp="notCountCharacterRegex"
                    @update:model-value="(value) => eventEmit.setFieldValues('contract.settlementDate', value)"
                  />
                </div>
              </label>
            </div>
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf_border-b-rm" label="계약서" required>
          <div class="wf_py-14 wf-tr-match-parent">
            <div class="wf_flex wf_justify-between">
              <CompanyUploadFile
                class="wf_company-upload-container"
                v-on:get-file="
                  ({ file, url }) => {
                    emit('setDataValue', 'tempContractFile', {
                      uploaded: false,
                      file,
                      url,
                      name: file?.name,
                      size: file?.size
                    })
                    eventEmit.setFieldValues('contract.contractFileId', url)
                    eventEmit.setFieldValues('contract.contractDelYn', file?.name)
                  }
                "
                :not-show-one-remove-btn="true"
                :hide-download-btn="true"
                :single-file="true"
                :documentsList="props.valueProps.tempContractFile ? [props.valueProps.tempContractFile] : []"
                :on-remove-file="
                  () => {
                    eventEmit.setFieldValues('tempContractFile', undefined)
                  }
                "
              />
            </div>
          </div>
        </FormGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/company/customerManagement/company-customer-registration.css');
</style>
