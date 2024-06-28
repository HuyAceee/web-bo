<script setup lang="ts">
import { withDefaults } from 'vue'
import { defaultColor } from '@/common/color'
import { IconPropsType } from '@/models/icons/IconPropsType'
withDefaults(defineProps<IconPropsType>(), {
  width: 4,
  height: 8,
  color: defaultColor._000
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 4 8" fill="none">
    <path d="M0.5 1L3.5 4L0.5 7" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
