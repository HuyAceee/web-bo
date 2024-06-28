<script setup lang="ts">
import { withDefaults } from 'vue'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defaultColor } from '@/common/color'
withDefaults(defineProps<IconPropsType>(), {
  width: 20,
  height: 21,
  color: defaultColor._d95729
})
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 5.38452C10.5523 5.38452 11 5.83224 11 6.38452V11.3845C11 11.9368 10.5523 12.3845 10 12.3845C9.44771 12.3845 9 11.9368 9 11.3845V6.38452C9 5.83224 9.44771 5.38452 10 5.38452Z"
      :fill="color"
    />
    <path
      d="M10 15.3845C10.5523 15.3845 11 14.9368 11 14.3845C11 13.8322 10.5523 13.3845 10 13.3845C9.44771 13.3845 9 13.8322 9 14.3845C9 14.9368 9.44771 15.3845 10 15.3845Z"
      :fill="color"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 0.384521C4.47715 0.384521 0 4.86167 0 10.3845C0 15.9074 4.47715 20.3845 10 20.3845C15.5228 20.3845 20 15.9074 20 10.3845C20 4.86167 15.5228 0.384521 10 0.384521ZM2 10.3845C2 5.96624 5.58172 2.38452 10 2.38452C14.4183 2.38452 18 5.96624 18 10.3845C18 14.8028 14.4183 18.3845 10 18.3845C5.58172 18.3845 2 14.8028 2 10.3845Z"
      :fill="color"
    />
  </svg>
</template>
