<script setup lang="ts">
import { IFavoriteNavigation } from '@/models'
import { defaultColor } from '@/common/color'
import { computed } from 'vue'
import ICStar from '@/components/icons/IconStar.vue'
import IconArrowHrefLinkRight from '@/components/icons/IconArrowHrefLinkRight.vue'
interface WelfareNavigationFavoriteItemProps {
  favorite: IFavoriteNavigation
}
interface WelfareNavigationFavoriteItemEvent {
  (e: 'push-tab', favorite: IFavoriteNavigation): void
  (e: 'mouse-leave'): void
  (e: 'click-star', id: number): void
  (e: 'mouse-enter', event: MouseEvent): void
}
const props = defineProps<WelfareNavigationFavoriteItemProps>()
const emits = defineEmits<WelfareNavigationFavoriteItemEvent>()
const nameLink = computed(
  () =>
    `${props.favorite.item?.children?.name}${
      props.favorite.item?.children?.children?.name ? '/' + props.favorite.item?.children?.children?.name : ''
    }`
)
const path = computed(() => props.favorite.item?.children?.children?.path ?? props.favorite?.item?.children?.path ?? '')
</script>

<template>
  <div class="wf-body-navigation-favorite-root wf_justify-between wf_flex wf-space-x-12">
    <div class="wf_flex wf_items-center wf-space-x-6">
      <p class="wf-body_03-semi wf_text-n-52 wf_min-width-fit wf_width-max">{{ favorite?.item?.name }}</p>
      <IconArrowHrefLinkRight />
      <router-link
        @click="emits('push-tab', favorite)"
        @mouseleave="emits('mouse-leave')"
        @mouseenter="emits('mouse-enter', $event)"
        :to="path"
        :data-text="nameLink"
        class="wf-body-navigation-favorite-link--text wf_text-n-52 wf-body_03-mid line-clamp"
        >{{ nameLink }}</router-link
      >
    </div>
    <button @click="emits('click-star', Number(favorite.id))" class="wf-body-navigation-favorite-root-icon active">
      <ICStar :width="18" :height="18" :color="defaultColor._ffc907" />
    </button>
  </div>
</template>
