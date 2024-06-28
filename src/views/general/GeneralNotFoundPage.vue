<!-- BO_Y0601_010101 -->
<script setup lang="ts">
import { icNotFound } from '@/assets'
import { WelfareBigButton } from '@/components'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import AuthenticationBoxWrapper from '@/components/authentication/AuthenticationBoxWrapper.vue'
</script>

<template>
  <AuthenticationBaseWrapper class="wf_prefix-wrapper" title="Back Office 페이지 없음" sub-title="메가존 플레이" has-contact>
    <template #content>
      <AuthenticationBoxWrapper type="danger">
        <template #image>
          <img class="wf-mb--5" alt="" :src="icNotFound" />
        </template>
        <template #title><p class="wf-mt-4">페이지를 찾을 수 없습니다.</p></template>
        <template #content>
          <div class="wf-body_01-reg wf-pb-4">
            <p class="wf-mt-1">페이지 주소를 확인 하신 후</p>
            <p class="wf-mt-5">다시 시도해 주세요.</p>
          </div>
        </template>
      </AuthenticationBoxWrapper>
      <div class="wf-mt-40">
        <router-link class="wf_text-underline-transparent" to="/">
          <WelfareBigButton label="메인으로 가기" buttonType="default" class="wf_w-full" />
        </router-link>
      </div>
    </template>
  </AuthenticationBaseWrapper>
</template>

<style scoped>
@import url('@/assets/css/view/general/general-error-occur.css');
</style>
