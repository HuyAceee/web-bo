<!-- BO_A0102_0101 -->
<script setup lang="ts">
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import AuthenticationBoxWrapper from '@/components/authentication/AuthenticationBoxWrapper.vue'
</script>

<template>
  <AuthenticationBaseWrapper hasContact :title="`Back Office 입니다`" :sub-title="`메가존 플레이`">
    <template #title></template>
    <template #content>
      <AuthenticationBoxWrapper type="primary" titleContent="">
        <template #content>
          <p class="wf-sub_tit_01 text-title-content-email-alert">
            ID로 등록된 이메일 주소로&nbsp;<br />
            인증키가 발송되었습니다.
          </p>
          <p class="wf-body_01-reg text-content-email-alert">
            이메일을 확인하여 인증을 완료해 주세요.<br />보내 드린 인증키는 5분간 유효합니다.&nbsp;
          </p>
        </template>
      </AuthenticationBoxWrapper>
    </template>
    <template #footer>
      <div></div>
    </template>
  </AuthenticationBaseWrapper>
</template>

<style scoped>
@import url('@/assets/css/view/authentication/auth-email-verify-inform.css');
</style>
