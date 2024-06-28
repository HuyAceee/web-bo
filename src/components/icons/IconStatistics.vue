<script>
import { defaultColor } from '@/common/color'
export default {
  props: {
    width: {
      default: 29
    },
    height: {
      default: 28
    },
    iconColor: {
      default: defaultColor._a8afbf
    }
  }
}
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.1667 12.8333V18.6667M9.83333 12.8333V18.6667M14.5 9.33333V18.6667M8.66667 24.5H20.3333C22.9107 24.5 25 22.4107 25 19.8333V8.16667C25 5.58934 22.9107 3.5 20.3333 3.5H8.66667C6.08934 3.5 4 5.58934 4 8.16667V19.8333C4 22.4107 6.08934 24.5 8.66667 24.5Z"
      :stroke="iconColor"
      stroke-width="2.2"
      stroke-linecap="round"
    />
  </svg>
</template>
