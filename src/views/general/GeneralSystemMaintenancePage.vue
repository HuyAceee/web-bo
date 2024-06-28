<!-- BO_Y0401_010101 -->
<script setup lang="ts">
import { icSystemChecking } from '@/assets'
import AuthenticationBaseWrapper from '@/components/authentication/AuthenticationBaseWrapper.vue'
import AuthenticationBoxWrapper from '@/components/authentication/AuthenticationBoxWrapper.vue'
interface GeneralSystemMaintenanceProps {
  timeDebug?: string
  detailDebug?: string
}
const props = defineProps<GeneralSystemMaintenanceProps>()
</script>

<template>
  <AuthenticationBaseWrapper hasContact :title="`Back Office 시스템 점검중`" :sub-title="`메가존 플레이`">
    <template #title></template>
    <template #content>
      <AuthenticationBoxWrapper type="primary" titleContent="">
        <template #image>
          <img class="wf-mb--6" alt="" :src="icSystemChecking" />
        </template>
        <template #content>
          <p class="wf-sub_tit_01 text-title-content-system-checking">
            안정적인 서비스 제공을 위해 시스템 점검중에 있습니다.<br />
            이용에 불편을 드려 죄송합니다.
          </p>
          <div class="wf-mt-21">
            <p class="content-custom text-content-system-checking">
              시스템 점검 일시 :&nbsp;&nbsp;&nbsp;&nbsp;{{ props.timeDebug ?? '2014. 01. 01 00:00 ~ 06:00' }}
              <br />
            </p>
            <p class="content-custom text-content-system-checking wf-pt-14 wf-pb-17">
              시스템 점검 내용 :&nbsp;&nbsp;&nbsp; {{ props.detailDebug ?? '장바구니 기능 개선' }}
            </p>
          </div>
        </template>
      </AuthenticationBoxWrapper>
    </template>
    <template #footer>
      <div></div>
    </template>
  </AuthenticationBaseWrapper>
</template>

<style scoped>
@import url('@/assets/css/view/authentication/auth-system-maintanance.css');
</style>
