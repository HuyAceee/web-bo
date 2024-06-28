<script setup lang="ts">
import { MenuManualModalItem, HeaderModal, MenuManualNote } from '@/components'
import { useManualModal } from '@/composables/main/modal/useManualModal'
const { manuals, notes, toPage } = useManualModal()

defineProps(['onClose'])
</script>

<template>
  <div class="wf-manager-info">
    <HeaderModal @close-modal="onClose" title="메가존플레이 매뉴얼 안내" />
    <div class="wf-manager-info-body wf-space-y-20">
      <MenuManualNote :list="notes" />
      <div class="wf_grid wf-modal-manual-list wf_grid-cols-2">
        <MenuManualModalItem
          v-for="(manual, index) in manuals"
          :key="index"
          :title="manual.title"
          :icon="manual.icon"
          @handle-button="toPage"
          :content="manual.contents"
        />
      </div>
    </div>
  </div>
</template>
