<!-- BO_A0102_030101 -->
<script setup>
import { WelfareBigButton } from '@/components'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import AuthenticationBoxWrapper from '@/components/authentication/AuthenticationBoxWrapper.vue'
import { AUTH_LOGIN_ROUTER } from '@/common'
</script>

<template>
  <AuthenticationBaseWrapper :title="`Back Office 입니다`" :sub-title="`메가존 플레이`" has-contact>
    <template #title></template>
    <template #content>
      <AuthenticationBoxWrapper type="danger" titleContent="보내 드린 인증키가 만료되었습니다." messageContent="다시 로그인을 진행해 주세요.">
      </AuthenticationBoxWrapper>
    </template>
    <template #footer>
      <div>
        <routerLink :to="AUTH_LOGIN_ROUTER" class="wf_link">
          <WelfareBigButton label="다시 로그인하기" buttonType="default" class="wf_w-full" />
        </routerLink>
      </div>
    </template>
  </AuthenticationBaseWrapper>
</template>
<style scoped>
@import url('@/assets/css/view/authentication/auth-token-expired-inform.css');
</style>
