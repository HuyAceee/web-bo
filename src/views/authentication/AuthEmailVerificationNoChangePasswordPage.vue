<!-- BO_A0102_040101 -->
<script setup>
import { HOMEPAGE_ROUTER } from '@/common'
import { WelfareBigButton } from '@/components'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import AuthenticationBoxWrapper from '@/components/authentication/AuthenticationBoxWrapper.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function openHomePage() {
  router.push(HOMEPAGE_ROUTER)
}
</script>

<template>
  <AuthenticationBaseWrapper :title="`Back Office 입니다`" :sub-title="`메가존 플레이`" :has-contact="true">
    <template #title></template>
    <template #content>
      <AuthenticationBoxWrapper type="primary" titleContent="이메일 인증이 완료되었습니다.">
        <template #content>
          <span class="content-custom"
            >이제 메가존플레이 Back Office를 <br />
            이용하실 수 있습니다.
          </span>
        </template>
      </AuthenticationBoxWrapper>
    </template>
    <template #footer>
      <WelfareBigButton label="메인으로 가기" buttonType="default" class="wf_w-full custom-button" @on-click="openHomePage" />
    </template>
  </AuthenticationBaseWrapper>
</template>
<style scoped>
@import url('@/assets/css/view/authentication/changePassword/auth-change-password.css');
</style>
