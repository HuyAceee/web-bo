<script>
import { defaultColor } from '@/common/color'
export default {
  props: {
    width: {
      default: 26
    },
    height: {
      default: 26
    },
    iconColor: {
      default: defaultColor._a8afbf
    }
  }
}
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      :stroke="iconColor"
      stroke-width="2.2"
      d="M8,2.4h13c2.8,0,5.1,2.3,5.1,5.1v13c0,2.8-2.3,5.1-5.1,5.1H8c-2.8,0-5.1-2.3-5.1-5.1v-13C2.9,4.7,5.2,2.4,8,2.4
	z"
    />
    <path
      :fill="iconColor"
      stroke-width="2.2"
      d="M5,22.5c-0.4,0.4-0.4,1.1,0,1.6c0.4,0.4,1.1,0.4,1.6,0l5.1-5.1l7.3,6.9c0.4,0.4,1.1,0.4,1.6,0
	c0.4-0.4,0.4-1.1,0-1.6l-5.2-4.9l3.2-3.8l6.2,6.7c0.4,0.4,1.1,0.5,1.6,0.1c0.4-0.4,0.5-1.1,0.1-1.6l-7-7.5l0,0l0,0
	c-0.5-0.5-1.3-0.5-1.8,0.1l-3.9,4.5l-1.2-1.2l0,0c-0.5-0.4-1.2-0.4-1.7,0l0,0l0,0L5,22.5z"
    />
    <path
      :stroke="iconColor"
      stroke-width="2.2"
      stroke-linecap="round"
      d="M11,12.8c1.3,0,2.3-1,2.3-2.3c0-1.3-1-2.3-2.3-2.3c-1.3,0-2.3,1-2.3,2.3C8.7,11.8,9.7,12.8,11,12.8z"
    />
  </svg>
</template>
