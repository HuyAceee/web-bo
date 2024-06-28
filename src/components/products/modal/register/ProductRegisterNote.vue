<script setup lang="ts">
import { defaultColor } from '@/common/color'
import { ref, computed } from 'vue'
import { icTooltip } from '@/assets'
import IconWarning from '@/components/icons/IconWarning.vue'

interface Props {
  label: string
  contentList: string[]
}

const { label, contentList } = defineProps<Props>()

const hover = ref(false)

const colorIcon = computed(() => {
  return hover.value ? defaultColor._d95729 : defaultColor._525
})
</script>

<template>
  <div class="wf_modal-note">
    <div class="tooltip">
      <div @mouseover="hover = true" @mouseleave="hover = false">
        <IconWarning :color="colorIcon" />
      </div>
      <div class="wf_content-notification tooltip-content">
        <img alt="" class="wf-ic-tooltip" :src="icTooltip" />
        <div class="wf_modal-note-required">- {{ label }}</div>
        <div class="wf_nowrap" v-for="content in contentList" :key="content">- {{ content }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>
