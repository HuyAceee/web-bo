<script setup lang="ts">
import { IconPropsType } from '@/models/icons/IconPropsType'
withDefaults(defineProps<IconPropsType>(), {
  width: 25,
  height: 24
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_1602_23806" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="9" y="3" width="10" height="18">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.2676 3.96967C8.97239 4.26256 8.97239 4.73744 9.2676 5.03033L16.2922 12L9.2676 18.9697C8.97239 19.2626 8.97239 19.7374 9.2676 20.0303C9.5628 20.3232 10.0414 20.3232 10.3366 20.0303L17.8958 12.5303C18.191 12.2374 18.191 11.7626 17.8958 11.4697L10.3366 3.96967C10.0414 3.67678 9.5628 3.67678 9.2676 3.96967Z"
        fill="black"
      />
    </mask>
    <g mask="url(#mask0_1602_23806)">
      <path d="M0.730602 0H24.9199V24H0.730602V0Z" fill="white" />
    </g>
  </svg>
</template>
