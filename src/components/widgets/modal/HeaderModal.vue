<script setup lang="ts">
import { WelfareCloseIcon } from '@/components'
export interface HeaderModalProps {
  title: string
}
type HeaderModalEmit = (e: 'close-modal') => void

defineProps<HeaderModalProps>()

const emits = defineEmits<HeaderModalEmit>()
</script>

<template>
  <div class="wf-modal-full-menu_title">
    <div class="wf-frame1000002147">
      <span class="wf-frame1000002147-title wf-sub_tit_01" v-text="title"></span>
      <div class="wf-frame1000002554 wf-space-x-10">
        <slot></slot>
        <WelfareCloseIcon :width="18" :height="18" @click="emits('close-modal')" />
      </div>
    </div>
  </div>
</template>
