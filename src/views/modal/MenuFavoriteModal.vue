<script setup lang="ts">
import { defaultColor } from '@/common/color'
import { HeaderModal, WelfareSwitch } from '@/components'
import IconDropDown from '@/components/icons/IconDropDown.vue'
import WelfareNavigationItemLinkModal from '@/components/uikit/mainLayout/WelfareNavigationItemLinkModal.vue'
import { useModalFavorite } from '@/composables'
import { useSiteMenuStore } from '@/stores/siteMenus'
import { storeToRefs } from 'pinia'

interface MenuFavoriteModalProps {
  favorites: string[]
  onClose: () => void
}

type MenuFavoriteModalEmit = (e: 'on-favorite', id: number) => void

const props = defineProps<MenuFavoriteModalProps>()
const emits = defineEmits<MenuFavoriteModalEmit>()

const { isExpanderAll, handleToggle, refParent, handleCloseModal, handleExpanderAll } = useModalFavorite()
const siteMenuStore = useSiteMenuStore()
const { listMenuNavigation } = storeToRefs(siteMenuStore)
</script>

<template>
  <div class="wf-modal-full-menu">
    <HeaderModal
      title="전체 메뉴"
      @close-modal="
        handleCloseModal(() => {
          onClose()
        })
      "
    >
      <div class="wf-menu-function wf-space-x-6">
        <span class="wf-body_04-reg">메뉴펼침기능</span>
        <WelfareSwitch @update:model-value="handleExpanderAll" v-model:model-value="isExpanderAll" />
      </div>
    </HeaderModal>
    <div class="wf-modal-full-menu_body">
      <div ref="refParent" id="wf-navigation-preview" class="wf-frame1000002229">
        <div class="wf-favorite-control-navigation">
          <span class="wf-body_01-semi">대시보드</span>
        </div>

        <div v-for="(favorite, index) in listMenuNavigation" :key="index" class="wf-frame1000002229-item">
          <div @click="handleToggle(index)" class="wf-frame1000002553">
            <span class="wf-body_01-semi">{{ favorite.name }}</span>
            <div class="wf-favorite-icon-dropdown">
              <IconDropDown :width="20" :height="20" :color="defaultColor._333" />
            </div>
          </div>
          <div class="wf-expander">
            <div class="wf-expander-content wf-space-y-26">
              <div class="wf-frame1000002229-item_body wf-space-x-50">
                <WelfareNavigationItemLinkModal
                  v-for="(_favorite, index) in favorite.children"
                  :key="index"
                  :favorite="_favorite"
                  :index="index"
                  @on-close="(data) => handleCloseModal(onClose, data)"
                  :is-active="favorites?.some((item) => item === _favorite.id)"
                  @on-toggle="handleToggle"
                  @set-favorite="(id) => emits('on-favorite', id)"
                  :listFavoritesId="props.favorites"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
