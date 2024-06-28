<script setup>
import { icLogo } from '@/assets'
import { AUTH_LOGIN_ROUTER, AUTH_USER_INFORMATION_ROUTER, ACCESS_TOKEN, REFRESH_TOKEN, LOGIN_STATUS, storage } from '@/common'
import IconSetting from '@/components/icons/IconSetting.vue'
import { useRouter } from 'vue-router'
import { axiosOAuth2Service } from '@/services/AxiosOAuth2Service'

const router = useRouter()
const logout = () => {
  storage.remove(ACCESS_TOKEN)
  storage.remove(REFRESH_TOKEN)
  storage.remove(LOGIN_STATUS)
  router.push(AUTH_LOGIN_ROUTER)
  axiosOAuth2Service.clearHeaderToken()
}

const goToInformation = () => {
  router.push(AUTH_USER_INFORMATION_ROUTER)
}
</script>

<template>
  <div id="wf-header">
    <div class="wf-header-content">
      <router-link to="/">
        <img alt="" :src="icLogo" />
      </router-link>
      <div id="wf_header-menu-bar" class="wf-space-x-60">
        <button id="wf_header-menu-bar-fullscreen" class="wf_header-menu-bar-item active">메뉴</button>
        <button id="wf_header-favorites-fullscreen" class="wf-favorites-button wf_header-menu-bar-item">즐겨찾기</button>
        <button class="wf-manual-button wf_header-menu-bar-item">메뉴얼</button>
        <button class="wf-contact-button wf_header-menu-bar-item">담당자</button>
        <button class="wf_header-menu-bar-item">1:1문의</button>
      </div>
      <div class="wf_header-option">
        <div class="wf_header-account wf-space-x-10">
          <div class="wf_header-account_setting wf-space-x-6">
            <router-link class="wf_header-account_setting--link" :to="AUTH_USER_INFORMATION_ROUTER">메가크루 님</router-link>
            <button @click="goToInformation" class="wf_header-account_setting--btn">
              <IconSetting :width="24" :height="24" />
            </button>
          </div>
          <button v-on:click="logout" class="wf_header-account--logout">
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
