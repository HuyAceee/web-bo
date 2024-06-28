<script setup lang="ts">
import { getRandomString } from '@/common'
import { IconPropsType } from '@/models/icons/IconPropsType'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 24,
  height: 24,
  color: '#FFF'
})

const id = getRandomString(10)
</script>
<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 20 20" :fill="props.color" xmlns="http://www.w3.org/2000/svg">
    <mask :id="id" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="5" y="3" width="9" height="14">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9419 3.30806C13.186 3.55214 13.186 3.94786 12.9419 4.19194L7.13388 10L12.9419 15.8081C13.186 16.0521 13.186 16.4479 12.9419 16.6919C12.6979 16.936 12.3021 16.936 12.0581 16.6919L5.80806 10.4419C5.56398 10.1979 5.56398 9.80214 5.80806 9.55806L12.0581 3.30806C12.3021 3.06398 12.6979 3.06398 12.9419 3.30806Z"
        fill="black"
      />
    </mask>
    <g :mask="'url(#' + id + ')'">
      <path d="M20 0H0V20H20V0Z" fill="current" />
    </g>
  </svg>
</template>
