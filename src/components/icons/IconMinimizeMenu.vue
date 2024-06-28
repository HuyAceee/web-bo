<script setup lang="ts">
import { withDefaults } from 'vue'
import { defaultColor } from '@/common/color'
import { IconPropsType } from '@/models/icons/IconPropsType'
withDefaults(defineProps<IconPropsType>(), {
  width: 15.2,
  height: 15.2,
  color: defaultColor._333
})
</script>

<template>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.4" y="0.4" :width="width" :height="height" rx="1.6" fill="white" />
    <rect x="0.4" y="0.4" :width="width" :height="height" rx="1.6" :stroke="color" stroke-width="0.8" />
    <rect width="12" height="12" transform="matrix(1 0 0 -1 2 14)" fill="white" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.5 8C3.5 8.20711 3.66789 8.375 3.875 8.375H12.125C12.3321 8.375 12.5 8.20711 12.5 8C12.5 7.79289 12.3321 7.625 12.125 7.625H3.875C3.66789 7.625 3.5 7.79289 3.5 8Z"
      :fill="color"
      :stroke="color"
      stroke-width="0.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
