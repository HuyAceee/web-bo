<!-- BO_A0203_020101 -->
<script setup lang="ts">
import { WelfareBigButton, WelfareMdButton, WelfareInputText, TextInputWithMaxLengthCharacters, TextInputValidationMaxBytes } from '@/components'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import { useAuthEditUserInformation } from '@/composables/authentication/editUserInfo/useAuthEditUserInformation'
const {
  userInfo,
  isSubmitPhone,
  isVerifyEmail,
  handleSubmitValue,
  handleSubmitPhone,
  handleCheckValidEmail,
  checkExistsEmailValited,
  handleCheckValidPhone,
  handleCancelValue,
  handleConfirmEmail
} = useAuthEditUserInformation()
</script>
<template>
  <AuthenticationBaseWrapper :title="`관리자 정보`" :sub-title="`개인정보 변경시 정보를 수정하여 관리해 주세요.`" reverse-title hasContact>
    <template #title>
      <div class="wf_flex wf_flex-col wf_text-n-33 wf-space-y-12">
        <h2>관리자 정보</h2>
        <div class="wf_flex wf_flex-col wf-space-y-6">
          <p class="wf-sub_tit_02">메가존플레이 관리자시스템에 등록된 관리자 정보입니다.</p>
          <p class="wf-sub_tit_02">개인정보 변경 발생시 정보를 수정하여 관리할 수 있습니다.</p>
        </div>
      </div>
    </template>
    <template #content>
      <div class="round-md">
        <div class="wf-h-44 flex-box text-normal bd_b">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray border-radius-top-left">
            아이디&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center">{{ userInfo.managerId }}</div>
        </div>
        <div class="wf-h-44 flex-box text-normal bd_b">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray">
            이름&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center">{{ userInfo.managerName }}</div>
        </div>
        <div class="wf-h-44 flex-box text-normal bd_b">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray">
            휴대폰번호&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center wf-space-x-6">
            <TextInputWithMaxLengthCharacters
              class="w-143"
              v-model="userInfo.phone"
              size="small"
              @input="handleCheckValidPhone"
              inputType="text"
              placeholder="'-' 숫자입력"
              :max-length="11"
              :hidden-warning="true"
            />
            <WelfareMdButton
              class="w-66"
              label="중복확인"
              buttonType="liner"
              :disabled="isSubmitPhone"
              @on-click="handleSubmitPhone"
              buttonSize="small"
            />
          </div>
        </div>
        <div class="wf-h-98 flex-box text-normal bd_b">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray">
            이메일&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center wf_justify-between padding-form-email">
            <div class="w-215">
              <WelfareInputText v-model="userInfo.email" @input="checkExistsEmailValited" size="small" inputType="text" placeholder="이메일을 입력" />
              <div class="wf_flex wf_justify-flex-start wf_items-center wf-space-x-6 wf-mt-6">
                <WelfareMdButton
                  :disabled="isVerifyEmail"
                  class="w-104r"
                  label="인증하기"
                  @on-click="handleCheckValidEmail"
                  buttonType="liner"
                  buttonSize="small"
                />
                <WelfareMdButton
                  class="w-104r"
                  label="인증확인"
                  :disabled="isVerifyEmail"
                  @on-click="handleConfirmEmail"
                  buttonType="liner"
                  buttonSize="small"
                />
              </div>
              <div class="wf-body_04-reg wf_text-sub-01 wf_h-12 wf-mt-6">이메일 변경 시에는 이메일 주소 인증이 필요합니다.</div>
            </div>
          </div>
        </div>
        <div class="wf-h-42 flex-box text-normal">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray border-radius-bottom-left">소속 부서</div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center wf-py-7 wf-px-12">
            <TextInputValidationMaxBytes
              v-model="userInfo.deptInfo"
              size="small"
              placeholder="소속부서를 입력해주세요."
              class="w-215"
              :max-bytes="200"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div>
        <div class="wf_flex wf-space-x-6">
          <WelfareBigButton @on-click="handleCancelValue" label="취소" buttonType="neatral" class="w-191r" />
          <WelfareBigButton @on-click="handleSubmitValue" label="수정" buttonType="default" class="w-191r" />
        </div>
      </div>
    </template>
  </AuthenticationBaseWrapper>
</template>
<style scoped>
@import url('@/assets/css/view/authentication/editUserInfo/auth-edit-user-info.css');
</style>
