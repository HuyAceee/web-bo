<script setup>
import { useMainNavigation } from '@/composables'
import { WelfareSwitch, WelfareCloseIcon, WelfareNavigationListLink, WelfareNavigationFavorite } from '@/components'
import { icArrowDownFillBack } from '@/assets'
import IconSetting from '@/components/icons/IconSetting.vue'

const {
  isExpanderAll,
  isShow,
  isShowNavigationFavorite,
  handleShowModalFavorite,
  handleClickBtnClose,
  handleExpanderAll,
  favorites,
  handleAddFavorite,
  goToInformation,
  goToLogin,
  handleDeleteFavorite
} = useMainNavigation()
</script>

<template>
  <div id="wf-body-navigation" :class="!isShow ? 'disable' : ''">
    <div class="wf-body-navigation-container">
      <div class="wf-body-navigation-icon-close">
        <WelfareCloseIcon :width="18" :height="18" @click="handleClickBtnClose" />
      </div>
      <div class="wf-body-navigation_profile">
        <div class="wf-body-navigation_profile--name">
          <span class="wf-body-navigation_profile--text">문혜정 님</span>
          <button @click="goToInformation">
            <IconSetting />
          </button>
        </div>
        <div class="wf-body-navigation_profile--email wf-space-x-8">
          <span class="wf-body-navigation_profile-email-text">kdd****@akcnlvk.com</span>
          <button @click="goToLogin" class="wf_header-account--logout"><span>로그아웃</span></button>
        </div>
      </div>
      <div v-if="!isShowNavigationFavorite" class="wf-body-navigation-btn--status">
        <div>
          <button @click="handleShowModalFavorite" class="wf_header-account--logout wf-btn-status-navigation"><span>전체메뉴보기</span></button>
        </div>
        <div class="wf-body-navigation-btn--status-item wf_flex wf_items-center">
          <span class="wf-body-navigation-btn-status---text">메뉴펼침기능</span>
          <WelfareSwitch @update:model-value="handleExpanderAll" v-model:model-value="isExpanderAll" />
        </div>
      </div>
      <div class="wf-body-navigation-content" :class="isShowNavigationFavorite ? 'wf_mt-39' : ''">
        <WelfareNavigationListLink :favorites="favorites" :setFavorites="handleAddFavorite" v-if="!isShowNavigationFavorite" />
        <WelfareNavigationFavorite :favorites="favorites" :setFavorites="handleDeleteFavorite" v-else />
      </div>
      <Teleport to="body">
        <div id="wf-body-navigation-favorite-hover" class="wf-body-navigation-favorite-hover">
          <span class="wf-body-navigation-favorite-hover-icon"><img :src="icArrowDownFillBack" alt="" /></span>
          <span class="wf-body-navigation-favorite-hover-text wf-body_04-mid wf_text-white"></span>
        </div>
      </Teleport>
      <p class="wf-body-navigation-text-note">Ⓒ MEGAZONE. ALL RIGHTS RESERVED.</p>
    </div>
  </div>
</template>
