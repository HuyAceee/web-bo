<!-- BO_A0101_0101 -->
<script setup lang="ts">
import { WelfareBigButton, WelfareCheckbox, WelfareInputTextWithValidation } from '@/components'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import IconHiddenPassword from '@/components/icons/IconHiddenPassword.vue'
import IconShowPassword from '@/components/icons/IconShowPassword.vue'
import { useAuthSubmitLoginForm } from '@/composables/authentication/login/useAuthSubmitLoginForm'

const { values, onSubmit, checkValidation, isShowPassword, saveId } = useAuthSubmitLoginForm()
</script>

<template>
  <AuthenticationBaseWrapper :title="`Back Office 로그인`" :sub-title="`메가존 플레이`" hasContact contact-text="로그인에 어려움이 있으세요?">
    <template #content>
      <form class="wf-group-input" @submit="onSubmit">
        <WelfareInputTextWithValidation
          placeholder="아이디를 입력해 주세요."
          v-model="values.memberId"
          input-type="text"
          name="memberId"
          :class="'wf_input-validation--valid'"
        />
        <WelfareInputTextWithValidation
          placeholder="비밀번호를 입력해 주세요."
          :input-type="isShowPassword ? 'text' : 'password'"
          v-model="values.password"
          name="password"
          :icon="isShowPassword ? IconShowPassword : IconHiddenPassword"
          @clickIconRight="isShowPassword = !isShowPassword"
        >
        </WelfareInputTextWithValidation>
      </form>
      <WelfareCheckbox v-model="saveId" label="아이디 저장" />
    </template>
    <template #footer>
      <WelfareBigButton label="로그인" buttonType="default" class="wf_w-full" @on-click="checkValidation" />
    </template>
  </AuthenticationBaseWrapper>
</template>

<style scoped>
@import url('@/assets/css/view/authentication/login/auth-login.css');
</style>
