<!-- BO_A0102_020101 -->
<script setup>
import { AUTH_CHANGE_PASSWORD_ROUTER } from '@/common'
import { WelfareBigButton } from '@/components'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import AuthenticationBoxWrapper from '@/components/authentication/AuthenticationBoxWrapper.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function handleLink() {
  router.push(AUTH_CHANGE_PASSWORD_ROUTER)
}
</script>

<template>
  <AuthenticationBaseWrapper :title="`Back Office 입니다`" :sub-title="`메가존 플레이`" :has-contact="true">
    <template #title></template>
    <template #content>
      <AuthenticationBoxWrapper type="primary" titleContent="이메일 인증이 완료되었습니다.">
        <template #content>
          <span class="content-custom">임시 비밀번호를 재설정하시면<br />메가존플레이 Back Office를 이용하실 수 있습니다.</span>
        </template>
      </AuthenticationBoxWrapper>
    </template>
    <template #footer>
      <WelfareBigButton label="비밀번호 변경하기" buttonType="default" class="wf_w-full custom-button" @on-click="handleLink" />
    </template>
  </AuthenticationBaseWrapper>
</template>
<style scoped>
@import url('@/assets/css/view/authentication/changePassword/auth-change-password.css');
</style>
