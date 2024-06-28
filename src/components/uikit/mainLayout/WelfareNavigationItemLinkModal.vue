<script setup lang="ts">
import { defaultColor } from '@/common/color'
import ICStar from '@/components/icons/IconStar.vue'
import { useToggleFavorite } from '@/composables'
import { RouteRecordRawChildItem } from '@/models/RouteRecordRawExtends'
import WelfareNavigationItemFinalLinkModal from './WelfareNavigationItemFinalLinkModal.vue'

interface Emits {
  (e: 'setFavorite', id: number): void
  (e: 'onClose', data?: any): void
}

interface Props {
  favorite: RouteRecordRawChildItem
  index: number
  isActive: boolean
  listFavoritesId: string[]
}

const emits = defineEmits<Emits>()

const props = defineProps<Props>()

const { isActive, handleToggleFavorite } = useToggleFavorite(props, (id) => {
  emits('setFavorite', id)
})
</script>

<template>
  <div class="wf-f29-item_body-item wf-space-y-10">
    <div class="wf-f29-item_body-item-header" :class="!favorite?.children?.length ? 'wf_flex wf_items-center wf_justify-between wf-width-full' : ''">
      <p v-if="favorite.children?.length" class="wf-body_02-semi wf_text-n-33">{{ favorite.name }}</p>
      <router-link
        @click="emits('onClose', { name: favorite.name, path: favorite.path, nameComponent: favorite.nameComponent })"
        :to="favorite.path"
        v-else
        class="wf-body_02-semi wf_text-n-33"
        >{{ favorite.name }}</router-link
      >
      <button
        type="button"
        v-if="!favorite.children?.length"
        @click="
          () => {
            handleToggleFavorite(Number(favorite.id))
            isActive = !isActive
          }
        "
      >
        <ICStar :width="18" :height="18" :color="isActive ? defaultColor._ffc907 : defaultColor._ccc" />
      </button>
    </div>
    <div class="wf-div-border-center"></div>

    <div v-if="favorite?.children" class="wf-f29-3d-menu wf-space-y-4">
      <WelfareNavigationItemFinalLinkModal
        v-for="(__favorite, __index) in favorite.children"
        :key="__index"
        :favorite="__favorite"
        :is-active="listFavoritesId.some((item) => item === __favorite.id)"
        @set-favorite="(id) => emits('setFavorite', id)"
        @on-close="(data) => emits('onClose', { name: data.name, path: data.path, nameComponent: data.nameComponent })"
      />
    </div>
  </div>
</template>
