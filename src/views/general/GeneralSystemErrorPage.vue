<!-- BO_Y0501_010101 -->
<script setup>
import { icSystemError } from '@/assets'
import { HOMEPAGE_ROUTER } from '@/common'
import { WelfareBigButton } from '@/components'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import AuthenticationBoxWrapper from '@/components/authentication/AuthenticationBoxWrapper.vue'
</script>

<template>
  <AuthenticationBaseWrapper class="wf_prefix-wrapper" title="Back Office 페이지 오류" sub-title="메가존 플레이" has-contact>
    <template #content>
      <AuthenticationBoxWrapper type="danger">
        <template #image>
          <img class="wf-mb--5" alt="" :src="icSystemError" />
        </template>
        <template #title><p class="wf-mt-4">오류가 발생 했습니다.</p></template>
        <template #content>
          <div class="wf-body_01-reg wf-pb-4">
            <p class="wf-mt-1">일시적인 문제가 발생했습니다.</p>
            <p class="wf-mt-5">잠시 후 다시 시도해 주세요.</p>
          </div>
        </template>
      </AuthenticationBoxWrapper>
      <div class="wf-mt-40">
        <router-link class="wf_text-underline-transparent" :to="HOMEPAGE_ROUTER">
          <WelfareBigButton label="메인으로 가기" buttonType="default" class="wf_w-full" />
        </router-link>
      </div>
    </template>
  </AuthenticationBaseWrapper>
</template>

<style scoped>
@import url('@/assets/css/view/general/general-error-occur.css');
</style>
