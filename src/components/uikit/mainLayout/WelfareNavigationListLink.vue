<script setup lang="ts">
import { WelfareNavigationListItem } from '@/components'
import IconMenuNavigation from '@/components/icons/IconMenuNavigation.vue'
import { useMenuNavigation } from '@/composables'
import { WelfareMenuPayloadModel } from '@/models/uikit/WelfareMenu'
import { useSiteMenuStore } from '@/stores/siteMenus'
import { storeToRefs } from 'pinia'

export interface MenuFavoriteModalProps {
  favorites?: number[]
  setFavorites: (arg: WelfareMenuPayloadModel) => void
}

const props = defineProps<MenuFavoriteModalProps>()

const { handleToggle, refParent, colorIcon } = useMenuNavigation()
const siteMenuStore = useSiteMenuStore()
const { listMenuNavigation } = storeToRefs(siteMenuStore)
</script>

<template>
  <ul ref="refParent" id="wf-body-navigation-list" class="wf-body-navigation-list">
    <li class="wf_flex wf_items-center">
      <div class="wf-body-navigation-root wf_width-full wf_flex wf_items-center">
        <div class="wf-body-navigation-item-icon wf_flex wf_items-center wf_justify-center">
          <IconMenuNavigation :color="colorIcon" />
        </div>
        <span class="ml-20 wf-body-navigation-link--text">대시보드</span> <span></span>
      </div>
    </li>
    <li :key="index" v-for="(item, index) in listMenuNavigation" class="wf-body-navigation-item">
      <WelfareNavigationListItem
        :favorites="props.favorites ?? []"
        :setFavorites="props.setFavorites"
        @toggle-expander="handleToggle"
        :data="item"
        :index="index"
      />
    </li>
  </ul>
</template>
