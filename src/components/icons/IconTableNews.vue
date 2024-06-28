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
      d="M4 8.16667C4 5.58934 6.08934 3.5 8.66667 3.5H20.3333C22.9107 3.5 25 5.58934 25 8.16667V19.8333C25 22.4107 22.9107 24.5 20.3333 24.5H8.66667C6.08934 24.5 4 22.4107 4 19.8333V8.16667Z"
      :stroke="iconColor"
      stroke-width="2.2"
    />
    <path
      d="M19.4862 12.994C19.9419 12.5384 19.9419 11.7997 19.4862 11.3441L17.396 9.25388C16.9404 8.79827 16.2017 8.79827 15.7461 9.25388L10.9546 14.0454L10.239 18.3723C10.2259 18.4513 10.2944 18.5196 10.3733 18.5065L14.6947 17.7856L19.4862 12.994Z"
      :stroke="iconColor"
      stroke-width="2.2"
    />
  </svg>
</template>
