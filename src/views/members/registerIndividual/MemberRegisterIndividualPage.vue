<!-- BO_B0103_010101 -->

<script setup lang="ts">
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { WelfareBigButton, WelfareInputText, WelfareRadioGroup } from '@/components/uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormSearchAddressEdit from '@/components/widgets/form/FormSearchAddressEdit.vue'
import TextareaMaxLengthBytes from '@/components/widgets/textInput/TextareaMaxLengthBytes.vue'
import { TEXTAREA_NUMBER_400 } from '@/common/constant'
import { useMemberRegisterIndividual } from '@/composables/members/registerIndividual/useMemberRegisterIndividual'
import { ProductSearchType } from '@/models'

const {
  values,
  setFieldValue,
  onEmailIdChange,
  optionsGender,
  optionEmploymentStatus,
  optionAccountStatus,
  optionMembershipLevel,
  optionMarketingAgreeYn,
  onSave,
  searchCustomerRef,
  customerAddressRef,
  companyAddressRef,
  handleResetForm,
  acceptNumber
} = useMemberRegisterIndividual()
</script>

<template>
  <div class="wf-body-wrap-content wf-pt-29">
    <form class="wf-space-y-30 wf_flex wf_flex-col wf-mt-0">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" is-rounded-top label="고객사" required>
            <ProductSearchModalWithTableWrapper
              ref="searchCustomerRef"
              @selectValue="(value) => setFieldValue('customer', value?.code?.toString())"
              class="wf-product-base-info-search"
              :type="ProductSearchType.CUSTOMER"
              placeholder-input="고객사 조회"
              label-button="조회"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="회원명" required>
            <WelfareInputText
              :model-value="values.nameMember"
              @update:model-value="(value) => setFieldValue('nameMember', value)"
              class="wf_w-180"
              placeholder="이름 입력"
              size="small"
              :max-length="8"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="아이디(이메일)" required>
            <WelfareInputText
              :model-value="values.emailId"
              @update:model-value="onEmailIdChange"
              class="wf_w-full"
              placeholder="@포함 이메일 주소 입력"
              size="small"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="비밀번호" required>
            <WelfareInputText
              :model-value="values.password"
              @update:model-value="(value) => setFieldValue('password', value)"
              class="wf_w-full"
              placeholder="영문+숫자+특수문자 혼합 9~20"
              size="small"
              :max-length="20"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1" label="휴대폰 번호" required>
            <WelfareInputText
              :model-value="values.phone"
              @update:model-value="(value) => setFieldValue('phone', value)"
              class="wf_w-180"
              placeholder="“-” 없이 숫자만 입력"
              size="small"
              :max-length="11"
              @keypress="acceptNumber"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1" label="개인 이메일" required>
            <WelfareInputText
              :model-value="values.emailPersonal"
              @update:model-value="(value) => setFieldValue('emailPersonal', value)"
              class="wf_w-full"
              placeholder="@포함 이메일 주소 입력"
              size="small"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="생년월일" required>
            <WelfareInputText
              :model-value="values.birthday"
              @update:model-value="(value) => setFieldValue('birthday', value)"
              class="wf_w-180"
              placeholder="숫자로 8자리 (예시 19801221)"
              size="small"
              :min-length="8"
              :max-length="8"
              @keypress="acceptNumber"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1" label="사번" required>
            <WelfareInputText
              :model-value="values.jobNumber"
              @update:model-value="(value) => setFieldValue('jobNumber', value)"
              class="wf_w-180"
              placeholder="사번 입력"
              size="small"
              :max-length="5"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1" label="직급" required>
            <WelfareInputText
              :model-value="values.rank"
              @update:model-value="(value) => setFieldValue('rank', value)"
              class="wf_w-180"
              placeholder="직급 입력"
              size="small"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="성별" required>
            <WelfareRadioGroup
              :model-value="values.gender"
              @update:model-value="(value) => setFieldValue('gender', value)"
              :options="optionsGender"
              size="sm"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="재직상태" required>
            <WelfareRadioGroup
              :model-value="values.employmentStatus"
              @update:model-value="(value) => setFieldValue('employmentStatus', value)"
              :options="optionEmploymentStatus"
              size="sm"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="계정 상태" required>
            <WelfareRadioGroup
              :model-value="values.accountStatus"
              @update:model-value="(value) => setFieldValue('accountStatus', value)"
              :options="optionAccountStatus"
              size="sm"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="회원 등급" required>
            <WelfareRadioGroup
              :model-value="values.membershipLevel"
              @update:model-value="(value) => setFieldValue('membershipLevel', value)"
              :options="optionMembershipLevel"
              size="sm"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-2" custom-class="wf-pb-1 wf-pl-12" label="선택 마케팅 동의" required>
            <WelfareRadioGroup
              :model-value="values.marketingAgreeYn"
              @update:model-value="(value) => setFieldValue('marketingAgreeYn', value)"
              :options="optionMarketingAgreeYn"
              size="sm"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-regis-individual-address" custom-class="wf-pb-1 wf-pl-11" label="고객사 주소" required>
            <FormSearchAddressEdit
              ref="customerAddressRef"
              :model-value="values.customerAddress"
              @update:model-value="(value) => setFieldValue('customerAddress', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            class="wf_flex-1 wf-regis-individual-address"
            custom-class="wf-pb-1 wf-pl-11 wf-pt-1"
            :isBorderBottom="false"
            isRoundedBottom
            label="자택(배송지) 주소"
          >
            <FormSearchAddressEdit
              ref="companyAddressRef"
              :model-value="values.homeAddress"
              @update:model-value="(value) => setFieldValue('homeAddress', value)"
            />
          </FormGroup>
        </div>
      </div>

      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" :isBorderBottom="false" isRoundedBottom isRoundedTop label="관리자 메모">
            <div class="wf-py-7 wf-width-full">
              <div class="w-full wf_flex wf_flex-col wf-space-y-6">
                <TextareaMaxLengthBytes
                  :model-value="values.notes"
                  @update:model-value="(val) => setFieldValue('notes', val)"
                  placeholder="상세 내용을 입력해 주세요."
                  class="wf-administrator-notes-textarea"
                  :max-bytes="TEXTAREA_NUMBER_400"
                  hidden-warning
                >
                </TextareaMaxLengthBytes>
                <span class="wf_text-sub-01 wf-body_04-reg wf-pl-11 wf-mt--10"
                  >회원관리 > 회원정보 관리 > 회원목록 > 회원상세 > 고객특이사항 관리에 저장됩니다.</span
                >
              </div>
            </div>
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_items-center wf_justify-center wf-space-x-20">
        <WelfareBigButton @click="() => handleResetForm()" label="초기화" buttonType="neatral" />
        <WelfareBigButton @click="onSave" label="저장" buttonType="default" />
      </div>
    </form>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-register-individual-page.css');
</style>

<script lang="ts">
export default {
  name: 'MemberRegisterIndividualPage'
}
</script>
