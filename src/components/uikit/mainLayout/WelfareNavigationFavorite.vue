<script setup lang="ts">
import { WelfareNavigationFavoriteItem } from '@/components'
import { useWelfareNavigationFavorite } from '@/composables'
import { IMenuFavoriteProps } from '@/models'
const props = defineProps<IMenuFavoriteProps>()
const { favorites, handleHover, handleMouseLeave, handleClickStar, handlePushTab } = useWelfareNavigationFavorite(props)
</script>

<template>
  <ul v-if="favorites?.length" class="wf-body-navigation-list">
    <li class="wf-body-navigation-favorite-item" v-for="favorite in favorites" :key="favorite.id">
      <WelfareNavigationFavoriteItem
        :favorite="favorite"
        @click-star="handleClickStar"
        @mouse-enter="handleHover"
        @mouse-leave="handleMouseLeave"
        @push-tab="handlePushTab"
      />
    </li>
  </ul>
  <div class="wf-body-navigation-list wf_text-center wf-body_01-mid wf_text-n-33" v-else>
    <p>즐겨찾기된 메뉴가 없습니다. 메뉴에서 즐겨찾기를 추가해 보세요.</p>
  </div>
</template>
