<script setup lang="ts">
import { defaultColor } from '@/common/color'
import ICStar from '@/components/icons/IconStar.vue'
import { useToggleFavorite } from '@/composables'
import { RouteRecordRawChildItem } from '@/models/RouteRecordRawExtends'

interface Emits {
  (e: 'setFavorite', id: number): void
  (e: 'onClose', data?: any): void
}

interface Props {
  favorite: RouteRecordRawChildItem
  isActive: boolean
}

const emits = defineEmits<Emits>()

const props = defineProps<Props>()

const { isActive, handleToggleFavorite } = useToggleFavorite(props, (id) => {
  emits('setFavorite', id)
})
</script>

<template>
  <div class="wf-f29-3d-menu-item">
    <div class="wf-frame1000002532">
      <span class="wf_flex wf_justify-center wf_items-center wf-dot wf-body_03-mid">&#x2022;</span>
      <router-link
        @click="emits('onClose', { name: favorite.name, path: favorite.path, nameComponent: favorite.nameComponent })"
        :to="favorite.path"
        class="wf-body_03-mid wf-text wf_text-n-52"
        >{{ favorite.name }}</router-link
      >
    </div>
    <button
      type="button"
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
</template>
