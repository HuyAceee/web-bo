<script setup lang="ts">
import { IconPropsType } from '@/models/icons/IconPropsType'
withDefaults(defineProps<IconPropsType>(), {
  width: 6,
  height: 8,
  color: '#525252'
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 5 8" fill="none" stroke="#525252">
    <path d="M1 1L4 4L1 7" stroke="current" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
