<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 12 7" fill="none">
    <path d="M1 6L6 1L11 6" :stroke="iconColor" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
<script>
import { defaultColor } from '@/common/color'
export default {
  props: {
    width: {
      default: 12
    },
    height: {
      default: 7
    },
    iconColor: {
      default: defaultColor._8f8
    }
  }
}
</script>
