<script setup lang="ts">
import {
  OperatingMenuPopupAction,
  OperatingTreeMenuPopupContextEmits,
  OperatingTreeMenuPopupProps
} from '@/models/views/operating/OperatingDepthManagementModel'
import { defineEmits, defineProps, onMounted, ref } from 'vue'

const emit = defineEmits<OperatingTreeMenuPopupContextEmits>()
const { actions, xPosition, yPosition } = defineProps<OperatingTreeMenuPopupProps>()
const screenHeight = ref<number>()
const menuPosition = ref()
onMounted(() => {
  screenHeight.value = screen.height
  const heightPercentage = yPosition / screenHeight.value
  if (heightPercentage < 0.7) {
    menuPosition.value = { top: yPosition + 'px', left: xPosition + 'px' }
  } else {
    menuPosition.value = { bottom: screenHeight.value - yPosition - 56 + 'px', left: xPosition + 'px' }
  }
})

const emitAction = (action: OperatingMenuPopupAction) => {
  emit('action-clicked', action)
}
</script>

<template>
  <div class="wf-category-context-menu wf-space-y-3" :style="menuPosition">
    <div
      class="wf-category-context-menu--action wf-body_02-reg wf-space-x-5 wf_flex wf_flex-row wf_items-center wf_justify-start"
      :class="index === actions.length - 2 && 'wf-action-move-up'"
      v-for="(action, index) in actions"
      :key="action.value"
      @click.stop="emitAction(action.value)"
    >
      <span v-if="index === actions.length - 1" class="wf-action-move-down--icon wf-ml-7 wf-mr-12"></span>
      <span v-if="index === actions.length - 2" class="wf-action-move-up--icon wf-ml-7 wf-mr-12"></span>
      <span>
        {{ action.label }}
      </span>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/categoryTreeMenu/categories-tree-menu.css');
</style>
@/models/views/operating/OperatingDepthManagementModel