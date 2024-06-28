<!-- BO_A0203_010101 -->
<script setup lang="ts">
import { WelfareBigButton } from '@/components'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import { AUTH_EDIT_AUTH_USER_INFORMATION_ROUTER, AUTH_CHANGE_PASSWORD_ROUTER, HOMEPAGE_ROUTER } from '@/common'
import { useAuthUserInformation } from '@/composables/authentication/userInfo/useAuthUserInformation'
const { userInfo } = useAuthUserInformation()
</script>

<template>
  <AuthenticationBaseWrapper
    class="wf_prefix-wrapper-auth-user-information"
    :title="`관리자 정보`"
    :sub-title="`개인정보 변경시 정보를 수정하여 관리해 주세요.`"
    reverse-title
    hasContact
  >
    <template #title>
      <div class="wf_flex wf_flex-col wf_text-n-33 wf-space-y-12">
        <h2>관리자 정보</h2>
        <div class="wf_flex wf_flex-col wf-space-y-6">
          <h5>메가존플레이 관리자시스템에 등록된 관리자 정보입니다.</h5>
          <h5>개인정보 변경 발생시 정보를 수정하여 관리할 수 있습니다.</h5>
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
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center">{{ userInfo.phone }}</div>
        </div>
        <div class="wf-h-44 flex-box text-normal bd_b">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray">
            이메일&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center">{{ userInfo.email }}</div>
        </div>
        <div class="wf-h-42 flex-box text-normal">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray border-radius-bottom-left">소속 부서</div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center">{{ userInfo.deptInfo }}</div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="wf_flex wf_flex-col wf-space-y-10 wf-mt-20">
        <div class="wf_flex wf_justify-center wf-space-x-6">
          <RouterLink :to="AUTH_EDIT_AUTH_USER_INFORMATION_ROUTER" class="w-232 link-underline">
            <WelfareBigButton label="정보수정" buttonType="neatral" class="w-232" />
          </RouterLink>
          <RouterLink :to="AUTH_CHANGE_PASSWORD_ROUTER" class="w-232 link-underline">
            <WelfareBigButton label="비밀번호 변경" buttonType="default" class="w-232" />
          </RouterLink>
        </div>
        <RouterLink :to="HOMEPAGE_ROUTER" class="w-full link-underline">
          <WelfareBigButton label="이전페이지로 이동" buttonType="neatral" class="w-full" />
        </RouterLink>
      </div>
    </template>
  </AuthenticationBaseWrapper>
</template>
