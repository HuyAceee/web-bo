<script setup lang="ts">
import { IconPropsType } from '@/models/icons/IconPropsType'
withDefaults(defineProps<IconPropsType>(), {
  width: 26,
  height: 24
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_1602_19306" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="7" y="3" width="10" height="18">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.5566 3.96967C16.8518 4.26256 16.8518 4.73744 16.5566 5.03033L9.53197 12L16.5566 18.9697C16.8518 19.2626 16.8518 19.7374 16.5566 20.0303C16.2614 20.3232 15.7828 20.3232 15.4876 20.0303L7.92843 12.5303C7.63323 12.2374 7.63323 11.7626 7.92843 11.4697L15.4876 3.96967C15.7828 3.67678 16.2614 3.67678 16.5566 3.96967Z"
        fill="black"
      />
    </mask>
    <g mask="url(#mask0_1602_19306)">
      <path d="M25.0936 0H0.904297V24H25.0936V0Z" fill="white" />
    </g>
  </svg>
</template>
