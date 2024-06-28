<script>
import { defaultColor } from '@/common/color'
export default {
  props: {
    width: {
      default: 14
    },
    height: {
      default: 14
    },
    iconColor: {
      default: defaultColor._fff
    }
  }
}
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 14 14" fill="none">
    <path d="M6.99992 1.75L11.6666 5.25V12.25H8.74992V8.16667H5.24992V12.25H2.33325V5.25L6.99992 1.75Z" :fill="iconColor" />
  </svg>
</template>
