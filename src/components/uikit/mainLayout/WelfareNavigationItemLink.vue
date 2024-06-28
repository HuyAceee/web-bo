<script setup lang="ts">
import { defaultColor } from '@/common/color'
import IconDropDown from '@/components/icons/IconDropDown.vue'
import ICStar from '@/components/icons/IconStar.vue'
import { useToggleFavorite } from '@/composables'
import WelfareNavigationItemFinalChildLink from './WelfareNavigationItemFinalChildLink.vue'

const props = defineProps(['data', 'favorites', 'setFavorites', 'indexLv1', 'indexLv2', 'isActive'])
const emit = defineEmits(['toggle-expander'])

const { handleToggleFavorite, handlePushTab, isActive } = useToggleFavorite(props, props.setFavorites)
</script>

<template>
  <div class="wf-body-navigation-child-link wf_items-center wf_flex wf_justify-between">
    <button @click="emit('toggle-expander')" v-if="data.children && data.children.length" class="wf_flex wf_justify-between wf_width-full">
      <span class="wf-body-navigation-link--text">{{ data.name }}</span>
      <span class="wf-body-navigation-item-link-icon">
        <IconDropDown :iconColor="defaultColor._333" />
      </span>
    </button>
    <div v-else class="wf_flex wf_width-full wf_items-center wf_justify-between">
      <router-link @click="handlePushTab(data)" class="wf-body-navigation-link--text wf_flex-1" :to="data.path">
        {{ data.name }}
      </router-link>
      <button
        @click="
          () => {
            handleToggleFavorite(data?.id)
            isActive = !isActive
          }
        "
        class="wf-body-navigation-item-link-icon"
      >
        <ICStar :width="18" :height="18" :color="isActive ? defaultColor._ffc907 : defaultColor._ccc" />
      </button>
    </div>
  </div>
  <div v-if="data.children && data.children.length > 0" class="wf-expander">
    <ul class="wf-body-navigation-level-2 wf-expander-content wf-space-y-4">
      <li v-for="__item in data.children" :key="__item.id" class="wf-body-navigation-level-2-item">
        <WelfareNavigationItemFinalChildLink
          :data="__item"
          @pushTab="handlePushTab"
          @toggleFavorite="props.setFavorites"
          :isActive="props.favorites?.some((item: number) => item === __item.id)"
        />
      </li>
    </ul>
  </div>
</template>
