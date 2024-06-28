<script setup lang="ts">
import { defaultColor } from '@/common/color'
import ICStar from '@/components/icons/IconStar.vue'
import { useToggleFavorite } from '@/composables'
import { RouteRecordRawChildItem } from '@/models/RouteRecordRawExtends'

interface Props {
  isActive: boolean
  data: RouteRecordRawChildItem
}

interface Emits {
  (e: 'toggleFavorite', id: number): boolean
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const { handleToggleFavorite, handlePushTab, isActive } = useToggleFavorite(props, (id) => {
  emits('toggleFavorite', id)
})
</script>
<template>
  <div class="wf-body-navigation-level-2-link wf_flex wf_justify-between">
    <div class="wf_flex wf_items-center">
      <span class="wf-body-navigation-level-2-link-dot wf_flex wf_justify-center">•</span>
      <router-link @click="handlePushTab(data)" class="wf-body-navigation-link--text wf_flex-1" :to="props.data.path">
        {{ props.data.name }}
      </router-link>
    </div>
    <button
      @click="
        () => {
          handleToggleFavorite(props.data.id as number)
          isActive = !isActive
        }
      "
      class="wf-body-navigation-item-link-icon"
    >
      <ICStar :width="18" :height="18" :color="isActive ? defaultColor._ffc907 : defaultColor._ccc" />
    </button>
  </div>
</template>
