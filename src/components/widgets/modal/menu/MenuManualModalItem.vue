<script setup lang="ts">
interface MenuManualModalItemProps {
  title: string
  content: string
  icon: string
}

interface MenuManualModalItemEmits {
  (e: 'handle-button'): void
}

defineProps<MenuManualModalItemProps>()

const emits = defineEmits<MenuManualModalItemEmits>()
</script>

<template>
  <div class="wf-frame1000002237 wf_flex wf_flex-col wf_justify-between wf_items-start">
    <div class="wf-frame1000002238 wf_flex wf_flex-col wf_items-start wf-space-y-20 wf-width-full">
      <h6 class="" v-text="title"></h6>
      <div class="wf-ml--1 wf-mt-17 wf_w-230">
        <div v-html="content"></div>
      </div>

      <img class="wf-frame1000002238-icon" :src="icon" alt="" />
    </div>
    <button @click="emits('handle-button')" type="button" class="wf_big-button wf_big-button--neatral wf-width-full wf-line-height-16">
      다운로드
    </button>
  </div>
</template>
