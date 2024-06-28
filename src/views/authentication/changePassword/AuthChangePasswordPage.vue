<!-- BO_A0103_010101 -->
<script setup lang="ts">
import { WelfareBigButton, WelfareInputTextWithValidation } from '@/components'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import IconVisibilityDisable from '@/components/icons/IconVisibilityDisable.vue'
import IconVisibilityEnable from '@/components/icons/IconVisibilityEnable.vue'
import { useAuthChangePassword } from '@/composables/authentication/useAuthChangePassword'
const { isInputInvalid, toggleDialogCancel, handleChangeVisibility, handleSubmitResetPassword, inputError, visibility } = useAuthChangePassword()
</script>

<template>
  <AuthenticationBaseWrapper
    :title="`비밀번호 변경`"
    :sub-title="`새로운 비밀번호로 변경해 주세요.`"
    reverse-title
    hasContact
    class="wf_change-password"
  >
    <template #content>
      <div class="wf-space-y-10">
        <WelfareInputTextWithValidation
          :inputType="visibility.password ? 'text' : 'password'"
          class="wf_w-full wrap-input"
          placeholder="현재 비밀번호를 입력해 주세요."
          name="password"
          :icon="visibility.password ? IconVisibilityEnable : IconVisibilityDisable"
          @clickIconRight="handleChangeVisibility('password')"
          :invalid="isInputInvalid('password')"
        />
        <WelfareInputTextWithValidation
          :inputType="visibility.newPassword ? 'text' : 'password'"
          class="wf_w-full wrap-input"
          placeholder="새 비밀번호를 입력해 주세요."
          name="newPassword"
          :icon="visibility.newPassword ? IconVisibilityEnable : IconVisibilityDisable"
          @clickIconRight="handleChangeVisibility('newPassword')"
          :invalid="isInputInvalid('newPassword')"
        />
        <div class="wrap-input wf-space-y-6">
          <WelfareInputTextWithValidation
            :inputType="visibility.confirmNewPassword ? 'text' : 'password'"
            class="wf_w-full wrap-input"
            placeholder="새 비밀번호를 한번 더 입력 해 주세요."
            name="confirmNewPassword"
            :icon="visibility.confirmNewPassword ? IconVisibilityEnable : IconVisibilityDisable"
            @clickIconRight="handleChangeVisibility('confirmNewPassword')"
            :invalid="isInputInvalid('confirmNewPassword')"
          />
          <p class="wf-body_04-reg wf_text-sub-01 wf-px-12 wf_h-12">{{ inputError }}</p>
        </div>
        <p class="wf_flex wf_flex-row wf_items-center wf-ml-2">
          <span class=""><IconInfo /></span>
          <span class="wf-body_03-reg wf-pl-8 wf-pr-10 wf_text-n-52">비밀번호는 영문, 숫자, 특수문자 포함 8자~20자 이내로 설정 해 주세요.</span>
        </p>
      </div>
    </template>
    <template #footer>
      <div class="wf_flex-row wf_flex wf-space-x-6 wf-mt-29">
        <WelfareBigButton @click="toggleDialogCancel" label="다음에 변경하기" buttonType="neatral" class="wf_w-full" />
        <WelfareBigButton @click="handleSubmitResetPassword" label="비밀번호변경하기" buttonType="default" class="wf_w-full" />
      </div>
      <div class="wf-space-y-4 wf-body_04-reg wf_text-n-52 wf-px-15 wf-line-height-1-5 wf_mb--14 wf-mt-27">
        <p class="wf_flex wf_flex-row">
          <span>*</span>
          <span>&nbsp;최초 로그인시, 비밀번호&nbsp;&nbsp;초기화시에는 반드시 새로운 비밀번호로 변경하셔야 합니다.</span>
        </p>
        <p class="wf_flex wf_flex-row">
          <span>*</span>
          <span
            >&nbsp;비밀번호 변경 90일 경과시에는 새로운 비밀번호를 설정 하여 계정을 안전하게 관리
            <pre class="wf-mt--1">&nbsp;해 주세요</pre>
          </span>
        </p>
      </div>
    </template>
  </AuthenticationBaseWrapper>
</template>

<style scoped>
@import url('@/assets/css/view/authentication/changePassword/auth-change-password-form.css');
</style>
