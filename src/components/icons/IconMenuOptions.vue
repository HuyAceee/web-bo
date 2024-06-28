<script setup lang="ts">
import { withDefaults } from 'vue'
import { defaultColor } from '@/common/color'
import { IconPropsType } from '@/models/icons/IconPropsType'
withDefaults(defineProps<IconPropsType>(), {
  width: 15.2,
  height: 15.2,
  color: defaultColor._ccc
})
</script>

<template>
  <svg width="3" height="20" viewBox="0 0 3 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="1.5" cy="5" r="1.5" :fill="color" />
    <circle cx="1.5" cy="10" r="1.5" :fill="color" />
    <circle cx="1.5" cy="15" r="1.5" :fill="color" />
  </svg>
</template>
