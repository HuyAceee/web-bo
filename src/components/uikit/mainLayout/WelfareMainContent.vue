<script setup lang="ts">
import { useToggleNavigation } from '@/composables'
import { useTabsManagerStore } from '@/stores/tabsManager'
import { storeToRefs } from 'pinia'
import { WelfareHeaderTab, WelfareContentHeaderFromPathUrl } from '@/components'
import { TabMangerRecordModel } from '@/models/widgets/TabModel'
import { useTabManager } from '@/composables/common/useTabsManager'

const { isShow } = useToggleNavigation()
const tabsManagerStore = useTabsManagerStore()
const { listComponent } = storeToRefs(tabsManagerStore)
const { closeTabByIndex } = useTabManager()
const refs = new Map()

const onClose = (record: TabMangerRecordModel) => {
  const currentTabPath = record.currentPath
  if (currentTabPath) {
    const screen = refs.get(currentTabPath)
    if (screen && typeof screen.onClose !== 'undefined' && typeof screen.onClose === 'function') {
      if (screen.onClose(record) === true) {
        return
      }
    }
  }
  closeTabByIndex(record.index)
}
</script>

<template>
  <div id="wf-content" :class="!isShow ? 'wf-navigation' : ''">
    <div id="wf-body-content">
      <WelfareHeaderTab @close="onClose" />
      <WelfareContentHeaderFromPathUrl />
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="listComponent">
          <component
            :is="Component"
            :key="route.path"
            :ref="
              (newRef: any) => {
                if (newRef) {
                  refs.set(route.path, newRef)
                }
              }
            "
          />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
